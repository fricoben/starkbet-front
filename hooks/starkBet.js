import { useContract } from "@starknet-react/core";
import starkbet_abi from "../abi/starkbet_abi.json";

export function useStarkBetContract() {
  return useContract({
    abi: starkbet_abi,
    address:
      "0x02b6f503cca8e4bc23fd75cd85403ff6cdfb1c6da1c35061d606146d18f02206",
  });
}
