import React, { useState } from "react";
import NavBar from "../components/NavBar";
import CTA from "./components/CTA";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    budget: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted:", formData);
    setIsSubmitting(false);

    // Reset form or show success message
    alert("Thank you! Your message has been sent successfully.");
  };

  const contactMethods = [
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: "Call Us",
      subtitle: "Mon-Fri from 8am to 6pm",
      contact: "+1 (555) 100-2000",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Email Us",
      subtitle: "Our team will respond within 24 hours",
      contact: "contact@febwin.co.ke",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: "Visit Us",
      subtitle: "Come say hello at our office HQ",
      contact: "456 Property Avenue, Suite 200",
    },
  ];

  const departments = [
    {
      title: "Property Sales",
      description: "Buying or selling properties",
      email: "sales@febwin.co.ke",
      phone: "+1 (555) 345-6789",
      icon: "🏠",
    },
    {
      title: "Rental Services",
      description: "Property rentals and leasing",
      email: "rentals@febwin.co.ke",
      phone: "+1 (555) 234-5678",
      icon: "🔑",
    },
    {
      title: "Property Management",
      description: "Professional property management",
      email: "management@febwin.co.ke",
      phone: "+1 (555) 456-7890",
      icon: "⚙️",
    },
    {
      title: "General Inquiries",
      description: "Questions and general support",
      email: "info@febwin.co.ke",
      phone: "+1 (555) 123-4567",
      icon: "💬",
    },
  ];

  return (
    <div className="min-h-screen">
      <NavBar />

      {/* Hero Section */}
      <div className="relative pt-20 pb-16 overflow-hidden">
        {/* Background with gradient and pattern */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${
              formData.secondary || "#F5F5F5"
            } 0%, #FFF 50%, ${formData.tertiary || "#cdc7ecea"} 100%)`,
          }}
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

        {/* Floating shapes */}
        <div
          className="absolute top-20 left-10 w-20 h-20 rounded-full opacity-15 animate-pulse"
          style={{ backgroundColor: "#3264ff" }}
        ></div>
        <div
          className="absolute top-40 right-20 w-16 h-16 rounded-full opacity-10 animate-pulse delay-300"
          style={{ backgroundColor: "#343a40" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-12 h-12 rounded-full opacity-15 animate-pulse delay-700"
          style={{ backgroundColor: "#3264ff" }}
        ></div>

        <div className="relative  mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span
                style={{
                  background: `linear-gradient(135deg, #3264ff 0%, #343a40 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                className="text-5xl md:text-5xl font-bold"
              >
                Get in Touch
              </span>
            </h1>
            <p
              className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed"
              style={{ color: "#343a40" }}
            >
              Ready to find your dream property? Our expert team at Febwin
              Agencies is here to help you every step of the way.
            </p>

            {/* Quick contact methods */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="group relative rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 border"
                  style={{
                    backgroundColor: "#FFF",
                    borderColor: "#cdc7ecea",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: "#3264ff" }}
                  >
                    {method.icon}
                  </div>
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ color: "#343a40" }}
                  >
                    {method.title}
                  </h3>
                  <p
                    className="text-sm mb-3"
                    style={{ color: "#343a40", opacity: 0.7 }}
                  >
                    {method.subtitle}
                  </p>
                  <p className="font-medium" style={{ color: "#3264ff" }}>
                    {method.contact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="relative">
              <div
                className="rounded-3xl p-8 lg:p-12 relative overflow-hidden"
                style={{
                  backgroundColor: "#FFF",
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)",
                }}
              >
                {/* Gradient background */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{ backgroundColor: "#F5F5F5" }}
                ></div>

                <div className="relative z-10">
                  <h2
                    className="text-3xl font-bold mb-2"
                    style={{ color: "#343a40" }}
                  >
                    Send us a message
                  </h2>
                  <p
                    className="mb-8"
                    style={{ color: "#343a40", opacity: 0.7 }}
                  >
                    We'd love to hear from you. Send us a message and we'll
                    respond as soon as possible.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: "#343a40" }}
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 outline-none ${
                            focusedField === "name"
                              ? "bg-white"
                              : "hover:border-gray-300"
                          }`}
                          style={{
                            backgroundColor:
                              focusedField === "name" ? "#FFF" : "#F5F5F5",
                            borderColor:
                              focusedField === "name" ? "#3264ff" : "#cdc7ecea",
                          }}
                          placeholder="John Doe"
                          required
                        />
                      </div>

                      <div className="relative">
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: "#343a40" }}
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField("phone")}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 outline-none ${
                            focusedField === "phone"
                              ? "bg-white"
                              : "hover:border-gray-300"
                          }`}
                          style={{
                            backgroundColor:
                              focusedField === "phone" ? "#FFF" : "#F5F5F5",
                            borderColor:
                              focusedField === "phone"
                                ? "#3264ff"
                                : "#cdc7ecea",
                          }}
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#343a40" }}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 outline-none"
                        style={{
                          backgroundColor:
                            focusedField === "email" ? "#FFF" : "#F5F5F5",
                          borderColor:
                            focusedField === "email" ? "#3264ff" : "#cdc7ecea",
                        }}
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div className="relative">
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#343a40" }}
                      >
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        rows="6"
                        className="w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 outline-none resize-none"
                        style={{
                          backgroundColor:
                            focusedField === "message" ? "#FFF" : "#F5F5F5",
                          borderColor:
                            focusedField === "message"
                              ? "#3264ff"
                              : "#cdc7ecea",
                        }}
                        placeholder="Tell us about your property requirements, preferred location, timeline, or any specific questions..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ backgroundColor: "#3264ff" }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#2451cc")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#3264ff")
                      }
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                          Sending...
                        </div>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Contact Information & Departments */}
            <div className="space-y-8">
              {/* Office Information */}
              <div className="rounded-3xl p-8 relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{ backgroundColor: "#cdc7ecea" }}
                ></div>
                <div className="relative z-10">
                  <h3
                    className="text-2xl font-bold mb-6"
                    style={{ color: "#343a40" }}
                  >
                    Our Office
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                        style={{ backgroundColor: "#3264ff" }}
                      >
                        📍
                      </div>
                      <div>
                        <h4
                          className="font-semibold"
                          style={{ color: "#343a40" }}
                        >
                          Address
                        </h4>
                        <p style={{ color: "#343a40", opacity: 0.7 }}>
                          456 Property Avenue, Suite 200
                        </p>
                        <p style={{ color: "#343a40", opacity: 0.7 }}>
                          Real Estate District, City Center 54321
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                        style={{ backgroundColor: "#3264ff" }}
                      >
                        🕒
                      </div>
                      <div>
                        <h4
                          className="font-semibold"
                          style={{ color: "#343a40" }}
                        >
                          Business Hours
                        </h4>
                        <p style={{ color: "#343a40", opacity: 0.7 }}>
                          Monday - Friday: 8:30 AM - 6:00 PM
                        </p>
                        <p style={{ color: "#343a40", opacity: 0.7 }}>
                          Saturday: 9:00 AM - 4:00 PM
                        </p>
                        <p style={{ color: "#343a40", opacity: 0.7 }}>
                          Sunday: By Appointment Only
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                to={"/about"}
                className="bg-primary cursor-pointer w-[50%] justify-center flex gap-1 items-center mt-2 text-white p-3 rounded-xl hover:bg-blue-600 transition-colors"
              >
                <span> More About Us</span>
                <FaArrowRight className="w-4 h-4" />
              </Link>

              {/* Departments */}
              <div className="rounded-3xl p-8 relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{ backgroundColor: "#F5F5F5" }}
                ></div>
                <div className="relative z-10">
                  <h3
                    className="text-2xl font-bold mb-6"
                    style={{ color: "#343a40" }}
                  >
                    Departments
                  </h3>
                  <div className="space-y-4">
                    {departments.map((dept, index) => (
                      <div
                        key={index}
                        className="group p-4 rounded-2xl transition-all duration-300 border border-transparent"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(255, 255, 255, 0.8)";
                          e.currentTarget.style.borderColor = "#cdc7ecea";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.borderColor = "transparent";
                        }}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="text-2xl">{dept.icon}</div>
                          <div className="flex-1">
                            <h4
                              className="font-semibold transition-colors duration-300"
                              style={{ color: "#343a40" }}
                            >
                              {dept.title}
                            </h4>
                            <p
                              className="text-sm mb-2"
                              style={{ color: "#343a40", opacity: 0.7 }}
                            >
                              {dept.description}
                            </p>
                            <div className="space-y-1">
                              <p
                                className="text-sm"
                                style={{ color: "#3264ff" }}
                              >
                                {dept.email}
                              </p>
                              <p
                                className="text-sm"
                                style={{ color: "#343a40", opacity: 0.7 }}
                              >
                                {dept.phone}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="py-16" style={{ backgroundColor: "#F5F5F5" }}>
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "#343a40" }}
            >
              Find Our Office
            </h2>
            <p className="text-xl" style={{ color: "#343a40", opacity: 0.7 }}>
              Located in...
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1620.2055255056137!2d35.8707974565314!3d-1.0907568438787016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182c039fb649c847%3A0x3f15a62d2986c7a7!2sShell!5e1!3m2!1sen!2ske!4v1750229449676!5m2!1sen!2ske"
              allowfullscreen={true}
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              className="w-full h-[500px] "
            ></iframe>
          </div>
        </div>
      </div>

      <CTA />
      <Footer />
    </div>
  );
}

export default ContactUs;
