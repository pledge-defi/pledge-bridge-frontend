import styled from 'styled-components';

export const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FlexColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`;

export const FormWapper = styled.div`
  width: 552px;
  background: #ffffff;
  border: 1px solid #e6e6eb;
  box-sizing: border-box;
  border-radius: 20px;
  padding: 0 40px 40px;
  margin: 0 auto;
  margin-top: 28px;
`;

export const Label = styled.div`
  font-family: Poppins;
  font-size: 14px;
  line-height: 22px;
  color: #8b89a3;
  padding: 24px 0 10px 0;
`;

export const NormalFlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TransformerItem = styled.div`
  width: 210;
  width: 210px;
  height: 92px;
  background: #f5f5fa;
  border-radius: 10px;
  padding: 26px 16px;
  justify-content: flex-start;
  display: flex;
  align-items: center;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 8px;
    > div {
      font-weight: bold;
      font-size: 20px;
      line-height: 30px;
    }
    > span {
      color: #4f4e66;
      font-weight: 300;
    }
  }
`;

export const Key = styled.div`
  font-size: 14px;
  color: #8b89a3;
`;

export const GreyBackgroundDiv = styled.div<{ height?: string }>`
  height: ${(props) => (props.height ? props.height : '44px')};
  box-sizing: border-box;
  border-radius: 10px;
  padding: 10px 16px;
  background: #f5f5fa;
`;

export const InputDiv = styled.div<{ disabled?: boolean }>`
  height: 44px;
  border: 1px solid #e6e6eb;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 10px 16px;
  background-color: ${(props) => (props.disabled ? '#F5F5FA' : 'unset')};
`;

export const SelectInput = styled(InputDiv)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Coin = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: #262533 !important;
  > span {
    padding-left: 8px;
    font-weight: 600;
  }
`;

export const Footer = styled.footer`
  height: 195px;
`;

export const FontWeightBoldDiv = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: #262533;
`;

export const DrawerTitle = styled.div`
  font-weight: 600;
  font-size: 36px;
  color: #262533;
  padding-top: 100px;
`;

export const DetailCoin = styled(Coin)`
  justify-content: flex-start;
  font-weight: 600;
  font-size: 20px;
  > img {
    margin-right: 8px;
  }
`;

export const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  min-width: 120px;
  padding: 8px 20px;
  color: #5d52ff;
  background: rgba(93, 82, 255, 0.1);
  border: 1px solid #5d52ff;
  border-radius: 21px;
  cursor: pointer;
`;

export const AlertText = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: #8b89a3;
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  > img {
    padding: 0px 5px 20px 0;
  }
`;

export const FormHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid #e6e6eb;
  display: flex;
  justify-content: space-between;
  height: 72px;
  font-weight: 500;
  > span {
    font-size: 20px;
  }
  > div {
    display: flex;
    justify-content: space-between;
    width: 70px;
    font-size: 16px;
  }
`;
