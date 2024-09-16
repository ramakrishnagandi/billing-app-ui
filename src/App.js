import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navigator from './Layout/BillingNavbar';
import Home from './pages/Home';
import Login from './pages/LoginForm';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "./Users/AddUsers";
import UpdateUser from "./Users/UpdateUser";
import ViewUser from "./Users/ViewUser";
import Product from "./Product/ProductList";
import Catogory from "./Category/CategoryList";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigator />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/adduser" element={<AddUser />} />
          <Route exact path="/updateUser/:id" element={<UpdateUser />} />
          <Route exact path="/viewuser/:id" element={<ViewUser />} />
          <Route exact path="/product" element={<Product />} />
          <Route exact path="/catogory" element={<Catogory />} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
