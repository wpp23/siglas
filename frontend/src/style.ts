import styled from "styled-components";
import { below } from "../../util/breakpoints";

export const Container = styled.div`
  width: 100%;

  max-width: 1400px;
  /* text-align: center; */
  margin: 0 auto;
  padding: 0 15px;

  ${below.small`
    padding: 0 7px;
  `}
`;

export const SpaceDivider = styled.div.attrs(() => ({
  children: null,
}))`
  margin-bottom: 100px;

  ${below.medium`
    margin-bottom: 65px;
  `}
`;

export const TitleDiv = styled.div`
  text-align: center;
  padding: 0 15px;

  ${below.medium`
    margin: 20px 0;
  `}
`;

export const TitleBackground = styled.div`
  width: 100%;
  min-height: 400px;

  padding: 50px 0;
  padding-top: 30px;

  margin-bottom: -128px;

  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #003f70 9.86%, #0a80dc 120.79%);
  /* Texto */
  word-wrap: break-word;
  color: white;

  ${below.small`
    min-height: 381px;
  `}
`;

export const Title = styled.div`
  color: white;
  font-size: 37.8px;
  font-weight: 600;

  ${below.small`
    font-size: 28.5px;
  `}
`;

export const SubTitle = styled.div`
  color: white;
  font-size: 18px;
  font-weight: 500;

  ${below.small`
    font-size: 13.5px;
  `}
`;

export const ListaModulosWrapper = styled.div`
  width: 100%;
  border-radius: 20px;
  padding: 0 20px;
  background: rgba(243, 243, 243, 1);

  ${below.small`
    padding: 0 5px;
  `}
`;

export const NotificationWrapper = styled.div`
  display: flex;
  flex-direction: row;

  gap: 24px;

  ${below.medium`
    flex-direction: column;
    align-items: center;
  `}
`;

export const TopModulosWrapper = styled.div`
  background-color: #f3f3f3;

  margin: 0 auto;
  margin-bottom: 80px;

  ${below.small`
    margin-bottom: 65px;
  `}
`;

export const Logo = styled.img`
  width: 335px;

  ${below.medium`
    width: 290px;
  `}

  ${below.small`
    width: 250px;
  `}
`;
