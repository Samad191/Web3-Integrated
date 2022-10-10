import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import Web3 from 'web3'
import {Web3ReactProvider} from '@web3-react/core'
import {UI} from './UI'

export const getLibrary = (provider) => {
  return new Web3(provider)
}

function App() { 
  return (
  <Web3ReactProvider 
            getLibrary={getLibrary}
        >
            <UI />
        </Web3ReactProvider > 
       
  );
}

export default App;
