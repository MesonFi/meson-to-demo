import React from 'react'
import classnames from 'classnames'
import { ethers, Contract } from 'ethers'
import { Web3Provider } from '@ethersproject/providers'

import DefaultCompleted from './DefaultCompleted'

const CHAIN_SEP = {
  chainId: '0xaa36a7',
  chainName: 'Sepolia Testnet',
  rpcUrls: ['https://rpc.sepolia.org'],
  blockExplorerUrls: ['https://sepolia.etherscan.io'],
  nativeCurrency: 'SEP'
}
const SEP_MOCK_USDC = '0x6EcdeD0017Ff18c25DD3a37AE101c47EF4D05De4'

const HINKAL_ADDRESS = '0xf1425688523eee762fCA41F6eeFd09a5917817Eb'
const HINKAL_ABI = [
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "proof",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "beneficiary",
        "type": "address"
      },
      {
        "internalType": "uint64",
        "name": "data",
        "type": "uint64"
      }
    ],
    "name": "createCommitments",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

export default function Hinkal ({ isTestnet, appName, data }) {
  const [claimed, setClaimed] = React.useState(false)

  React.useEffect(() => {
    setClaimed(false)
  }, [data?.swapId])

  const onClaim = React.useCallback(async () => {
    const ethereum = window.ethereum
    const account = await ethereum.request({ method: 'eth_requestAccounts' })
    if (account?.[0] !== data.fromAddress) {
      window.alert(`Connected address needs to be ${data.fromAddress}`)
      return
    }

    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: CHAIN_SEP.chainId }]
      })
    } catch (error) {
      if (error.code === 4902 || error.code === -32603) {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [CHAIN_SEP]
        })
      }
    }

    const provider = new Web3Provider(ethereum, 'any')
    const hinkal = new Contract(HINKAL_ADDRESS, HINKAL_ABI, provider.getSigner())

    const proof = '0x0000000000000000000000000000000000000000000000000000000000000000'
    const amount = ethers.parseUnits(data.received, 12)
    const beneficiary = data.fromAddress
    const nonce = data.data

    await hinkal.createCommitments(proof, SEP_MOCK_USDC, amount, beneficiary, nonce)

    setClaimed(true)
  }, [data])

  if (!data) {
    return
  }

  return (
    <div>
      <DefaultCompleted isTestnet={isTestnet} appName={appName} data={data}/>
      <button
        disabled={claimed}
        className={classnames(
          'mt-3 px-6 py-3 rounded-xl leading-[18px] font-medium text-white',
          claimed ? 'bg-indigo-400' : 'bg-indigo-500 hover:bg-indigo-400'
        )}
        onClick={onClaim}
      >
        { claimed ? 'Claimed!' : 'Claim' }
      </button>
    </div>
  )
}