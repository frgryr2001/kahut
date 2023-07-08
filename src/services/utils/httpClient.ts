import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
// import jwtDecode, {JwtPayload} from 'jwt-decode';
import {API_URL} from '@env';
// import {store, useAppDispatch} from '../../redux/store';
// import {refreshToken} from '../../redux/slices/authSlice/actions';
class HttpClient {
  private static instance: HttpClient;
  private readonly axiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_URL,
    });
    // Add a request interceptor
    this.axiosInstance.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        // const state = store.getState();
        // const dispatch = useAppDispatch();
        // const token = state.auth.user?.access_token;
        // const refresh_Token = state.auth.user?.refresh_token;
        // const decodedToken: JwtPayload = token ? jwtDecode(token) : {};
        // config.headers.Authorization = `Bearer ${token}`;
        // if (decodedToken?.exp! * 1000 < Date.now()) {
        //   dispatch(refreshToken({refreshToken: refresh_Token!}));
        // }

        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      },
    );
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
    const response: AxiosResponse<T> = await this.axiosInstance.post(
      url,
      data,
      config,
    );
    return response.data;
  }

  public async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(
      url,
      data,
      config,
    );
    return response.data;
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
