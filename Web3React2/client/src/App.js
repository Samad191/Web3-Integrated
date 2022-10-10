import logo from './logo.svg';
import './App.css';
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { simpleStorageAbi, lotteryContractAbi } from './Abi'
import Web3 from 'web3';

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [1,3,4,5,42]
})

const web3 = new Web3(Web3.givenProvider)

function getLibrary(provider){
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library
}


const Wallet = () => {
  
  const { chainId, account, activate } = useWeb3React()      
  
  // simple storage contract address
  const simpleContractAddr = '0x8a92727a7D4024e7691265DF874D28585bf6b9D2';
  const SimpleContract = new web3.eth.Contract(simpleStorageAbi, simpleContractAddr)

  // The below two functions are of Lottery Contract 
    const handleSet = async () => {
    console.log('Simple contract',SimpleContract)
    const gas = '21212'
    const result = await SimpleContract.methods.set(10).send({from: account, gas})
    console.log('Result', result)
  }

  const handleGet = async () => {
    console.log('Simple contract', SimpleContract)
    const result =  SimpleContract.methods.get().call().then((res) => console.log(res)).catch((err) => console.log(err))
  }

  const onClick = () => {
    activate(injectedConnector)
  }


  return (
    <div>
      {chainId}
      <br />
      {account}
      <br />

      <h2> Simple storage </h2>
      <button  onClick={onClick} > Activate MM </button>
      <br />
      <button onClick={handleSet} >Set Value</button>
      <br />
      <button onClick={handleGet} >Get Value</button>

      <h2> Lottery Contract  </h2>
      {/* <button onClick={test} > Test </button> */}
    </div>
  )
}

function App() {
  return (
      <Web3ReactProvider getLibrary={getLibrary} >
         <Wallet />
      </Web3ReactProvider>
  );
}

export default App;
