/* =====================================================
   PRELOADER (hide at 75%)
===================================================== */
let fakeProgress = 0;
const preloader = document.getElementById('preloader');

if (preloader) {
  const progressInterval = setInterval(() => {
    fakeProgress += Math.random() * 15;

    if (fakeProgress >= 75) {
      clearInterval(progressInterval);

      preloader.style.opacity = '0';
      preloader.style.pointerEvents = 'none';

      setTimeout(() => {
        preloader.remove();
      }, 500);
    }
  }, 200);

  // Safety fallback
  window.addEventListener('load', () => {
    fakeProgress = 75;
  });
 }

/* =====================================================
   DOM READY
===================================================== */
document.addEventListener('DOMContentLoaded', () => {

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
  ===================================================== */
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');

  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', e => {
      e.stopPropagation();

      const isOpen = nav.style.display === 'flex';
      nav.style.display = isOpen ? 'none' : 'flex';

      nav.style.position = 'absolute';
      nav.style.top = '80%';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.flexDirection = 'column';
      nav.style.background = 'var(--primary)';
      nav.style.padding = '1rem';
      nav.style.gap = '1rem';
    });

    // Close when clicking outside
    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        nav.style.display = 'none';
      }
    });
  }

  /* =====================================================
     NAVBAR HIDE / SHOW ON SCROLL
  ===================================================== */
  const header = document.querySelector('.header');
  let lastScrollY = window.scrollY;

  if (header) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 100) {
        if (currentScroll > lastScrollY) {
          header.classList.add('hide'); // scroll down
        } else {
          header.classList.remove('hide'); // scroll up
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

      window.open(`https://wa.me/256702445852?text=${whatsappText}`, '_blank');

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
});
