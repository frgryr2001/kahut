import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {API_URL} from '@env';

class HttpClient {
  private static instance: HttpClient;
  private readonly axiosInstance;

  private constructor() {
    console.info('[INFO] API URL:', API_URL);
    this.axiosInstance = axios.create({
      baseURL: API_URL,
    });
  }

  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }

    return HttpClient.instance;
  }

  public getAxiosInstance() {
    return this.axiosInstance;
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(
        url,
        config,
      );
      return response.data;
    } catch (error) {
      throw this.handleRequestError(error as AxiosError);
    }
  }

  public async post<T>({
    url,
    data,
    config,
  }: {
    url: string;
    data: any;
    config?: AxiosRequestConfig;
  }): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(
        url,
        data,
        config,
      );
      return response.data;
    } catch (error) {
      throw this.handleRequestError(error as AxiosError);
    }
  }

  public async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put(
        url,
        data,
        config,
      );
      return response.data;
    } catch (error) {
      throw this.handleRequestError(error as AxiosError);
    }
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete(
        url,
        config,
      );
      return response.data;
    } catch (error) {
      throw this.handleRequestError(error as AxiosError);
    }
  }

  public async patch<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.patch(
        url,
        data,
        config,
      );
      return response.data;
    } catch (error) {
      throw this.handleRequestError(error as AxiosError);
    }
  }

  // Handle request errors
  private handleRequestError(err: AxiosError): Error {
    if (err.response) {
      // Request was made and server responded with a status code
      console.error('Request failed with status:', err.response.data);
    } else if (err.request) {
      // Request was made but no response was received
      console.error('No response received');
    } else {
      // Something else happened during the request
      console.error('Error:', err.message);
    }
    throw err;
  }
}

export default HttpClient.getInstance();
