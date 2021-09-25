import React, { useState } from "react";
import validator from "validator";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserName, getEmailId, getPassword } from "../actions";
import { getCommonHeaders } from "../utils/common";
import { registerService } from "../services/UserServices";

function SignUp() {
  const dispatch = useDispatch();
  const signUpState = useSelector((state) => state.signUp);
  const history = useHistory();
  const [serviceErrMsg, setServiceErrMsg] = useState("");
  const [errorList, setErrorList] = useState({
    isUserNameError: true,
    userNameErrorMsg: "",
    isEmailError: true,
    emailErrorMsg: "",
    isPwdError: true,
    pwdErrorMsg: "",
    isConfirmPwdError: true,
    confirmErrorMsg: "",
  });

  async function signUpRequest() {
    if (
      errorList.isUserNameError ||
      errorList.isEmailError ||
      errorList.isPwdError ||
      errorList.isConfirmPwdError
    ) {
      return;
    }
    const headers = getCommonHeaders();

    const body = {};
    body["userName"] = signUpState.userName;
    body["password"] = signUpState.password;
    body["email"] = signUpState.emailId;

    const respData = await registerService(body, headers);
    if (!respData.data) {
      setServiceErrMsg(respData.message);
    } else {
      history.push("/signIn");
    }
  }

  const onClickBackHome = () => {
    history.push("/");
  };
  return (
    <div className="border-2 border-black rounded-md w-6/12 m-auto mt-20">
      <div className="text-center py-4">
        <label htmlFor="signUp" className="text-2xl font-serif">
          Sign Up for a New Account
        </label>
      </div>
      <div className="mx-4">
        <div className="flex justify-between py-3">
          <label htmlFor="userName" className="text-blue-900 font-sans text-xl">
            User Name
          </label>
          <div className="w-7/12">
            <input
              type="text"
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
                      "User name should be between 6 and 32 letters only.",
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
          <label htmlFor="emailId" className="text-blue-900 font-sans text-xl">
            Email ID
          </label>
          <div className="w-7/12">
            <input
              type="text"
              className=" border-2 border-gray-200 w-full h-7 px-2 text-xl font-light"
              onChange={(e) => {
                if (validator.isEmail(e.target.value)) {
                  setErrorList({
                    ...errorList,
                    isEmailError: false,
                    emailErrorMsg: "",
                  });
                } else {
                  setErrorList({
                    ...errorList,
                    isEmailError: true,
                    emailErrorMsg: "Not a valid email format.",
                  });
                }
                dispatch(getEmailId(e.target.value));
              }}
            />
            <label htmlFor="" className="text-red-500 text-smz">
              {errorList.emailErrorMsg}
            </label>
          </div>
        </div>
        <div className="flex justify-between py-3">
          <label
            htmlFor="createPassword"
            className="text-blue-900 font-sans text-xl"
          >
            Create Password
          </label>
          <div className="w-7/12">
            <input
              type="password"
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
        <div className="flex justify-between py-3">
          <label
            htmlFor="confirmPassword"
            className="text-blue-900 font-sans text-xl"
          >
            Confirm Password
          </label>
          <div className="w-7/12">
            <input
              type="password"
              className=" border-2 border-gray-200 w-full h-7 px-2 text-xl font-light"
              onChange={(e) => {
                if (e.target.value !== signUpState.password) {
                  setErrorList({
                    ...errorList,
                    isConfirmPwdError: true,
                    confirmPwdErrorMsg: "Password should match.",
                  });
                } else {
                  setErrorList({
                    ...errorList,
                    isConfirmPwdError: false,
                    confirmPwdErrorMsg: "",
                  });
                }
                // dispatch(getPassword(e.target.value));
              }}
            />
            <label htmlFor="" className="text-red-500 text-smz">
              {errorList.confirmPwdErrorMsg}
            </label>
          </div>
        </div>
      </div>
      <div className="text-center">
        <label htmlFor="" className="text-red-500 text-sm">
          {serviceErrMsg}
        </label>
        <div className="flex justify-center my-3">
          <button
            className="no-underline px-3 py-2 bg-blue-800 text-white rounded-md"
            onClick={signUpRequest}
          >
            Create Account
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

export default SignUp;
