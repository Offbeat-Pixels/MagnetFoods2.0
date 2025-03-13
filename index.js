document.addEventListener("DOMContentLoaded", () => {
  function Navbar() {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileServiceBtn = document.getElementById("mobile-service-btn");
    const mobileDropdown = document.getElementById("mobile-dropdown");
    const arrow = document.getElementById("arrow");

    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
    }

    if (mobileServiceBtn && mobileDropdown && arrow) {
      mobileServiceBtn.addEventListener("click", () => {
        mobileDropdown.classList.toggle("hidden");
        arrow.innerHTML = mobileDropdown.classList.contains("hidden")
          ? "&#9660;" // Down Arrow
          : "&#9650;"; // Up Arrow
      });
    }
  }

  function loadComponent(id, paths, callback) {
    function tryLoad(index) {
      if (index >= paths.length) {
        console.error(`Error: None of the paths found for ${id}`);
        return;
      }

      fetch(paths[index])
        .then((response) => {
          if (!response.ok) throw new Error(`Not Found: ${paths[index]}`);
          return response.text();
        })
        .then((data) => {
          const container = document.getElementById(id);
          if (container) {
            container.innerHTML = data;
            if (callback) callback();
          }
        })
        .catch(() => tryLoad(index + 1)); // Try next path if the previous fails
    }

    tryLoad(0); // Start checking paths
  }

  // ✅ Add multiple fallback paths for different levels
  const navbarPaths = [
    "Navbar.html", // Same folder
    "../Navbar.html", // One level up
    "../../Navbar.html", // Two levels up
    "../../../Navbar.html", // Three levels up
  ];

  const footerPaths = [
    "Footer.html",
    "../Footer.html",
    "../../Footer.html",
    "../../../Footer.html",
  ];

  loadComponent("navbar", navbarPaths, Navbar);
  loadComponent("footer", footerPaths);
});

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.querySelector("button.md\\:hidden");
  const nav = document.querySelector("nav");

  mobileMenuButton.addEventListener("click", function () {
    nav.classList.toggle("hidden");
  });

  // Testimonial slider
  let slideIndex = 0;
  const slides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  if (!slides.length || !dots.length) {
    console.warn("No slides or dots found");
    return;
  }
  function showSlide(n) {
    // Reset
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active");
      dots[i].classList.remove("active");
    }

    // Set current slide
    slideIndex = (n + slides.length) % slides.length;
    slides[slideIndex].classList.add("active");
    dots[slideIndex].classList.add("active");
  }

  // Event listeners
  prevBtn.addEventListener("click", () => showSlide(slideIndex - 1));
  nextBtn.addEventListener("click", () => showSlide(slideIndex + 1));

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });

  // Auto slide
  setInterval(() => {
    showSlide(slideIndex + 1);
  }, 500);
});

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider").querySelector("img");
  const thumbnails = document.querySelectorAll(".thumb");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  const images = [
    "assets/G1.webp",
    "assets/G2.webp",
    "assets/G3.webp",
    "assets/G4.webp",
    "assets/G5.webp",
    "assets/G6.webp",
  ];

  let currentIndex = 0;

  function updateImage(index) {
    slider.src = images[index];
    currentIndex = index;
  }

  // Next button
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage(currentIndex);
  });

  // Previous button
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage(currentIndex);
  });

  // Click on thumbnails
  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", (e) => {
      updateImage(parseInt(e.target.getAttribute("data-index")));
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Wait for the footer to load dynamically
  setTimeout(() => {
    const modal = document.getElementById("modal");
    const openModalBtn = document.querySelector("[onclick='openModal()']");
    const closeModalBtn = document.querySelector("[onclick='closeModal()']");

    // Ensure elements exist before adding event listeners
    if (modal && openModalBtn && closeModalBtn) {
      // Open Modal
      function openModal() {
        modal.classList.remove("hidden");
      }

      // Close Modal
      function closeModal() {
        modal.classList.add("hidden");
      }

      // Add event listeners
      openModalBtn.addEventListener("click", openModal);
      closeModalBtn.addEventListener("click", closeModal);

      // Close modal when clicking outside the content
      modal.addEventListener("click", function (event) {
        if (event.target === modal) {
          closeModal();
        }
      });
    } else {
      console.warn(
        "Modal or buttons not found. Make sure the footer is loaded before this script runs."
      );
    }
  }, 500); // Delay ensures the modal is loaded
});

