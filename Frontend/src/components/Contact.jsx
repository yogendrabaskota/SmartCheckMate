/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Contact = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const [message, setMessage] = useState(null); // For success or error messages
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send POST request to the API
    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });


      const result = await response.json();
      if (response.ok) {
        // Handle success (e.g., show success message)
        setMessage({ type: 'success', text: result.message });
        //alert("Message sent successfully!");
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          message: ""
        });
      } else {
        // Handle error
       // alert("Error sending message.");
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      // Handle network error
     // alert("Network error, please try again.");
      setMessage({ type: 'error', text: 'Something went wrong. Please try again later.' });
    }
  };

  return (
    <section id="contact" className="relative w-full min-h-screen bg-white text-blue-600">
      <h1 className="text-4xl p-4 font-bold tracking-wide mt-10">Contact</h1>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-400 h-32 w-full"></div>

      {/* Wrapper */}
      <div className="relative p-5 lg:px-20 flex flex-col md:flex-row items-center justify-center">
        {/* Social Media */}
        <div className="w-full md:w-1/2 p-5 md:px-0 mx-5">
          <div className="bg-blue-100 border border-blue-500 w-full lg:w-1/2 h-full p-5 pt-8">
            <h3 className="text-2xl font-semibold mb-5">My Social Media</h3>
            <div className="flex flex-col gap-3">
              <a href="https://github.com/yogendrabaskota" className="flex items-center hover:text-white hover:bg-blue-500 p-2">
                <FaGithub className="w-6 h-6 m-2" /> Github
              </a>
              <a href="https://www.linkedin.com/in/yogendrabaskota/" className="flex items-center hover:text-white hover:bg-blue-500 p-2">
                <FaLinkedin className="w-6 h-6 m-2" /> LinkedIn
              </a>
              <a href="https://x.com/baskotasujan_" className="flex items-center hover:text-white hover:bg-blue-500 p-2">
                <FaTwitter className="w-6 h-6 m-2" /> X
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 border border-blue-500 p-6 bg-blue-100">
          <h2 className="text-2xl pb-3 font-semibold">Send Message</h2>
          <div>
            <div className="flex flex-col mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="px-3 py-2 bg-white border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="px-3 py-2 bg-white border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col mb-3">
              <label htmlFor="message">Message</label>
              <textarea
                rows="4"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="px-3 py-2 bg-white border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>
          </div>
          <div className="w-full pt-3">
            <button
              type="submit"
              className="w-full bg-blue-500 border border-blue-500 px-4 py-2 text-blue-900 font-semibold hover:bg-blue-700 hover:text-white text-xl cursor-pointer"
            >
              Send
            </button>

            {message && (
                  <div
                    className={`mt-4 p-3 rounded-lg ${
                      message.type === 'success'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
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
