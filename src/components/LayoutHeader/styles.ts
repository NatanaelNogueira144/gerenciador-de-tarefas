import styled from "styled-components";

export const Container = styled.header`
    grid-area: header;
    display: flex;
    align-items: center;
    padding: 0px 15px;
    background-color: #2C2C2C;
    gap: 15px;
`;

export const LeftContainer = styled.div`
    display: flex;
    flex: 1;
    height: 100%;
    align-items: center;
    gap: 10px;
`;

export const Logo = styled.img`
    width: 50px;
	height: 50px;
`;

export const LogoTitle = styled.span`
    font-size: 1.5rem;
    font-weight: 600;
    color: #FFFFFF;
`;

export const RightContainer = styled.div``;

export const AddTaskButton = styled.button`
    padding: 10px;
    font-size: 1.5rem;
    font-weight: 600;
    border-radius: 10px;;
    background-color: #9900ff;
    color: #FFFFFF;
    transition: background 0.3s;

    &:hover {
        background-color: #9900ff;
    }
`;