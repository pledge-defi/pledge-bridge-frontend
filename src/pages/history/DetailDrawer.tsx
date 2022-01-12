import { DetailCoin, DrawerTitle } from '@/components/styleComponents';
import currencyInfos from '@/constants/currencyInfos';
import { Drawer, Progress, Steps } from 'antd';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
const { Step } = Steps;

const Title = styled.span`
  font-weight: 600;
  font-size: 20px;
  color: #262533;
`;

const StepDetail = styled.div`
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

type DetailDrawerProps = {
  title?: string;
};

const DetailDrawer = ({ title }: DetailDrawerProps) => {
  const [visible, setVisible] = useState<boolean>();

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 100);
  }, []);

  return (
    <Drawer
      title={<DrawerTitle>{title}</DrawerTitle>}
      placement="right"
      onClose={onClose}
      visible={visible}
      width={550}
      closable={false}
    >
      <Steps direction="vertical" size="small" current={1}>
        <Step
          title={
            <StepDetail>
              <DetailCoin>
                <img src={get(currencyInfos, ['BSC', 'chainImageAsset'])} alt="" height={'24px'} />
                BSC
              </DetailCoin>
              <div className="progress">
                <Progress
                  percent={100}
                  style={{ width: 280 }}
                  strokeColor={'#5D52FF'}
                  showInfo={false}
                />{' '}
                <span>1/1 Confrimed</span>
              </div>
              <a>Check the hash</a>
            </StepDetail>
          }
        />
        <Step
          title={
            <StepDetail>
              <DetailCoin>
                <img
                  src={get(currencyInfos, ['Ethereum', 'chainImageAsset'])}
                  alt=""
                  height={'24px'}
                />
                Ethereum
              </DetailCoin>
              <div className="progress">
                <Progress
                  percent={0}
                  style={{ width: 280 }}
                  strokeColor={'#5D52FF'}
                  showInfo={false}
                />{' '}
                <span>0/1 Confrimed</span>
              </div>
              <a>Check the hash</a>
            </StepDetail>
          }
        />
        <Step
          title={
            <StepDetail>
              <DetailCoin>
                <img src={require('@/assets/images/bridgeLogo.svg')} alt="" height={'24px'} />
                Pledge
              </DetailCoin>
              <div className="progress">
                <Progress
                  percent={100}
                  style={{ width: 280 }}
                  strokeColor={'#5D52FF'}
                  showInfo={false}
                />{' '}
                <span>1/1 Confrimed</span>
              </div>
              <a>Check the hash</a>
            </StepDetail>
          }
        />
        <Step
          title={
            <StepDetail>
              <Title>Finsh</Title>
              <div style={{ color: '#4F4E66', fontSize: 14 }}>
                PLGR is now deposited into the contract,please click withdraw to personal address
              </div>
            </StepDetail>
          }
        />
        <Step
          title={
            <StepDetail>
              <Title>Finsh</Title>
              <div>
                <div style={{ color: '#8B89A3' }}>Receiving</div>
                <div style={{ color: '#262533' }}>0x295e26495cef6f69dfa69911d9d8e4f3bbadb89b</div>
              </div>
            </StepDetail>
          }
        />
      </Steps>
    </Drawer>
  );
};

export default DetailDrawer;
