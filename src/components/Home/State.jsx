import Container from "../Shared/Container";
import Heading from "../Shared/Heading/Heading";

const State = () => {
  return (
    <>
      <Container>
        {/* section heaing */}
        <Heading title="Driving Success Stories" subtitle='Empowering Businesses Through Efficient Inventory Management' />
        <section className="bg-primary py-10 leading-6 text-gray-100 sm:py-16 lg:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-3xl font-bold leading-9 sm:text-4xl sm:leading-tight">
                Impressive Results in 2 Years
              </h2>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:mt-16 lg:grid-cols-4">
              <div className="relative overflow-hidden border-t-4 border-accent bg-gray-600 shadow">
                <div className="px-6 py-10">
                  <div className="flex items-center">
                    <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
                    44%
                    </h3>
                    <span className="ml-3 text-base font-medium capitalize">
                    Efficiency Leap
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden border-t-4 border-accent bg-gray-600 shadow">
                <div className="px-6 py-10">
                  <div className="flex items-center">
                    <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
                    $75K
                    </h3>
                    <span className="ml-3 text-base font-medium capitalize">
                    Cost Mastery
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden border-t-4 border-accent bg-gray-600 shadow">
                <div className="px-6 py-10">
                  <div className="flex items-center">
                    <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
                    88%
                    </h3>
                    <span className="ml-3 text-base font-medium capitalize">
                    Client Love
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden border-t-4 border-accent bg-gray-600 shadow">
                <div className="px-6 py-10">
                  <div className="flex items-center">
                    <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
                    #1
                    </h3>
                    <span className="ml-3 text-base font-medium capitalize">
                    Industry Acclaim
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
};

export default State;
