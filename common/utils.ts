import AlgoExplorerUrlType from 'models/AlgoExplorerUrlType'
import { ChainType } from 'models/Chain'
import { ALGOEXPLORER_URL } from './constants'

export function ellipseAddress(address = ``, width = 6): string {
  return `${address.slice(0, width)}...${address.slice(-width)}`
}

function algoExplorerUrlTypeToPath(type: AlgoExplorerUrlType) {
  switch (type) {
    case AlgoExplorerUrlType.Transaction:
      return `tx`
    case AlgoExplorerUrlType.Address:
      return `address`
    case AlgoExplorerUrlType.Asset:
      return `asset`
  }
}

export default function createAlgoExplorerUrl(
  chain: ChainType,
  input: string,
  type: AlgoExplorerUrlType
) {
  return `${ALGOEXPLORER_URL(chain)}/${algoExplorerUrlTypeToPath(
    type
  )}/${input}`
}
