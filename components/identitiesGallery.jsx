import Image from "next/image";
import React from "react";
import styles from "../styles/Identities.module.css";

const IdentitiesGallery = ({ identities }) => {
  return (
    <>
      {identities.map((identity, index) => (
        <div key={index} className={styles.imageGallery}>
          <>
            <Image
              width={150}
              height={150}
              src={identity?.avatar ?? "/../public/defaultAvatar.jpeg"}
              alt="avatar"
              className={styles.avatar}
            />
            <p className="text-center">{identity.discord}</p>
          </>
        </div>
      ))}
    </>
  );
};

export default IdentitiesGallery;
