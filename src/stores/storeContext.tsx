import React, { createContext, useContext, ReactNode } from 'react';
import { DataStore } from './store';
import { Instance } from 'mobx-state-tree';

type DataStoreInstance = Instance<typeof DataStore>;

const StoreContext = createContext<DataStoreInstance | null>(null);
const store = DataStore.create();

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
