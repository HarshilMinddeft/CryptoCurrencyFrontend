import "./App.css";
import { Routes, Route } from "react-router-dom";
import Exchanges from "./components/Exchanges";
import Currency from "./components/Currency";
import Header from "./components/Header";
import CoinsDetailes from "./components/CoinsDetailes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Exchanges />} />
      <Route path='/currency' element={<Currency/>} />
      <Route path ="currency/:id" element={<CoinsDetailes/>}/>
      <Route path="/header"  element={<Header/>}/>
    </Routes>
  );
}

export default App;
