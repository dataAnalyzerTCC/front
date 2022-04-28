import api from "api";
import axios from "axios";
import { useWebSockets } from "contexts/websockets";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { capitalize } from "utils/string";
import styles from "./Search.module.scss";

interface AccessTypes {
  execute: boolean;
  write: boolean;
  read: boolean;
}

interface AccessLevels {
  user: AccessTypes;
  group: AccessTypes;
  public: AccessTypes;
}

interface SelectableFilter {
  name: string;
  checked: boolean;
}

const levels: { name: keyof AccessLevels; displayName: string }[] = [
  {
    name: "user",
    displayName: "Usuário",
  },
  {
    name: "group",
    displayName: "Grupo",
  },
  {
    name: "public",
    displayName: "Público",
  },
];

const Search: React.FC = () => {
  const { connect } = useWebSockets();
  const navigate = useNavigate();

  const [message, setMessage] = useState<string>("");
  const [filters, setFilters] = useState<SelectableFilter[]>([]);
  const [directoryPath, setDirectoryPath] = useState<string>("");
  const [accessLevels, setAccessLevels] = useState<AccessLevels>({
    user: {
      execute: false,
      write: false,
      read: false,
    },
    group: {
      execute: false,
      write: false,
      read: false,
    },
    public: {
      execute: false,
      write: false,
      read: false,
    },
  });

  const handleCheckbox = (
    level: keyof AccessLevels,
    type: keyof AccessTypes,
    value: boolean
  ) => {
    setAccessLevels((prev) => ({
      ...prev,
      [level]: { ...prev[level], [type]: value },
    }));
  };

  const handleSearch = async () => {
    try {
      await api.postRunOnPath(
        directoryPath,
        Object.values(accessLevels).map((levels) =>
          (Object.values(levels) as boolean[])
            .map((level, index) => (level ? 2 ** index : 0))
            .reduce((prev, curr) => prev + curr, 0)
        ),
        filters.filter((filter) => filter.checked).map((filter) => filter.name)
      );
      navigate("/results");
    } catch (e: any) {
      console.error(e);
      if (axios.isAxiosError(e)) {
        if (e.response?.data.message !== undefined) {
          setMessage(e.response?.data.message);
        }
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { filters } = await api.getFilters();
        setFilters(
          filters.personal.map((filter) => ({ name: filter, checked: false }))
        );
      } catch (e: any) {
        console.error(e);
      }
    })();
    connect();
  }, []);

  return (
    <main className={styles.main}>
      <h2>{message}</h2>
      <section>
        <h2>Busca de Arquivos</h2>
        <div>
          <label htmlFor="directory-search">
            Digite o caminho do diretório:
          </label>
          <input
            type="text"
            id="directory-search"
            value={directoryPath}
            onChange={(e) => setDirectoryPath(e.target.value)}
          />
        </div>
      </section>

      <section className={styles.accessLevels}>
        <h2>Nível de acesso</h2>

        {levels.map((level) => {
          return (
            <React.Fragment key={level.name}>
              <h3>{level.displayName}</h3>
              <div>
                <input
                  type="checkbox"
                  name={`${level.name}-execute`}
                  value={`${level.name}-execute`}
                  id={`${level.name}-execute`}
                  checked={accessLevels[level.name].execute}
                  onChange={() =>
                    handleCheckbox(
                      level.name,
                      "execute",
                      !accessLevels[level.name].execute
                    )
                  }
                />
                <label htmlFor={`${level.name}-execute`}>Executar</label>
                <input
                  type="checkbox"
                  name={`${level.name}-write`}
                  value={`${level.name}-write`}
                  id={`${level.name}-write`}
                  checked={accessLevels[level.name].write}
                  onChange={() =>
                    handleCheckbox(
                      level.name,
                      "write",
                      !accessLevels[level.name].write
                    )
                  }
                />
                <label htmlFor={`${level.name}-write`}>Escrita</label>
                <input
                  type="checkbox"
                  name={`${level.name}-read`}
                  value={`${level.name}-read`}
                  id={`${level.name}-read`}
                  checked={accessLevels[level.name].read}
                  onChange={() =>
                    handleCheckbox(
                      level.name,
                      "read",
                      !accessLevels[level.name].read
                    )
                  }
                />
                <label htmlFor={`${level.name}-read`}>Leitura</label>
              </div>
            </React.Fragment>
          );
        })}
      </section>
      <section className={styles.filters}>
        <h2>Filtros</h2>

        {filters.map((filter) => {
          return (
            <div key={filter.name}>
              <input
                type="checkbox"
                name={filter.name}
                value={filter.name}
                id={filter.name}
                checked={filter.checked}
                onChange={() =>
                  setFilters((prev) =>
                    prev.map((f) =>
                      f.name === filter.name ? { ...f, checked: !f.checked } : f
                    )
                  )
                }
              />
              <label htmlFor={filter.name}>
                {filter.name}
              </label>
            </div>
          );
        })}
      </section>
      <button className={styles.searchBtn} onClick={handleSearch}>
        Buscar
      </button>
    </main>
  );
};

export default Search;
