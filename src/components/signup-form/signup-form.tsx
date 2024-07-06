import React, { useState } from "react";
import { googleIcon } from "../../assets/login";
import { ValidationErrors } from "../../types/login";
import { loginUser } from "../../services/login-api/login-api";
import { SingupFormData } from "../../types/signup";
import { Link } from "react-router-dom";
import Spinner from "../utils/spinner";

const SignupForm = () => {
  const [input, setInput] = useState<SingupFormData>({
    username: "",
    password: "",
  });
  const [isLoading, setIsloading] = useState(false);

  const [isShowPassowrd, setisShowPassword] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [apiError, setApiError] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!input.username) {
      newErrors.username = "Email is required";
    } else if (!emailPattern.test(input.username)) {
      newErrors.username = "Please enter a valid email address";
    }

    if (!input.password) {
      newErrors.password = "Password is required";
    } else if (input.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };
  const handleSignupUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsloading(true);
      const response = loginUser(input);
      response
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
          setApiError(err.reponse.data.message);
        })
        .finally(() => {
          setIsloading(false);
        });
    }
  };
  return (
    <div className=" w-full ">
      <div>
        <svg
          width="171"
          height="44"
          viewBox="0 0 171 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_51_3977)">
            <mask
              id="mask0_51_3977"
              //   style="mask-type:luminance"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="171"
              height="44"
            >
              <path
                d="M50.8451 13.8462H54.9822V30.525H50.8451V13.8462ZM56.6232 24.2275C56.6232 20.1025 59.1606 17.6412 63.0771 17.6412C66.9935 17.6412 69.531 20.1025 69.531 24.2275C69.531 28.3525 67.0487 30.8275 63.0771 30.8275C59.1055 30.8275 56.6232 28.4213 56.6232 24.2275ZM65.3801 24.2275C65.3801 21.9588 64.4837 20.625 63.0771 20.625C61.6705 20.625 60.7879 22 60.7879 24.2275C60.7879 26.455 61.6567 27.8025 63.0771 27.8025C64.4975 27.8025 65.3801 26.5375 65.3801 24.2412V24.2275ZM71.0893 31.3363H75.0609C75.25 31.7549 75.5695 32.1016 75.972 32.3246C76.3746 32.5475 76.8386 32.6349 77.2949 32.5738C78.867 32.5738 79.6944 31.7213 79.6944 30.4837V28.1737H79.6117C79.2821 28.8817 78.7472 29.4749 78.0761 29.877C77.4051 30.2789 76.6286 30.4711 75.8469 30.4287C72.8269 30.4287 70.8273 28.1325 70.8273 24.1863C70.8273 20.24 72.7303 17.7512 75.9021 17.7512C76.7083 17.7198 77.5048 17.9347 78.1851 18.3671C78.8654 18.7997 79.3968 19.4292 79.7082 20.1713V17.875H83.8453V30.3875C83.8453 33.3988 81.1838 35.2687 77.2535 35.2687C73.5991 35.2687 71.3237 33.6325 71.0893 31.35V31.3363ZM79.7082 24.2138C79.7082 22.2063 78.7843 20.9412 77.3225 20.9412C75.8607 20.9412 74.9644 22.1925 74.9644 24.2138C74.9644 26.235 75.8469 27.3762 77.3225 27.3762C78.7981 27.3762 79.7082 26.2625 79.7082 24.2275V24.2138ZM85.4036 24.2138C85.4036 20.0888 87.9411 17.6275 91.8575 17.6275C95.774 17.6275 98.3252 20.0888 98.3252 24.2138C98.3252 28.3388 95.8429 30.8137 91.8575 30.8137C87.8721 30.8137 85.4036 28.4213 85.4036 24.2275V24.2138ZM94.1605 24.2138C94.1605 21.945 93.2641 20.6112 91.8575 20.6112C90.4509 20.6112 89.6373 22 89.6373 24.2412C89.6373 26.4825 90.5061 27.8162 91.9127 27.8162C93.3193 27.8162 94.1605 26.5375 94.1605 24.2412V24.2138ZM99.8973 14.8775C99.8864 14.461 99.9999 14.0507 100.223 13.6986C100.447 13.3465 100.77 13.0684 101.152 12.8996C101.534 12.7308 101.957 12.6789 102.369 12.7504C102.781 12.822 103.162 13.0139 103.464 13.3016C103.766 13.5894 103.976 13.9601 104.066 14.3668C104.157 14.7735 104.124 15.1979 103.973 15.5862C103.821 15.9743 103.557 16.309 103.215 16.5476C102.872 16.7861 102.466 16.918 102.049 16.9263C101.772 16.9452 101.494 16.9069 101.232 16.8136C100.971 16.7204 100.732 16.5744 100.53 16.3845C100.328 16.1948 100.167 15.9653 100.058 15.7106C99.9495 15.4561 99.8946 15.1818 99.8973 14.905V14.8775ZM99.8973 17.9025H104.034V30.525H99.8973V17.9025ZM119.052 24.2138C119.052 28.3388 117.218 30.69 114.074 30.69C113.268 30.7416 112.465 30.5451 111.774 30.1271C111.084 29.7089 110.538 29.0895 110.212 28.3525H110.13V34.5675H105.993V17.875H110.13V20.13H110.212C110.523 19.3808 111.058 18.7452 111.744 18.3098C112.43 17.8743 113.234 17.6601 114.046 17.6962C117.218 17.7512 119.107 20.1162 119.107 24.2412L119.052 24.2138ZM114.915 24.2138C114.915 22.2063 113.991 20.9275 112.543 20.9275C111.095 20.9275 110.171 22.22 110.157 24.2138C110.143 26.2075 111.095 27.4862 112.543 27.4862C113.991 27.4862 114.915 26.235 114.915 24.2412V24.2138ZM126.154 17.6138C129.588 17.6138 131.67 19.2363 131.767 21.835H128.002C128.002 20.9412 127.257 20.3775 126.113 20.3775C124.968 20.3775 124.458 20.8175 124.458 21.4637C124.458 22.11 124.913 22.3163 125.837 22.5088L128.485 23.045C131.008 23.5813 132.084 24.5988 132.084 26.51C132.084 29.1225 129.698 30.8 126.182 30.8C122.665 30.8 120.362 29.1225 120.183 26.5512H124.168C124.292 27.4862 125.037 28.0362 126.251 28.0362C127.464 28.0362 128.016 27.6375 128.016 26.9775C128.016 26.3175 127.63 26.18 126.637 25.9737L124.251 25.465C121.783 24.9563 120.486 23.65 120.486 21.725C120.514 19.25 122.734 17.6412 126.154 17.6412V17.6138ZM145.888 30.4975H141.903V28.1462H141.82C141.601 28.9356 141.118 29.6266 140.45 30.1044C139.783 30.5821 138.972 30.8179 138.152 30.7725C137.523 30.8081 136.894 30.7088 136.307 30.4813C135.721 30.2537 135.19 29.9034 134.751 29.4536C134.311 29.004 133.974 28.4654 133.761 27.8745C133.549 27.2837 133.466 26.6542 133.518 26.0288V17.875H137.655V25.08C137.655 26.5787 138.427 27.3762 139.71 27.3762C140.011 27.3768 140.308 27.3134 140.583 27.1901C140.856 27.0667 141.101 26.8863 141.3 26.6611C141.497 26.4358 141.646 26.1708 141.733 25.884C141.82 25.597 141.846 25.2948 141.806 24.9975V17.875H145.943L145.888 30.4975ZM147.888 17.875H151.887V20.3088H151.97C152.189 19.5298 152.662 18.8453 153.313 18.3627C153.964 17.8801 154.758 17.6263 155.569 17.6412C156.395 17.5754 157.214 17.8217 157.866 18.3312C158.517 18.8408 158.953 19.5761 159.085 20.3912H159.168C159.418 19.5675 159.936 18.8503 160.641 18.3524C161.344 17.8545 162.195 17.6043 163.057 17.6412C163.62 17.6224 164.179 17.7218 164.701 17.933C165.223 18.1441 165.694 18.4624 166.084 18.8669C166.474 19.2716 166.775 19.7535 166.966 20.2814C167.157 20.8092 167.235 21.3715 167.194 21.9312V30.525H163.057V23.0312C163.057 21.6562 162.436 21.0238 161.278 21.0238C161.02 21.0216 160.764 21.0746 160.528 21.1794C160.292 21.2842 160.081 21.4382 159.91 21.6311C159.739 21.824 159.611 22.0511 159.535 22.2974C159.459 22.5438 159.438 22.8034 159.471 23.0588V30.525H155.541V22.9762C155.541 21.7112 154.921 21.0238 153.79 21.0238C153.529 21.0239 153.27 21.0792 153.033 21.186C152.794 21.293 152.58 21.449 152.408 21.6439C152.234 21.8387 152.105 22.0681 152.026 22.3168C151.949 22.5654 151.924 22.8276 151.956 23.0863V30.525H147.819L147.888 17.875Z"
                fill="white"
              />
              <path
                d="M39.275 14.6025C38.5732 13.0025 37.6444 11.5114 36.5169 10.175C34.8503 8.14046 32.7705 6.48091 30.4143 5.30557C28.0581 4.13025 25.4789 3.46578 22.8466 3.3559C20.2143 3.24603 17.5884 3.69323 15.1419 4.66811C12.6955 5.64297 10.4838 7.12339 8.65245 9.01193C6.82113 10.9004 5.41169 13.1543 4.5169 15.6251C3.62212 18.0958 3.26226 20.7276 3.46103 23.3469C3.65982 25.9665 4.4127 28.5142 5.67016 30.8225C6.92762 33.131 8.66113 35.1477 10.7566 36.74C12.1012 37.7821 13.5869 38.6292 15.1695 39.2562C17.3883 40.1629 19.7632 40.6299 22.1612 40.6312C27.1111 40.6204 31.8547 38.653 35.3523 35.1605C38.8498 31.668 40.8159 26.9354 40.8195 22C40.8231 19.4542 40.2972 16.9353 39.275 14.6025ZM22.1474 7.13623C24.3009 7.13601 26.4283 7.6053 28.3806 8.51123C27.9046 8.71634 27.404 8.8596 26.8913 8.9375C25.2042 9.181 23.6413 9.96197 22.4359 11.1639C21.2305 12.3657 20.4472 13.9241 20.203 15.6062C20.0958 16.5496 19.6654 17.4273 18.9846 18.0911C18.3038 18.755 17.4141 19.1642 16.4658 19.25C14.7787 19.4935 13.2158 20.2745 12.0104 21.4764C10.805 22.6783 10.0217 24.2366 9.77748 25.9187C9.6948 26.8158 9.31094 27.6588 8.68805 28.3112C7.6133 26.047 7.1305 23.5484 7.28456 21.0481C7.43863 18.5478 8.22455 16.127 9.56921 14.0108C10.9138 11.8948 12.7735 10.1523 14.9752 8.94553C17.1768 7.73873 19.6489 7.10688 22.1612 7.10873L22.1474 7.13623ZM10.7428 31.625C10.9083 31.4737 11.0738 31.3362 11.2393 31.1712C12.4661 29.9853 13.2536 28.4197 13.4733 26.73C13.5623 25.7801 13.9877 24.893 14.673 24.2275C15.3326 23.543 16.2203 23.1224 17.1691 23.045C18.8562 22.8015 20.419 22.0205 21.6245 20.8186C22.8299 19.6167 23.6132 18.0584 23.8574 16.3762C23.9171 15.3828 24.3446 14.4468 25.0571 13.75C25.733 13.0788 26.6291 12.6735 27.5808 12.6087C29.1307 12.3961 30.5762 11.7091 31.7179 10.6425C33.0179 11.7178 34.1192 13.0115 34.9724 14.465C34.92 14.5355 34.8599 14.6002 34.7931 14.6575C34.1349 15.348 33.2483 15.7778 32.2971 15.8675C30.6082 16.1067 29.043 16.8864 27.8367 18.0889C26.6306 19.2917 25.8487 20.8523 25.6088 22.5362C25.5115 23.4828 25.0891 24.3668 24.4131 25.0383C23.737 25.71 22.8489 26.1279 21.8992 26.2212C20.2071 26.4628 18.6384 27.2423 17.426 28.4437C16.2137 29.6451 15.4223 31.2044 15.1695 32.89C15.0953 33.562 14.8638 34.2072 14.4938 34.7738C13.0789 33.9361 11.8117 32.8724 10.7428 31.625ZM22.1474 36.9325C20.7481 36.934 19.3554 36.7396 18.0103 36.355C18.4705 35.4997 18.7696 34.5676 18.8929 33.605C18.9895 32.6605 19.41 31.7782 20.0833 31.1069C20.7565 30.4356 21.6414 30.0164 22.5887 29.92C24.2783 29.6792 25.8443 28.8995 27.0525 27.6973C28.2605 26.4953 29.0459 24.9353 29.2908 23.2512C29.3874 22.3068 29.8079 21.4244 30.4812 20.7531C31.1544 20.0819 32.0393 19.6626 32.9866 19.5662C34.2581 19.4014 35.4699 18.9293 36.5169 18.1912C37.0983 20.3884 37.1671 22.689 36.7182 24.9168C36.2694 27.1446 35.3145 29.2403 33.9272 31.0431C32.5399 32.8457 30.757 34.3078 28.7149 35.3167C26.673 36.3257 24.4264 36.8549 22.1474 36.8637V36.9325Z"
                fill="white"
              />
            </mask>
            <g mask="url(#mask0_51_3977)">
              <rect width="171" height="44" fill="#006D48" />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_51_3977">
              <rect width="170.5" height="44" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="space-y-8 mt-10 ">
        <div className="space-y-2">
          <h1 className="text-[64px] font-semibold leading-[60px]">
            Get started with Blank
          </h1>
          <p className="text-lg font-light">
            Join Blank for free today. No credit card required.
          </p>
        </div>
        <form action="" className="space-y-6" onSubmit={handleSignupUser}>
          <div className="space-y-2">
            <p className="text-base font-medium">Email</p>
            <input
              type="email"
              className="border border-[##CFD8E1] focus:outline-none w-full px-[12px] py-[10px] text-primary"
              placeholder="wesley.mendoza@example.com"
              name="username"
              value={input.username}
              onChange={handleChange}
            />
          </div>
          {errors.username && (
            <span className="text-red-500 text-sm font-normal">
              {errors.username}
            </span>
          )}
          <div className="space-y-2">
            <p className="text-base font-medium">Password</p>
            <div className="border border-[##CFD8E1] flex justify-between items-center  px-[12px] py-[10px]">
              <input
                type={isShowPassowrd ? "text" : "password"}
                className=" focus:outline-none w-full text-primary"
                placeholder="••••••••••"
                name="password"
                value={input.password}
                onChange={handleChange}
              />
              {isShowPassowrd ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 cursor-pointer"
                  onClick={() => setisShowPassword(!isShowPassowrd)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 cursor-pointer"
                  onClick={() => setisShowPassword(!isShowPassowrd)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </div>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm font-normal">
              {errors.password}
            </span>
          )}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                name=""
                id=""
                className="h-6 w-6 rounded-md"
              />
              <p className="text-base font-normal">
                I agree to the{" "}
                <span className="text-black underline">terms of use</span> and{" "}
                <span className="text-black underline">privacy statement</span>
              </p>
            </div>
          </div>
          {apiError && (
            <span className="text-red-500 text-sm font-normal">{apiError}</span>
          )}
          {isLoading ? (
            <div className=" bg-secondary w-full py-3 flex  justify-center  text-base font-medium">
              <Spinner />
            </div>
          ) : (
            <button
              className="bg-secondary w-full py-3 flex  justify-center  text-base font-medium"
              type="submit"
            >
              Continue
            </button>
          )}
          <button className="w-full py-3 flex  justify-center  text-base font-medium border border-[##CFD8E1]">
            <img src={googleIcon} alt="google Icon" />
            <span>Sign in with Google</span>
          </button>
          <p className="text-base font-normal text-center text-[#3B4752]">
            Haven’t joined yet?{" "}
            <Link to="/" className="text-[#11161B] font-medium underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
