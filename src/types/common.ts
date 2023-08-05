export type ResetAccessTokenResponseData = {
  access_token: string;
  refresh_token: string;
};
export interface RequestResponse<T> {
  code: number;
  success: boolean;
  data: T;
  message: string;
}
