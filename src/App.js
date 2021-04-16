import AuthProvider from './contexts/auth';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
