import { DetailCoin } from '@/components/styleComponents';
import currencyInfos from '@/constants/currencyInfos';
import { txsHistory } from '@/services/pledge/api/txsHistory';
import { FORMAT_TIME_STANDARD } from '@/utils/constants';
import { divided_18, numeralStandardFormat_8 } from '@/utils/public';
import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table/interface.d';
import { capitalize, forEach, get, map, size } from 'lodash';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import type { TransferredType } from '../typings';
import DetailDrawer from './DetailDrawer';

const TableWapper = styled.div`
  margin: 0 auto;
  width: 1200px;
  .title {
    padding: 120px 0 48px 0;
    color: #262533;
    font-weight: 600;
    font-size: 36px;
    line-height: 58px;
  }
`;

const StyleStatus = styled.div<{ status: boolean }>`
  color: ${(props) => (props.status ? '#5D52FF' : '#FFA011')};
`;

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

  const fetchStatus = async (data: API.HistoryDetail[] | undefined) => {
    setStatusData(undefined);
    if (size(data)) {
      const promiseAllArray: Promise<StatusType>[] = [];
      forEach(data, (d) => {
        const p = new Promise<StatusType>(async (resolve) => {
          const { bridgeHash, depositHash, srcChain } = d;
          const web3 = get(currencyInfos, [srcChain === 'BSC' ? srcChain : 'Ethereum', 'web3']);
          const bridgeStatus = !!bridgeHash;
          let transactionStatus = false;
          if (depositHash) {
            const transactionReceipt = await web3.eth.getTransactionReceipt(depositHash!);
            transactionStatus = transactionReceipt.status;
          }
          const status =
            type === 'deposit' && d.srcChain === 'BSC'
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

  const columns: ColumnsType<API.HistoryDetail & StatusType> = [
    {
      title: 'Source Chain',
      dataIndex: 'srcChain',
      render: (t: 'BSC' | 'ETH') => {
        return (
          <DetailCoin style={{ fontWeight: 500 }}>
            <img
              src={get(currencyInfos, [t === 'ETH' ? 'Ethereum' : t, 'chainImageAsset'])}
              alt=""
              height={'24px'}
            />
            {t === 'ETH' ? 'Ethereum' : t}
          </DetailCoin>
        );
      },
    },
    {
      title: 'Destination Chain',
      dataIndex: 'destChain',
      render: (t) => {
        return (
          <DetailCoin style={{ fontWeight: 500 }}>
            <img
              src={get(currencyInfos, [t === 'ETH' ? 'Ethereum' : t, 'chainImageAsset'])}
              alt=""
              height={'24px'}
            />
            {t === 'ETH' ? 'Ethereum' : t}
          </DetailCoin>
        );
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
