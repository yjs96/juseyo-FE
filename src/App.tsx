import Router from '@/router/Router';
import './App.css';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Router></Router>
      <Toaster
        toastOptions={{
          style: {
            color: '#1c1c1c',
            background: '#fdfdfd',
            marginTop: '8px',
            fontSize: '14px',
          },
        }}
      />
    </>
  );
}

export default App;
