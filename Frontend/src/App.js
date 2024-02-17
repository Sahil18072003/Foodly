import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Home from "./Components/Home/Home";
import SignUp from "./Components/User/SignUp";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar";
import ForgotPassword from "./Components/User/ForgotPassword";
import ConfirmOTP from "./Components/User/ConfirmOTP";
import ChangePassword from "./Components/User/ChangePassword";
// import ChatAdmin from "./Components/ChatAdmin";
// import AddProperty from "./Components/addProperty";
// import Explore from "./Components/explore";
// import Profile from "./Components/profile";
// import UpdateUser from "./Components/UpdateUser";
// import AdminPage from "./Components/AdminPage";
// import Premium from "./Components/Premium";
import ContactUs from "./Components/Contact/ContactUs";
import AboutUs from "./Components/About/AboutUs";
import Footer from "./Components/Footer/Footer";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, [location]);

  return null;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/home"
            element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            }
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route
            exact
            path="/forgotpassword"
            element={
              <>
                <Navbar />
                <ForgotPassword />
              </>
            }
          />
          <Route
            exact
            path="/getotp/:email"
            element={
              <>
                <Navbar />
                <ConfirmOTP />
              </>
            }
          />
          <Route
            exact
            path="/changePassword"
            element={
              <>
                <Navbar />
                <ChangePassword />
              </>
            }
          />
          <Route
            exact
            path="/contactus"
            element={
              <>
                <Navbar />
                <ContactUs />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/aboutus"
            element={
              <>
                <Navbar />
                <AboutUs />
                <Footer />
              </>
            }
          />
          {/* <Route exact path="/auth/google"  />
          <Route exact path="/auth/google/" /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
