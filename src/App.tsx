import './index.css';
import GlobalStyles from './styles/GlobalStyles';
import MainPage from './pages/MainPage';
import { TaskProvider } from './data/contexts/TaskContext';
import { useEffect } from 'react';

export default function App() {
	useEffect(() => {
		document.title = 'Gerenciador de Tarefas';
	}, []);
	
	return (
		<TaskProvider>
			<GlobalStyles />
			<MainPage />
		</TaskProvider>
	);
}
