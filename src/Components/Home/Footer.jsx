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
            <div className="px-5">
              <span>Stay connected with us on social networks:</span>
            </div>
            {/* End of Left Section */}

            {/* Right Section */}
            <div className="px-5">
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
                    <a target="_blank" rel="noopener noreferrer" href="https://www.hepper.com/why-adopting-a-pet-is-better-than-buying/" className="text-white">
                      Why adopt a pet from a shelter?
                    </a>
                  </p>
                  <p>
                    <a href="https://www.purina.com/articles/dog/getting-a-dog/benefits-of-multiple-pets" className="text-white">
                      Benefits of Multiple Pets
                    </a>
                  </p>
                  <p>
                    <a href="https://animals.howstuffworks.com/pets/animal-shelters.htm" className="text-white">
                      Animal Shelters & Rescues
                    </a>
                  </p>
                  <p>
                    <a href="/allPets?type=Other" className="text-white">
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
                    <a href="/allPets?type=Dog" className="text-white">
                      Dog Adoption
                    </a>
                  </p>
                  <p>
                    <a href="https://www.akc.org/dog-breeds/" className="text-white">
                      Dog Breeds
                    </a>
                  </p>
                  <p>
                    <a href="https://www.hillspet.com/dog-care/nutrition-feeding/how-much-dog-food-how-often?cq_src=google_ads&cq_cmp=386709379&cq_con=1224856176294976&cq_term=what%20to%20feed%20a%20dog&cq_med=&cq_plac=&cq_net=o&cq_plt=gp&gclid=3bf2a0f45ba81e8daa01c57592e440c1&gclsrc=3p.ds&msclkid=3bf2a0f45ba81e8daa01c57592e440c1&utm_source=bing&utm_medium=cpc&utm_campaign=US_PET_EQ_General_Dog_EVG_TEXT_CTGY_EXT_ATT_CPT_NA_RFUS_EN_HLN%20HIL%20132&utm_term=what%20to%20feed%20a%20dog&utm_content=Dogs_Feeding" className="text-white">
                      Feeding Your Dog
                    </a>
                  </p>
                  <p>
                    <a href="https://pethelpful.com/dogs/common-dog-behaviors-you-should-know-their-meaning" className="text-white">
                      Dog Behavior
                    </a>
                  </p>
                  <p>
                    <a href="https://www.akc.org/expert-advice/health/how-to-keep-your-dog-healthy/" className="text-white">
                      Dog Health & Wellness
                    </a>
                  </p>
                  <p>
                    <a href="https://www.thesprucepets.com/steps-to-train-your-dog-1118273" className="text-white">
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
                    <a href="/allPets?type=Cat" className="text-white">
                      Cat Adoption
                    </a>
                  </p>
                  <p>
                    <a href="https://cats.com/cat-Breeds" className="text-white">
                      Cat Breeds
                    </a>
                  </p>
                  <p>
                    <a href="https://vcahospitals.com/know-your-pet/feeding-times-and-frequency-for-cats" className="text-white">
                      Feeding Your Cat
                    </a>
                  </p>
                  <p>
                    <a href="https://www.rd.com/list/how-to-decode-your-cats-behavior/" className="text-white">
                      Cat Behavior
                    </a>
                  </p>
                  <p>
                    <a href="https://www.petmd.com/cat/general-health/complete-cat-health-guide-every-life-stage" className="text-white">
                      Cat Health & Wellness
                    </a>
                  </p>
                  <p>
                    <a href="https://revealpetfood.com/pet-wellbeing/house-training-a-cat/" className="text-white">
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
