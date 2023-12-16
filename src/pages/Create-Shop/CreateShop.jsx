import toast from "react-hot-toast";
import imageUpload from "../../Apis/ImageUpload";
import { insertShop } from "../../Apis/ShopInsert";
import logoImg from "../../assets/images/logoWhite.svg";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";

const CreateShop = () => {
  // auth context
  const { user } = useAuth();
  const [loading, setLoading] = useState(false)
  // navigate
  const navigate = useNavigate();
  // handle form
  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true)
    // shopName
    // shopLogo
    // shopInfo
    // shopLocation
    // shopOwnerEmail
    // shopOwnerName
    const form = e.target;
    const shopName = form.shopName.value;
    const shopInfo = form.shopInfo.value;
    const shopLocation = form.shopLocation.value;
    const shopOwnerEmail = form.shopOwnerEmail.value;
    const shopOwnerName = form.shopOwnerName.value;
    const shopLogo = form.shopLogo.files[0];

    // create user in firebase , mongodb and photo upload in imgbb
    try {
      // image upload
      const imageData = await imageUpload(shopLogo);
      // form data
      const formData = {
        shopName,
        shopInfo,
        shopLocation,
        shopOwnerEmail,
        shopOwnerName,
        shopLogo:imageData?.data?.display_url,
      };
      // save shop in mongodb
       await insertShop(formData)
       .then((res) => {
        if(res.status === 200){
          toast.success("You have successfully created shop")
        }
        console.log(res);
        setLoading(true)
        navigate("/");
       })
       .catch(err => {
        if (err.response.status === 409) {
          toast.error('You have already created a shop');          
        }
        console.log(err)
       })


       setLoading(false)


    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };


  return (
    <main className="w-full flex">
      <div className="relative flex-1 hidden items-center justify-center  bg-gray-900 lg:flex">
        <div className="relative z-10 w-full max-w-md">
          <img src={logoImg} width={150} />
          <div className=" mt-16 space-y-3">
            <h3 className="text-white text-3xl font-bold">
              Start growing your business quickly
            </h3>
            <p className="text-gray-300">
              Create a Shop and get access to all features for lifetime, No
              credit card required.
            </p>
            <div className="flex items-center -space-x-2 overflow-hidden">
              <img
                src="https://randomuser.me/api/portraits/women/79.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://randomuser.me/api/portraits/men/86.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <p className="text-sm text-gray-400 font-medium translate-x-5">
                Join 5.000+ users
              </p>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 my-auto h-[500px]"
          style={{
            background:
              "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
            filter: "blur(118px)",
          }}
        ></div>
      </div>
      <div className="flex-1 flex items-center justify-center ">
        <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
          <div className="">
            <img
              src="https://floatui.com/logo.svg"
              width={150}
              className="lg:hidden"
            />
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Create Shop
              </h3>
            </div>
          </div>

          <div className="relative">
            <span className="block w-full h-px bg-gray-300"></span>
            <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
              Or continue with BungloRent
            </p>
          </div>
          <form onSubmit={handleForm} className="space-y-5">
            <div>
              <label className="font-medium">Shop Name</label>
              <input
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                name="shopName"
              />
            </div>
            <div>
              <label className="font-medium">Shop Logo</label>
              <input
                type="file"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                name="shopLogo"
              />
            </div>
            <div>
              <label className="font-medium">Shop Info (description )</label>
              <textarea
                required
                className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                name="shopInfo"
              ></textarea>
            </div>

            <div>
              <label className="font-medium">Shop Location</label>
              <input
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                name="shopLocation"
              />
            </div>

            {/* show owner email */}
            <div>
              <label className="font-medium">Shop Owner Email</label>
              <div className="relative ">
                <svg
                  className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <input
                  type="text"
                  defaultValue={user.email}
                  readOnly
                  className="w-full cursor-not-allowed pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  name="shopOwnerEmail"
                />
              </div>
            </div>

            {/* shop owner name */}
            <div>
              <label className="font-medium">Shop Owner Name</label>
              <div className="relative ">
                <svg
                  className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 101 101"
                  id="user"
                >
                  <path d="M50.4 54.5c10.1 0 18.2-8.2 18.2-18.2S60.5 18 50.4 18s-18.2 8.2-18.2 18.2 8.1 18.3 18.2 18.3zm0-31.7c7.4 0 13.4 6 13.4 13.4s-6 13.4-13.4 13.4S37 43.7 37 36.3s6-13.5 13.4-13.5zM18.8 83h63.4c1.3 0 2.4-1.1 2.4-2.4 0-12.6-10.3-22.9-22.9-22.9H39.3c-12.6 0-22.9 10.3-22.9 22.9 0 1.3 1.1 2.4 2.4 2.4zm20.5-20.5h22.4c9.2 0 16.7 6.8 17.9 15.7H21.4c1.2-8.9 8.7-15.7 17.9-15.7z"></path>
                </svg>
                <input
                  type="text"
                  defaultValue={user.displayName}
                  readOnly
                  className="w-full cursor-not-allowed pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  name="shopOwnerName"
                />
              </div>
            </div>

            <button className="w-full mt-8 px-4 py-2 text-primary font-medium bg-accent hover:bg-accent/70 active:bg-accent/90 rounded-lg duration-150">
                {
                    loading ? 
                    <FaSpinner className="text-xl mx-auto animate-spin" />
                    :                    
                    'Create Shop'
                
                    
                }
                
               
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreateShop;
