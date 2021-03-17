import React from 'react';
import './App.css';
import AppRoutes from './routes';
import { SnackbarProvider } from 'notistack';
import PageLoader from './common/component/PageLoader/PageLoader';
import Notifier from './common/component/Notifier/Notifier';

function App() {
  return (
    <div className="App" style={{ minHeight: '100vh', background: '#f2f2f2' }}>
      <SnackbarProvider max={1}>
        <Notifier />
        <AppRoutes />
      </SnackbarProvider>
      <PageLoader />
    </div>
  );
}

export default App;