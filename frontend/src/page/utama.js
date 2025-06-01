import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import "bulma/css/bulma.min.css";
import "bulma-carousel/dist/css/bulma-carousel.min.css";
import bulmaCarousel from "bulma-carousel";

function Utama() {
  useEffect(() => {
    bulmaCarousel.attach(".carousel", {
      slidesToScroll: 1,
      slidesToShow: 1,
      autoplay: true,
      loop: true,
    });
  }, []);

  return (
    <>
      <section className="section">
        <div className="container">
          <div
            className="carousel carousel-animated carousel-animate-slide"
            data-autoplay="true"
          >
            <div className="carousel-container">
              <div className="carousel-item is-active">
                <img
                  src={require("../gambar/Himatif.png")}
                  alt="Slide 1"
                  style={{ maxHeight: 300, margin: "0 auto" }}
                />
              </div>
            </div>
            <div className="carousel-navigation is-centered">
              <div className="carousel-nav-left">
                <i className="fa fa-chevron-left" aria-hidden="true"></i>
              </div>
              <div className="carousel-nav-right">
                <i className="fa fa-chevron-right" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Utama;
