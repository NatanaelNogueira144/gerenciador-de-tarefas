import LayoutHeader from '../LayoutHeader';
import { Container, Main } from "./styles";

interface LayoutProps {
    children: React.ReactNode;
    onAddTaskClick: () => void;
}

export default function Layout({ children, onAddTaskClick }: LayoutProps) {
    return (
        <Container>
            <LayoutHeader onAddTaskClick={onAddTaskClick} />
            <Main>{children}</Main>
        </Container>
    );
}