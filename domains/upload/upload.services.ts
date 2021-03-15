import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponse } from '../../models/apiResponse';
import { SelectionItem } from '../../models/selectionItem';
import { ResponseDataFile } from '../../models/item';
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
  token: string | undefined,
  progressCallback?: (progressEvent: ProgressEvent) => void
): Promise<ResponseDataFile> => {
  const config: AxiosRequestConfig = {
    headers: {
      'content-type': 'application/json',
      Authorization: 'bearer ' + token,
    },
    onUploadProgress: progressCallback,
    validateStatus: () => true,
  };

  console.log(publicRuntimeConfig);
  const response = await axios
    .get(publicRuntimeConfig.basePath + '/api/file', config)
    .then((response) => {
      let dataFile: ResponseDataFile = {
        data: response.data.data.count,
        message: 'success',
      };
      return dataFile;
    })
    .catch((error) => {
      let dataFile: ResponseDataFile = {
        data: -1,
        message: 'error ' + error,
      };

      return dataFile;
    });

  return response;
};
