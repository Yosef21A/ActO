import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Import Bootstrap JS
import "./Hero.css";
//import vid from "./vid.mp4";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div>
      {/* Hero Section with Video */}
      <div className="hero-video-section">
        <video autoPlay muted loop playsInline>
          <source src="vid" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="text-white">
          <div className="container">
            <h1 className="display-4 fw-bold">Lorem Ipsum: Dolor Sit Amet</h1>
            <p className="lead">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor felis et justo efficitur, in volutpat ipsum pharetra.
            </p>
            <Link to="/signup" className="btn btn-light btn-lg mt-3">
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Key Features</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm text-center">
                <div className="card-body">
                  <h5 className="card-title">Feature One</h5>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula bibendum enim.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm text-center">
                <div className="card-body">
                  <h5 className="card-title">Feature Two</h5>
                  <p className="card-text">
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer nec odio. Praesent libero.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm text-center">
                <div className="card-body">
                  <h5 className="card-title">Feature Three</h5>
                  <p className="card-text">
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">Frequently Asked Questions</h2>
          <div className="accordion" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Lorem ipsum dolor sit amet?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor felis et justo efficitur.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  How do I use this service?
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Nulla facilisi. Donec condimentum metus sed nisi tristique, nec tincidunt enim faucibus. Nulla sollicitudin.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Is this service free to use?
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Aenean auctor, nunc a fermentum laoreet, tortor ipsum tincidunt erat, eget dapibus magna odio id lorem.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-secondary text-white py-5 text-center">
        <div className="container">
          <h2 className="fw-bold">Ready to Get Started?</h2>
          <p className="lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac sapien arcu. Integer non magna in felis tempor.
          </p>
          <Link to="/signup" className="btn btn-dark btn-lg">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Hero;
