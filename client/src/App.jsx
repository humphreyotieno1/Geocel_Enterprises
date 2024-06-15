import React from 'react';
import HomePage from './components/Home';
import NavBar from './components/NavBar';
import Product from './components/Product'
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';

export default function App() {
  return (
    <section className="section">
      <div>
        <NavBar />
        <HomePage />
        <Product />
        <Services />
        <About />
        <Contact />
      </div>
    </section>
  );
}