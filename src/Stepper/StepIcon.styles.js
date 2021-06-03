import styled from 'styled-components/native';
export const StepContainer = styled.View `
  flex: ${({ isLastStep }) => (!isLastStep ? 1 : 0)};
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;
export const StepIconWrapper = styled.View `
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
export const LineWrapper = styled.View `
  flex: 1;
  margin: 0 6px;
`;
