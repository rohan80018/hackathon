import NavBar from "./components/NavBar";
import { DataProvider } from "./context/DataContext";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import PrivateRoute from "./utils/PrivateRoute";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <div className="App">
      <Router>
        <DataProvider>
          <Routes>
            <Route exact path="/" element={<PrivateRoute> <HomePage /> </PrivateRoute>}/>
            <Route exact path="/login" element={<MainPage />}/>
          </Routes>
        </DataProvider>
      </Router>
    </div>
  );
}

export default App;
