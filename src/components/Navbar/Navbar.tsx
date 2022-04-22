import React from "react";
import styles from "./Navbar.module.scss";
import {
  RiFileSearchFill,
  RiHome2Fill,
  RiSettings3Fill,
  RiInformationFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <RiHome2Fill className={styles.icon} />
      </Link>
      <Link to="/results">
        <RiFileSearchFill className={styles.icon} />
      </Link>
      <Link to="/info">
        <RiInformationFill className={styles.icon} />
      </Link>
    </nav>
  );
};

export default Navbar;
