import { Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/main/Main";
import Header from "./components/commons/Header";
import Footer from "./components/commons/Footer";

function App() {
  return (
    <div className="wrap">
      <Header />
      <div className="main">
        <Routes>
          {/* <Route path="/" element={token ? <Main_login /> : <Main />} /> */}
          <Route path="/" element={<Main />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
