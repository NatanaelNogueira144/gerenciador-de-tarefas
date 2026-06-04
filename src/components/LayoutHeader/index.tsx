import logoImage from '../../assets/logo.png';
import { AddTaskButton, Container, LeftContainer, Logo, LogoTitle, RightContainer } from "./styles";

interface LayoutHeaderProps {
    onAddTaskClick: () => void;
}

export default function LayoutHeader({ onAddTaskClick }: LayoutHeaderProps) {
    return (
        <Container>
            <LeftContainer>
                <Logo src={logoImage} alt="Logo" />
                <LogoTitle>Gerenciador de Tarefas</LogoTitle>
            </LeftContainer>
            <RightContainer>
                <AddTaskButton onClick={onAddTaskClick}>
                    Adicionar Tarefa
                </AddTaskButton>
            </RightContainer>
        </Container>
    );
}