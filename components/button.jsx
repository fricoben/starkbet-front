import React from "react";
import styles from "../styles/Button.module.css";

const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={styles.customBtn}>
      <strong>{children}</strong>
    </button>
  );
};

export default Button;
