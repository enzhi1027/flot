import { Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/main/Main";
import Header from "./components/commons/Header";
import Footer from "./components/commons/Footer";
import SearchPage from "./pages/search/SearchPage";
import CalendarMain from "./pages/calender/CalenderMain";
import ActorDetail from "./pages/search/ActorDetail";
import PlayDetail from "./pages/search/PlayDetail";

function App() {
  return (
    <div className="wrap">
      <Header />
      <div className="main">
        <Routes>
          {/* <Route path="/" element={token ? <Main_login /> : <Main />} /> */}
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/calendar" element={<CalendarMain />} />
          <Route path="/search/actors/:actorName" element={<ActorDetail />} />
          <Route
            path="/search/plays/:playName/:season"
            element={<PlayDetail />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
