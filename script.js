document.addEventListener("DOMContentLoaded", () => {

  // 1. Ensure the page scrolls to the top after refresh
  if (window.scrollY !== 0) {
    // If not already at the top, force scroll to the top
    window.scrollTo(0, 0);
  }

  // 2. Home Icon Scroll to Top on Click
  const homeLink = document.querySelector(".home-icon a");
  homeLink.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

// Save the scroll position before resizing
let lastScrollPosition = window.scrollY;

// Restore the scroll position after resizing
window.addEventListener('resize', () => {
  window.scrollTo(0, lastScrollPosition);
});

// Update scroll position on scroll
window.addEventListener('scroll', () => {
  lastScrollPosition = window.scrollY;
});







// 4. Smooth Scroll for Navigation Links (for both header and nav-2)
const scrollToSection = (event, targetSelector) => {
  event.preventDefault();
  const targetSection = document.querySelector(targetSelector);

  // Dynamically calculate the height of both navbars (header and nav-2)
  const headerHeight = document.querySelector("header").offsetHeight || 0;
  const nav2Height = document.querySelector(".nav-2").offsetHeight || 0;

  // Calculate the total offset
  const totalNavbarHeight = headerHeight + nav2Height;

  // Get the target position of the section, but adjust it to center the section in the viewport
  const targetPosition = targetSection.offsetTop - totalNavbarHeight;

  // Use window.scrollTo to scroll to the adjusted target position
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
};






  // Desktop-Specific Behavior
  const nav2 = document.querySelector(".nav-2");
  const header = document.querySelector("header");

  // Create a placeholder to prevent layout shifts
  const placeholder = document.createElement("div");
  placeholder.style.height = `${nav2.offsetHeight}px`;
  placeholder.style.display = "none";
  nav2.parentNode.insertBefore(placeholder, nav2);

  const handleScroll = () => {
    const headerHeight = header.offsetHeight;
    const nav2OffsetTop = nav2.offsetTop;

    // Check if the page is in desktop view (>768px)
    if (window.innerWidth > 768) {
      if (window.scrollY > nav2OffsetTop - headerHeight) {
        nav2.classList.add("fixed");
        nav2.style.top = `${headerHeight}px`; // Position below the header
        placeholder.style.display = "block"; // Prevent layout shift
      } else {
        nav2.classList.remove("fixed");
        nav2.style.top = "initial"; // Reset positioning
        placeholder.style.display = "none"; // Hide placeholder
      }
    }
  };

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      // Reset styles for mobile
      nav2.classList.remove("fixed");
      nav2.style.top = "";
      placeholder.style.display = "none";
    } else {
      // Re-apply scroll handling for desktop
      handleScroll();
    }
  };

  // Attach scroll and resize handlers
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);

  // Initial check on load
  handleResize();




  // 5. Set Active State for Header and Nav-2 Links
  const headerLinks = document.querySelectorAll('header nav a');
  const nav2Links = document.querySelectorAll('.nav-2 a');
  const sections = document.querySelectorAll('section');

  // Function to remove active class from all links in a navbar
  function removeActiveClasses(links) {
    links.forEach(link => {
      link.classList.remove('active');
    });
  }

  // Function to add active class to clicked link
  function addActiveClass(link) {
    link.classList.add('active');
  }

  // Handle click events for links in header navbar
  headerLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      removeActiveClasses(headerLinks);
      addActiveClass(this);
      scrollToSection(e, this.getAttribute('href'));
    });
  });

  // Handle click events for links in .nav-2 navbar
  nav2Links.forEach(link => {
    link.addEventListener('click', function (e) {
      removeActiveClasses(nav2Links);
      addActiveClass(this);
      scrollToSection(e, this.getAttribute('href'));
    });
  });

  
 // 6. Scroll event to update active link based on current visible section
