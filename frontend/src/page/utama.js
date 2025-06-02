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

  useEffect(() => {
    // Inisialisasi carousel setelah data loaded dan DOM ready
    if (dataLoaded && carouselRef.current) {
      const timer = setTimeout(() => {
        try {
          bulmaCarousel.attach(carouselRef.current, {
            slidesToScroll: 1,
            slidesToShow: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            loop: true,
            infinite: true,
            pauseOnHover: true,
          });
        } catch (error) {
          console.error("Carousel initialization error:", error);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [dataLoaded]);

  return (
    <>
      <section className="section">
        <div className="container">
          {/* Carousel section */}
          <div
            ref={carouselRef}
            className="carousel"
            style={{
              backgroundColor: "#fff",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              borderRadius: "12px",
              padding: "0",
              marginBottom: "2rem",
              overflow: "hidden",
              minHeight: 260,
            }}
          >
            {/* Slide 1: Profile HIMATIF */}
            <div
              className="carousel-item is-active"
              style={{ padding: "2.5rem 2rem" }}
            >
              <div className="columns is-vcentered is-mobile">
                <div className="column is-5 has-text-centered">
                  <img
                    src={profileHimatif.gambar}
                    alt="Profile HIMATIF"
                    style={{
                      maxHeight: 180,
                      width: "auto",
                      margin: "0 auto",
                      borderRadius: 12,
                      boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
                    }}
                  />
                </div>
                <div className="column is-7">
                  <div style={{ maxWidth: 420, margin: "0 auto" }}>
                    <h2
                      className="title is-4 mb-2"
                      style={{ color: "#1a237e" }}
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
                      }}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 2: Kegiatan */}
            <div className="carousel-item" style={{ padding: "2.5rem 2rem" }}>
              {kegiatan ? (
                <div className="columns is-vcentered is-mobile">
                  <div className="column is-5 has-text-centered">
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
                      }}
                    >
                      <h2
                        className="title is-4 has-text-primary"
                        style={{ marginBottom: 8 }}
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
                  <div className="column is-7">
                    <div className="content">
                      <p
                        style={{
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          fontSize: "0.98rem",
                          marginBottom: 8,
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
                        }}
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="has-text-centered py-6">
                  <p className="is-size-5">Tidak ada kegiatan disetujui</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Profile HIMATIF Section */}
      <section className="section" ref={profileSection} id="profile-section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-8">
              <div className="has-text-centered mb-6">
                <img
                  src={profileHimatif.gambar}
                  alt="Logo HIMATIF"
                  style={{ maxHeight: 150, marginBottom: 20 }}
                />
                <h2 className="title is-3 mb-2">{profileHimatif.nama}</h2>
                <h3 className="title is-3 has-text-primary mb-2">
                  {profileHimatif.kabinet}
                </h3>
                <p className="subtitle is-6">{profileHimatif.periode}</p>
              </div>

              <div className="content">
                <div className="mb-6">
                  <h4 className="title is-4 has-text-centered mb-4">Visi</h4>
                  <p className="has-text-centered">{profileHimatif.visi}</p>
                </div>

                <div className="mt-6">
                  <h4 className="title is-4 has-text-centered mb-4">Misi</h4>
                  <ul style={{ maxWidth: "800px", margin: "0 auto" }}>
                    {profileHimatif.misi.map((item, index) => (
                      <li key={index}>{item}</li>
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
