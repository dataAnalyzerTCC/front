import React from "react";
import styles from "./Navbar.module.scss";
import {
  RiFileSearchFill,
  RiHome2Fill,
  RiSettings3Fill,
  RiInformationFill,
} from "react-icons/ri";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <RiHome2Fill className={styles.icon} />
      <RiFileSearchFill className={styles.icon} />
      <RiSettings3Fill className={styles.icon} />
      <RiInformationFill className={styles.icon} />
    </nav>
  );
};

export default Navbar;
