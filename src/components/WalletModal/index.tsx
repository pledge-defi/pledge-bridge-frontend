import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { walletModalOpen } from '@/model/global';
import { useRecoilState } from 'recoil';
import { ArrowLeft } from 'react-feather';
import styled from 'styled-components';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { SUPPORTED_WALLETS } from '../../constants/wallet';
import Option from './Option';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import type { AbstractConnector } from '@web3-react/abstract-connector';
import PendingView from './PendingView';
// import close from '@/assets/images/x.svg';

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;
// const CloseColor = styled(Close)`
//   path {
//     stroke: #C3C5CB;
//   }
// `

const Wrapper = styled.div`
  width: 100%;
`;
const UpperSection = styled.div`
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-weight: 400;
    font-size: 1rem;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`;
const HeaderRow = styled.div`
  padding: 1rem 1rem;
  font-weight: 500;
  padding-top: 0;
  font-size: 16px;
`;
const ContentWrapper = styled.div`
  padding: 0 1rem 1rem 1rem;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;
const OptionGrid = styled.div`
  display: grid;
  grid-gap: 10px;
`;
const HoverText = styled.div`
  text-decoration: none;
  color: ${({ theme }) => theme.text1};
  display: flex;
  align-items: center;

  :hover {
    cursor: pointer;
  }
`;
const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
  LEGAL: 'legal',
};
type WalletInfo = {
  connector: AbstractConnector;
  name: string;
  iconURL: string;
  description: string;
  href: string | null;
  color: string;
  primary?: true;
  mobile?: true;
  mobileOnly?: true;
};
export default function WalletModal({}: // pendingTransactions,
// confirmedTransactions,
// ENSName,
{
  // pendingTransactions: string[]; // hashes of pending
  // confirmedTransactions: string[]; // hashes of confirmed
  // ENSName?: string;
}) {
  const { activate, error, connector } = useWeb3React();
  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);
  // const setWalletModalOpen = useSetRecoilState(walletModalOpen);
  // const previousWalletView = usePrevious(walletView);

  const [pendingWallet, setPendingWallet] = useState<AbstractConnector | undefined>();

  const [pendingError, setPendingError] = useState<boolean>();

  // const walletOpen = useRecoilValue(walletModalOpen);
  const [walletOpen, setWallOpen] = useRecoilState(walletModalOpen);
  // const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = () => {
    setWallOpen(false);
  };
  // always reset to account view
  useEffect(() => {
    if (walletOpen) {
      setPendingError(false);
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [walletOpen]);
  // useEffect(() => {
  //   if (walletModalOpen && ((active && !activePrevious) || (connector && connector !== connectorPrevious && !error))) {
  //     setWalletView(WALLET_VIEWS.ACCOUNT)
  //   }
  // }, [setWalletView, active, error, connector, walletModalOpen, activePrevious, connectorPrevious])
  const tryActivation = async (connectors: AbstractConnector) => {
    if (connectors instanceof WalletConnectConnector && connectors.walletConnectProvider?.wc?.uri) {
      connectors.walletConnectProvider = undefined;
    }
    setPendingWallet(connectors);
    setWalletView(WALLET_VIEWS.PENDING);
    activate(connectors, undefined, true)
      .then(async () => {
        setWallOpen(false);
      })
      .catch((errors) => {
        if (errors instanceof UnsupportedChainIdError) {
          activate(connectors); // a little janky...can't use setError because the connector isn't set
        } else {
          setPendingError(true);
        }
      });
  };
  function handleActivate(option: WalletInfo) {
    if (option.connector === connector) {
      setWalletView(WALLET_VIEWS.ACCOUNT);
    } else {
      tryActivation(option.connector);
    }
  }
  function getOptions() {
    // const isMetamask = window.ethereum && window.ethereum.isMetaMask;
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key];
      // return rest of options
      return (
        !option.mobileOnly && (
          <Option
            id={`connect-${key}`}
            onClick={() => {
              handleActivate(option);
            }}
            key={key}
            color={option.color}
            link={option.href}
            header={option.name}
            subheader={null} //use option.descriptio to bring back multi-line
            icon={option.iconURL}
          />
        )
      );
    });
  }

  function getModalContent() {
    if (error) {
      return (
        <UpperSection>
          <CloseIcon onClick={handleCancel}>
            <img src={require('@/assets/images/x.svg')} alt="" style={{ cursor: 'pointer' }} />
          </CloseIcon>
          <HeaderRow>
            {error instanceof UnsupportedChainIdError ? (
              <div>Wrong Network</div>
            ) : (
              <div>Error connecting</div>
            )}
          </HeaderRow>
          <ContentWrapper>
            {error instanceof UnsupportedChainIdError ? (
              <h5>
                <div>
                  Please connect to a supported network in the dropdown menu or in your wallet.
                </div>
              </h5>
            ) : (
              <div>Error connecting. Try refreshing the page.</div>
            )}
          </ContentWrapper>
        </UpperSection>
      );
    }
    return (
      <UpperSection>
        <CloseIcon onClick={handleCancel}>
          <img src={require('@/assets/images/x.svg')} alt="" style={{ cursor: 'pointer' }} />
        </CloseIcon>
        {walletView !== WALLET_VIEWS.ACCOUNT ? ( //链接状态在padding之后失败，停留在连接错误再试一次页面，左上角连接钱包换成回退图标
          <HeaderRow color="blue">
            <HoverText
              onClick={() => {
                setPendingError(false);
                setWalletView(WALLET_VIEWS.ACCOUNT);
              }}
            >
              <ArrowLeft />
            </HoverText>
          </HeaderRow>
        ) : (
          <HeaderRow>
            <HoverText>Connect a wallet</HoverText>
          </HeaderRow>
        )}
        <ContentWrapper>
          {walletView === WALLET_VIEWS.PENDING ? (
            <PendingView
              connector={pendingWallet}
              error={pendingError}
              setPendingError={setPendingError}
              tryActivation={tryActivation}
            />
          ) : (
            <OptionGrid>{getOptions()}</OptionGrid>
          )}
        </ContentWrapper>
      </UpperSection>
    );
  }

  return (
    <>
      <Modal
        // title="Connect a wallet"
        visible={walletOpen}
        // onCancel={handleCancel}
        closable={false}
        footer={null}
        width={420}
      >
        <Wrapper>{getModalContent()}</Wrapper>
      </Modal>
    </>
  );
}
