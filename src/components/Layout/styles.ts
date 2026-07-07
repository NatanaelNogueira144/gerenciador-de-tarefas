import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-areas: 
    "header"
    "main";
  grid-template-rows: 70px;
  grid-template-columns: 1fr;
`;

export const Main = styled.aside`
  grid-area: main;
  background-color: #363636;
  padding: 20px;
`;