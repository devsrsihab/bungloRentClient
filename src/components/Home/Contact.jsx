import Button from "../Button/Button";
import Container from "../Shared/Container";
import Heading from "../Shared/Heading/Heading";

const Contact = () => {
  return (
    <>
      <Container>
        <div className="font-sans text-base text-gray-900 sm:px-10">
          <div className="text-base text-gray-900">
            <div className="mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
              <Heading title="Get in touch" subtitle={"We'd love to hear from you"} center={true} />
            </div>
          </div>
          <div className="mx-auto mb-20 flex w-full max-w-screen-lg flex-col overflow-hidden rounded-xl text-gray-900 md:flex-row md:border md:shadow-lg">
            <form className="mx-auto w-full max-w-xl border-gray-200 px-10 py-8 md:px-8">
              <div className="mb-4">
                <label className="text mb-2 block font-medium" htmlFor="email">
                  Your e-mail:
                </label>
                <input
                  className="w-full rounded border border-gray-300 px-3 py-2 outline-none ring-blue-500 focus:ring"
                  id="email"
                  type="email"
                  required=""
                />
              </div>
              <div className="mb-4">
                <label
                  className="text mb-2 block font-medium"
                  htmlFor="subject"
                >
                  Subject:
                </label>
                <input
                  className="w-full rounded border border-gray-300 px-3 py-2 outline-none ring-blue-500 focus:ring"
                  id="subject"
                  type="subject"
                  required=""
                />
              </div>
              <div className="mb-4">
                <label
                  className="text mb-2 block font-medium"
                  htmlFor="message"
                >
                  Message:
                </label>
                <textarea
                  className="h-52 w-full rounded border border-gray-300 px-3 py-2 outline-none ring-blue-500 focus:ring"
                  id="message"
                  required=""
                  defaultValue={""}
                />
              </div>
              <div className="flex items-center">
                <div className="flex-1" />
               <Button label="Send message" bgColor={'primary'} />
              </div>
            </form>
            <div className="mt-10 bg-primary px-10 py-8 text-gray-100 md:mt-0 md:ml-auto">
              <div className="">
                <p className="mb-4">
                  Email:
                  <a href="#" className="font-semibold underline">
                    support@apps.io
                  </a>
                </p>
                <p className="mb-4">
                  Phone:
                  <a href="#" className="font-semibold underline">
                    +46 (0) 10-32 32 322
                  </a>
                </p>
                <hr className="my-2 h-0 border-t border-r-0 border-b-0 border-l-0 border-gray-300" />
                <p className="mb-4">Org.no: 63452-2832</p>
                <p className="mb-4">VAT no: 32353</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contact;
