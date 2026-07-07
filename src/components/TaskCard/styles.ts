import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  padding: 15px;
  border-radius: 20px;
  background-color: #444;
  color: #FFFFFF;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

export const LeftContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

export const DeleteButton = styled.button`
  background-color: #363636;
  width: 100%;
  padding: 1.5px 9px;
  border-radius: 7px;
  font-size: 2rem;
  color: #FF3A3A;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;

export const TaskContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  color: #FFFFFF;
  transition: opacity 0.3s;
  height: 100%;

  &:hover {
    opacity: 0.7;
  }
`;

export const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
`;

export const Paragraph = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  text-align: justify;
  margin: 0;
`;

export const ProgressBar = styled.div`
  grid-area: progress;
  width: 100%;
  background-color: #555;
  cursor: pointer;
`;

interface ProgressBarFillProps {
  $width: number;
}

export const ProgressBarFill = styled.div.attrs<ProgressBarFillProps>(props => ({
  style: {
    width: `${props.$width < 0 ? 0 : (props.$width > 100 ? 100 : props.$width)}%`
  }
}))`
  background-color: #7CB518;
  height: 5px;
`;