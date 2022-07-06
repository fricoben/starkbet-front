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
import SuccessScreen from "../components/successScreen";
import LoadingScreen from "../components/loadingScreen";
import { useStarknetIdContract } from "../hooks/starknetId";
import { stringToFelt } from "../utils/felt";

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
  const { data: getDataData, error: getDataDataError } = useStarknetCall({
    contract: contract,
    method: "get_data",
    args: [[tokenId, 0], stringToFelt("discord")],
  });

  //SetData
  const {
    data: setDiscordData,
    invoke,
    error: setDataError,
  } = useStarknetInvoke({
    contract: contract,
    method: "set_data",
  });
  const [stateSetDataPossibility, setDataPossibility] = useState(undefined);
  const [SetDataSuccess, setSetDataSuccess] = useState("false");
  const { transactions } = useStarknetTransactionManager();

  //Server POST request
  const [verifyData, setVerifyData] = useState(undefined);
  const [startProcessData, setStartProcessData] = useState(undefined);

  //Screen management
  const errorScreenCondition =
    isConnected &&
    (startProcessData?.status === "error" ||
      verifyData?.status === "error" ||
      getDataDataError ||
      setDataError);

  const loadingScreenCondition =
    isConnected &&
    !errorScreenCondition &&
    (!startProcessData ||
      !getDataData ||
      SetDataSuccess === "loading" ||
      (!verifyData && SetDataSuccess));

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

  useEffect(() => {
    if (!account) {
      setIsConnected(false);
    } else {
      setIsConnected(true);

      const reference = generateRandomString();

      if (!startProcessData) {
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            reference: reference,
            type: "discord",
            code: router.query.code,
          }),
        };

        fetch("https://verify.starknet.id/start_process", requestOptions)
          .then((response) => response.json())
          .then((data) => setStartProcessData(data));
      }

      if (
        getDataData &&
        startProcessData?.status === "succes" &&
        startProcessData.id != getDataData.toString()
      ) {
        setDataPossibility(true);
      } else if (
        getDataData &&
        startProcessData &&
        startProcessData.id === getDataData.toString()
      ) {
        setSetDataSuccess("true");
      }

      if (SetDataSuccess === "true") {
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            reference: reference, //le invalid reference est peut etre le pb
            type: "discord",
            nftid: tokenId,
          }),
        };

        fetch("https://verify.starknet.id/verify", requestOptions)
          .then((response) => response.json())
          .then((data) => setVerifyData(data));
      }

      for (const transaction of transactions)
        if (transaction.transactionHash === setDiscordData) {
          if (transaction.status === "TRANSACTION_RECEIVED") {
            setDataPossibility("false");
            setSetDataSuccess("loading");
          }
          if (
            transaction.status === "ACCEPTED_ON_L2" ||
            transaction.status === "ACCEPTED_ON_L1"
          ) {
            setSetDataSuccess("true");
          }
        }
    }

    console.log("startProcessData", startProcessData);
    console.log("getDataData", getDataData);
    console.log("stateSetDataPossibility", stateSetDataPossibility);
    console.log("setDiscordData", setDiscordData);
    console.log("SetDataSuccess", SetDataSuccess);
    console.log("verifyData", verifyData);
  }, [
    account,
    router,
    startProcessData,
    getDataData,
    setDiscordData,
    transactions,
    tokenId,
    SetDataSuccess,
    verifyData,
    stateSetDataPossibility,
  ]);

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
            onClick={() => router.push("identities")}
            errorButton="Retry to connect"
          />
        )}
        {isConnected && stateSetDataPossibility && (
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
//   <SuccessScreen
//     onClick={() => router.push("identities")}
//     successHelp="Let's verify it now !"
//     successMessage="What a chad, you're discord is connected !"
//   />
