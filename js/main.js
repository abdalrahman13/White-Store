let logo = document.getElementById('logo');
let pressCounter = 0;
logo.addEventListener('click', function(e) {
  pressCounter++;
  setTimeout(function () {
    pressCounter = 0;
  }, 3000);
  if (pressCounter >= 5) {
    location.href = 'login.html'
  }
})


let menu = document.querySelector("nav .container .menu");
let links = document.querySelector("nav .container ul");
menu.addEventListener("click", function () {
  links.classList.toggle("appear");
});
let lis = document.querySelectorAll("nav .container ul li");
for (let i = 0; i < lis.length; i++) {
  lis[i].addEventListener("click", function (e) {
    this.children[0].click();
    links.classList.remove("appear");
  });
}


let rightPressCounter = 0;
logo.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  pressCounter++;
  setTimeout(() => {
    pressCounter = 0;
  }, 3000);
  if (pressCounter >= 5) {
    location.href = 'admin.html';
  }
})

let pressTimer = null;

if (logo) {
  // عند بدء الضغط (mousedown أو touchstart)
  const startPress = (e) => {
    // منع السلوك الافتراضي لو فيه لينك
    e.preventDefault();

    pressTimer = setTimeout(() => {
      // بعد 5 ثواني → روح لصفحة الأدمن
      window.location.href = 'admin.html';
    }, 3000); // 5000 مللي ثانية = 5 ثواني
  };

  // عند رفع الإصبع أو الماوس (يوقف العداد)
  const cancelPress = () => {
    clearTimeout(pressTimer);
  };

  // دعم الماوس (للكمبيوتر)
  logo.addEventListener('mousedown', startPress);
  logo.addEventListener('mouseup', cancelPress);
  logo.addEventListener('mouseleave', cancelPress);   // لو خرج الماوس

  // دعم اللمس (للموبايل)
  logo.addEventListener('touchstart', startPress);
  logo.addEventListener('touchend', cancelPress);
  logo.addEventListener('touchcancel', cancelPress);
}