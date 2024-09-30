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
import NewOrder from "./Order/NewOrderForm";
import OrdersList from "./Order/OrdersList";
import InvoicePopup from "./Order/InvoicePopup";
import AddCustomer from "./Customer/AddCustomerForm";
import GenerateReport from "./Reports/GenerateReport";

function App() {
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  const userType = window.localStorage.getItem("role");
  console.log("--------------------------------", isLoggedIn);
  return (
    <div className="App">
      <Router>
        <Navigator isLoggedIn={isLoggedIn} userType={userType} />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/adduser" element={<AddUser />} />
          <Route exact path="/updateUser/:id" element={<UpdateUser />} />
          <Route exact path="/viewuser/:id" element={<ViewUser />} />
          <Route exact path="/product" element={<Product />} />
          <Route exact path="/catogory" element={<Catogory />} />
          <Route exact path="/newOrder" element={<NewOrder />} />
          <Route exact path="/ordersList" element={<OrdersList />} />
          <Route exact path="/addCustomer" element={<AddCustomer />} />
          <Route exact path="/invoice" element={<InvoicePopup />} />
          <Route exact path="/reports" element={<GenerateReport />} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
