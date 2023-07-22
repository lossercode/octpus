export interface BaseResponse<T> {
  code: number;
  message: string;
  data: T;
}

// export interface BaseResponse<T> extends Promise<T> {
//   code: number;
//   message: string;
//   data: T;
// }
