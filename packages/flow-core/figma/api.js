/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();

const api = require("axios");

const headers = {
	"X-FIGMA-TOKEN": process.env.FIGMA_TOKEN
};
/**
 * api endpoint for files
 *
 */
const instanceFiles = api.create({
	baseURL: `https://api.figma.com/v1/files/${process.env.FILE_KEY}`,
	headers
});

const instanceOllionFiles = api.create({
	baseURL: `https://api.figma.com/v1/files/${process.env.OLLION_FILE_KEY}`,
	headers
});
/**
 * api endpoint for styles
 *
 */
const instanceStyles = api.create({
	baseURL: `https://api.figma.com/v1/files/${process.env.FILE_KEY}/styles`,
	headers
});

const instanceOllionStyles = api.create({
	baseURL: `https://api.figma.com/v1/files/${process.env.OLLION_FILE_KEY}/styles`,
	headers
});

/**
 * api endpoint for images
 *
 */
const instanceImages = api.create({
	baseURL: `https://api.figma.com/v1/images/${process.env.FILE_KEY}`,
	headers
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
const getStyles = async type =>
	type === "ollion" ? instanceOllionStyles.get("/") : instanceStyles.get("/");

/**
 * get Figma node info
 *
 * @param {string} nodeId
 * @return {Promise<Object>}
 */
const getNode = async (nodeId, type) =>
	type === "ollion"
		? instanceOllionFiles.get(`/nodes?ids=${decodeURIComponent(nodeId)}`)
		: instanceFiles.get(`/nodes?ids=${decodeURIComponent(nodeId)}`);
/**
 * get Figma node children
 *
 * @param {string} nodeId
 * @return {Promise<[Object]>}
 */
const getNodeChildren = async nodeId => {
	const {
		data: { nodes }
	} = await instanceFiles.get(`/nodes?ids=${decodeURIComponent(nodeId)}`);
	return nodes[nodeId].document.children;
};
/**
 * get svg image resource url
 *
 * @param {string} nodeId
 * @return {Promise<string>}
 */
const getSvgImageUrl = async nodeId => {
	const {
		data: { images }
	} = await instanceImages.get(`/?ids=${decodeURIComponent(nodeId)}&format=svg`);
	return images[nodeId];
};
/**
 * get svg image resource urls
 *
 * @param {string} nodeId
 * @return {Promise<string[]>}
 */
const getAllSvgImageUrl = async nodeId => {
	const {
		data: { images }
	} = await instanceImages.get(`/?ids=${decodeURIComponent(nodeId)}&format=svg`);
	return images;
};
const getIconContent = async url => api.get(url);
module.exports = {
	getDocument,
	getNode,
	getNodeChildren,
	getSvgImageUrl,
	getIconContent,
	getAllSvgImageUrl,
	getStyles
};
