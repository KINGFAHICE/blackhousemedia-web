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
      //backend login id (FireBase)
      const userCredential = await createUserWithEmailAndPassword(auth, email,password)
      await setDoc(doc(db,"users, Usercredential.user.uid"),{
        email:email,
        role:userRole
      });
      alert("ACCOUNT CREATED.");
      window.location.href=userRole;
    }
  else{
    const userCredential = await signinWithEmailAndPassword(auth,email,password);
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