import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet-async";
import imageUpload from "../../Apis/ImageUpload";
import useAuth from "../../hooks/useAuth";
import { FaArrowsSpin } from "react-icons/fa6";
import { AiFillEyeInvisible,AiFillEye } from "react-icons/ai";
import { getToken, insertUser } from "../../Apis/Auth";
import toast from "react-hot-toast";
import { useState } from "react";

const SignUp = () => {
  // auth context
  const {createUser,updateUserProfile, signInWithGoogle,loading} = useAuth()
  // navigate
  const navigate = useNavigate()
  // error & success sate
  const [registerErr, SetRegisterErr] = useState("");
  const [success, SetSuccess] = useState("");
  // loading state 
  const [isoading, setIsloding] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  // handleForm
  const handleForm = async (e) => {
    e.preventDefault();

    // first emapy the error and succes state
    SetRegisterErr("");
    SetSuccess("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const term = form.term.checked;
    const photo = form.photo.files[0];
    // form data
    const formData = { name, email, password, photo };
    console.table(formData);

    // error show for term
    if (!term) {
      SetRegisterErr("pLease Check Our Term and Condtion");
      setIsloding(false);
      return;
    }
    // error show for term
    if (!name) {
      SetRegisterErr("pLease fill Name Input");
      setIsloding(false);
      return;
    }
    // error show for term
    if (!photo) {
      SetRegisterErr("pLease upload your photo");
      setIsloding(false);
      return;
    }
    // password error handle
    const pattern = "/^(?=.*[!@#$%^&*])(?=.*[0-9])[A-Za-z0-9!@#$%^&*]{8,26}$/";
    if (pattern.match(password)) {
      SetRegisterErr(
        "Your Password Al least 8 character and 1 Special Character"
      );
      setIsloding(false);

      return;
    }

    // create user in firebase , mongodb and photo upload in imgbb
    try {
      // image upload
      const imageData = await imageUpload(photo)
      // create user in firebase
      const result  = await createUser(email, password)
      await updateUserProfile(name, imageData?.data?.display_url);
      
      // save user in mongodb

        const dbResponse = await insertUser(result?.user);
        console.log(dbResponse);


      // get Token
      await getToken(result?.user?.email);
      toast.success("Sign up successfully");
      navigate("/");
      
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
    console.log(photo);



  };


  // sing up with google
  const handleGoogle = async () => {

    try {
      // create user
      const resutl = await signInWithGoogle();
      // save user in db
      const dbResponse = await insertUser(resutl?.user);
      console.log(dbResponse);
      // get Token
      await getToken(resutl?.user?.email);
      toast.success("Sign up successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }


  }









  return (
    <>
      {/* Home page title for html */}
      <Helmet>
        <title>Sign Up | Register Here </title>
      </Helmet>

      <section className="flex flex-wrap items-center justify-center  font-poppins">
        <div className="max-w-6xl mx-auto ">
          <div className=" lg:py-7">
            <div className="max-w-xl lg:p-12 shadow-md rounded-md p-6 mx-auto text-center bg-[#dbeafe6e] dark:bg-gray-800 ">
              <h2 className="mb-4 text-2xl font-bold text-gray-700 lg:mb-7 lg:text-3xl dark:text-gray-300">
                Sign Up
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-7">
                Your credentials here
              </p>
              <form onSubmit={handleForm}>
                <div className="mb-4 lg:mb-7">
                  <input
                    type="file"
                    className="w-full px-4 py-4 bg-white rounded-lg lg:py-5 dark:text-gray-300 dark:bg-gray-700 "
                    name="photo"
                  />
                </div>
                <div className="mb-4 lg:mb-7">
                  <input
                    type="text"
                    className="w-full px-4 py-4 bg-white rounded-lg lg:py-5 dark:text-gray-300 dark:bg-gray-700 "
                    name="name"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mb-4 lg:mb-7">
                  <input
                    type="email"
                    className="w-full px-4 py-4 bg-white rounded-lg lg:py-5 dark:text-gray-300 dark:bg-gray-700 "
                    name="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-4 lg:mb-7">
                  <div className="relative flex items-center">
                    <input
                       type={isShowPassword ? "text" : "password"}
                      className="w-full px-4 py-4 bg-white rounded-lg lg:py-5 dark:text-gray-300 dark:bg-gray-700 "
                      name="password"
                      placeholder="Enter password"
                    />
                    
                    <div
                      onClick={() => {
                        setIsShowPassword(!isShowPassword);
                      }}
                      className="icons dark:text-white text-black absolute bottom-[30%] text-2xl cursor-pointer right-[5%]"
                    >
                      {isShowPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4 lg:mb-7">
                  <label htmlFor="" className="flex dark:text-gray-300">
                    <input
                      name="term"
                      id="term"
                      type="checkbox"
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="term" className="text-sm ">
                      Accept term and condition 
                    </label>
                  </label>
                  <a
                    href=" #"
                    className="text-sm font-semibold text-blue-400 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                  >
                    forgot password?
                  </a>
                </div>
                {isoading && (
                    <span className="loading loading-bars loading-lg"></span>
                  )}
                  <div
                    className={`error text-sm ${registerErr && "text-red-700"}
                     ${success && "text-green-500"}  my-5`}
                  >
                    <h2>
                      {registerErr && registerErr.replace("Firebase:", "")}
                    </h2>
                    <h2>{success && success}</h2>
                  </div>
                <button
                  className="w-full px-4 py-4 text-sm font-bold text-gray-300 uppercase bg-blue-600 rounded-md lg:text-lg dark:text-gray-300 dark:bg-blue-800 hover:bg-blue-700 dark:hover:bg-blue-900 "
                  type="submit"
  

                >
    
                  {
                    loading ? 
                      <FaArrowsSpin className="animate-spin mx-auto text-2xl " />
                     : 'sign up'
                  }
                  
                 
                </button>
                <div className="my-3 lg:my-6">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Or, login with
                  </span>
                </div>
                <div className="flex flex-wrap justify-center ">
                  <div className="w-full py-2 lg:px-2 lg:py-0 lg:w-1/3">
                    <a
                    onClick={handleGoogle}
                    className="flex cursor-pointer items-center justify-center p-3 bg-red-700 rounded-md dark:bg-primary  dark:hover:bg-opacity-80 ">
                      <span className="inline-block mr-2 text-gray-300 dark:text-gray-400">
                        {/* google icon */}
                        <FcGoogle />
                      </span>
                      <span className="text-xs font-medium text-gray-200 uppercase lg:text-sm dark:text-gray-300">
                        Google
                      </span>
                    </a>
                  </div>
                </div>
                <p className="px-2 mt-6 text-center text-sm  text-gray-700 dark:text-gray-400">
                  Already have an account?
                  <Link
                    to="/login"
                    className="ml-2 text-base font-semibold text-blue-400 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                  >
                    Login in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
