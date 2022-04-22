import React from "react";
import styles from "./Titlebar.module.scss";
import { RiLogoutBoxRLine } from "react-icons/ri";

const Titlebar: React.FC = () => {
  return (
    <header className={styles.titlebar}>
      <h2 className={styles.mainTitle}>File Analyzer</h2>
    </header>
  );
};

export default Titlebar;
