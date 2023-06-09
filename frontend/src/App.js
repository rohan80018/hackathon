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
import CreatePage from "./components/Create";
import HackathonDetail from "./components/HackathonDetail";
import SubDetail from "./components/SubDetail";

function App() {
  return (
    <div className="App">
      <Router>
        <DataProvider>
          <Routes>
            <Route exact path="events" element={<PrivateRoute> <HomePage /> </PrivateRoute>}>
              {/* <Route path='new_event' element={<CreatePage />}/> */}

            </Route>
            <Route exact path="/events/:eventId/" element={<HackathonDetail />} />
            <Route exact path="/login" element={<MainPage />}/>
            <Route exact path="/events/new_event" element={<CreatePage />}/>
            <Route exact path="/events/:eventId/edit/" element={<CreatePage type="edit"/>}/>
            <Route exact path="/events/:eventId/:userId/:subId/" element={<SubDetail />}/>
            <Route exact path="/submission/:userId/:subId/" element={<SubDetail />}/>
          </Routes>
        </DataProvider>
      </Router>
    </div>
  );
}

export default App;
