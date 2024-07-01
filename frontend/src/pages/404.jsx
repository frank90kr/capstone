import React from "react";
import { PiSmileySadFill } from "react-icons/pi";

const NotFoundPage = () => {
  return (
    <div className="container text-center py-4">
      <h1 className="quiz-title text-center dysplay-1">404 - Page Not Found</h1>
      <p>"Ci dispiace, la pagina che stai cercando non esiste o è stata spostata."</p>
      <PiSmileySadFill className="mt-3" size={50} />
      <p className="mt-3">We're sorry, the page you are looking for could not be found.</p>
      <p>
        Go back to <a href="/">Homepage</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
