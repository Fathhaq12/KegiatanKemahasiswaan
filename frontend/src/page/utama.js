import React, { useEffect, useState, useRef } from "react";
import "bulma/css/bulma.min.css";
import "bulma-carousel/dist/css/bulma-carousel.min.css";
import bulmaCarousel from "bulma-carousel";
import { getKegiatan } from "../api";

function Utama() {
  const [kegiatan, setKegiatan] = useState(null);
  const profileSection = useRef(null);
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
    bulmaCarousel.attach(".carousel", {
      slidesToScroll: 1,
      slidesToShow: 1,
      autoplay: true,
      loop: true,
    });
    // Ambil 1 data kegiatan approved terbaru
    getKegiatan()
      .then((res) => {
        const approved = res.data.filter((k) => k.status === "approved");
        if (approved.length > 0) setKegiatan(approved[0]);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <section className="section">
        <div className="container">
          {/* Carousel section */}
          <div
            className="box"
            style={{
              padding: "2rem",
              backgroundColor: "#fff",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            {/* Slide 1: Profile HIMATIF */}
            <div className="carousel-item is-active">
              <div className="columns is-vcentered is-mobile">
                <div className="column is-5 has-text-centered">
                  <img
                    src={profileHimatif.gambar}
                    alt="Profile HIMATIF"
                    style={{
                      maxHeight: 200,
                      width: "auto",
                      margin: "0 auto",
                      transition: "all 0.3s ease-in-out",
                    }}
                  />
                </div>
                <div className="column is-7">
                  <div style={{ maxWidth: "400px", margin: "0 auto" }}>
                    <h2 className="title is-4 mb-2">{profileHimatif.nama}</h2>
                    <p
                      className="subtitle is-6 has-text-grey"
                      style={{
                        fontSize: "0.9rem",
                        lineHeight: "1.5",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: "4",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {profileHimatif.deskripsi}
                    </p>
                    <button
                      onClick={() =>
                        profileSection.current?.scrollIntoView({
                          behavior: "smooth",
                          href: "#profile-section",
                        })
                      }
                      className="button is-primary is-small is-outlined mt-2"
                      style={{
                        borderRadius: "20px",
                        padding: "0 20px",
                        height: "32px",
                        fontSize: "0.85rem",
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
            <div className="carousel-item">
              {kegiatan ? (
                <div className="columns is-vcentered is-mobile">
                  <div className="column is-5 has-text-centered">
                    <div
                      className="box has-background-primary-light"
                      style={{ padding: "2rem" }}
                    >
                      <h2 className="title is-4 has-text-primary">
                        {kegiatan.nama_kegiatan}
                      </h2>
                      <p className="subtitle is-6 has-text-grey">
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
                          WebkitLineClamp: "3",
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {kegiatan.deskripsi}
                      </p>
                      <button
                        onClick={() => (window.location.href = "/kegiatan")}
                        className="button is-primary is-small is-outlined mt-2"
                        style={{
                          borderRadius: "20px",
                          padding: "0 20px",
                          height: "32px",
                          fontSize: "0.85rem",
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
