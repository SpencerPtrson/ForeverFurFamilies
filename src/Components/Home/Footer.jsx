import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import "./footer.css";

// Add the Font Awesome brand icons to the library
library.add(fab);

export default function Footer() {
  return (
    <>
      {/* Main Container - remove if you want full width */}
      <div className="container.fluid mt-5">
        {/* Footer */}
        <footer
          className="text-center text-lg-start text-white"
          style={{ backgroundColor: "#1c2331" }}
        >
          {/* Social Media Section */}
          <section
            className="d-flex justify-content-between p-4"
            style={{ backgroundColor: "#1010c2" }}
          >
            {/* Left Section */}
            <div className="me-5">
              <span>Stay connected with us on social networks:</span>
            </div>
            {/* End of Left Section */}

            {/* Right Section */}
            <div>
              <a href="" className="text-white me-4">
                <FontAwesomeIcon icon={["fab", "facebook-f"]} />
              </a>
              <a href="" className="text-white me-4">
                <FontAwesomeIcon icon={["fab", "twitter"]} />
              </a>
              <a href="" className="text-white me-4">
                <FontAwesomeIcon icon={["fab", "instagram"]} />
              </a>
              <a href="" className="text-white me-4">
                <FontAwesomeIcon icon={["fab", "linkedin-in"]} />
              </a>
              <a href="" className="text-white me-4">
                <FontAwesomeIcon icon={["fab", "youtube"]} />
              </a>
            </div>
            {/* End of Right Section */}
          </section>
          {/* End of Social Media Section */}

          {/* Links Section */}
          <section>
            <div className="container text-center text-md-start mt-5">
              {/* Grid Column */}
              <div className="row mt-3">
                {/* Grid Column */}
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  {/* Company Name */}
                  <h6 className="text-uppercase fw-bold">
                    ForeverFur Families
                  </h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "60px",
                      backgroundColor: "#7c4dff",
                      height: "2px",
                    }}
                  />
                  <p>Helping you find your forever pets since 2023!</p>
                </div>
                {/* Grid Column */}

                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  {/* Links */}
                  <h6 className="text-uppercase fw-bold">Adoption</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "60px",
                      backgroundColor: "#7c4dff",
                      height: "2px",
                    }}
                  />
                  <p>
                    <a href="#!" className="text-white">
                      Adopting a Pet
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Benefits of Multiple Pets
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Animal Shelters & Rescues
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Other Types of Pets
                    </a>
                  </p>
                </div>

                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  {/* Links */}
                  <h6 className="text-uppercase fw-bold">Dogs & Puppies</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "60px",
                      backgroundColor: "#7c4dff",
                      height: "2px",
                    }}
                  />
                  <p>
                    <a href="#!" className="text-white">
                      Dog Adoption
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Dog Breeds
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Feeding Your Dog
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Dog Behavior
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Dog Health & Wellness
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Dog Training
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Other Dog Information
                    </a>
                  </p>
                </div>

                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  {/* Links */}
                  <h6 className="text-uppercase fw-bold">Cats & Kittens</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "60px",
                      backgroundColor: "#7c4dff",
                      height: "2px",
                    }}
                  />
                  <p>
                    <a href="#!" className="text-white">
                      Cat Adoption
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Cat Breeds
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Feeding Your Cat
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Cat Behavior
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Cat Health & Wellness
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Cat Training
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">
                      Other Cat Information
                    </a>
                  </p>
                </div>

                {/* ... (other grid columns) ... */}
              </div>
              {/* Grid Row */}
            </div>
          </section>
          {/* End of Links */}

          {/* Copyright */}
          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            ©2023 ForeverFurFamilies
          </div>
          {/* End of Copyright */}
        </footer>
        {/* Footer */}
      </div>
      {/* End of Container */}
    </>
  );
}
