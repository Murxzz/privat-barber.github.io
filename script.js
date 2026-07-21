/**
 * PRIVAT BARBER - Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. STICKY NAVBAR & ACTIVE NAV HIGHLIGHT
     ========================================================================== */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active link highlighting based on scroll position
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     2. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  const navOverlay = document.getElementById('navOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const toggleMobileNav = () => {
    mobileNav.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  };

  if (navToggle) {
    navToggle.addEventListener('click', toggleMobileNav);
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', toggleMobileNav);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav.classList.contains('active')) {
        toggleMobileNav();
      }
    });
  });

  /* ==========================================================================
     3. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '50px 0px 50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }

  /* ==========================================================================
     4. PRICING SECTION TOGGLE (KOMBO & SPECIĀLIE PAKALPOJUMI)
     ========================================================================== */
  const togglePricingBtn = document.getElementById('togglePricingBtn');
  const pricingExtra = document.getElementById('pricingExtra');

  if (togglePricingBtn && pricingExtra) {
    togglePricingBtn.addEventListener('click', () => {
      const isHidden = pricingExtra.style.display === 'none' || pricingExtra.style.display === '';
      if (isHidden) {
        pricingExtra.style.display = 'block';
        togglePricingBtn.textContent = 'RĀDĪT MAZĀK';
      } else {
        pricingExtra.style.display = 'none';
        togglePricingBtn.textContent = 'SKATĪT VAIRĀK';
      }
    });
  }

  /* ==========================================================================
     5. GALLERY LIGHTBOX MODAL
     ========================================================================== */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxImg = document.getElementById('lightboxImg');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      if (lightboxModal) {
        const img = item.querySelector('.gallery-img');
        if (img && lightboxImg) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
        }
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* ==========================================================================
     6. BOOKING MODAL WINDOW & FORM HANDLER
     ========================================================================== */
  const bookingButtons = document.querySelectorAll('.open-booking-modal');
  const bookingModal = document.getElementById('bookingModal');
  const modalClose = document.getElementById('modalClose');
  const modalBookingForm = document.getElementById('modalBookingForm');
  const bookingSuccessMsg = document.getElementById('bookingSuccessMessage');

  const resetBookingModal = () => {
    if (modalBookingForm) {
      modalBookingForm.style.display = 'block';
      modalBookingForm.reset();
      const submitBtn = modalBookingForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'PIERAKSTĪTIES';
      }
    }
    if (bookingSuccessMsg) {
      bookingSuccessMsg.style.display = 'none';
    }
  };

  bookingButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (bookingModal) {
        resetBookingModal();
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    if (bookingModal) {
      bookingModal.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(resetBookingModal, 300);
    }
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        closeModal();
      }
    });
  }

  /* ==========================================================================
     7. AJAX FORM SUBMISSION
     ========================================================================== */
  if (modalBookingForm) {
    modalBookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = modalBookingForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'SŪTA...';
      }

      try {
        const formData = new FormData(modalBookingForm);
        const response = await fetch('https://formsubmit.co/ajax/kozlovskismarkuss7@gmail.com', {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        });

        if (response.ok) {
          modalBookingForm.style.display = 'none';
          if (bookingSuccessMsg) {
            bookingSuccessMsg.style.display = 'block';
          }
        } else {
          modalBookingForm.submit();
        }
      } catch (err) {
        modalBookingForm.submit();
      }
    });
  }
});
