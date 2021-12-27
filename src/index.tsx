import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import { RecoilRoot } from 'recoil';

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 5000;
  return library;
}

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <RecoilRoot>
      <Routes />
    </RecoilRoot>
  </Web3ReactProvider>,
  document.getElementById('root'),
);
