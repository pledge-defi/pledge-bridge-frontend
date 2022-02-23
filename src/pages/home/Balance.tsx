import { balanceState, chainInfoKeyState, chainInfoState } from '@/model/global';
import { numeralStandardFormat_4 } from '@/utils/public';
import { get } from 'lodash';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const StyleBalance = styled.div`
  font-size: 12px;
  line-height: 22px;
  color: #8b89a3;
  > span {
    color: #000;
  }
  padding: 10px 0 24px 0;
`;

const Balance = () => {
  const balance = useRecoilValue(balanceState);
  const chainInfoKey = useRecoilValue(chainInfoKeyState);
  const chainInfo = useRecoilValue(chainInfoState);

  return (
    <StyleBalance>
      Balance:{' '}
      <span>
        {numeralStandardFormat_4(get(balance, [chainInfoKey]))} {chainInfo.currencyName}
      </span>
    </StyleBalance>
  );
};

export default Balance;
