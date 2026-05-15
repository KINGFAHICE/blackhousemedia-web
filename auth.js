// ==================== auth form logic ====================
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { app, auth, db } from './script.js';

const authTitle = document.getElementById('auth-title');
const authsubtittle = document.getElementById('auth-subtittle');
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const signoutoptions = document.getElementById('signoutoptions');
const authForm = document.getElementById('authForm');

function switchTab(mode) {
  if (mode === 'signup') {
    signoutoptions.style.display = 'block';
    authTitle.innerText = "WELCOME";
    authsubtittle.innerText = "CREATE AN ACCOUNT";
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signoutoptions.classList.remove('hidden');
  } else {
    signoutoptions.style.display = 'none';
    authTitle.innerText = "WELCOME BACK";
    authsubtittle.innerText = "VERIFY YOUR IDENTITY";
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    signoutoptions.classList.add('hidden');
  }
}

loginTab.addEventListener('click', () => switchTab('login'));
signupTab.addEventListener('click', () => switchTab('signup'));

authForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const isSignup = !signoutoptions.classList.contains('hidden');
  try {
    if (isSignup) {
      const userRole = document.getElementById('userRole').value;
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Store user info in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: email,
        role: userRole
      });
      alert("ACCOUNT CREATED.");
      window.location.href = userRole;
    } else {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      if (userDoc.exists()) {
        alert("VERIFIED. ACCESS GRANTED");
        window.location.href = userDoc.data().role;
      } else {
        alert("User data not found. Contact support.");
      }
    }
  } catch (error) {
    alert("VERIFICATION FAILED: CONTACT SUPPORT OR SIGNUP");
  }
});