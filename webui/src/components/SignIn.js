import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserName, getPassword, getAccessToken } from "../actions";
import { loginService } from "../services/UserServices";
import { getCommonHeaders } from "../utils/common";

function SignIn() {
  const dispatch = useDispatch();
  const signInState = useSelector((state) => state.login);
  const history = useHistory();
  const [errorList, setErrorList] = useState({
    isPwdError: true,
    pwdErrorMsg: "",
    isUserNameError: true,
    userNameErrorMsg: "",
  });
  const [serviceErrMsg, setServiceErrMsg] = useState("");
  async function signInRequest() {
    let isError = false;
    if (errorList.isPwdError) {
      setErrorList({
        ...errorList,
        isPwdError: true,
        pwdErrorMsg: "Password should not be empty.",
      });
      isError = true;
    }
    if (errorList.isUserNameError) {
      setErrorList({
        ...errorList,
        isUserNameError: true,
        userNameErrorMsg: "User name should not be empty.",
      });
      isError = true;
    }
    // Should not proceed if found any input value error
    if (isError) {
      return;
    }
    const headers = getCommonHeaders();

    const body = {};
    body["userName"] = signInState.userName;
    body["password"] = signInState.password;
    const respData = await loginService(body, headers);
    if (respData.data) {
      dispatch(getAccessToken(respData.data.accessToken));
      history.push("/dashboard");
    } else {
      setServiceErrMsg(respData.message);
    }
  }
  const onClickBackHome = () => {
    history.push("/");
  };

  return (
    <div className="border-2 border-black rounded-md w-6/12 m-auto mt-20">
      <div className="text-center py-4">
        <label htmlFor="signUp" className="text-2xl font-serif">
          Sign In to your Account
        </label>
      </div>
      <div className="mx-4">
        <div className="flex justify-between py-3">
          <label htmlFor="userName" className="text-blue-900 font-sans text-xl">
            User name
          </label>
          <div className="w-7/12">
            <input
              type="text"
              aria-label="username"
              className=" border-2 border-gray-200 w-full h-7 px-2 text-xl font-light"
              onChange={(e) => {
                if (e.target.value.length > 5 && e.target.value.length < 33) {
                  setErrorList({
                    ...errorList,
                    isUserNameError: false,
                    userNameErrorMsg: "",
                  });
                } else {
                  setErrorList({
                    ...errorList,
                    isUserNameError: true,
                    userNameErrorMsg:
                      "User name should be between 6  and 32 letters only.",
                  });
                }
                dispatch(getUserName(e.target.value));
              }}
            />
            <label htmlFor="" className="text-red-500 text-smz">
              {errorList.userNameErrorMsg}
            </label>
          </div>
        </div>
        <div className="flex justify-between py-3">
          <label htmlFor="password" className="text-blue-900 font-sans text-xl">
            Password
          </label>
          <div className="w-7/12">
            <input
              type="password"
              aria-label="password"
              className=" border-2 border-gray-200 w-full h-7 px-2 text-xl font-light"
              onChange={(e) => {
                if (e.target.value.length > 5) {
                  setErrorList({
                    ...errorList,
                    isPwdError: false,
                    pwdErrorMsg: "",
                  });
                } else {
                  setErrorList({
                    ...errorList,
                    isPwdError: true,
                    pwdErrorMsg: "Password should be minimum 6 letters.",
                  });
                }
                dispatch(getPassword(e.target.value));
              }}
            />
            <label htmlFor="" className="text-red-500 text-smz">
              {errorList.pwdErrorMsg}
            </label>
          </div>
        </div>
      </div>
      <div className="text-center">
        <label
          htmlFor=""
          aria-label="serviceErrMsg"
          className="text-red-500 text-sm"
        >
          {serviceErrMsg}
        </label>
        <div className="flex justify-center my-3">
          <button
            className="no-underline px-3 py-2 bg-blue-800 text-white rounded-md"
            onClick={signInRequest}
          >
            Sign In
          </button>
        </div>
      </div>
      <div className="flex justify-center my-2">
        <button className=" text-black text-sm" onClick={onClickBackHome}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

export default SignIn;
