/*=========================login========= logic==================*/
document.addEventListener('DOMContentLoaded',()=>
const loginBtn =document.getElementById('loginBtn');
const signupBtn =document.getElementById('signupBtn');
const signoutoptions =document.getElementById('signoutoptions');
const proceedBtn =document.getElementById('primary-btn');
const userRole=document.getElementById('userRole');
if (loginBtn && signupBtn && signoutoptions){
  loginBtn.addEventListener('click',()=>{
    signoutoptions.classList.add('hidden');
    loginBtn.classList.add('active');
    signupBtn.classList.remove('active');
    localStorage.setitem('auth_view','login');
    
  signupBtn.addEventListener('click',()=>{
    signoutoptions.classList.remove('hidden');
    loginBtn.classList.remove('active');
    localStorage.setItem('auth_view','signup');

  const savedView=localStorage.getItem('auth_view');
  if (savedView ==='signup') signupBtn.click();
  if(proceedBtn){
  proceedBtn.addEventListener('click'),(e)=>
  e.preventDefault();
  const urlparams =new URLSearchParams(window.location.search);
  const redirectTarget =urlparams.get('redirect');
  const issignup=!signoutoptions.classList.contains('hidden');
  if(redirectTarget) {
    window.location.href=redirectTarget;
  }
  else if(issignup && userRole && userRole.value){
    window.location.href=userRole.value;
  }
  else {
    Window.location.href='index.html'
  }
  }
});
  });
