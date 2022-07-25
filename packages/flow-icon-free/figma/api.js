/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
// figma-imports/utils/api.js
const api = require("axios");
const figmaConfig = require("./config");

const headers = {
  "X-FIGMA-TOKEN": figmaConfig.FIGMA_TOKEN,
};
/**
 * api endpoint for files
 *
 */
const instanceFiles = api.create({
  baseURL: `https://api.figma.com/v1/files/${figmaConfig.FILE_KEY}`,
  headers,
});
/**
 * api endpoint for styles
 *
 */
const instanceStyles = api.create({
  baseURL: `https://api.figma.com/v1/files/${figmaConfig.FILE_KEY}/styles`,
  headers,
});
/**
 * api endpoint for images
 *
 */
const instanceImages = api.create({
  baseURL: `https://api.figma.com/v1/images/${figmaConfig.FILE_KEY}`,
  headers,
});
/**
 * get Figma document info
 *
 * @return {Promise<Object>}
 */
const getDocument = async () => instanceFiles.get("/");

/**
 * get Figma style info
 *
 * @return {Promise<Object>}
 */
const getStyles = async () => instanceStyles.get("/");
/**
 * get Figma node info
 *
 * @param {string} nodeId
 * @return {Promise<Object>}
 */
const getNode = async (nodeId) =>
  instanceFiles.get(`/nodes?ids=${decodeURIComponent(nodeId)}`);
/**
 * get Figma node children
 *
 * @param {string} nodeId
 * @return {Promise<[Object]>}
 */
const getNodeChildren = async (nodeId) => {
  const {
    data: { nodes },
  } = await instanceFiles.get(`/nodes?ids=${decodeURIComponent(nodeId)}`);
  return nodes[nodeId].document.children;
};
/**
 * get svg image resource url
 *
 * @param {string} nodeId
 * @return {Promise<string>}
 */
const getSvgImageUrl = async (nodeId) => {
  const {
    data: { images, err },
  } = await instanceImages.get(
    `/?ids=${decodeURIComponent(nodeId)}&format=svg`
  );
  return images[nodeId];
};
/**
 * get svg image resource urls
 *
 * @param {string} nodeId
 * @return {Promise<string[]>}
 */
const getAllSvgImageUrl = async (nodeId) => {
  const {
    data: { images, err },
  } = await instanceImages.get(
    `/?ids=${decodeURIComponent(nodeId)}&format=svg`
  );
  return images;
};
const getIconContent = async (url) => api.get(url);
module.exports = {
  getDocument,
  getNode,
  getNodeChildren,
  getSvgImageUrl,
  getIconContent,
  getAllSvgImageUrl,
  getStyles,
};
