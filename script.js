// Firebase module imports - FIXED URLs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase config
const firebaseconfig = {
    apiKey: "AIzaSyD5sbIZ43Wtb1pkMFjhfc8KDCotE5W5vP8",
    authDomain: "blackhousemedia-57138.firebaseapp.com",
    projectId: "blackhousemedia-57138", // Changed projectID to projectId
    storageBucket: "blackhousemedia-57138.firebasestorage.app",
    messagingSenderId: "109930483513",
    appId: "1:1099304835413:web:0a27d3419675cb7fe9f7dc",
    measurementId: "G-8P0NDCP3V9"
};

// Initialize Services
const app = initializeApp(firebaseconfig);
const auth = getAuth(app);
const db = getFirestore(app);
  /* =====================================================
     SMOOTH SCROLL
  ===================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* =====================================================
     MOBILE MENU TOGGLE
  =====================================================*/
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const menuOverlay = document.querySelector('.menu-Overlay');

  function closeMobileMenu() {
    navLinks.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    menuOverlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn && navLinks && menuOverlay) {
    mobileMenuBtn.addEventListener('click', () => {
      const isActive = navLinks.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
      menuOverlay.classList.toggle('show');
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    menuOverlay.addEventListener('click', closeMobileMenu);

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  /* =====================================================
     DARK/LIGHT MODE TOGGLE
  =====================================================*/
  const darkModeToggle = document.getElementById('darkModeToggle');
  const lightModeToggle = document.getElementById('lightModeToggle');

  function setTheme(mode) {
    if (mode === 'dark') {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
      darkModeToggle.classList.add('active');
      lightModeToggle.classList.remove('active');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
      lightModeToggle.classList.add('active');
      darkModeToggle.classList.remove('active');
      localStorage.setItem('theme', 'light');
    }
  }

  // Initial theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') setTheme('dark');
  else setTheme('light');

  darkModeToggle.addEventListener('click', () => setTheme('dark'));
  lightModeToggle.addEventListener('click', () => setTheme('light'));

  /* =====================================================
     NAVBAR HIDE / SHOW ON SCROLL (desktop only)
  =====================================================*/
  const header = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;

  function isMobile() {
    return window.innerWidth <= 768;
  }

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (!isMobile()) {
      if (currentScroll > 100) {
        if (currentScroll > lastScrollY) {
          header.classList.add('hide'); // scroll down
        } else {
          header.classList.remove('hide'); // scroll up
        }
      } else {
        header.classList.remove('hide');
      }
    } else {
      // Always show navbar on mobile
      header.classList.remove('hide');
    }
    lastScrollY = currentScroll;
  });



  /* =====================================================
     CONTACT FORM → WHATSAPP
  ===================================================== */
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const successMessage = document.getElementById('successMessage');
  const resetBtn = document.getElementById('resetBtn');

  if (form && submitBtn) {
    const showError = (id, msg) => {
      const input = document.getElementById(id);
      const error = document.getElementById(id + 'Error');
      if (!input || !error) return;

      input.classList.toggle('error', !!msg);
      error.textContent = msg || '';
    };

    const validate = {
      name: v => !v.trim() ? 'Name is required' : '',
      email: v =>
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
          ? 'Invalid email' : '',
      subject: v => !v.trim() ? 'Subject is required' : '',
      message: v => !v.trim() ? 'Message is required' : ''
    };

    ['name', 'email', 'subject', 'message'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => showError(id, ''));
    });

    form.addEventListener('submit', e => {
      e.preventDefault();

      const data = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        subject: subject.value,
        message: message.value
      };

      let hasError = false;
      for (let key in validate) {
        const err = validate[key](data[key]);
        showError(key, err);
        if (err) hasError = true;
      }
      if (hasError) return;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      const whatsappText = encodeURIComponent(
        `*New Inquiry*\n\n` +
        `*Name:* ${data.name}\n` +
        `*Email:* ${data.email}\n` +
        `*Phone:* ${data.phone || 'N/A'}\n` +
        `*Subject:* ${data.subject}\n\n` +
        `*Message:*\n${data.message}`
      );

      window.open(`https://wa.me/256708424540?text=${whatsappText}`, '_blank');

      form.style.display = 'none';
      successMessage?.classList.add('show');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    });

    resetBtn?.addEventListener('click', () => {
      form.reset();
      form.style.display = 'grid';
      successMessage?.classList.remove('show');
    });
  }
  // ===============================
// PWA SERVICE WORKER FRONTEND
// ===============================

let deferredPrompt;
let refreshing = false;

// ===============================
// REGISTER SERVICE WORKER
// ===============================

if ('serviceWorker' in navigator) {

    window.addEventListener('load', async () => {

        try {

            // IMPORTANT:
            // Change version every deployment
            const registration = await navigator.serviceWorker.register('/sw.js?v=3');

            console.log('Service Worker Registered');

            // Force update check immediately
            registration.update();

            // ===============================
            // UPDATE DETECTION
            // ===============================

            registration.addEventListener('updatefound', () => {

                const newWorker = registration.installing;

                console.log('New Service Worker Found');

                newWorker.addEventListener('statechange', () => {

                    console.log('SW State:', newWorker.state);

                    // New update available
                    if (
                        newWorker.state === 'installed' &&
                        navigator.serviceWorker.controller
                    ) {

                        console.log('New version available');

                        // Activate immediately
                        newWorker.postMessage('SKIP_WAITING');

                    }

                });

            });

            // ===============================
            // AUTO REFRESH AFTER UPDATE
            // ===============================

            navigator.serviceWorker.addEventListener('controllerchange', () => {

                if (refreshing) return;

                refreshing = true;

                console.log('New Service Worker Activated');

                // Reload app automatically
                window.location.reload();

            });

        } catch (error) {

            console.error('Service Worker Registration Failed:', error);

        }

    });

}

// ===============================
// INSTALL BUTTON LOGIC
// ===============================

// Browser says app can be installed
window.addEventListener('beforeinstallprompt', (e) => {

    console.log('Install Prompt Ready');

    // Prevent mini-infobar
    e.preventDefault();

    // Save prompt event
    deferredPrompt = e;

    // Show install button
    const installBtn = document.getElementById('install-btn');

    if (installBtn) {
        installBtn.style.display = 'block';
    }

});

// ===============================
// INSTALL BUTTON CLICK
// ===============================

const installBtn = document.getElementById('install-btn');

if (installBtn) {

    installBtn.addEventListener('click', async () => {

        if (!deferredPrompt) return;

        // Show install prompt
        deferredPrompt.prompt();

        // Wait for user response
        const { outcome } = await deferredPrompt.userChoice;

        console.log('Install Result:', outcome);

        // Clear prompt
        deferredPrompt = null;

        // Hide button
        installBtn.style.display = 'none';

    });

}

// ===============================
// APP INSTALLED
// ===============================

window.addEventListener('appinstalled', () => {

    console.log('PWA Installed Successfully');

    deferredPrompt = null;

    const installBtn = document.getElementById('install-btn');

    if (installBtn) {
        installBtn.style.display = 'none';
    }

});

// ===============================
// OPTIONAL:
// CHECK INTERNET STATUS
// ===============================

window.addEventListener('online', () => {
    console.log('You are online');
});

window.addEventListener('offline', () => {
    console.log('You are offline');
});