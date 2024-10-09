import MainPage from './pages/MainPage';
import React from 'react';
import { StoreProvider } from './stores/storeContext';

function App(): React.ReactElement {
  return (
    <StoreProvider>
      <MainPage />
    </StoreProvider>
  );
}

export default App;
