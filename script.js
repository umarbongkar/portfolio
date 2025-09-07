const galleryImages = document.querySelectorAll(".gallery-grid img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const descTitle = document.getElementById("desc-title");
const descText = document.getElementById("desc-text");
const closeBtn = document.querySelector(".close");

let karyaData = [];

// Load data JSON
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    karyaData = data;
  })
  .catch(err => console.error("Gagal load data.json:", err));

// Event klik gambar
galleryImages.forEach(img => {
  img.addEventListener("click", () => {
    const id = img.dataset.id;
    const karya = karyaData.find(item => item.id === id);

    lightbox.style.display = "flex";
    lightboxImg.src = img.src;

    if (karya) {
      descTitle.textContent = karya.title;
      descText.textContent = karya.desc;
    } else {
      descTitle.textContent = img.alt;
      descText.textContent = "Deskripsi tidak tersedia.";
    }
  });
});

// Tombol close
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Klik luar popup untuk close
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

// Efek scroll halus
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});
