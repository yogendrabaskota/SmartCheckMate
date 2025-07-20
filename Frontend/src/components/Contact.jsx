/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://smartcheckmate.onrender.com/api/data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setMessage({ type: "success", text: result.message });
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen bg-white text-[#1F2937]"
    >
      <h1 className="text-4xl p-4 font-bold tracking-wide mt-10 text-center">
        Contact
      </h1>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#10B981] bg-opacity-20 h-32 w-full"></div>

      {/* Wrapper */}
      <div className="relative p-5 lg:px-20 flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Social Media */}
        <div className="w-full md:w-1/2 p-5 md:px-0">
          <div className="bg-[#f0fdf4] border border-[#10B981] w-full lg:w-1/2 h-full p-5 pt-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold mb-5 text-[#1F2937]">
              My Social Media
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://github.com/yogendrabaskota"
                className="flex items-center hover:text-white hover:bg-[#10B981] p-2 rounded-md transition duration-300"
              >
                <FaGithub className="w-6 h-6 m-2" /> Github
              </a>
              <a
                href="https://www.linkedin.com/in/yogendrabaskota/"
                className="flex items-center hover:text-white hover:bg-[#10B981] p-2 rounded-md transition duration-300"
              >
                <FaLinkedin className="w-6 h-6 m-2" /> LinkedIn
              </a>
              <a
                href="https://x.com/baskotasujan_"
                className="flex items-center hover:text-white hover:bg-[#10B981] p-2 rounded-md transition duration-300"
              >
                <FaTwitter className="w-6 h-6 m-2" /> X
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 border border-[#10B981] p-6 bg-[#f0fdf4] rounded-lg shadow-sm"
        >
          <h2 className="text-2xl pb-3 font-semibold text-[#1F2937]">
            Send Message
          </h2>
          <div>
            <div className="flex flex-col mb-4">
              <label htmlFor="name" className="mb-1 text-[#1F2937]">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="px-3 py-2 bg-white border border-[#10B981] rounded focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="mb-1 text-[#1F2937]">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="px-3 py-2 bg-white border border-[#10B981] rounded focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="message" className="mb-1 text-[#1F2937]">
                Message
              </label>
              <textarea
                rows="4"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="px-3 py-2 bg-white border border-[#10B981] rounded focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                required
              ></textarea>
            </div>
          </div>
          <div className="w-full pt-3">
            <button
              type="submit"
              className="w-full bg-[#10B981] px-4 py-3 text-white font-semibold hover:bg-[#0e9e6d] rounded transition duration-300 text-lg cursor-pointer shadow-md"
            >
              Send Message
            </button>

            {message && (
              <div
                className={`mt-4 p-3 rounded-lg ${
                  message.type === "success"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {message.text}
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
