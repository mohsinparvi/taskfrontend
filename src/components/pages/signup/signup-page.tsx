import { loginRightColum } from "../../../assets/login";
import SignupForm from "../../signup-form/signup-form";

const SignupPage = () => {
  return (
    <div className="max-h-screen h-full w-full flex items-start overflow-hidden ">
      <div className=" w-full lg:w-1/3 flex justify-center my-4 px-20">
        <SignupForm />
      </div>
      <div className="hidden  lg:block  lg:w-2/3 relative">
        <img
          src={loginRightColum}
          alt=""
          className="w-full h-screen object-cover"
        />
        <div className="absolute bottom-10 left-8 w-3/5 space-y-4">
          <h2 className="text-5xl font-medium text-secondary">
            Blank is the ultimate time saver for small business owners like me.
          </h2>
          <p className="text-4xl font-medium text-white">Brittany Stone</p>
          <p className="text-xl font-normal text-white">SnapVision</p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
