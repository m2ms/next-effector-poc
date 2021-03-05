import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponse } from '../../model/apiResponse';
import { SelectionItem } from '../../model/selectionItem';

export const uploadFileRequest = async (
  data: SelectionItem,
  progressCallback?: (progressEvent: ProgressEvent) => void
): Promise<ApiResponse<string[]>> => {
  const config: AxiosRequestConfig = {
    headers: { 'content-type': 'application/json' },
    onUploadProgress: progressCallback,
    validateStatus: (status) => true,
  };
  const response = await axios.post('api/uploads', JSON.stringify(data) , config);

  return response.data;
};
