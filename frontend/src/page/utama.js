import React, { useEffect, useState, useRef } from "react";
import "bulma/css/bulma.min.css";
import "bulma-carousel/dist/css/bulma-carousel.min.css";
import bulmaCarousel from "bulma-carousel";
import { getKegiatan } from "../api";

function Utama() {
  const [kegiatan, setKegiatan] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const profileSection = useRef(null);
  const carouselRef = useRef(null);
  const profileHimatif = {
    nama: "HIMATIF UPN'V'YK",
    deskripsi:
      "Himpunan Mahasiswa Teknik Informatika UPN Veteran Yogyakarta adalah organisasi kemahasiswaan yang aktif dalam pengembangan minat, bakat, dan keilmuan di bidang informatika.",
    gambar: require("../gambar/Frame367.png"),
    visi: "Menjadikan HIMATIF sebagai tempat berhimpun yang memberikan kebermanfaatan, mendorong kolaborasi yang aspiratif dan inovatif serta menjunjung tinggi Tri Dharma Perguruan Tinggi dan kekeluargaan dalam setiap langkah untuk membangun kohesi yang kuat dan berkembang bersama.",
    misi: [
      "Mendorong kolaborasi yang aspiratif dan inovatif antar seluruh elemen untuk mengembangkan inovasi yang berkelanjutan, serta memperkuat kohesi melalui komunikasi terbuka dan kerja sama yang harmonis.",
      "Menjunjung tinggi kekeluargaan dalam setiap langkah HIMATIF untuk menciptakan lingkungan yang produktif, penuh integritas, dan beretika.",
      "Mengintegrasikan Tri Dharma Perguruan Tinggi dalam setiap langkah HIMATIF untuk mendukung pengembangan ilmu pengetahuan, penelitian, dan pengabdian kepada masyarakat.",
    ],
    kabinet: "KABINET PARAMA ASA",
    periode: "2025/2026",
  };

  useEffect(() => {
    // Ambil data kegiatan terlebih dahulu
    getKegiatan()
      .then((res) => {
        const approved = res.data.filter((k) => k.status === "approved");
        if (approved.length > 0) setKegiatan(approved[0]);
        setDataLoaded(true);
      })
      .catch(() => {
        setDataLoaded(true);
      });
  }, []);

  // Helper: cek apakah ada kegiatan yang disetujui
  const hasKegiatan = Boolean(kegiatan);

  // Render slides array
  const slides = [];
  // Slide 1: Profile HIMATIF
  slides.push(
    <div
      key="profile"
      className="carousel-item"
      style={{
        padding: "2.5rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        className="columns is-vcentered is-mobile is-multiline"
        style={{ width: "100%" }}
      >
        <div
          className="column is-12-mobile is-5-tablet is-5-desktop has-text-centered"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <img
            src={profileHimatif.gambar}
            alt="Profile HIMATIF"
            style={{
              maxHeight: 140,
              width: "100%",
              maxWidth: 220,
              margin: "0 auto",
              borderRadius: 12,
              boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
              objectFit: "contain",
            }}
          />
        </div>
        <div
          className="column is-12-mobile is-7-tablet is-7-desktop"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div style={{ maxWidth: 420, margin: "0 auto", width: "100%" }}>
            <h2
              className="title is-4 mb-2"
              style={{ color: "#1a237e", wordBreak: "break-word" }}
            >
              {profileHimatif.nama}
            </h2>
            <p
              className="subtitle is-6 has-text-grey"
              style={{
                fontSize: "0.98rem",
                lineHeight: "1.6",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                marginBottom: 8,
                wordBreak: "break-word",
              }}
            >
              {profileHimatif.deskripsi}
            </p>
            <button
              onClick={() =>
                profileSection.current?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="button is-primary is-small is-outlined mt-2"
              style={{
                borderRadius: 20,
                padding: "0 20px",
                height: 32,
                fontSize: "0.92rem",
                fontWeight: 500,
                letterSpacing: 0.2,
                transition: "all 0.3s ease",
                width: "100%",
                maxWidth: 180,
              }}
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  // Slide 2: Kegiatan (hanya jika ada kegiatan)
  if (hasKegiatan) {
    slides.push(
      <div
        key="kegiatan"
        className="carousel-item"
        style={{
          padding: "2.5rem 2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          className="columns is-vcentered is-mobile is-multiline"
          style={{ width: "100%" }}
        >
          <div
            className="column is-12-mobile is-5-tablet is-5-desktop has-text-centered"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <div
              className="box has-background-primary-light"
              style={{
                padding: "1.5rem 1rem",
                borderRadius: 10,
                boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
                minHeight: 120,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: 220,
              }}
            >
              <h2
                className="title is-4 has-text-primary"
                style={{ marginBottom: 8, wordBreak: "break-word" }}
              >
                {kegiatan.nama_kegiatan}
              </h2>
              <p
                className="subtitle is-6 has-text-grey"
                style={{ fontSize: "0.95rem" }}
              >
                <strong>Tanggal:</strong> {kegiatan.tanggal}
              </p>
            </div>
          </div>
          <div
            className="column is-12-mobile is-7-tablet is-7-desktop"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className="content" style={{ width: "100%" }}>
              <p
                style={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  fontSize: "0.98rem",
                  marginBottom: 8,
                  wordBreak: "break-word",
                }}
              >
                {kegiatan.deskripsi}
              </p>
              <button
                onClick={() => (window.location.href = "/kegiatan")}
                className="button is-primary is-small is-outlined mt-2"
                style={{
                  borderRadius: 20,
                  padding: "0 20px",
                  height: 32,
                  fontSize: "0.92rem",
                  fontWeight: 500,
                  letterSpacing: 0.2,
                  transition: "all 0.3s ease",
                  width: "100%",
                  maxWidth: 180,
                }}
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Untuk tampilan statis (hanya satu slide), hilangkan class carousel-item
  const staticSlide = (
    <div
      key="static-profile"
      style={{
        padding: "2.5rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        className="columns is-vcentered is-mobile is-multiline"
        style={{ width: "100%" }}
      >
        <div
          className="column is-12-mobile is-5-tablet is-5-desktop has-text-centered"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <img
            src={profileHimatif.gambar}
            alt="Profile HIMATIF"
            style={{
              maxHeight: 140,
              width: "100%",
              maxWidth: 220,
              margin: "0 auto",
              borderRadius: 12,
              boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
              objectFit: "contain",
            }}
          />
        </div>
        <div
          className="column is-12-mobile is-7-tablet is-7-desktop"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div style={{ maxWidth: 420, margin: "0 auto", width: "100%" }}>
            <h2
              className="title is-4 mb-2"
              style={{ color: "#1a237e", wordBreak: "break-word" }}
            >
              {profileHimatif.nama}
            </h2>
            <p
              className="subtitle is-6 has-text-grey"
              style={{
                fontSize: "0.98rem",
                lineHeight: "1.6",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                marginBottom: 8,
                wordBreak: "break-word",
              }}
            >
              {profileHimatif.deskripsi}
            </p>
            <button
              onClick={() =>
                profileSection.current?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="button is-primary is-small is-outlined mt-2"
              style={{
                borderRadius: 20,
                padding: "0 20px",
                height: 32,
                fontSize: "0.92rem",
                fontWeight: 500,
                letterSpacing: 0.2,
                transition: "all 0.3s ease",
                width: "100%",
                maxWidth: 180,
              }}
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    // Clean up all previous carousels before initializing
    if (window.bulmaCarousel) {
      window.bulmaCarousel.attach("[data-carousel]");
    }
    if (dataLoaded && carouselRef.current && slides.length > 1) {
      if (carouselRef.current.bulmaCarousel) {
        carouselRef.current.bulmaCarousel.destroy();
      }
      const timer = setTimeout(() => {
        try {
          bulmaCarousel.attach(carouselRef.current, {
            slidesToScroll: 1,
            slidesToShow: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            loop: false, // nonaktifkan loop
            infinite: false, // nonaktifkan infinite
            pauseOnHover: true,
          });
        } catch (error) {
          console.error("Carousel initialization error:", error);
        }
      }, 100);
      return () => {
        clearTimeout(timer);
        if (carouselRef.current && carouselRef.current.bulmaCarousel) {
          carouselRef.current.bulmaCarousel.destroy();
        }
      };
    }
    return () => {
      if (carouselRef.current && carouselRef.current.bulmaCarousel) {
        carouselRef.current.bulmaCarousel.destroy();
      }
    };
  }, [dataLoaded, slides.length]);

  return (
    <>
      <section className="section">
        <div className="container">
          {/* Carousel section */}
          {slides.length > 1 ? (
            <div
              ref={carouselRef}
              className="carousel"
              data-carousel
              style={{
                backgroundColor: "#fff",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                borderRadius: "12px",
                padding: 0,
                marginBottom: "2rem",
                overflow: "hidden",
                minHeight: 260,
                width: "100%",
                maxWidth: 900,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {slides}
            </div>
          ) : (
            <div
              style={{
                backgroundColor: "#fff",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                borderRadius: "12px",
                padding: 0,
                marginBottom: "2rem",
                overflow: "hidden",
                minHeight: 260,
                width: "100%",
                maxWidth: 900,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {staticSlide}
            </div>
          )}
        </div>
      </section>

      {/* Profile HIMATIF Section */}
      <section className="section" ref={profileSection} id="profile-section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-12-mobile is-10-tablet is-8-desktop">
              <div className="has-text-centered mb-6">
                <img
                  src={profileHimatif.gambar}
                  alt="Logo HIMATIF"
                  style={{
                    maxHeight: 120,
                    marginBottom: 20,
                    width: "100%",
                    maxWidth: 180,
                    objectFit: "contain",
                  }}
                />
                <h2
                  className="title is-3 mb-2"
                  style={{ wordBreak: "break-word" }}
                >
                  {profileHimatif.nama}
                </h2>
                <h3
                  className="title is-3 has-text-primary mb-2"
                  style={{ wordBreak: "break-word" }}
                >
                  {profileHimatif.kabinet}
                </h3>
                <p className="subtitle is-6">{profileHimatif.periode}</p>
              </div>

              <div className="content">
                <div className="mb-6">
                  <h4 className="title is-4 has-text-centered mb-4">Visi</h4>
                  <p
                    className="has-text-centered"
                    style={{ wordBreak: "break-word" }}
                  >
                    {profileHimatif.visi}
                  </p>
                </div>

                <div className="mt-6">
                  <h4 className="title is-4 has-text-centered mb-4">Misi</h4>
                  <ul
                    style={{
                      maxWidth: "800px",
                      margin: "0 auto",
                      paddingLeft: 18,
                    }}
                  >
                    {profileHimatif.misi.map((item, index) => (
                      <li
                        key={index}
                        style={{ marginBottom: 8, wordBreak: "break-word" }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Utama;
