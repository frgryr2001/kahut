import axiosInstance from './httpClient';
import {store} from '../../redux/store';
import {AuthRefreshToken} from '../../types/user';
import {loginSuccessNewAccessTokenAction} from '../../redux/slices/authSlice/reducer';

const setup = () => {
  const {getState, dispatch} = store;

  axiosInstance.getAxiosInstance().interceptors.request.use(
    config => {
      const token = getState().auth.user?.access_token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  axiosInstance.getAxiosInstance().interceptors.response.use(
    res => {
      return res;
    },
    async err => {
      const originalConfig = err.config;

      if (
        (originalConfig.url as string).endsWith('/auth/sign-out') &&
        err.response
      ) {
        const refresh_token = getState().auth.user?.refresh_token;

        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const res = await axiosInstance.post<AuthRefreshToken>({
              url: '/auth/refresh-access-token',
              data: {
                refreshToken: refresh_token,
              },
              config: {
                headers: {
                  'ngrok-skip-browser-warning': 'true',
                },
              },
            });

            dispatch(
              loginSuccessNewAccessTokenAction({
                access_token: res.data.access_token,
              }),
            );

            return axiosInstance.getAxiosInstance()(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    },
  );
};

export default setup;
