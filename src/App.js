import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/home";
import tests from "./pages/tests";
import "react-toastify/dist/ReactToastify.css";
import TestDetailPage from "./pages/testDetailPage";
import StartTestPage from "./pages/startTestPage";


function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          Component={Homepage}
        />
        <Route
          path="/test/:testId"
          Component={TestDetailPage}
        />
        <Route
          path="/test/:testId/start"
          Component={StartTestPage}
        />
        <Route
          path="/tests"
          Component={tests}
        />
      </Routes>
    </div>
  );
}

export default App;
