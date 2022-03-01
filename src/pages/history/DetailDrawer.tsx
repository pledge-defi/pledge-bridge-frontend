import { DetailCoin, DrawerTitle } from '@/components/styleComponents';
import CloseIcon from '@/components/Svg/CloseIcon';
import chainInfos from '@/constants/chainInfos';
import { Drawer, Progress, Steps } from 'antd';
import { find, get } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import type { StatusType } from '.';
import type { TransferredType } from '../typings';

const { Step } = Steps;

const Title = styled.span`
  font-weight: 600;
  font-size: 20px;
  color: #262533;
`;

const StyleStepDetail = styled.div`
  padding: 0 10px;
  padding-bottom: 50px;
  .progress {
    > span {
      padding-left: 32px;
      color: #4f4e66;
      font-size: 14px;
    }
  }
  > a {
    margin: 10px 0 50px 0;
  }
`;

type StepDetailProps = {
  chainName?: 'BSC' | 'ETH' | string;
  hash?: string;
  status: boolean;
};

const StepDetail = ({ chainName, hash, status }: StepDetailProps) => {
  const netWorkInfo = find(chainInfos, { chainName })?.netWorkInfo;
  const blockExplorerUrls = get(netWorkInfo, ['blockExplorerUrls', 0]);
  const preUrl = `${blockExplorerUrls}/tx/`;

  return (
    <StyleStepDetail>
      <DetailCoin>
        <img src={find(chainInfos, { chainName })?.chainImageAsset} alt="" height={'24px'} />
        {chainName}
      </DetailCoin>
      <div className="progress">
        <Progress
          percent={status ? 100 : 0}
          style={{ width: 280 }}
          strokeColor={'#5D52FF'}
          showInfo={false}
        />{' '}
        <span>{status ? 1 : 0}/1 Confrimed</span>
      </div>
      <a href={`${preUrl}${hash}`} target={'_blank'}>
        Check the hash
      </a>
    </StyleStepDetail>
  );
};

type DetailDrawerProps = {
  type: TransferredType;
  detailData: API.HistoryDetail;
  statusType: StatusType;
  account: string;
};

const DetailDrawer = ({ type, detailData, statusType, account }: DetailDrawerProps) => {
  const [visible, setVisible] = useState<boolean>();
  const theme = useTheme();

  const onClose = () => {
    setVisible(false);
  };

  const getStep = () => {
    const bridgeStatus = statusType.bridgeStatus;
    const steps = [
      <Step
        title={
          <StepDetail
            status={statusType.transactionStatus}
            chainName={detailData.srcChain}
            hash={detailData.depositHash}
          />
        }
      />,
      <Step
        title={
          <StyleStepDetail>
            <DetailCoin>
              <img src={require('@/assets/images/logo.svg')} alt="" height={'24px'} />
              Pledge
            </DetailCoin>
            <div className="progress">
              <Progress
                percent={bridgeStatus ? 100 : 0}
                style={{ width: 280 }}
                strokeColor={'#5D52FF'}
                showInfo={false}
              />{' '}
              <span>{bridgeStatus ? 1 : 0}/1 Confrimed</span>
            </div>
          </StyleStepDetail>
        }
      />,
    ];
    return type === 'deposit' ? steps : steps.reverse();
  };

  const stepCurrent = useMemo(() => {
    if (statusType.status) {
      return 3;
    }
    if (statusType.transactionStatus) {
      return type === 'deposit' ? 1 : 0;
    }
    return type === 'deposit' ? 0 : 1;
  }, [statusType, type]);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 100);
  }, []);

  return (
    <Drawer
      title={
        <DrawerTitle>
          Detail
          <a onClick={onClose}>
            <CloseIcon fill={theme.breakpointChecks.isMobile ? '#5D52FF' : '#fff'} />
          </a>
        </DrawerTitle>
      }
      placement="right"
      onClose={onClose}
      visible={visible}
      width={theme.breakpointChecks.isMobile ? '100%' : 550}
      closable={false}
      maskClosable={false}
    >
      <Steps
        direction="vertical"
        size="small"
        current={stepCurrent}
        status={statusType.status ? 'finish' : 'process'}
      >
        {getStep()}
        {type === 'deposit' ? (
          <Step
            title={
              <StyleStepDetail>
                <Title>Finsh</Title>
                <div style={{ color: '#4F4E66', fontSize: 14 }}>
                  {detailData.srcChain === 'BSC' || detailData.srcChain === 'BSC-testnet'
                    ? 'PLGR'
                    : 'MPLGR'}{' '}
                  is now deposited into the contract,please click withdraw to personal address
                </div>
              </StyleStepDetail>
            }
          />
        ) : (
          <Step
            title={
              <StyleStepDetail>
                <Title>Finsh</Title>
                <div>
                  <div style={{ color: '#8B89A3' }}>Receiving</div>
                  <div style={{ color: '#262533' }}>{account}</div>
                </div>
              </StyleStepDetail>
            }
          />
        )}
      </Steps>
    </Drawer>
  );
};

export default DetailDrawer;
