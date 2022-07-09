import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/Identities.module.css";
import {
  useStarknet,
  useConnectors,
  useStarknetCall,
  useStarknetInvoke,
  useStarknetTransactionManager,
} from "@starknet-react/core";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Button from "../components/button";
import ErrorScreen from "../components/errorScreen";
import LoadingScreen from "../components/loadingScreen";
import { useStarknetIdContract } from "../hooks/starknetId";
import { stringToFelt } from "../utils/felt";
import SuccessScreen from "../components/successScreen";

export default function Discord() {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(true);

  // Access localStorage
  const isServer = typeof window === "undefined";
  let tokenId;
  if (!isServer) {
    tokenId = window.sessionStorage.getItem("tokenId");
  }

  //Connection
  const { connect, connectors } = useConnectors();
  const { account } = useStarknet();

  //Contract
  const { contract } = useStarknetIdContract();

  //GetData
  const { data: discordId, error: discordIdError } = useStarknetCall({
    contract: contract,
    method: "get_data",
    args: [[tokenId, 0], stringToFelt("discord")],
  });

  //SetData
  const {
    data: discordIdSetterData,
    invoke,
    error: discordIdSetterError,
  } = useStarknetInvoke({
    contract: contract,
    method: "set_data",
  });
  const [discordIdSetterPossibility, setDiscordIdSetterPossibility] =
    useState(undefined);
  const [discordIdSetterSuccess, setDiscordIdSetterSuccess] = useState(false);
  const { transactions } = useStarknetTransactionManager();

  //Server POST request
  const [verifyData, setVerifyData] = useState(undefined);
  const [startProcessData, setStartProcessData] = useState(undefined);

  //Screen management
  const successScreenCondition =
    isConnected && verifyData?.status === "success";

  const errorScreenCondition =
    isConnected &&
    !successScreenCondition &&
    (startProcessData?.status === "error" ||
      verifyData?.status === "error" ||
      discordIdError ||
      discordIdSetterError);

  const loadingScreenCondition =
    isConnected &&
    !errorScreenCondition &&
    !successScreenCondition &&
    !discordIdSetterPossibility;

  const discordIdSetterScreen =
    isConnected && discordIdSetterPossibility && !errorScreenCondition;

  //Fonctions
  function generateRandomString() {
    let returnString = "";

    for (let index = 0; index < 31; index++) {
      returnString += Math.floor(Math.random() * 10);
    }

    return returnString;
  }

  function setDiscordInfos() {
    invoke({
      args: [[tokenId, 0], stringToFelt("discord"), startProcessData.id],
    });
  }

  //Set reference only one time
  const [reference, setReference] = useState(undefined);
  useEffect(() => {
    setReference(generateRandomString());
  }, []);

  const [code, setCode] = useState(undefined);
  useEffect(() => {
    setCode(router.query.code);
  }, [router]);

  //First server request
  useEffect(() => {
    if (!reference || !code) return;

    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        reference: reference,
        type: "discord",
        code: code,
      }),
    };

    fetch("https://verify.starknet.id/start_process", requestOptions)
      .then((response) => response.json())
      .then((data) => setStartProcessData(data));
  }, [code, reference]);

  //Connection verification
  useEffect(() => {
    if (!account) {
      setIsConnected(false);
    } else {
      setIsConnected(true);
    }
  }, [account]);

  //First server request verification
  useEffect(() => {
    if (discordIdSetterSuccess === "loading") return;

    if (
      discordId &&
      startProcessData?.status === "success" &&
      startProcessData.id != discordId.toString()
    ) {
      setDiscordIdSetterPossibility(true);
    } else if (
      discordId &&
      startProcessData?.status === "success" &&
      startProcessData.id.toString() === discordId.toString()
    ) {
      setDiscordIdSetterSuccess(true);
    }
  }, [discordId, startProcessData]);

  //Verification server request
  useEffect(() => {
    if (discordIdSetterSuccess === true) {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          reference: reference,
          type: "discord",
          nftid: tokenId,
        }),
      };

      fetch("https://verify.starknet.id/verify", requestOptions)
        .then((response) => response.json())
        .then((data) => setVerifyData(data));
    }
  }, [discordIdSetterSuccess]);

  useEffect(() => {
    for (const transaction of transactions)
      if (transaction.transactionHash === discordIdSetterData) {
        if (transaction.status === "TRANSACTION_RECEIVED") {
          setDiscordIdSetterPossibility(false);
          setDiscordIdSetterSuccess("loading");
        }
        if (
          transaction.status === "ACCEPTED_ON_L2" ||
          transaction.status === "ACCEPTED_ON_L1"
        ) {
          setDiscordIdSetterSuccess(true);
        }
      }
  }, [discordIdSetterData, transactions]);

  return (
    <div className="h-screen w-screen">
      <Head>
        <title>Starknet.id</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/starknet-logo.webp" />
      </Head>

      <div className={styles.container}>
        {!isConnected &&
          connectors.map((connector) =>
            connector.available() ? (
              <>
                <h1 className="sm:text-5xl text-5xl">
                  You need to connect anon
                </h1>
                <Button key={connector.id()} onClick={() => connect(connector)}>
                  Connect Wallet
                </Button>
              </>
            ) : null
          )}
        {loadingScreenCondition && <LoadingScreen />}
        {errorScreenCondition && (
          <ErrorScreen
            onClick={() => router.push(`/identities/${tokenId}`)}
            errorButton="Retry to connect"
          />
        )}
        {successScreenCondition && (
          <SuccessScreen
            onClick={() => router.push(`/identities/${tokenId}`)}
            successButton="Get back to you starknet identity"
            successMessage="What a chad, you're discord is verified !"
          />
        )}
        {discordIdSetterScreen && (
          <>
            <h1 className="sm:text-5xl text-5xl mt-4">
              It&apos;s time to set your discord infos anon !
            </h1>
            <Button onClick={setDiscordInfos}>
              Set my discord infos on chain
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
