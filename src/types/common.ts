export type NewAccessToken = {
  access_token: string;
};
export interface RequestResponse<T> {
  code: number;
  success: boolean;
  data: T;
  message: string;
}
