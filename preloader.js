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
