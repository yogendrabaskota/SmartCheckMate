/* eslint-disable no-unused-vars */
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

const Contact = () => {
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
                            {/* <a href="#" className="flex items-center hover:text-white hover:bg-blue-500 p-2">
                                <FaFacebook className="w-6 h-6 m-2" /> Facebook
                            </a> */}
                        </div>
                    </div>
                </div>
        
                {/* Contact Form */}
                <form action="#" className="w-full md:w-1/2 border border-blue-500 p-6 bg-blue-100">
                    <h2 className="text-2xl pb-3 font-semibold">Send Message</h2>
                    <div>
                        <div className="flex flex-col mb-3">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" className="px-3 py-2 bg-white border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>
                        <div className="flex flex-col mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" className="px-3 py-2 bg-white border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>
                        <div className="flex flex-col mb-3">
                            <label htmlFor="message">Message</label>
                            <textarea rows="4" id="message" className="px-3 py-2 bg-white border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
                        </div>
                    </div>
                    <div className="w-full pt-3">
                        <button type="submit" className="w-full bg-blue-500 border border-blue-500 px-4 py-2 text-blue-900 font-semibold hover:bg-blue-700 hover:text-white text-xl cursor-pointer">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Contact;
