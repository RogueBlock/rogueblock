import { ChainType } from 'models/Chain'

export const NEXT_PUBLIC_CHAIN_TYPE =
  process.env.NEXT_PUBLIC_CHAIN_TYPE ?? ChainType.TestNet

export const ALGOEXPLORER_URL = (chain: ChainType) => {
  return chain.toLowerCase() === `mainnet`
    ? `https://algoexplorer.io`
    : `https://testnet.algoexplorer.io`
}
