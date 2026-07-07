import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0px 32px;
`;

export const FormTitle = styled.h1`
  padding: 20px 0px;
`;

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 15px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

export const FormLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const InputLabel = styled.label`
  color: #fff;
  font-weight: 600;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  outline: none;
  border: 1px solid gray;
  background-color: #555;
  color: #FFF;
  font-size: 1rem;

  &::placeholder {
    color: #FFF;
    opacity: 0.5;
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  outline: none;
  border: 1px solid gray;
  background-color: #555;
  color: #FFF;
  font-size: 1rem;
  
  &::placeholder {
    color: #FFF;
    opacity: 0.5;
  }
`;

export const DatesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 15px;
`;

export const FormRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const FormRightContainerHeader = styled.div`
  position: sticky;
  top: 0;
  background-color: #222;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  padding: 10px 0px;
  z-index: 1;
`;

export const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: #FFF;
`;

export const AddItemButton = styled.button`
  padding: 7px;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 10px;;
  background-color: #9900FF;
  color: #FFFFFF;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;

export const ChecklistContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ChecklistItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const ChecklistButton = styled.button`
  background-color: #454545;
  padding: 1.5px 9px;
  border-radius: 7px;
  font-size: 2rem;
  color: #FF3A3A;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;

export const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  position: sticky;
  bottom: 0;
  background-color: #222;
  padding: 20px 0px;
`;

export const SubmitButton = styled.button`
  padding: 10px;
  font-size: 1.5rem;
  font-weight: 600;
  border-radius: 10px;;
  background-color: #9900FF;
  color: #FFFFFF;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;