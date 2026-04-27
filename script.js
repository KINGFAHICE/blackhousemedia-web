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
  
  /* =====================================================
     NAVBAR HIDE / SHOW ON SCROLL
  =====================================================*/
  const header = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;

  if (navbar) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 100) {
        if (currentScroll > lastScrollY) {
          navbar.classList.add('hide'); // scroll down
        } else {
          navbar.classList.remove('hide'); // scroll up
        }
      } else {
        header.classList.remove('hide');
      }

      lastScrollY = currentScroll;
    });
  }


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
  // Rigister the service worker for PWA/Bubblewrap//
  if ('serviceWorker' in navigator) {
    let newWorker;

    // 1. Register the worker
    navigator.serviceWorker.register('/sw.js').then(reg => {
        reg.addEventListener('updatefound', () => {
            newWorker = reg.installing;
            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // New content is available, force the "skipWaiting"
                    newWorker.postMessage('SKIP_WAITING');
                }
            });
        });
    });

    // 2. Reload the page once the new worker takes control
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
            window.location.reload();
            refreshing = true;
        }
    });
}
