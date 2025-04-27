import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();
  const authSignUpData = {
    heading: "Welcome To Chat App",
    description:
      " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita porro cupiditate labore atque consectetur. Iusto facilis ratione ea et eligendi.",
    buttonText: "Sign In",
  };
  const authSignInData = {
    heading: "Welcome Back To Chat App",
    description:
      " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita porro cupiditate labore atque consectetur. Iusto facilis ratione ea et eligendi.",
    buttonText: "Sign Up",
  };

  const theme = useSelector((state) => state.theme);
  const navigate = useNavigate();

  return (
    <section
      className={`authLayout_section ${theme ? "lightTheme" : "darkTheme"}`}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="auth_section">
              <div className="auth">
                <div className="row">
                  <div className="col-md-6">
                    <div className="left_section">
                      <h1
                        className={`layout_heading ${theme ? "" : "darkText"}`}
                      >
                        {pathname == "/signup"
                          ? authSignUpData.heading
                          : authSignInData.heading}
                      </h1>
                      <p
                        className={`layout_description ${
                          theme ? "" : "darkText"
                        }`}
                      >
                        {pathname == "/signup"
                          ? authSignUpData.description
                          : authSignInData.description}
                      </p>
                      <button
                        className="layout_btnTexts"
                        onClick={() => {
                          pathname == "/signup"
                            ? navigate("/signin")
                            : navigate("/signup");
                        }}
                      >
                        <span>
                          {pathname == "/signup"
                            ? authSignUpData.buttonText
                            : authSignInData.buttonText}
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <Outlet />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout;
