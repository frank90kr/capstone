import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TopNav from "./components/TopNav";
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import Register from "./pages/Register";
import Login from "./pages/Login";
import GuestRoutes from "./pages/GuestRoutes";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import { useDispatch } from "react-redux";
import { LOGIN } from "./redux/actions";
import CoursesList from "./pages/CoursesList";
import Teacher from "./pages/Teacher";
import AOS from "aos";
import "aos/dist/aos.css";
import Quiz from "./pages/Quiz";
import ScopriSeFaPerTe from "./components/quiz/ScopriSeFaPerTe";
import PaymentForm from "./pages/PaymentForm";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios("/api/user")
      .then((res) => {
        dispatch({
          type: LOGIN,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  return loaded ? (
    <BrowserRouter>
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses-list" element={<CoursesList />} />
        <Route path="*" element={<Navigate to="/404" />} />
        {/* Rotte per gestire i quiz */}
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/scopri-se-fa-per-te" element={<ScopriSeFaPerTe />} />

        {/* Rotte accessibili solo se non sei loggato */}
        <Route element={<GuestRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Rotte accessibili solo se sei loggato */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/lessons/:id" element={<Lessons />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/payment/:course_id/:course_title/:course_price" element={<PaymentForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  ) : null;
}

export default App;
