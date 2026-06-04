import styled, { keyframes } from "styled-components";

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0; 
    left: 0;
    width: 100vw; 
    height: 100vh;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
`;

export const ModalContent = styled.div`
    background: #222;
    border-radius: 8px;
    position: relative;
    min-width: 320px;
    max-width: 90vw;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 8px 24px rgba(0,0,0,0.23);
    animation: fadeIn 0.2s;

    @media (min-width: 993px) {
        width: 90vw;
    }

    @media (max-width: 992px) {
        width: 650px;
    }

    @media (max-width: 768px) {
        width: 500px;
    }
`;

keyframes`
    fadeIn {
        from { transform: translateY(32px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;

export const ModalClose = styled.button`
    position: absolute;
    top: 10px; 
    right: 16px;
    background: transparent;
    border: none;
    font-size: 2rem;
    color: #FFF;
    cursor: pointer;

    &:hover {
        color: #9900ff;
    }
`;