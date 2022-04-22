export interface GetFiltersResponse {
  filters: {
    personal: ("cpf" | "cnpj" | "tipo sangúineo" | "data de nascimento")[];
  };
}

export interface RunOnPathBody {
  path: string;
  permissions: number[];
  filters: string[];
}
