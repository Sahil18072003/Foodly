import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";

import Home from "./Components/Home/Home";
import Carousel from "./Components/Home/Carousel";
import Comment from "./Components/Home/Comment";
import HowWork from "./Components/Home/HowWork";
import PopularRestaurant from "./Components/Home/PopularRestaurant";
import SignUp from "./Components/User/SignUp";
import Login from "./Components/User/Login";
import ForgotPassword from "./Components/User/ForgotPassword";
import ConfirmOTP from "./Components/User/ConfirmOTP";
import ChangePassword from "./Components/User/ChangePassword";
import Navbar from "./Components/Navbar/Navbar";
import Cart from "./Components/Cart/Cart";
import Dashborad from "./Components/Dashboard/Dashboard";
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile";
import RestaurantPage from "./Components/RestaurantPage/RestaurantPage";
import ResDashboard from "./Components/ResDashboard/ResDashboard";
import AddRestaurant from "./Components/AddRestaurant/AddRestaurant";
import AddForm1 from "./Components/AddForm/AddForm1";
import AddForm2 from "./Components/AddForm/AddForm2";
import AddForm3 from "./Components/AddForm/AddForm3";
import AddForm4 from "./Components/AddForm/AddForm4";
import AddForm5 from "./Components/AddForm/AddForm5";
import AddForm6 from "./Components/AddForm/AddForm6";
import AddForm7 from "./Components/AddForm/AddForm7";
import UpdateRestaurant from "./Components/UpdateRestaurant/UpdateRestaurant";
import FindRestaurant from "./Components/FindRestaurant/FindRestaurant";
import Admin from "./Components/Admin/Admin";
import OrderManage from "./Components/Bill/OrderManage";
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
        {/* <ScrollToTop /> */}
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Navbar />
                <Carousel />
                <PopularRestaurant />
                <HowWork />
                <Comment />
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
                <Carousel />
                <PopularRestaurant />
                <HowWork />
                <Comment />
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
            path="/cart"
            element={
              <>
                <Navbar />
                <Cart />
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
            path="/ordermanage"
            element={
              <>
                <Navbar />
                <OrderManage />
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
            path="/dashboard/resDashboard/:id"
            element={
              <>
                <Navbar />
                <ResDashboard />
                {/* <Footer /> */}
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
            path="/restaurantPage/:id"
            element={
              <>
                <Navbar />
                <RestaurantPage />
                <Footer />
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
