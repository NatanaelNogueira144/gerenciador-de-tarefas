import { ModalClose, ModalContent, ModalOverlay } from "./styles";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <ModalClose onClick={onClose}>
                    &times;
                </ModalClose>
                {children}
            </ModalContent>
        </ModalOverlay>
    );
}