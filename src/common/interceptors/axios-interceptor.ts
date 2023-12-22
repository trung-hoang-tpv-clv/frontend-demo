
import axios from "axios";
import { API_BASE_URL } from "../constant";
import { getSession } from 'next-auth/react'

const httpClient = axios.create({
  baseURL: API_BASE_URL,
});

httpClient.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session?.accessToken}`;
  }
  return config;
});

export default httpClient;