window.addEventListener('scroll', () => {
  let currentSection = '';
  
  // Dynamically calculate the total navbar height
  const headerHeight = document.querySelector("header").offsetHeight || 0;
  const nav2Height = document.querySelector(".nav-2").offsetHeight || 0;
  const totalNavbarHeight = headerHeight + nav2Height;
  
  // Find the currently visible section
  sections.forEach(section => {
    const sectionTop = section.offsetTop - totalNavbarHeight;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      currentSection = section.getAttribute('id');
    }
  });

  // Remove active class from all links
  removeActiveClasses(headerLinks);
  removeActiveClasses(nav2Links);

  // Add active class to the matching links in both navbars
  headerLinks.forEach(link => {
    if (link.getAttribute('href').substring(1) === currentSection) {
      addActiveClass(link);
    }
  });

  nav2Links.forEach(link => {
    if (link.getAttribute('href').substring(1) === currentSection) {
      addActiveClass(link);
    }
  });
});


  // 7. Video Modal Script 
  const videoTrigger = document.querySelector('.video-trigger');
  const modal = document.getElementById('video-modal');
  if (videoTrigger && modal) {
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalVideo = modal.querySelector('#modal-video');
    const modalClose = modal.querySelector('.modal-close');

    videoTrigger.addEventListener('click', () => {
      modal.style.display = 'flex';
      modalVideo.src = 'https://www.youtube.com/embed/5fcEntH5a5I?autoplay=1';
    });

    const closeModal = () => {
      modal.style.display = 'none';
      modalVideo.src = '';
    };

    modalOverlay.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);
  }

  // 8. Image Slider Script (if applicable)
  const slides = document.querySelectorAll('.slides img');
  const thumbnails = document.querySelectorAll('.thumbnails img');
  const totalSlides = slides.length;

  if (slides.length && thumbnails.length) {
    let currentSlideIndex = 0;

    function updateSlide() {
      slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlideIndex);
      });

      thumbnails.forEach((thumbnail, index) => {
        thumbnail.classList.toggle('active-thumbnail', index === currentSlideIndex);
      });
    }

    function changeSlide(direction) {
      currentSlideIndex = (currentSlideIndex + direction + totalSlides) % totalSlides;
      updateSlide();
    }

    document.querySelector('.prev').addEventListener('click', () => changeSlide(-1));
    document.querySelector('.next').addEventListener('click', () => changeSlide(1));

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', () => {
        currentSlideIndex = index;
        updateSlide();
      });
    });

    updateSlide();
  }

  // 9. Attractions Slider Script 

    // Function to initialize a slider
    function initializeSlider(container) {
      const sliderImages = container.querySelector(".slider-images");
      const sliderSlides = container.querySelectorAll(".slider-slide");
      const bullets = container.querySelectorAll(".bullet");
      const prevButton = container.querySelector(".prev-slide");
      const nextButton = container.querySelector(".next-slide");
  
      let currentIndex = 0;
  
      function updateSlider() {
        sliderImages.style.transform = `translateX(-${currentIndex * 100}%)`;
        bullets.forEach((bullet, index) => {
          bullet.classList.toggle("active", index === currentIndex);
        });
      }
  
      function showNextSlide() {
        currentIndex = (currentIndex + 1) % sliderSlides.length;
        updateSlider();
      }
  
      function showPrevSlide() {
        currentIndex = (currentIndex - 1 + sliderSlides.length) % sliderSlides.length;
        updateSlider();
      }
  
      bullets.forEach((bullet, index) => {
        bullet.addEventListener("click", () => {
          currentIndex = index;
          updateSlider();
        });
      });
  
      nextButton.addEventListener("click", showNextSlide);
      prevButton.addEventListener("click", showPrevSlide);
  
      // Set initial active state
      sliderSlides[0].classList.add("active");
      bullets[0].classList.add("active");
      updateSlider();
    }
  
    // Initialize sliders for each section
    const attractionSlider = document.querySelector("#Attractions");
    const activitySlider = document.querySelector("#Activities");
    const eventSlider = document.querySelector("#Events");
    const eatdrinkSlider = document.querySelector("#Eat_Drink");
  
    if (attractionSlider) initializeSlider(attractionSlider);
    if (activitySlider) initializeSlider(activitySlider);
    if (eventSlider) initializeSlider(eventSlider);
    if (eatdrinkSlider) initializeSlider(eatdrinkSlider);



// 11. Modals script

// Select all required elements
const modals = document.querySelectorAll('.attraction-modal');
const closeButtons = document.querySelectorAll('.modal-close');
const body = document.querySelector('body');
const cards = document.querySelectorAll('.attraction-card'); // Ensure this matches your card class

let scrollPosition = 0; // Variable to store the scroll position

// Open the modal when clicking the image card
cards.forEach(card => {
  card.addEventListener('click', () => {
    const targetModalId = card.getAttribute('data-modal-target'); // Get the modal ID
    const targetModal = document.querySelector(targetModalId); // Select the modal

    if (targetModal) {
      // Save the current scroll position
      scrollPosition = window.scrollY;

      // Lock scroll by setting body position and overflow
      body.style.position = 'fixed';
      body.style.top = `-${scrollPosition}px`;
      body.style.width = '100%';
      body.classList.add('modal-open'); // Disable page scroll

      targetModal.classList.add('show'); // Show the modal
    } else {
      console.error(`Modal with ID "${targetModalId}" not found.`);
    }
  });
});

