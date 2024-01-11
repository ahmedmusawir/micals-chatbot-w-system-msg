import * as strapiPostAPI from "../data-layer/post";
import { PostDataSource } from "./post-entities";

interface DataSource extends PostDataSource {}

const datasource: DataSource = {
  ...strapiPostAPI,
};

export default datasource;
