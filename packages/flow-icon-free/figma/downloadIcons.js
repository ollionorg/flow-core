/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { getDocument, getAllSvgImageUrl, getIconContent } = require("./api");
const fs = require("fs");
const prettier = require("prettier");

function sliceIntoChunks(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

const indexFileImports = new Set();
const indexFileExports = new Set();
/**
 * Get document of specified file Id
 */
getDocument()
  .then((response) => {
    const componetKeys = Object.keys(response.data.components);
    const ids = componetKeys.join(",");

    /**
     * Components count
     */
    process.stdout.write(`${componetKeys.length} Icons present in Figma! \n`);

    /**
     * Storing id to name mapping
     */
    const iconNameMapping = {};
    for (const [id, component] of Object.entries(
      Object.entries(response.data.components)
    )) {
      iconNameMapping[id] = component[1].name;
    }
    /**
     * async/await removed to download asynchronously
     */
    getAllSvgImageUrl(ids)
      .then(
        async (urls) => {
          process.stdout.write(
            `\x1b[36m \rDownloading ${componetKeys.length} icons.`
          );

          const iconUrls = [];
          for (const [id, url] of Object.entries(Object.entries(urls))) {
            /**
             * Downloading component whose name starts with 'i-'
             */
            if (
              iconNameMapping[id].startsWith("i-") ||
              iconNameMapping[id].startsWith("p-")
            ) {
              iconUrls.push({ id, url });
            }
          }
          const batchSize = 10;
          const batches = sliceIntoChunks(iconUrls, batchSize);

          for (let i = 0; i < batches.length; i++) {
            const promises = [];
            process.stdout.write(
              `\x1b[36m \rDownloading ${i * batchSize} to ${
                i * batchSize + batchSize
              } ...`
            );

            batches[i].forEach(({ id, url }) => {
              /**
               * Downloading component whose name starts with 'i-'
               */
              if (
                iconNameMapping[id].startsWith("i-") ||
                iconNameMapping[id].startsWith("p-")
              ) {
                promises.push(
                  getIconContent(url[1]).then(
                    (icon) => {
                      const svgToJS = `import { html } from "lit-html"; \n export default html\`${icon.data}\`.strings.join("");`;
                      const iconNameAsVariable = iconNameMapping[id].replaceAll(
                        "-",
                        "_"
                      );
                      indexFileImports.add(
                        `import ${iconNameAsVariable} from "./svg/${iconNameMapping[id]}";`
                      );
                      indexFileExports.add(
                        `"${iconNameMapping[id]}": ${iconNameAsVariable}`
                      );
                      /**
                       * Writing file in svg folder
                       */
                      fs.writeFileSync(
                        `${__dirname}/../svg/${iconNameMapping[id]}.ts`,
                        svgToJS
                      );
                    },
                    (error) => {
                      console.log(
                        `Failed to load svg ${iconNameMapping[id]} - ${url[1]}`,
                        error.code
                      );
                    }
                  )
                );
              }
            });
            await Promise.all(promises);
          }
          process.stdout.clearLine();
          process.stdout.write(
            `\x1b[36m \rCreating index.ts for packaging... \n \n `
          );

          const indexFile = `${Array.from(indexFileImports).join(
            "\n"
          )} \n export default { ${Array.from(indexFileExports).join(",")} };`;

          /**
           * Writing index file for package
           */
          fs.writeFileSync(
            `${__dirname}/../index.ts`,
            prettier.format(indexFile, {
              printWidth: 100,
              singleQuote: true,
              tabWidth: 4,
              parser: "typescript",
            })
          );

          process.stdout.write(
            `\x1b[36m \r${componetKeys.length} Icons downloaded! \n \n `
          );
        },
        (error) => {
          console.error(error);
        }
      )
      .catch((error) => {
        console.error(error);
      });
  })
  .catch((error) => {
    console.error(error);
  });
