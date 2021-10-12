import React from 'react';
import { CsvReader } from './components/CsvReader/index';
import './App.scss';

export const App: React.FC = () => {
  return (
    <div className="App">
      <CsvReader />
    </div>
  );
};
