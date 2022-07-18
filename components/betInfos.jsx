import React, { useState } from "react";
import Button from "./button";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import styles from "../styles/bets.module.css";

const BetInfos = ({ bet }) => {
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
              <strong>Betting Expiration Date :&nbsp;</strong> $DATE<br></br>
              <strong>End Date :&nbsp;</strong> $DATE<br></br>
              <strong>Treshold price :&nbsp;</strong> 1000$<br></br>
              <strong>Liquidity Up :&nbsp;</strong>100 000$<br></br>
              <strong>Liquidity Down :&nbsp;</strong>100 000$
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <InputGroup>
              <Input
                type="number"
                className="p-3 rounded-sm"
                placeholder="Enter amount"
                color={"black"}
                onChange={(value) => changeNumberToMint(numberToMint)}
                width="100%"
                height="3rem"
              />
            </InputGroup>{" "}
            <div className="flex">
              {" "}
              <div className="mr-3">
                <Button>Bet up</Button>
              </div>
              <Button>Bet down</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetInfos;
