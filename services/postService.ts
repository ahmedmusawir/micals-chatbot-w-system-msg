import HttpService, { ApiResponse } from "./httpService";

export type PostApiResponse = ApiResponse<any>;

const postService = new HttpService<any>("/posts");

export default postService;
