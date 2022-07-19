import React, { useState } from "react";
import Button from "./button";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import styles from "../styles/bets.module.css";

const BetInfos = ({ betUp, betDown, redeem, closeBet }) => {
  const [numberToMint, changeNumberToMint] = useState(0);

  return (
    <div className="flex flex-col mb-5">
      <div className={styles.betContainer}>
        <h2 className="text-4xl mb-5">
          <strong>Bet #1</strong>
        </h2>
        <div className={"flex justify-around align"}>
          <div className="flex justify-center">
            <p>
              <strong>Betting Date :&nbsp;</strong> Tuesday 19 July 2022
              08:56:51 GMT<br></br>
              <strong>End Date :&nbsp;</strong> Tuesday 19 July 2022 08:56:52
              GMT GMT<br></br>
              <strong>Treshold value :&nbsp;</strong> 1000$<br></br>
              <strong>Liquidity Up :&nbsp;</strong>120$<br></br>
              <strong>Liquidity down :&nbsp;</strong>0$<br></br>
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <InputGroup>
              <Input
                type="number"
                className="p-3 rounded-sm"
                placeholder="Enter amount"
                color={"black"}
                onChange={(value) => changeNumberToMint(value)}
                width="100%"
                height="3rem"
              />
            </InputGroup>{" "}
            <div className="flex">
              {" "}
              <div className="mr-3">
                <Button onClick={betUp}>Bet up</Button>
              </div>
              <Button onClick={betDown}>Bet down</Button>
            </div>
            <Button onClick={redeem}>Redeem</Button>
            <Button onClick={closeBet}>Close bet</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetInfos;
