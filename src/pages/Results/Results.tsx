import { useWebSockets } from "contexts/websockets";
import { format } from "date-fns";
import React from "react";
import styles from "./Results.module.scss";

const Results: React.FC = () => {
  const { receivedMessages } = useWebSockets();

  return (
    <main className={styles.main}>
      <h2>Resultados</h2>
      <section>
        <table>
          <tr>
            <th>Arquivo</th>
            <th>Tipo</th>
            <th>Texto</th>
            <th>Pesquisado Em</th>
          </tr>
          {receivedMessages.map((message, index) => {
            return (
              <tr key={`tableitem_${index}`}>
                <td>{message.file}</td>
                <td>{message.filter}</td>
                <td>{message.word}</td>
                <td>
                  {message.timestamp
                    ? format(message.timestamp, "dd/MM/yyyy HH:mm:ss")
                    : ""}
                </td>
              </tr>
            );
          })}
        </table>
      </section>
    </main>
  );
};

export default Results;
