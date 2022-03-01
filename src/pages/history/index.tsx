import { DetailCoin } from '@/components/styleComponents';
import chainInfos from '@/constants/chainInfos';
import { txsHistory } from '@/services/pledge/api/txsHistory';
import { FORMAT_TIME_MOBILE, FORMAT_TIME_STANDARD } from '@/utils/constants';
import { divided_18, numeralStandardFormat_8 } from '@/utils/public';
import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table/interface.d';
import { capitalize, find, forEach, map, size } from 'lodash';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { css, useTheme } from 'styled-components';
import Web3 from 'web3';
import type { TransferredType } from '../typings';
import DetailDrawer from './DetailDrawer';

const TableWapper = styled.div`
  margin: 0 auto;
  max-width: 1150px;
  padding: 0 16px;
  .title {
    padding: 120px 0 48px 0;
    color: #262533;
    font-weight: 600;
    font-size: 36px;
    line-height: 58px;
  }
  ${({ theme }) =>
    theme.breakpointChecks.isMobile &&
    css`
      .title {
        padding: 30px 0 24px 0;
        font-weight: 600;
        font-size: 20px;
        line-height: 22px;
      }
      .ant-table-thead {
        display: none;
      }
      .history-row {
        height: 174px;
        border-radius: 10px !important;
      }
    `};
`;

const StyleStatus = styled.div<{ status: boolean }>`
  color: ${(props) => (props.status ? '#5D52FF' : '#FFA011')};
  ${({ theme }) =>
    theme.breakpointChecks.isMobile &&
    css`
      font-weight: 500;
      font-size: 12px;
    `};
`;

const StyledDetailCoinComponent = styled(DetailCoin)`
  ${({ theme }) =>
    theme.breakpointChecks.isMobile &&
    css`
      flex: 3;
      padding: 10px 16px;
      background: #f5f5fa;
      border-radius: 6px;
      font-weight: 500;
      font-size: 14px;
    `};
`;

const DetailCoinComponent = ({ chainName }: { chainName: string }) => {
  return (
    <StyledDetailCoinComponent style={{ fontWeight: 500 }}>
      <img
        src={
          find(chainInfos, {
            // 临时变量
            chainName,
          })?.chainImageAsset
        }
        alt=""
        height={'24px'}
      />
      {chainName}
    </StyledDetailCoinComponent>
  );
};

const LabelItem = styled.div<{ textAlign: 'right' | 'center' | 'left' }>`
  flex: 1;
  text-align: ${(props) => props.textAlign};
  .name {
    color: #8b89a3;
    font-size: 12px;
    line-height: 22px;
  }
  .value {
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
  }
`;

const StyledHisotryMobileCardItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .time {
    font-weight: 500;
    font-size: 12px;
  }
  .arrow {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    > img {
      width: 12px;
    }
  }
  > div {
    display: flex;
    justify-content: space-between;
  }
