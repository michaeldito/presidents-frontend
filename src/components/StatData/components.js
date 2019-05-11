import styled from 'styled-components';

export const CardValue = styled.div`
  font-family: sans-serif;
	color: black;
  font-size: 16px;
  text-align: center;
`;

export const StatTable = styled.table`
  border: 1px solid blue;
  border-radius: 1px;
  table-layout:fixed;
  width:100%;
`;

export const StatBody = styled.tbody`
`;

export const StatRow = styled.tr`
`;

export const StatCell = styled.td`
  border: 1px solid red;
  border-radius: 1px;
  text-align: center;

  & img {
    height: 30px;
    width: 20px;
  }
`;