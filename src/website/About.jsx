import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function About() {
  const services = [
    {
      icon: "🏠",
      title: "Rental House Search",
      description:
        "Find your perfect rental home with our extensive database and personalized search assistance. We match you with properties that fit your lifestyle and budget.",
      features: [
        "Personalized matching",
        "Virtual tours",
        "Lease negotiation",
        "Move-in assistance",
      ],
    },
    {
      icon: "⚙️",
      title: "Property Management",
      description:
        "Comprehensive property management services for property owners. We handle everything from tenant screening to maintenance, maximizing your investment returns.",
      features: [
        "Tenant screening",
        "Rent collection",
        "Maintenance coordination",
        "Financial reporting",
      ],
    },
    {
      icon: "🏖️",
      title: "BNBs & Holiday Homes",
      description:
        "Discover unique vacation rentals and holiday homes for your perfect getaway. From cozy cottages to luxury villas, we have something for every traveler.",
      features: [
        "Curated properties",
        "Instant booking",
        "24/7 support",
        "Local experiences",
      ],
    },
    {
      icon: "🏡",
      title: "Properties for Sale",
      description:
        "Browse our premium selection of houses, condos, and land for sale. Our expert agents guide you through every step of the buying process.",
      features: [
        "Market analysis",
        "Property valuation",
        "Negotiation support",
        "Legal assistance",
      ],
    },
  ];

  const values = [
    {
      icon: "🎯",
      title: "Excellence",
      description:
        "We strive for excellence in every transaction, ensuring our clients receive the highest quality service and results.",
    },
    {
      icon: "🤝",
      title: "Integrity",
      description:
        "Honesty and transparency are at the core of everything we do. We build lasting relationships based on trust.",
    },
    {
      icon: "💡",
      title: "Innovation",
      description:
        "We embrace technology and innovative solutions to provide our clients with the best possible experience.",
    },
    {
      icon: "❤️",
      title: "Client-First",
      description:
        "Our clients' needs come first. We listen, understand, and deliver personalized solutions for every unique situation.",
    },
  ];

  const stats = [
    { number: "500+", label: "Properties Managed" },
    { number: "1000+", label: "Happy Clients" },
    { number: "15+", label: "Years Experience" },
    { number: "50+", label: "Expert Agents" },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "👩‍💼",
      description:
        "15+ years in real estate with a passion for helping families find their perfect homes.",
    },
    {
      name: "Michael Chen",
      role: "Head of Sales",
      image: "👨‍💼",
      description:
        "Expert negotiator with a track record of successful high-value property transactions.",
    },
    {
      name: "Emily Rodriguez",
      role: "Property Manager",
      image: "👩‍💻",
      description:
        "Specialist in property management with focus on maximizing investment returns.",
    },
    {
      name: "David Thompson",
      role: "Holiday Homes Director",
      image: "👨‍🎯",
      description:
        "Curates unique vacation experiences and manages our premium holiday portfolio.",
    },
  ];

  return (
    <div className="min-h-screen">
      <NavBar />

      {/* Hero Section */}
      <div className="relative pt-20 pb-16 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #F5F5F5 0%, #FFF 50%, #cdc7ecea 100%)`,
          }}
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

        {/* Floating shapes */}
        <div
          className="absolute top-20 right-10 w-24 h-24 rounded-full opacity-10 animate-pulse"
          style={{ backgroundColor: "#3264ff" }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-16 h-16 rounded-full opacity-15 animate-pulse delay-500"
          style={{ backgroundColor: "#343a40" }}
        ></div>

        <div className="relative  mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center">
            <h1>
              <span
                style={{
                  background: `linear-gradient(135deg, #3264ff 0%, #343a40 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                className="text-5xl md:text-7xl font-bold mb-6"
              >
                About Febwin
              </span>
            </h1>
            <p
              className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed"
              style={{ color: "#343a40" }}
            >
              Your trusted partner in real estate for over 15 years. We're
              dedicated to making your property dreams a reality through
              exceptional service and expertise.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div
                    className="text-3xl md:text-4xl font-bold mb-2"
                    style={{ color: "#3264ff" }}
                  >
                    {stat.number}
                  </div>
                  <div
                    className="text-sm md:text-base"
                    style={{ color: "#343a40", opacity: 0.7 }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-20">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2
                className="text-4xl font-bold mb-6"
                style={{ color: "#343a40" }}
              >
                Our Story
              </h2>
              <div
                className="space-y-6"
                style={{ color: "#343a40", opacity: 0.8 }}
              >
                <p className="text-lg leading-relaxed">
                  Founded in 2009, Febwin Agencies began with a simple mission:
                  to revolutionize the real estate experience by putting clients
                  first. What started as a small team of passionate agents has
                  grown into one of the region's most trusted real estate
                  companies.
                </p>
                <p className="text-lg leading-relaxed">
                  We've helped thousands of families find their dream homes,
                  assisted property owners in maximizing their investments, and
                  created unforgettable vacation experiences through our holiday
                  rental services.
                </p>
                <p className="text-lg leading-relaxed">
                  Our success is built on three pillars: deep market knowledge,
                  innovative technology, and genuine care for our clients'
                  needs. Every transaction is personal to us, and we're
                  committed to delivering results that exceed expectations.
                </p>
              </div>
            </div>

            <div className="relative">
              <div
                className="rounded-3xl p-8 text-center"
                style={{
                  backgroundColor: "#FFF",
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)",
                }}
              >
                <div className="text-8xl mb-6">🏢</div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: "#343a40" }}
                >
                  Febwin Agencies
                </h3>
                <p style={{ color: "#343a40", opacity: 0.7 }}>
                  "Making real estate dreams come true, one client at a time."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20" style={{ backgroundColor: "#F5F5F5" }}>
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-6"
              style={{ color: "#343a40" }}
            >
              Our Services
            </h2>
            <p
              className="text-xl max-w-3xl mx-auto"
              style={{ color: "#343a40", opacity: 0.7 }}
            >
              From finding your dream home to managing your investment
              properties, we offer comprehensive real estate solutions tailored
              to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2"
                style={{
                  backgroundColor: "#FFF",
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)",
                }}
              >
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: "#343a40" }}
                >
                  {service.title}
                </h3>
                <p
                  className="mb-6 leading-relaxed"
                  style={{ color: "#343a40", opacity: 0.7 }}
                >
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-3"
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "#3264ff" }}
                      ></div>
                      <span className="text-sm" style={{ color: "#343a40" }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-6"
              style={{ color: "#343a40" }}
            >
              Our Values
            </h2>
            <p
              className="text-xl max-w-3xl mx-auto"
              style={{ color: "#343a40", opacity: 0.7 }}
            >
              The principles that guide everything we do and define who we are
              as a company.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: "#FFF",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: "#343a40" }}
                >
                  {value.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#343a40", opacity: 0.7 }}
                >
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      {/* <div className="py-20" style={{ backgroundColor: "#F5F5F5" }}>
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-6"
              style={{ color: "#343a40" }}
            >
              Meet Our Team
            </h2>
            <p
              className="text-xl max-w-3xl mx-auto"
              style={{ color: "#343a40", opacity: 0.7 }}
            >
              Our experienced professionals are dedicated to providing you with
              exceptional service and expertise in every real estate
              transaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="text-center rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2"
                style={{
                  backgroundColor: "#FFF",
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)",
                }}
              >
                <div className="text-6xl mb-4">{member.image}</div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "#343a40" }}
                >
                  {member.name}
                </h3>
                <p className="font-medium mb-4" style={{ color: "#3264ff" }}>
                  {member.role}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#343a40", opacity: 0.7 }}
                >
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Mission Statement */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="rounded-3xl p-12"
            style={{
              backgroundColor: "#FFF",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)",
            }}
          >
            <div className="text-6xl mb-8">🎯</div>
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: "#343a40" }}
            >
              Our Mission
            </h2>
            <p
              className="text-xl leading-relaxed mb-8"
              style={{ color: "#343a40", opacity: 0.8 }}
            >
              "To be the most trusted and innovative real estate partner,
              empowering clients to make confident property decisions through
              exceptional service, market expertise, and cutting-edge
              technology."
            </p>
            <div className="flex justify-center">
              <button
                className="px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: "#3264ff" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#2451cc")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#3264ff")
                }
              >
                Join Our Journey
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20" style={{ backgroundColor: "#F5F5F5" }}>
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ color: "#343a40" }}>
            Ready to Work with Us?
          </h2>
          <p
            className="text-xl mb-12 max-w-3xl mx-auto"
            style={{ color: "#343a40", opacity: 0.7 }}
          >
            Whether you're buying, selling, renting, or managing properties, our
            expert team is here to help you achieve your real estate goals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div
              className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: "#FFF",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div className="text-3xl mb-4">📞</div>
              <h3 className="font-bold mb-2" style={{ color: "#343a40" }}>
                Call Us Today
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: "#343a40", opacity: 0.7 }}
              >
                Speak with our experts
              </p>
              <p style={{ color: "#3264ff" }}>+1 (555) 100-2000</p>
            </div>

            <div
              className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: "#FFF",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div className="text-3xl mb-4">✉️</div>
              <h3 className="font-bold mb-2" style={{ color: "#343a40" }}>
                Email Us
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: "#343a40", opacity: 0.7 }}
              >
                Get detailed information
              </p>
              <p style={{ color: "#3264ff" }}>info@febwin.co.ke</p>
            </div>

            <div
              className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: "#FFF",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div className="text-3xl mb-4">📍</div>
              <h3 className="font-bold mb-2" style={{ color: "#343a40" }}>
                Visit Our Office
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: "#343a40", opacity: 0.7 }}
              >
                Meet us in person
              </p>
              <p style={{ color: "#3264ff" }}>456 Property Avenue</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;
