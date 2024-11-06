'use client';
import { motion } from 'framer-motion';
import Image from 'next/image'; // For optimized image handling
import Link from 'next/link';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'; // For icons
import Navbar from '../Components/Navbar';

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <hr className="border-b-2 border-gray-200 my-5" />

      <section className="relative bg-black text-white overflow-hidden pt-24">
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Get in Touch
              <motion.div
                className="w-24 h-1 bg-blue-500 mt-4 mx-auto rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              We’re eager to hear from you! Whether you have questions, feedback, or just want to say hi, drop us a line, and we’ll get back to you as soon as possible.
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="w-full max-w-3xl bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-xl p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <form
              className="flex flex-col space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Form submitted!');
              }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition duration-300"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition duration-300"
                  required
                />
              </div>
              <textarea
                placeholder="Your Message"
                className="bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition duration-300"
                rows="6"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-8">Our Office</h2>
            <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-5xl mx-auto">
              {/* Address Section */}
              <div className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-start space-y-4 transform hover:scale-105">
                <FaMapMarkerAlt className="text-blue-500 text-4xl" />
                <h3 className="text-xl font-semibold">Address</h3>
                <p className="text-lg">Shanthi nivasa near sub registrar office Vinayaka Nagar</p>
                <p className="text-lg">Pavagada, 561202.</p>
                <Link href="/location" className="mt-4 text-blue-500 hover:underline">View on Map</Link>
              </div>

              {/* Phone Section */}
              <div className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-start space-y-4 transform hover:scale-105">
                <FaPhoneAlt className="text-blue-500 text-4xl" />
                <h3 className="text-xl font-semibold">Phone</h3>
                <p className="text-lg">+91 (9036)019290</p>
                <Link href="tel:+919036019290" className="mt-4 text-blue-500 hover:underline">Call Us</Link>
              </div>

              {/* Email Section */}
              <div className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-start space-y-4 transform hover:scale-105">
                <FaEnvelope className="text-blue-500 text-4xl" />
                <h3 className="text-xl font-semibold">Email</h3>
                <p className="text-lg">krushigowrava@gmail.com</p>
                <Link href="mailto:krushigowrava@gmail.com" className="mt-4 text-blue-500 hover:underline">Send an Email</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
