import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/User/SignUp";
import Login from "./Components/User/Login";
import PrivateComponent from "./Components/PrivateComponent";
import Navbar from "./Components/Navbar";
// import ForgotPassword from "./Components/ForgotPassword";
// import ConfirmOTP from "./Components/ConfirmOTP";
// import ChangePassword from "./Components/ChangePassword";
// import ChatAdmin from "./Components/ChatAdmin";
// import AddProperty from "./Components/addProperty";
// import Explore from "./Components/explore";
// import Footer from "./Components/Footer";
// import Profile from "./Components/profile";
// import UpdateUser from "./Components/UpdateUser";
// import AdminPage from "./Components/AdminPage";
// import Premium from "./Components/Premium";
// import ContactUs from "./Components/ContactUs";
// import AboutUs from "./Components/AboutUs";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route
              path="/"
              element={
                <>
                  <Footer />
                </>
              }
            />
            <Route
              path="/home"
              element={
                <>
                  <Footer />
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <ContactUs />
                  <Footer />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <About />
                  <Footer />
                </>
              }
            />
            <Route
              path="/confirmotp"
              element={
                <>
                  <ConfirmOTP />
                  <Footer />
                </>
              }
            />
            <Route
              path="/changepass"
              element={
                <>
                  <ChangePassword />
                  <Footer />
                </>
              }
            />
            <Route
              path="/addRestaurants"
              element={
                <>
                  <AddProperty />
                  <Footer />
                </>
              }
            />
            <Route
              path="/explore"
              element={
                <>
                  <Explore />
                  <Footer />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <Profile />
                </>
              }
            />
            <Route
              path="/updateUser/:id"
              element={
                <>
                  <UpdateUser />
                  <Footer />
                </>
              }
            />
            <Route
              path="/adminpage"
              element={
                <>
                  <AdminPage />
                  <Footer />
                </>
              }
            />
            <Route
              path="/forgotpass/"
              element={
                <>
                  <ForgotPassword />
                  <Footer />
                </>
              }
            />
            <Route
              path="/forgotpass/:email"
              element={
                <>
                  <ForgotPassword />
                  <Footer />
                </>
              }
            />
            <Route
              path="/chatadmin"
              element={
                <>
                  <ChatAdmin />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <Login />
                  <Footer />
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <SignUp />
                  <Footer />
                </>
              }
            />
            <Route
              path="/premium"
              element={
                <>
                  <Premium />
                  <Footer />
                </>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
