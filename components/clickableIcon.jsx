import Link from "next/link";
import React from "react";
import styles from "../styles/Identities.module.css";
import TwitterIcon from "./icons/twitterIcon";
import DiscordIcon from "./icons/discordIcon";

const ClickableIcon = ({ href, icon }) => {
  return (
    <Link href={href}>
      <div className={styles.clickableIcon}>
        {icon === "twitter" && <TwitterIcon />}
        {icon === "discord" && <DiscordIcon />}
      </div>
    </Link>
  );
};

export default ClickableIcon;
