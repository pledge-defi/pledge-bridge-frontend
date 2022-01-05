import ChainBridge from '@/constants/ChainBridge';
import services from '@/services';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import type { InjectedConnector } from '@web3-react/injected-connector';
import { Dropdown, Menu, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { injected } from './connector';
import { useEagerConnect, useInactiveListener } from './WalletHooks';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const WalletConnectWapper = styled.div`
  margin-left: 24px;
  background-color: #fff !important;
  padding: 0 20px 0 10px !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const WalletInfo = styled.div`
  width: 160px;
  padding: 3px 8px;
  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 5px 0;
    > div {
      font-weight: 600;
      font-size: 16px;
    }
    *:first-child {
      padding-right: 10px;
    }
  }
`;
const WalletConnected = styled.div``;
const WalletConnecting = styled.div``;
const WalletNoConnected = styled.div``;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IConnectWallet {}

const ConnectWallet: React.FC<IConnectWallet> = () => {
  const triedEager = useEagerConnect();
  const { connector, chainId, account, activate, deactivate, error } = useWeb3React();
  const [activatingConnector, setActivatingConnector] = useState<InjectedConnector>();

  async function activatingConnectorFn() {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    } else {
      if (error instanceof UnsupportedChainIdError) {
        const fraNetworkDefault = ChainBridge.chains
          .filter((item) => item.type === 'Ethereum')
          .find((item) => item.networkId === 525);
        try {
          await services.evmServer.switchNetwork(fraNetworkDefault);
        } catch {
          notification.warning({
            message: error?.name,
            description: error?.message,
            top: 80,
          });
        }
      }
    }
  }

  useEffect(() => {
    activatingConnectorFn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activatingConnector, connector]);

  const activating = injected === activatingConnector;
  const connected = injected === connector;
  // const disabled = !triedEager || !!activatingConnector || !!error;
  const isDisconnect = !error && chainId;

  useInactiveListener(!triedEager || !!activatingConnector);

  function handleOnCLickConnectWallet() {
    if (!isDisconnect) {
      setActivatingConnector(injected);
      activate(injected);
    } else {
      deactivate();
    }
  }

  function ButtonSwitchComponent() {
    if (connected && isDisconnect) {
      return (
        <Dropdown
          overlay={
            <Menu>
              <WalletInfo>
                <div>
                  <img src={require('@/assets/images/meta-mask-border.svg')} alt="" />
                  <span>MetaMask</span>
                </div>
                <div>
                  <div>{`${account?.slice(0, 6)}···${account?.slice(-4)}`}</div>
                  <CopyToClipboard text={account!}>
                    <img
                      src={require('@/assets/images/copy-icon.svg')}
                      alt=""
                      style={{ cursor: 'pointer' }}
                    />
                  </CopyToClipboard>
                </div>
              </WalletInfo>
            </Menu>
          }
        >
          <WalletConnected onClick={handleOnCLickConnectWallet}>
            <img src={require('@/assets/images/meta-mask.svg')} alt="" />
            <span className="address">{`${account?.slice(0, 6)}···${account?.slice(-4)}`}</span>
          </WalletConnected>
        </Dropdown>
      );
    }
    if (activating) {
      return <WalletConnecting>CONNECTING</WalletConnecting>;
    }
    return (
      <WalletNoConnected onClick={handleOnCLickConnectWallet}>CONNECT WALLET</WalletNoConnected>
    );
  }
  return <WalletConnectWapper>{ButtonSwitchComponent()}</WalletConnectWapper>;
};

export default ConnectWallet;
