import React from "react";

const Contact = () => {
  return (
    <div className="w-full  py-8 bg-violet-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Page Heading */}
        <div className="mb-10 ">
          <h2 className="text-3xl font-semibold ">Contact Us</h2>

          <p className="mt-3 text-lg text-gray-600">
            We'd love to hear from you. Reach out to FLOW LUXE through any of
            the channels below.
          </p>
        </div>

        {/* Contact Table */}
        <div className="mx-auto max-w-7xl overflow-hidden rounded-xl shadow-lg md:flex gap-4 ">
          <table className="  text-left bg-white ">
            {/* Table Heading */}
            <thead>
              <tr className=" bg-white">
                <th className="px-6 py-5 text-lg">Contact</th>

                <th className="px-6 py-5 text-lg">Information</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              <tr className="border-t border-gray-700 bg-white">
                <td className="px-6 py-4 font-semibold">Phone Number</td>

                <td className="px-6 py-4">09163402353</td>
              </tr>

              <tr className="border-t border-gray-700">
                <td className="px-6 py-4 font-semibold">WhatsApp</td>

                <td className="px-6 py-4">09163402353</td>
              </tr>

              <tr className="border-t border-gray-700">
                <td className="px-6 py-4 font-semibold">Instagram</td>

                <td className="px-6 py-4">@flowluxe</td>
              </tr>

              <tr className="border-t border-gray-700">
                <td className="px-6 py-4 font-semibold">TikTok</td>

                <td className="px-6 py-4">@flowluxe</td>
              </tr>

              <tr className="border-t border-gray-700">
                <td className="px-6 py-4 font-semibold">Email</td>

                <td className="px-6 py-4">flowluxe@example.com</td>
              </tr>

              <tr className="border-t border-gray-700">
                <td className="px-6 py-4 font-semibold">Facebook</td>

                <td className="px-6 py-4">FLOW LUXE Clothing & Fashion</td>
              </tr>

              <tr className="border-t border-gray-700">
                <td className="px-6 py-4 font-semibold">Location</td>

                <td className="px-6 py-4">Ibadan, Nigeria</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4 bg-white rounded-2xl p-4 ">
            {" "}
            <h2 className="mb-2">Send us a message</h2>
            <div
              className="md:flex
             md:flex-col "
            >
              {" "}
              <input
                type="text"
                placeholder="Name"
                className=" px-1  border-1 w-40 mb-4 rounded-b-md"
              />
              <input
                type="text"
                placeholder="Email"
                className=" px-1  border-1 w-40 mb-4 rounded-b-md"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className=" px-1  border-1 w-40 mb-4 rounded-b-md"
              />
              <input
                type="text"
                placeholder="Content of message"
                className=" px-1  border-1 w-90 h-14 mb-4 rounded-b-md"
              />
            </div>
            <button className="border rounded-b-lg py-2 px-2 bg-black text-white hover:translate-y-1">
              {" "}
              Send message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
