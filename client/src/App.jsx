import Product from "./components/Product";
import NavBar from "./components/NavBar";
import HomePage from "./components/Home";


export default function App() {
  return (
    <section className="section">
      <div className="w-full h-screen flex max-lg:flex-col justify-between p-3 overflow-y-scroll">
        <HomePage />
        <Product />
      </div>
    </section>
  );
}