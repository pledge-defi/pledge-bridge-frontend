import styled from 'styled-components';

export const InputDiv = styled.div<{ disabled?: boolean }>`
  height: 44px;
  border: 1px solid #e6e6eb;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 10px 16px;
  background-color: ${(props) => (props.disabled ? '#F5F5FA' : 'unset')};
`;

export const Coin = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  > span {
    padding-left: 8px;
    font-weight: 600;
  }
`;

export const Balance = styled.div`
  font-size: 12px;
  line-height: 22px;
  color: #8b89a3;
  > span {
    color: #000;
  }
  padding: 10px 0 48px 0;
`;

export const Footer = styled.footer`
  height: 195px;
`;
