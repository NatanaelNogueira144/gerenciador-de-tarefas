import styled from "styled-components";

export const InputCheckbox = styled.input`
  appearance: none;
  background-color: #444;
  min-width: 40px;
  min-height: 40px;
  width: 40px;
  height: 40px;
  border: 1px solid #888;
  border-radius: 2px;
  cursor: pointer;
  font-size: 2.1rem;
  line-height: 1.2;
  transition: opacity 0.3s;
  color: #FFF;
  
  &:hover {
    opacity: 0.7;
  }
  
  &:after {
    content: " ";
    display: inline-block;
    visibility: visible;
  }

  &:before {
    position: absolute;
    white-space: pre;
    width: 40px;
    height: 40px;
    content: " ";
    text-align: center;
  }

  &:checked {
    background-color: #9900FF;

    &:before {
      content: "✓";
    }
  }
`;