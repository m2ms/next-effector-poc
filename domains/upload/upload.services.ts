import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponse } from '../../models/apiResponse';
import { SelectionItem } from '../../models/selectionItem';
import getConfig from 'next/config';

const { /* serverRuntimeConfig, */ publicRuntimeConfig } = getConfig();

export const uploadFileRequest = async (
  data: SelectionItem,
  token: string | undefined,
  progressCallback?: (progressEvent: ProgressEvent) => void
): Promise<ApiResponse<string[]>> => {
  const config: AxiosRequestConfig = {
    headers: { 'content-type': 'application/json', Authorization: token },
    onUploadProgress: progressCallback,
    validateStatus: () => true,
  };
  const response = await axios.post(
    'api/uploads',
    JSON.stringify(data),
    config
  );
  return response.data;
};

export const getFileRequest = async (
  progressCallback?: (progressEvent: ProgressEvent) => void
): Promise<ApiResponse<string[]>> => {
  const config: AxiosRequestConfig = {
    headers: { 'content-type': 'application/json' },
    onUploadProgress: progressCallback,
    validateStatus: () => true,
  };

  console.log(publicRuntimeConfig);
  const response = await axios.get(
    publicRuntimeConfig.basePath + '/api/uploads',
    config
  );
  return response.data;
};

export const getInitFileRequest = async (
  progressCallback?: (progressEvent: ProgressEvent) => void
): Promise<unknown> => {
  const config: AxiosRequestConfig = {
    headers: { 'content-type': 'application/json' },
    onUploadProgress: progressCallback,
    validateStatus: () => true,
  };

  console.log(publicRuntimeConfig);
  const response = await axios.get(
    publicRuntimeConfig.basePath + '/api/file',
    config
  );
  return response.data;
};
