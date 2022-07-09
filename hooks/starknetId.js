import { useContract } from "@starknet-react/core";
import starknet_id_abi from "../abi/starknet_id_abi.json";

export function useStarknetIdContract() {
  return useContract({
    abi: starknet_id_abi,
    address: process.env.NEXT_PUBLIC_CONTRACT,
  });
}
