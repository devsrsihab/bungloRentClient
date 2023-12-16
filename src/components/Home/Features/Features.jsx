import Heading from "../../Shared/Heading/Heading";
import FeatureIcon from "./FeatureIcon";
import { MdAccessTime, MdImportantDevices } from "react-icons/md";
import { FaChartGantt } from "react-icons/fa6";
import { CgTouchpad } from "react-icons/cg";
import { IoIosNotificationsOutline } from "react-icons/io";


const Features = () => {
  return (
    <>
      <Heading
        title="Discover Our Capabilities"
        subtitle={"Efficiency Redefined for Your Business"}
        center={true}
      />
      <section className=" bg-blue-900 ">
        <div className="mx-auto grid max-w-lg gap-x-8 gap-y-12 px-4 py-32 md:max-w-screen-xl md:grid-cols-2 md:px-8 lg:grid-cols-3">
          <div>
            <h2 className="text-3xl font-medium text-white">
              Unmatched <br />
              Services.
              <br />
              Unmatched <br />
              Excellence.
            </h2>
          </div>
          <div className="border-white/40 relative border-4 px-4 pt-14 pb-8">
            <div className="absolute -top-8 left-8 bg-blue-900 px-4 text-white">
              <FeatureIcon icon={MdAccessTime} />
            </div>
            <p className="mb-3 font-medium uppercase text-white">
            Real-Time Tracking
            </p>
            <p className="text-blue-200">
            Monitor inventory levels instantly and accurately, ensuring you are always aware of stock availability.
            </p>
          </div>
          <div className="border-white/40 relative border-4 px-4 pt-14 pb-8">
            <div className="absolute -top-8 left-8 bg-blue-900 px-4 text-white">
              <FeatureIcon icon={IoIosNotificationsOutline} />
            </div>
            <p className="mb-3 font-medium uppercase text-white">
            Automated Alerts
            </p>
            <p className="text-blue-200">
            Receive notifications for low stock or critical inventory thresholds, enabling prompt action to avoid shortages.
            </p>
          </div>
          <div className="border-white/40 relative border-4 px-4 pt-14 pb-8">
            <div className="absolute -top-8 left-8 bg-blue-900 px-4 text-white">
              <FeatureIcon icon={FaChartGantt} />
            </div>
            <p className="mb-3 font-medium uppercase text-white">
            Customizable Reporting:
            </p>
            <p className="text-blue-200">
            Generate detailed reports tailored to your specific needs, providing insights for informed decision-making.
            </p>
          </div>
          <div className="border-white/40 relative border-4 px-4 pt-14 pb-8">
            <div className="absolute -top-8 left-8 bg-blue-900 px-4 text-white">
              <FeatureIcon icon={CgTouchpad} />
            </div>
            <p className="mb-3 font-medium uppercase text-white">
            User-Friendly Interface
            </p>
            <p className="text-blue-200">
            Intuitive and easy-to-use platform, allowing seamless navigation and quick adoption for your team.
            </p>
          </div>
          <div className="border-white/40 relative border-4 px-4 pt-14 pb-8">
            <div className="absolute -top-8 left-8 bg-blue-900 px-4 text-white">
              <FeatureIcon icon={MdImportantDevices} />
            </div>
            <p className="mb-3 font-medium uppercase text-white">
            Multi-Platform Accessibility
            </p>
            <p className="text-blue-200">
            Access the system from anywhere, anytime, across various devices, ensuring flexibility in managing your inventory on the go.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
