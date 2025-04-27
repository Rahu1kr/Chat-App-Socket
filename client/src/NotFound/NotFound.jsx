import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const theme = useSelector(state => state.theme);
  const navigate = useNavigate();

  return (
    <>
      <section
        className={`not_found_section ${theme ? "lightTheme" : "darkTheme"}`}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="not_found">
                <h1 className="error_heading">404 ERROR</h1>
                <p className="error_description">
                  This page is not found!
                </p>
                <button onClick={() => navigate('/chat')} className="goHome_btn">Go Home</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
