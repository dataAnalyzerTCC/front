import axios from "axios";
import { GetFiltersResponse, RunOnPathBody } from "./typing";

const baseURL = process.env.REACT_APP_API_URL;
const timeout = 5 * 1000; // 5 seconds

if (baseURL === undefined) {
  throw Error(".env missing REACT_APP_API_URL variable");
}

const api = axios.create({
  baseURL,
  timeout,
});

const getFilters = async (): Promise<GetFiltersResponse> => {
  const response = await api.get<GetFiltersResponse>("/getFilters");
  return response.data;
};

const postRunOnPath = async (
  path: string,
  permissions: number[],
  filters: string[]
): Promise<void> => {
  const body: RunOnPathBody = {
    path,
    permissions,
    filters,
  };

  await api.post("/runOnPath", body);
};

export default {
  axios: api,
  getFilters,
  postRunOnPath,
};
