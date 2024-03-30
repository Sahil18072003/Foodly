import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";

import Home from "./Components/Home/Home";
import SignUp from "./Components/User/SignUp";
import Login from "./Components/User/Login";
import ForgotPassword from "./Components/User/ForgotPassword";
import ConfirmOTP from "./Components/User/ConfirmOTP";
import ChangePassword from "./Components/User/ChangePassword";
import Navbar from "./Components/Navbar/Navbar";
import Dashborad from "./Components/Dashboard/Dashboard";
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile";
import AddRestaurant from "./Components/AddRestaurant/AddRestaurant";
import AddForm1 from "./Components/AddRestaurant/AddForm1";
import AddForm2 from "./Components/AddRestaurant/AddForm2";
import AddForm3 from "./Components/AddRestaurant/AddForm3";
import AddForm4 from "./Components/AddRestaurant/AddForm4";
import AddForm5 from "./Components/AddRestaurant/AddForm5";
import AddForm6 from "./Components/AddRestaurant/AddForm6";
import AddForm7 from "./Components/AddRestaurant/AddForm7";
import UpdateRestaurant from "./Components/UpdateRestaurant/UpdateRestaurant";
import FindRestaurant from "./Components/FindRestaurant/FindRestaurant";
import Admin from "./Components/Admin/Admin";
import ContactUs from "./Components/ContactUs/ContactUs";
import AboutUs from "./Components/AboutUs/AboutUs";
import Policy from "./Components/Policy/Policy";
import Terms from "./Components/Policy/Terms";
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
            path="/getotp"
            element={
              <>
                <Navbar />
                <ConfirmOTP />
              </>
            }
          />
          <Route
            exact
            path="/getotp/:Eemail"
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
            path="/dashboard"
            element={
              <>
                <Navbar />
                <Dashborad />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/dashboard/updateProfile/:id"
            element={
              <>
                <Navbar />
                <UpdateProfile />
              </>
            }
          />
          <Route
            exact
            path="/addRestaurant"
            element={
              <>
                <Navbar />
                <AddRestaurant />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/addRestaurant/addForm/1/:id"
            element={
              <>
                <Navbar />
                <AddForm1 />
              </>
            }
          />
          <Route
            exact
            path="/addRestaurant/addForm/1"
            element={
              <>
                <Navbar />
                <AddForm1 />
              </>
            }
          />
          <Route
            exact
            path="/addRestaurant/addForm/2"
            element={
              <>
                <Navbar />
                <AddForm2 />
              </>
            }
          />
          <Route
            exact
            path="/addRestaurant/addForm/3"
            element={
              <>
                <Navbar />
                <AddForm3 />
              </>
            }
          />
          <Route
            exact
            path="/addRestaurant/addForm/4"
            element={
              <>
                <Navbar />
                <AddForm4 />
              </>
            }
          />
          <Route
            exact
            path="/addRestaurant/addForm/5"
            element={
              <>
                <Navbar />
                <AddForm5 />
              </>
            }
          />
          <Route
            exact
            path="/addRestaurant/addForm/6"
            element={
              <>
                <Navbar />
                <AddForm6 />
              </>
            }
          />
          <Route
            exact
            path="/addRestaurant/addForm/7"
            element={
              <>
                <Navbar />
                <AddForm7 />
              </>
            }
          />
          <Route
            exact
            path="/dashboard/updateRestaurant"
            element={
              <>
                <Navbar />
                <UpdateRestaurant />
              </>
            }
          />
          <Route
            exact
            path="/findRestaurant"
            element={
              <>
                <Navbar />
                <FindRestaurant />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/contactUs"
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
            path="/adminPage"
            element={
              <>
                <Navbar />
                <Admin />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/adminPage/:id"
            element={
              <>
                <Navbar />
                <Admin />
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
          <Route
            exact
            path="/policy"
            element={
              <>
                <Navbar />
                <Policy />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/terms"
            element={
              <>
                <Navbar />
                <Terms />
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
