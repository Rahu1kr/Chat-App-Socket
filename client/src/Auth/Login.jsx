import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { notifyError, notifySuccess } from "../utils/Toastify";
import { useSelector } from "react-redux";

const Login = () => {
  const initialValue = {
    email: "",
    password: "",
  };
  const [loginInfo, setLoginInfo] = useState(initialValue);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const Validation = () => {
    const validate = {};

    if (!loginInfo.email) {
      validate.email = "Email is required!";
    }
    if (!loginInfo.password) {
      validate.password = "Password is required!";
    }

    return validate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateValue = Validation();

    if (Object.keys(validateValue).length == 0) {
      try {
        const url = `http://3.108.51.8:8000/api/auth/signin`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginInfo),
        });
        const result = await response.json();
        const { success, message, jwtToken, name, error } = result;
        if (success) {
          notifySuccess(message);
          localStorage.setItem("token", jwtToken);
          localStorage.setItem("loggedInUser", name);
          console.log(message);
          setTimeout(() => {
            navigate("/chat");
          }, 1000);
        } else if (error) {
          const details = error?.details[0].message;
          notifyError(details);
        } else if (!success) {
          notifyError(message);
        }
      } catch (err) {
        notifyError(err);
      }
    } else {
      setError(validateValue);
    }
  };

  const theme = useSelector((state) => state.theme);

  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="loginSection">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form_section">
                  <label
                    htmlFor="email"
                    className={`labelQus ${theme ? "" : "darkText"}`}
                  >
                    Email
                  </label>
                  <div className="textInputWrapper">
                    <input
                      type="email"
                      id="email"
                      className="textInput"
                      placeholder="Enter"
                      name="email"
                      value={loginInfo.email}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  {error?.email && (
                    <span className="dangerText">*{error.email}</span>
                  )}
                </div>
                <div className="form_section">
                  <label
                    htmlFor="loginPassword"
                    className={`labelQus ${theme ? "" : "darkText"}`}
                  >
                    Password
                  </label>
                  <div className="textInputWrapper">
                    <input
                      type="password"
                      id="loginPassword"
                      className="textInput"
                      placeholder="Enter"
                      name="password"
                      value={loginInfo.password}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  {error?.password && (
                    <span className="dangerText">*{error.password}</span>
                  )}
                </div>
                <button type="submit" className="submit_btn">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Login;
