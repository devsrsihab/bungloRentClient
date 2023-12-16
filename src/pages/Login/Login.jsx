import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import { getToken, insertUser } from "../../Apis/Auth";
import toast from "react-hot-toast";

const Login = () => {
  // auth context
  const {signIn,signInWithGoogle} = useAuth()
  // navigate
  const navigate = useNavigate()
  // locaton 
  const location  = useLocation()
  const from  = location?.state?.from?.pathname || '/'

  // handle form
  const handleForm = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      // create user
      const resutl = await signIn(email, password);
      // get Token
      await getToken(resutl?.user?.email);
      toast.success("Log in successfully");
      navigate(from, {replace: true});

    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
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
      navigate(from, {replace: true});

    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };


  return (
    <>
      {/* Home page title for html */}
      <Helmet>
        <title>Log in | Log in  Here </title>
      </Helmet>
      <section className="flex flex-wrap items-center justify-center  font-poppins">
        <div className="max-w-6xl mx-auto ">
          <div className=" lg:py-7">
            <div className="max-w-xl lg:p-12 shadow-md rounded-md p-6 mx-auto text-center bg-[#dbeafe6e] dark:bg-gray-800 ">
              <h2 className="mb-4 text-2xl font-bold text-gray-700 lg:mb-7 lg:text-3xl dark:text-gray-300">
                Login
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-7">
                Your credentials here
              </p>
              <form 
              onSubmit={handleForm}
              >
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
                      type="password"
                      className="w-full px-4 py-4 bg-white rounded-lg lg:py-5 dark:text-gray-300 dark:bg-gray-700 "
                      name="password"
                      placeholder="Enter password"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4 lg:mb-7">
                  <label htmlFor="" className="flex dark:text-gray-300">
                    <input
                      name="remember"
                      id="remember"
                      type="checkbox"
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="remember" className="text-sm ">
                      Remember me
                    </label>
                  </label>
                  <a
                    href=" #"
                    className="text-sm font-semibold text-blue-400 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                  >
                    forgot password?
                  </a>
                </div>
                <button
                  className="w-full px-4 py-4 text-sm font-bold text-gray-300 uppercase bg-blue-600 rounded-md lg:text-lg dark:text-gray-300 dark:bg-blue-800 hover:bg-blue-700 dark:hover:bg-blue-900 "
                  type="submit"
                >
                  LOGIN
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
                <p className="px-2 mt-6 text-sm text-left text-gray-700 dark:text-gray-400">
                  If you dont have an account?
                  <Link
                    to="/signup"
                    className="ml-2 text-base font-semibold text-blue-400 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                  >
                    Create new account
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

export default Login;
