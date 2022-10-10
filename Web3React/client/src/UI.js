import {useWeb3React} from '@web3-react/core';
import {useEffect} from 'react'
import {useActivateWallet} from './hooks/useWalletConnect'

export const UI = () => {
  const activeWallet = useActivateWallet()
  const {chainId} = useWeb3React()

  useEffect(() => {console.log(chainId)},[chainId])

  return (
    <div>
      <h1>Hello</h1>
      <Button onClick={async () => await activeWallet()} ></Button>
    </div>
  )
}

