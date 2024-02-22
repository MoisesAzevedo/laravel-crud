import "./App.css";
import Users from "./Pages/Users";
import RegisterPost from "./Pages/RegisterPost";
import UserPhoto from "./Pages/ApiRequest/UserPhoto";
import Auth from "./Pages/Auth";
import Update from "./Pages/Update";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact Component={Auth} />
        <Route path="/users" Component={Users} />
        <Route path="/photo" Component={UserPhoto} />
        <Route path="/register" Component={RegisterPost} />
        <Route
          path="/update/:id/:currentName/:currentEmail"
          Component={Update}
        />
      </Routes>
    </Router>
  );
}

export default App;
