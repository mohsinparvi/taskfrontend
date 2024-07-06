
import { loginRightColum } from "../../../assets/login";
import SignupForm from "../../signup-form/signup-form";

const SignupPage = () => {
  return (
    <div className="max-h-screen h-full w-full flex items-start overflow-hidden ">
      <div className=" w-full lg:w-1/3 flex justify-center my-4 px-20">
        <SignupForm />
      </div>
      <div className="hidden  lg:block  lg:w-2/3">
        <img src={loginRightColum} alt="" className="w-full h-full" />
      </div>
    </div>
  );
};

export default SignupPage;
