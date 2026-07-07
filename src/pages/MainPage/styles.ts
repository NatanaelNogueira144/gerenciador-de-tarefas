import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 20px;
`;

export const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

interface FilterButtonProps {
  $isactive: boolean;
}

export const FilterButton = styled.button<FilterButtonProps>`
  padding: 10px;
  font-size: 1.5rem;
  font-weight: 600;
  border-radius: 10px;;
  background-color: ${props => props.$isactive ? '#9900ff' : '#656565'}; 
  color: #FFFFFF;
  transition: background 0.3s;

  &:hover {
    background-color: #9900ff;
  }
`;

export const TasksContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export const NoTaskMessageArea = styled.div`
  display: flex;
  height: 100%;
  font-size: 1.2rem;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

export const TasksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 15px;
  width: 100%;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;