`;

const HisotryMobileCardItem = ({
  srcChain,
  destChain,
  asset,
  amount,
  timestamp,
  fee,
  status,
}: API.HistoryDetail & StatusType) => {
  return (
    <StyledHisotryMobileCardItem>
      <div>
        <div className="time">{moment.unix(+timestamp!).format(FORMAT_TIME_MOBILE)}</div>
        <StyleStatus status={!!status}>{!!status ? 'Complete' : 'Processing'}</StyleStatus>
      </div>
      <div>
        <DetailCoinComponent chainName={srcChain!} />
        <div className="arrow">
          <img src={require('@/assets/images/arrow_mobile.svg')} alt="" />
        </div>
        <DetailCoinComponent chainName={destChain!} />
      </div>
      <div>
        <LabelItem textAlign="left">
          <div className="name">Asset</div>
          <div className="value">{asset}</div>
        </LabelItem>
        <LabelItem textAlign="center">
          <div className="name">Amount</div>
          <div className="value">{numeralStandardFormat_8(divided_18(amount!))}</div>
        </LabelItem>
        <LabelItem textAlign="right">
          <div className="name">Fee</div>
          <div className="value">{numeralStandardFormat_8(fee)}</div>
        </LabelItem>
      </div>
    </StyledHisotryMobileCardItem>
  );
};

export type StatusType = { transactionStatus: boolean; bridgeStatus: boolean; status: boolean };

const initialPageSetting = {
  page: 1,
  pageSize: 5,
};

const History = () => {
  const [drawerElement, setDrawerElement] = useState<JSX.Element | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const { type, account } = useParams<{ type: TransferredType; account: string }>();
  const [conditionData, setConditionData] = useState<API.TxsHistoryRequest>({
    ...initialPageSetting,
    txType: type === 'deposit' ? 0 : 1,
    address: account,
  });
  const [{ count = 0, rows = [] }, setData] = useState<API.HistoryData>({});
  const [statusData, setStatusData] = useState<StatusType[]>();
  const theme = useTheme();

  const fetchStatus = async (data: API.HistoryDetail[] | undefined) => {
    setStatusData(undefined);
    if (size(data)) {
      const promiseAllArray: Promise<StatusType>[] = [];
      forEach(data, (d) => {
        const p = new Promise<StatusType>(async (resolve) => {
          const { bridgeHash, depositHash, srcChain } = d;
          const web3Url = find(chainInfos, {
            // 临时变量
            chainName: srcChain,
          })?.web3Url;
          const bridgeStatus = !!bridgeHash;
          let transactionStatus = false;
          if (depositHash) {
            const transactionReceipt = await new Web3(web3Url!).eth.getTransactionReceipt(
              depositHash!,
            );
            transactionStatus = !!transactionReceipt?.status;
          }
          const status =
            type === 'deposit' && (d.srcChain === 'BSC' || d.srcChain === 'BSC-testnet')
              ? transactionStatus && bridgeStatus
              : transactionStatus;

          resolve({
            transactionStatus,
            bridgeStatus,
            status,
          });
        });
        promiseAllArray.push(p);
      });
      setLoading(true);
      const res = await Promise.all(promiseAllArray);
      setLoading(false);
      setStatusData(res);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const response = await txsHistory(conditionData);
    setLoading(false);
    if (response) {
      setData(response.data || {});
    }
    fetchStatus(response.data?.rows);
  };

  const handleChange = ({ current, pageSize }: TablePaginationConfig) => {
    setConditionData({ ...conditionData, page: current, pageSize });
  };

  const handleClickShowDetail = (r: API.HistoryDetail, v: StatusType) => {
    setDrawerElement(
      <DetailDrawer
        key={new Date().getTime().toString()}
        type={type}
        detailData={r}
        statusType={v}
        account={account}
      />,
    );
  };

  const columns: ColumnsType<API.HistoryDetail & StatusType> = useMemo(() => {
    if (theme.breakpointChecks.isMobile) {
      return [
        {
          title: 'Source Chain',
          dataIndex: 'srcChain',
          render: (t, r) => {
            return <HisotryMobileCardItem {...r} />;
          },
        },
      ];
    }
    return [
      {
        title: 'Source Chain',
        dataIndex: 'srcChain',
        render: (t: 'BSC' | 'ETH') => {
          return <DetailCoinComponent chainName={t} />;
        },
      },
      {
        title: 'Destination Chain',
        dataIndex: 'destChain',
        render: (t) => {
          return <DetailCoinComponent chainName={t} />;
        },
      },
      {
        title: 'Assets',
        dataIndex: 'asset',
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        render: (t) => numeralStandardFormat_8(divided_18(t)),
      },
      {
        title: 'Fee',
        dataIndex: 'fee',
        render: (t) => {
          return numeralStandardFormat_8(t);
        },
      },
      {
        title: 'Time',
        dataIndex: 'timestamp',
        render: (t) => moment.unix(+t).format(FORMAT_TIME_STANDARD),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        render: (t, r) => {
          return (
            <StyleStatus status={!!r.status}>{!!r.status ? 'Complete' : 'Processing'}</StyleStatus>
          );
        },
      },
    ];
  }, [theme.breakpointChecks.isMobile]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conditionData]);

  const dataSource: (API.HistoryDetail & StatusType)[] = useMemo(() => {
    if (size(statusData)) {
      return map(rows, (r, index) => ({
        ...r,
        ...statusData?.[index],
      }));
    }
    return rows;
  }, [rows, statusData]);

  return (
    <>
      {drawerElement}
      <TableWapper>
        <div className="title">{capitalize(type)} History</div>
        <Table
          loading={loading}
          onChange={handleChange}
          pagination={{
            total: count,
            pageSize: conditionData.pageSize,
            current: conditionData.page,
          }}
          dataSource={dataSource}
          columns={columns}
          onRow={(r) => {
            const { transactionStatus, bridgeStatus, status, ...detail } = r;
            return {
              onClick: () => {
                handleClickShowDetail(detail, { transactionStatus, bridgeStatus, status });
              }, // 点击行
            };
          }}
          rowClassName="history-row"
        />
      </TableWapper>
    </>
  );
};

export default History;
