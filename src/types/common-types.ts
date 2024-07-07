export interface ResponseModel<T> {
  data: T;
  message: string;
}

export interface ResponseErrorModel {
  data: { message: string };
  statusCode: number;
}
