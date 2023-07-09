import "./App.css";
import { CartProvider } from "./components/contextReducer";
import { Toaster } from "react-hot-toast";
import Home from "./components/screens/home";
import Login from "./components/screens/login";
import MyOrder from "./components/screens/myOrder";
import Signup from "./components/screens/signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Timeline from "./components/screens/timeline";

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createUser" element={<Signup />} />
            <Route exact path="/myOrder" element={<MyOrder />} />
            <Route exact path="/timeline" element={<Timeline />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </CartProvider>
  );
}

export default App;
