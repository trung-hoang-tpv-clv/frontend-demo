import httpClient from "../interceptors/axios-interceptor";

export const fetcher = (url: string) => httpClient.get(url).then(res => res.data);