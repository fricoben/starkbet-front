import React from "react";
import styles from "../styles/Identities.module.css";
import PlusIcon from "./icons/plusIcon";

const mintIdentity = ({ onClick }) => {
  return (
    <div className={styles.clickablePlus} onClick={onClick}>
      <PlusIcon />
    </div>
  );
};

export default mintIdentity;
