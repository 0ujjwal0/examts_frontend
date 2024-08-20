import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/home";
import "react-toastify/dist/ReactToastify.css";
import TestDetailPage from "./pages/testDetailPage";
import Thankyou from "./pages/thankyou";
import NavMain from "./components/navmain";
import StartTest from "./pages/startTestPage";
import TestsPage from "./pages/tests";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              
              <Homepage />
            </>
          }
        />
        <Route
          path="/test/:testId"
          element={
            <>
              <NavMain />
              <TestDetailPage />
            </>
          }
        />
        <Route
          path="/test/:testId/start"
          element={<StartTest />}
        />
        <Route
          path="/thankpage"
          element={
            <>
              <NavMain />
              <Thankyou />
            </>
          }
        />
        <Route
          path="/tests"
          element={
            <>
              <NavMain />
              <TestsPage />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
