import styled from "styled-components";
export const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  /* Media query for mobile screens */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
