import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Main from "./pages/main/Main";
import Header from "./components/commons/Header";
import Footer from "./components/commons/Footer";
import SearchPage from "./pages/search/SearchPage";
import CalendarMain from "./pages/calender/CalenderMain";
import ActorDetail from "./pages/search/ActorDetail";
import PlayDetail from "./pages/search/PlayDetail";
import ReportPage from "./pages/report/ReportPage";
import { useEffect } from "react";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    alert("잘못된 접근입니다. 메인 페이지로 이동합니다! ↩️");
    navigate("/", { replace: true });
  }, [navigate]);

  return null;
};

const UnderConstruction = () => {
  const navigate = useNavigate();

  useEffect(() => {
    alert("해당 기능은 아직 준비 중입니다! 메인 페이지로 이동합니다. 🎬");
    navigate("/", { replace: true });
  }, [navigate]);

  return null;
};

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
          <Route path="/report" element={<ReportPage />} />

          <Route path="/trade" element={<UnderConstruction />} />
          <Route path="/seeya" element={<UnderConstruction />} />
          <Route path="/ticketing-practice" element={<UnderConstruction />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
