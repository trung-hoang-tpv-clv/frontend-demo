import axios from 'axios';
import getConfig from 'next/config';
import { LoginRequest } from "@/common/types/login-request";
import { LoginResponse } from '@/common/types/login-response';
import { RegisterRequest } from '@/common/types/register-request';
import { RegisterResponse } from '@/common/types/register-response';

const { publicRuntimeConfig } = getConfig();
const API_BASE_URL = publicRuntimeConfig.API_BASE_URL;

const doLogIn = async (request: LoginRequest): Promise<LoginResponse> => {
  const response = await axios({
    baseURL: API_BASE_URL,
    method: 'post',
    url: '/auth/login',
    data: request
  });
  return response.data;
};

const registerUser = async (request: RegisterRequest): Promise<RegisterResponse> => {
  const response = await axios({
    baseURL: API_BASE_URL,
    method: 'post',
    url: '/auth/register',
    data: request
  });
  return response.data;
};

const isLoggedIn = () => {
  
};

export default {
  doLogIn,
  isLoggedIn,
  registerUser,
};
