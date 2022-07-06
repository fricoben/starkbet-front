import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../styles/Identities.module.css";

const IdentitiesGallery = ({ identities }) => {
  const [hoverState, setHoverState] = useState(false);
  const router = useRouter();

  return (
    <>
      {identities.map((identity, index) => (
        <div key={index} className={styles.imageGallery}>
          <Image
            width={150}
            height={150}
            src={identity?.avatar ?? "/../public/defaultAvatar.jpeg"}
            alt="avatar"
            className={!hoverState ? styles.avatar : styles.avatarHover}
            onMouseEnter={() => setHoverState(true)}
            onMouseLeave={() => setHoverState(false)}
            onClick={() => router.push(`/identities/${identity.tokenId}`)}
          />
        </div>
      ))}
    </>
  );
};

export default IdentitiesGallery;
