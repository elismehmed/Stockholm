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

  // 3. Nav-2 Fixed Position Script
  const nav2 = document.querySelector(".nav-2");
  const header = document.querySelector("header");

  const placeholder = document.createElement("div");
  placeholder.style.height = `${nav2.offsetHeight}px`;
  placeholder.style.display = "none";
  nav2.parentNode.insertBefore(placeholder, nav2);

  const handleScroll = () => {
    const nav2Rect = nav2.getBoundingClientRect();
    const headerHeight = header.offsetHeight;

    if (window.scrollY > nav2.offsetTop - headerHeight) {
      nav2.classList.add("fixed");
      nav2.style.top = `${headerHeight}px`;
      placeholder.style.display = "block";
    } else {
      nav2.classList.remove("fixed");
      nav2.style.top = "initial";
      placeholder.style.display = "none";
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();  // Initial check for nav-2 position

  // 4. Smooth Scroll for Navigation Links (for both header and nav-2)
  const scrollToSection = (event, targetSelector) => {
    event.preventDefault();
    const targetSection = document.querySelector(targetSelector);

    // Adjust scroll position based on fixed navbar height (160px or any desired value)
    const navbarHeight = 160; // Adjust this value to match the height of your navbar
    const targetPosition = targetSection.offsetTop - navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  };

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
    
    // Remove active classes from all links when scrolling
    removeActiveClasses(headerLinks);
    removeActiveClasses(nav2Links);

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200; // Adjust based on desired offset
      const sectionBottom = sectionTop + section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        currentSection = section.getAttribute('id');
      }
    });

    // Add active class to the corresponding link based on the current section
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
  const sliderImages = document.querySelector(".slider-images");
  const sliderSlides = document.querySelectorAll(".slider-slide");
  const bullets = document.querySelectorAll(".bullet");
  const prevButton = document.querySelector(".prev-slide");
  const nextButton = document.querySelector(".next-slide");

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

  // 10. Set Initial Active State for Attractions Slider
  sliderSlides[0].classList.add('active');
  bullets[0].classList.add('active');





  //11. Modals script

  
 
    const modals = document.querySelectorAll('.attraction-modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    const body = document.querySelector('body');
  
    // Open the modal when clicking the image card
    document.querySelectorAll('.attraction-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const targetModal = document.querySelector(card.getAttribute('data-modal-target'));
        targetModal.classList.add('show'); // Show the modal
        body.classList.add('modal-open'); // Disable page scroll
      });
    });
  
    // Close the modal when clicking the close button
    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        button.closest('.attraction-modal').classList.remove('show'); // Close the modal
        body.classList.remove('modal-open'); // Enable page scroll
      });
    });
  
    // Close the modal if the user clicks outside the modal content (on the overlay)
    modals.forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('show');
          body.classList.remove('modal-open');
        }
      });
    });

  

  
  
});




