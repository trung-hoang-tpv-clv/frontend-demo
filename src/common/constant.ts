import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const API_BASE_URL = publicRuntimeConfig.API_BASE_URL;

export {
  API_BASE_URL
}