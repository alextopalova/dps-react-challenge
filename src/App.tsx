import './App.css';
import LocalityForm from '@/components/LocalityForm.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<LocalityForm />
		</QueryClientProvider>
	);
}

export default App;
