import styled from "styled-components";

export const StatCard = styled.div`
  background-color: ${({ color }) => color};
  width: 30%;
  height: 100px;
  border-radius: 8px;
  padding: 12px;

  & > h1 {
    font-size: xx-large;
    font-weight: bold;
  }
  & > h2 {
    font-size: larger;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    height: 120px;
    width: 100%;
    margin: 10px;
  }
`;

export const TopicCardStyle = styled.div`
  background-color: #ffffff;
  border-radius: 8;
  padding: 20px;
  margin: 10px;
`;
