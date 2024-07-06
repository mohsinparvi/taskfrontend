import React from "react";
import LoginForm from "../../login-form/login-form";
import { loginRightColum } from "../../../assets/login";

const LoginPage = () => {
  return (
    <div className="max-h-screen h-full w-full flex items-start overflow-hidden ">
      <div className=" w-full lg:w-1/3 flex justify-center my-4 px-20">
        <LoginForm />
      </div>
      <div className="hidden  lg:block  lg:w-2/3">
        <img src={loginRightColum} alt="" className="w-full h-full" />
      </div>
    </div>
  );
};

export default LoginPage;