// Close the modal when clicking the close button
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.attraction-modal'); // Get the closest modal
    if (modal) {
      modal.classList.remove('show'); // Hide the modal

      // Unlock scroll by restoring body position
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      body.classList.remove('modal-open'); // Re-enable page scroll

      // Restore scroll position
      window.scrollTo(0, scrollPosition);
    }
  });
});

// Close the modal if the user clicks outside the modal content
modals.forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show'); // Hide the modal

      // Unlock scroll by restoring body position
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      body.classList.remove('modal-open'); // Re-enable page scroll

      // Restore scroll position
      window.scrollTo(0, scrollPosition);
    }
  });
});





// 12. Privacy Policy Modal Script

// 1. Select the modal trigger links
const aboutModalTrigger = document.getElementById('about-modal-trigger');
const privacyPolicyTrigger = document.getElementById('privacy-policy-link');

// 2. Select the modals and close buttons
const aboutModal = document.getElementById('about-modal');
const privacyPolicyModal = document.getElementById('privacy-policy-modal');
const aboutModalClose = document.getElementById('about-modal-close');
const privacyPolicyClose = document.getElementById('close-privacy-policy');

// 3. Select the footer to retain the scroll position
const footer = document.querySelector('footer');

// 4. Lock scroll by setting overflow: hidden to the body
const lockScroll = () => {
  document.body.style.overflow = 'hidden'; // Disable scrolling
};

// 5. Restore scroll by resetting overflow to ""
const unlockScroll = () => {
  document.body.style.overflow = ''; // Re-enable scrolling
};

// 6. Open the About Us modal when its trigger is clicked
aboutModalTrigger.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent the link from navigating
  aboutModal.classList.add('show'); // Show the modal
  lockScroll(); // Disable scrolling
});

// 7. Open the Privacy Policy modal when its trigger is clicked
privacyPolicyTrigger.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent the link from navigating
  privacyPolicyModal.classList.add('show'); // Show the modal
  lockScroll(); // Disable scrolling
});

// 8. Close the About Us modal when the close button is clicked
aboutModalClose.addEventListener('click', () => {
  aboutModal.classList.remove('show'); // Hide the modal
  unlockScroll(); // Re-enable scrolling
  // Scroll the page back to the footer
  footer.scrollIntoView({ behavior: 'smooth' });
});

// 9. Close the Privacy Policy modal when the close button is clicked
privacyPolicyClose.addEventListener('click', () => {
  privacyPolicyModal.classList.remove('show'); // Hide the modal
  unlockScroll(); // Re-enable scrolling
  // Scroll the page back to the footer
  footer.scrollIntoView({ behavior: 'smooth' });
});

// 10. Close the modal if user clicks outside the modal content
[aboutModal, privacyPolicyModal].forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show'); // Hide the modal
      unlockScroll(); // Re-enable scrolling
      // Scroll the page back to the footer
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  });
});




//Media Quieries

const hamburgerMenu = document.getElementById('hamburger-menu');
    const leftNav = document.querySelector('.left-nav');
    
    hamburgerMenu.addEventListener('click', () => {
      leftNav.classList.toggle('active');
    });


    // Close the menu when a menu item is clicked
const menuItems = document.querySelectorAll('.left-nav ul li a');

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    leftNav.classList.remove('active'); // Hide the menu
  });
});





// JavaScript to remove the black bars and ensure that each video fills its container

function adjustVideos() {
  const videoContainers = document.querySelectorAll('.video-container'); // Select all video containers

  videoContainers.forEach((videoContainer) => {
    const iframe = videoContainer.querySelector('iframe');
    
    if (!iframe) return; // Skip if there's no iframe in this container
    
    // Get the aspect ratio of the video (16:9)
    const aspectRatio = 9 / 16;

    // Calculate the height based on the width of the container
    const containerWidth = videoContainer.offsetWidth;
    const videoHeight = containerWidth * aspectRatio;

    // Set the height of the video container to match the aspect ratio
    videoContainer.style.height = videoHeight + 'px';

    // Make sure the iframe fills the container completely
    iframe.style.height = '100%';
    iframe.style.width = '100%';
  });
}

// Adjust video sizes on window resize
window.addEventListener('resize', adjustVideos);

// Run it initially
adjustVideos();



// Ensure the first image is visible immediately on load
const slider = document.querySelector('.attractions-slider');

// Reset the scroll position
function resetSlider() {
  slider.scrollLeft = 0; // Scroll to the first slide immediately
}

// Call resetSlider on load and resize
window.addEventListener('load', resetSlider);
window.addEventListener('resize', resetSlider);









  
});




