import React from 'react';
import HomePage from './components/Home';
import Product from './components/Product';

export default function App() {
  return (
    <section className="section">
      <div className="w-full h-screen flex max-lg:flex-col justify-between p-3 overflow-y-scroll">
        <HomePage />
      
      </div>
    </section>
  );
}