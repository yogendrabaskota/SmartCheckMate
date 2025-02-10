const Contact = () => {
    return (
        // Contact Page with Blue and White Theme
        <section id="contact" className="relative w-full min-h-screen bg-white text-blue-600">
            <h1 className="text-4xl p-4 font-bold tracking-wide mt-10">
                Contact
            </h1>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-400 h-32 w-full"></div>
        
            {/* Wrapper */}
            <div className="relative p-5 lg:px-20 flex flex-col md:flex-row items-center justify-center">
                
                {/* Social Media */}
                <div className="w-full md:w-1/2 p-5 md:px-0 mx-5">
                    <div className="bg-blue-100 border border-blue-500 w-full lg:w-1/2 h-full p-5 pt-8">
                        <h3 className="text-2xl font-semibold mb-5">
                            My Social Media
                        </h3>
                        <div className="flex flex-col gap-3">
                            <a href="#" className="flex items-center hover:text-white hover:bg-blue-500 p-2">
                                <svg fill="currentColor" className="w-6 h-6 m-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                Github
                            </a>
                            <a href="#" className="flex items-center hover:text-white hover:bg-blue-500 p-2">
                                <svg fill="currentColor" className="w-6 h-6 m-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M21.8 0H2.2C1 0 0 1 0 2.2V21.8C0 23 1 24 2.2 24H21.8C23 24 24 23 24 21.8V2.2C24 1 23 0 21.8 0zM7 20H3V9h4v11zm-2-13c-1.2 0-2-.8-2-1.9C3 4 3.8 3 5 3s2 .8 2 1.9c0 1.1-.8 1.9-2 1.9zM21 20h-4v-6c0-1.6-1.1-2-1.5-2S14 12.2 14 14v6h-4V9h4v1.6c.6-.9 1.6-1.6 3.5-1.6 2.1 0 3.5 1.5 3.5 4v7z"/>
                                </svg>
                                Linkedin
                            </a>
                        </div>
                    </div>
                </div>
        
                {/* Contact Form */}
                <form action="#" className="w-full md:w-1/2 border border-blue-500 p-6 bg-blue-100">
                    <h2 className="text-2xl pb-3 font-semibold">
                        Send Message
                    </h2>
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
