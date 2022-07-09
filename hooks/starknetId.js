import { useContract } from "@starknet-react/core";
import starknet_id_abi from "../abi/starknet_id_abi.json";

export function useStarknetIdContract() {
  return useContract({
    abi: starknet_id_abi,
    address:
      "0x033233531959c1da39c28daf337e25e2deadda80ce988290306ffabcd735ccbd",
  });
}
