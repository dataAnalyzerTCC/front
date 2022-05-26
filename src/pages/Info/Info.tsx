import React from "react";
import styles from "./Info.module.scss";

const Info: React.FC = () => {
  return (
    <main className={styles.main}>
      <h2>Sobre</h2>
      <section>
        <p>
          Feito com ❤️ na Fatec São Caetano
        </p>
        <div>
          O intuito desse trabalho é ser uma ferramenta que auxilie empresas e auditores a levantamento de dados que estão em seu sistema.
          <br/>
          <br/>
          Como Utilizar:
          <br/>
          <img src={require('../Info/Caminho.png')} />
          <h4>
            Preencha com o caminho absoluto da pasta que deseja utilizar como base
          </h4>
          <br/>
          <br/>
          <img src={require('../Info/permissions.png')} />
          <h4>
            Marque ao minimo uma checkbox de cada um dos tipos, para assim filtrarmos os arquivos por permissoes
          </h4>
          <br/>
          <br/>
          <img src={require('../Info/filters.png')} />
          <h4>
            Aqui você pode selecionar na lista de filtros pre criados para fazer a pesquisa nos arquivos encontrados
          </h4>
        </div>
      </section>
    </main>
  );
};

export default Info;
