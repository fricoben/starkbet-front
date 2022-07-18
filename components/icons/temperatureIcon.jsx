import Image from "next/image";
import React from "react";
import styles from "../../styles/bets.module.css";

const temperatureIcon = () => {
  return (
    <Image
      width={150}
      height={150}
      src="https://i.ibb.co/z8Bqj6z/paris.png"
      alt="paris"
      className={styles.avatar}
    />
  );
};

export default temperatureIcon;