// document.addEventListener("DOMContentLoaded", function () {
//   function setupModal(openBtnId, modalId, closeBtnIds) {
//     const modal = document.getElementById(modalId);
//     const openBtn = document.getElementById(openBtnId);
//     const closeBtns = closeBtnIds.map((id) => document.getElementById(id));

//     function openModal() {
//       modal.classList.remove("hidden");
//     }

//     function closeModal() {
//       modal.classList.add("hidden");
//     }

//     if (openBtn) {
//       openBtn.addEventListener("click", openModal);
//     }

//     closeBtns.forEach((button) => {
//       if (button) {
//         button.addEventListener("click", closeModal);
//       }
//     });

//     modal.addEventListener("click", function (event) {
//       if (event.target === modal) {
//         closeModal();
//       }
//     });
//   }

//   // Setup modals
//   setupModal("openCateringModal", "cateringModal", [
//     "closeCateringModal",
//     "closeCateringModal2",
//   ]);
//   setupModal("openDealsModal", "dealsModal", [
//     "closeDealsModal",
//     "closeDealsModal2",
//   ]);
// });


// document.addEventListener("DOMContentLoaded", function () {
//   function setupModal(openBtnId, modalId, closeBtnIds) {
//     const modal = document.getElementById(modalId);
//     const openBtn = document.getElementById(openBtnId);
//     const closeBtns = closeBtnIds.map((id) => document.getElementById(id));

//     function openModal() {
//       modal.classList.remove("hidden");
//     }

//     function closeModal() {
//       modal.classList.add("hidden");
//     }

//     if (openBtn) {
//       openBtn.addEventListener("click", openModal);
//     }

//     closeBtns.forEach((button) => {
//       if (button) {
//         button.addEventListener("click", closeModal);
//       }
//     });

//     modal.addEventListener("click", function (event) {
//       if (event.target === modal) {
//         closeModal();
//       }
//     });
//   }

//   // Setup modals
//   setupModal("openCateringModal", "cateringModal", [
//     "closeCateringModal",
//     "closeCateringModal2",
//   ]);
//   setupModal("openDealsModal", "dealsModal", [
//     "closeDealsModal",
//     "closeDealsModal2",
//   ]);
//   setupModal("openMenuModal", "menuModal", [
//     "closeMenuModal",
//     "closeMenuModal2",
//   ]);
// });

document.addEventListener("DOMContentLoaded", function () {
  function setupModal(openBtnId, modalId, closeBtnIds) {
    const modal = document.getElementById(modalId);
    const openBtn = document.getElementById(openBtnId);
    const closeBtns = closeBtnIds
      .map((id) => document.getElementById(id))
      .filter(Boolean); // Remove null values

    if (!modal || !openBtn || closeBtns.length === 0) return; // Prevent script errors

    function openModal() {
      modal.classList.remove("hidden");
    }

    function closeModal() {
      modal.classList.add("hidden");
    }

    openBtn.addEventListener("click", openModal);

    closeBtns.forEach((button) => {
      button.addEventListener("click", closeModal);
    });

    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  // Ensure elements exist before setting up
  setupModal("openMenuModal", "menuModal", [
    "closeMenuModal",
    "closeMenuModal2",
  ]);
    setupModal("openCateringModal", "cateringModal", [
      "closeCateringModal",
      "closeCateringModal2",
    ]);
  setupModal("openDealsModal", "dealsModal", [
    "closeDealsModal",
    "closeDealsModal2",
  ]);
});
