import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../styles/bets.module.css";

const IdentitiesGallery = ({ tokenIds }) => {
  const [hoverState, setHoverState] = useState(false);
  const router = useRouter();

  return (
    <>
      {(tokenIds || []).map((tokenId, index) => (
        <div key={index} className={styles.imageGallery}>
          <Image
            width={150}
            height={150}
            src="https://i.ibb.co/GRNr2xC/default-Avatar.jpg"
            alt="avatar"
            className={hoverState ? styles.avatarHover : styles.avatar}
            onMouseEnter={() => setHoverState(true)}
            onMouseLeave={() => setHoverState(false)}
            onClick={() => router.push(`/identities/${tokenId}`)}
          />
        </div>
      ))}
    </>
  );
};

export default IdentitiesGallery;
