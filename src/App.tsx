import GlobalStyles from './styles/GlobalStyles';
import MainPage from './pages/MainPage';
import { TaskProvider } from './contexts/TaskContext';
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
