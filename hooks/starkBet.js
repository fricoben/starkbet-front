import { useContract } from "@starknet-react/core";
import starkbet_abi from "../abi/starkbet_abi.json";

export function useStarkBetContract() {
  return useContract({
    abi: starkbet_abi,
    address: 0x00dd77122a448a5227eeec46ad7f0449256f15a958a71f37aa748d55760dbeaf,
  });
}
