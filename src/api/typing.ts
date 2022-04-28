export interface GetFiltersResponse {
  filters: {
    personal: string[];
  };
}

export interface RunOnPathBody {
  path: string;
  permissions: number[];
  filters: string[];
}
