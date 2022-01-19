import { DetailCoin } from '@/components/styleComponents';
import currencyInfos from '@/constants/currencyInfos';
import { txsHistory } from '@/services/pledge/api/txsHistory';
import { web3 } from '@/services/web3';
import { FORMAT_TIME_STANDARD } from '@/utils/constants';
import { divided_18, numeralStandardFormat_8 } from '@/utils/public';
import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table/interface.d';
import { capitalize, get } from 'lodash';
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

type StatusProps = {
  type: TransferredType;
  detailData: API.HistoryDetail;
  onClick: (v: StatusType) => void;
};

const Status = ({ type, detailData, onClick }: StatusProps) => {
  const [transactionStatus, setTranscationStatus] = useState<boolean>(false);
  const [bridgeStatus, setBridgeStatus] = useState<boolean>(false);

  const getStatus = async () => {
    const { bridgeHash, depositHash } = detailData;
    if (depositHash) {
      const transactionReceipt = await web3.eth.getTransactionReceipt(depositHash!);
      setTranscationStatus(transactionReceipt.status);
    }
    if (bridgeHash) {
      const transactionReceipt = await web3.eth.getTransactionReceipt(bridgeHash!);
      setBridgeStatus(transactionReceipt.status);
    }
  };

  const status = useMemo(() => {
    // console.log(type, detailData.srcChain, transactionStatus, bridgeStatus);
    if (type === 'deposit' && detailData.srcChain === 'BSC') {
      return transactionStatus && bridgeStatus;
    }
    return transactionStatus;
  }, [type, detailData.srcChain, transactionStatus, bridgeStatus]);

  useEffect(() => {
    getStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <a onClick={() => onClick({ transactionStatus, bridgeStatus, status })}>
      <StyleStatus status={status}>{status ? 'Compleate' : 'Processing'}</StyleStatus>
    </a>
  );
};

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

  const fetchData = async () => {
    setLoading(true);
    const response = await txsHistory(conditionData);
    setLoading(false);
    if (response) {
      setData(response.data || {});
    }
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

  const columns: ColumnsType<API.HistoryDetail> = [
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
      render: (t) => moment(+t).format(FORMAT_TIME_STANDARD),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (t, r) => {
        return <Status type={type} detailData={r} onClick={(v) => handleClickShowDetail(r, v)} />;
      },
    },
  ];

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conditionData]);

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
          dataSource={rows}
          columns={columns}
          rowClassName="history-row"
        />
      </TableWapper>
    </>
  );
};

export default History;
