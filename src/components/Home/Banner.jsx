import Button from "../Button/Button";
import ButtonOutline from "../Button/ButtonOutline";
const Banner = () => {
  return (
    <>
      <section className="bg-[#213555] text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-green-300 via-[#E5D283] to-[#4F709C] bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Master Your Inventory
              <span className="sm:block"> Increase More Production. </span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Optimize, Organize, and Excel in Inventory Management. Simplify your workflow with our intuitive system, designed to keep your business in perfect sync.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button label="Get Started" bgColor={true} />
              <ButtonOutline bgColor="white" color="black" label="Learn More" outline={true} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
