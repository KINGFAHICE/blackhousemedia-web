//firebase module imports//
import { initializeApp} from "httos://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword}
from "https:??www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import{getfirestore, doc, setDoc, getDoc} from "https://www.gstatic.com/firebase-auth.js";
//firebase config
const firebaseconfig = {apiKey:"AIzaSyD5sbIZ43Wtb1pkMFjhfc8KDCotE5W5vP8",
authDomain: "balckhousemedia-57138.firebaseapp.com",
 projectID: "blackhousemedia-57138",
storageBucket: "balckhousemedia-57138.firebasestorage.app", messagingSenderID:"109930483513",
appId: "1:1099304835413:web:0a27d3419675cb7fe9f7dc",
measurementId: "G-8P0NDCP3V9"
};
//INITIALIZE SERVICES
const app = initializeApp(firebaseconfig);
const auth = getAuth(app);
const db =getFirestore(app);
/*
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
  ////
  ////====================auth form=====///
  const authTitle=document.getElementById('auth-title');
  const authsubtittle = document.getElementById('auth-subtittle')
  const loginTab = document.getElementById('loginTab')
  const signupTab = document.getElementById('signupTab');
  const proceedBtn = document.getElementById('proceedBtn');
  const signoutoptions = document.getElementById('signoutoptions');
  const authForm = document.getElementById('authForm');
  //switching logic
  function SwitchTab(mode){
    if(mode === 'signup') {
      document.getElementById('signoutoptions').style.display='block';
      authTitle.innerText = "WELCOME";
      authsubtittle.innerText = "CREATE AN ACCOUNT";
      proceedBtn.innerText = "PROCEED SIGNUP";
      signoutoptions.classList.remove('hidden');
      signupTab.classList.add('active');
      loginTab.classList.remove('active');
    }
    else{
      document.getElementById('signoutoptions').style.display='none';
      authTitle.innerText = "WELCOME BACK";
      authsubtittle.innerText = "VERIFY YOUR IDENTITY";
      proceedBtn.innerText = "PROCEED LOGIN";
      signoutoptions.classList.add('hidden');
      loginTab.classList.add('active');
      signupTab.classList.remove('active');
    }
  }authForm .addEventListener('submit', async (e) =>{
    e.preventDefault();//stop page reload
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const isSignup = !signoutoptions.classList.contains('hidden');
    try{
    if (isSignup){
      const userRole = document.getElementById('userRole').value;
      console.log("creating Account...", {email,userRole});
      //backend logid (FireBase)
      const userCredential = await creatUserWithEmailAndPassword(auth, email,password)
      await setDoc(doc(db,"users, UserCredntial.user.uid"),{
        email:email,
        role:userRole
      });
      alert("ACCOUNT CREATED.");
      window.location.href=userRole;
    }
  else{
    const userCredential = await signinWithEmailAndPassword(auth,emailpassword);
    const userDoc = await getDoc(doc(db,"users", userCredential.user.uid));
    if(userDoc.exists()){
       alert("VERIFIED. ACCESS GRANTED");
       window.location.href = userDoc.data().role;
    }
  }
}
catch(error){
  alert("VERIFICATION FAILED: CONTACT SUPPORT OR SINGUP")
}

  });

