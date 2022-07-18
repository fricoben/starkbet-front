import React from "react";
import styles from "../styles/bets.module.css";
import TemperatureIcon from "./icons/temperatureIcon";
import EthereumIcon from "./icons/ethereumIcon";

const ClickableIcon = ({ icon, onClick }) => {
  return (
    <div className={styles.clickableIcon} onClick={onClick}>
      {icon === "temperature" && <TemperatureIcon />}
      {icon === "ethereum" && <EthereumIcon />}
    </div>
  );
};

export default ClickableIcon;
