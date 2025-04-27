import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { notifyError, notifySuccess } from "../utils/Toastify";
import { useSelector } from "react-redux";

const Signup = () => {
  const initialValue = {
    name: "",
    email: "",
    password: "",
  };
  const [signupInfo, setSignupInfo] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setSignupInfo({
      ...signupInfo,
      [name]: value.trimStart(),
    });
  };

  const Validation = () => {
    const formValidate = {};

    if (!signupInfo.name) {
      formValidate.name = "Name is required!";
    }
    if (!signupInfo.email) {
      formValidate.email = "Email is required!";
    }
    if (!signupInfo.password) {
      formValidate.password = "Password is required!";
    }

    return formValidate;
  };

  const handleSignup = async e => {
    e.preventDefault();
    const validateValue = Validation();

    if (Object.keys(validateValue).length == 0) {
      try {
        const url = `http://3.108.51.8:8000/api/auth/signup`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupInfo),
        });
        const result = await response.json();
        const { success, message, error } = result;
        if (success) {
          notifySuccess(message);
          setTimeout(() => {
            navigate("/signin");
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
      setErrors(validateValue);
    }
  };

  const theme = useSelector(state => state.theme)

  return (
    <>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="signupSection">
                <form onSubmit={handleSignup}>
                  <div className="form_section">
                    <label className={`labelQus ${theme ? "" : "darkText"}`} htmlFor="name">
                      Name
                    </label>
                    <div className="textInputWrapper">
                      <input
                        type="text"
                        id="name"
                        className="textInput"
                        placeholder="Enter"
                        name="name"
                        value={signupInfo.name}
                        onChange={e => handleChange(e)}
                      />
                    </div>
                    {errors?.name && (
                      <span className="dangerText">*{errors.name}</span>
                    )}
                  </div>
                  <div className="form_section">
                    <label htmlFor="email" className={`labelQus ${theme ? "" : "darkText"}`}>
                      Email
                    </label>
                    <div className="textInputWrapper">
                      <input
                        type="email"
                        id="email"
                        className="textInput"
                        placeholder="Enter"
                        name="email"
                        value={signupInfo.email}
                        onChange={e => handleChange(e)}
                      />
                    </div>
                    {errors?.email && (
                      <span className="dangerText">*{errors.email}</span>
                    )}
                  </div>
                  <div className="form_section">
                    <label htmlFor="password" className={`labelQus ${theme ? "" : "darkText"}`}>
                      Password
                    </label>
                    <div className="textInputWrapper">
                      <input
                        type="password"
                        id="password"
                        className="textInput"
                        placeholder="Enter"
                        name="password"
                        value={signupInfo.password}
                        onChange={e => handleChange(e)}
                      />
                    </div>
                    {errors?.password && (
                      <span className="dangerText">*{errors.password}</span>
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
    </>
  );
};

export default Signup;
