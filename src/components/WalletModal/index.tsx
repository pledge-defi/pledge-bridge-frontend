import React from 'react';
import { Modal } from 'antd';
import { walletModalOpen } from '@/model/global';
import { useRecoilState } from 'recoil';
import styled from 'styled-components/macro';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { SUPPORTED_WALLETS } from '../../constants/wallet';
import Option from './Option';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import type { AbstractConnector } from '@web3-react/abstract-connector';
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
// const WALLET_VIEWS = {
//   OPTIONS: 'options',
//   OPTIONS_SECONDARY: 'options_secondary',
//   ACCOUNT: 'account',
//   PENDING: 'pending',
//   LEGAL: 'legal',
// };
export default function WalletModal({}: // pendingTransactions,
// confirmedTransactions,
// ENSName,
{
  // pendingTransactions: string[]; // hashes of pending
  // confirmedTransactions: string[]; // hashes of confirmed
  // ENSName?: string;
}) {
  const { activate, error } = useWeb3React();
  // const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);
  // const setWalletModalOpen = useSetRecoilState(walletModalOpen);
  // const previousWalletView = usePrevious(walletView);

  // const [pendingWallet, setPendingWallet] = useState<AbstractConnector | undefined>();

  // const [pendingError, setPendingError] = useState<boolean>();

  // const walletOpen = useRecoilValue(walletModalOpen);
  const [walletOpen, setWallOpen] = useRecoilState(walletModalOpen);
  // const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = () => {
    setWallOpen(false);
  };
  const tryActivation = async (connector: AbstractConnector | undefined) => {
    if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined;
    }

    activate(connector, undefined, true)
      .then(async () => {
        setWallOpen(false);
      })
      .catch((errors) => {
        if (errors instanceof UnsupportedChainIdError) {
          activate(connector); // a little janky...can't use setError because the connector isn't set
        } else {
          // setPendingError(true)
        }
      });
  };
  function getOptions() {
    // const isMetamask = window.ethereum && window.ethereum.isMetaMask;
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      console.log(key);
      const option = SUPPORTED_WALLETS[key];
      console.log(option);
      // return rest of options
      return (
        !option.mobileOnly && (
          <Option
            id={`connect-${key}`}
            onClick={() => {
              tryActivation(option.connector);
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
          {/* <CloseIcon onClick={toggleWalletModal}><CloseColor /></CloseIcon> */}
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
        <ContentWrapper>
          <OptionGrid>{getOptions()}</OptionGrid>
        </ContentWrapper>
      </UpperSection>
    );
  }

  return (
    <>
      <Modal
        title="Connect a wallet"
        visible={walletOpen}
        onCancel={handleCancel}
        closable={true}
        footer={null}
        width={420}
      >
        <Wrapper>{getModalContent()}</Wrapper>
      </Modal>
    </>
  );
}
