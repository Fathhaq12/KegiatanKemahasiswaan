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
    visi: "Menjadi wadah aspirasi mahasiswa Teknik Informatika yang profesional dan berkualitas.",
    misi: [
      "Meningkatkan kualitas akademik dan non-akademik mahasiswa Teknik Informatika",
      "Mengembangkan soft skill dan hard skill mahasiswa melalui berbagai kegiatan",
      "Menjalin hubungan baik dengan seluruh civitas akademika",
      "Menjadi wadah kreativitas dan inovasi mahasiswa",
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
            className="carousel carousel-animated carousel-animate-slide"
            data-autoplay="true"
          >
            <div className="carousel-container">
              {/* Slide 1: Profile HIMATIF */}
              <div className="carousel-item is-active">
                <div className="has-text-centered">
                  <img
                    src={profileHimatif.gambar}
                    alt="Profile HIMATIF"
                    style={{ maxHeight: 120, margin: "0 auto 16px" }}
                  />
                  <h2 className="title is-4">{profileHimatif.nama}</h2>
                  <p>{profileHimatif.deskripsi}</p>
                </div>
              </div>
            </div>
            <div className="carousel-navigation is-centered"></div>
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
