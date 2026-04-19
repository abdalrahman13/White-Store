// js/login.js
import { supabase } from './supabaseClient.js';

const emailInput = document.getElementById('em');
const passwordInput = document.getElementById('pass');
const emailLoginBtn = document.getElementById('emailLoginBtn');
const googleBtn = document.getElementById('googleBtn');

// تسجيل الدخول بالإيميل والباسورد
emailLoginBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert('من فضلك أدخل الإيميل والباسورد');
    return;
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) throw error;

    alert('✅ تم تسجيل الدخول بنجاح');
    window.location.href = 'admin.html';

  } catch (error) {
    console.error(error);
    alert('❌ خطأ في تسجيل الدخول: ' + error.message);
  }
});

// تسجيل الدخول بجوجل (اختياري - لو عايزه)
// if (googleBtn) {
//   googleBtn.addEventListener('click', async () => {
//     try {
//       const { error } = await supabase.auth.signInWithOAuth({
//         provider: 'google',
//         options: {
//           redirectTo: window.location.origin + '/admin.html'
//         }
//       });

//       if (error) throw error;
//     } catch (error) {
//       alert('خطأ في تسجيل الدخول بجوجل: ' + error.message);
//     }
//   });
// }

// التحقق إذا كان اليوزر مسجل دخول بالفعل
// supabase.auth.onAuthStateChange((event, session) => {
//   if (session) {
//     window.location.href = 'admin.html';
//   }
// });

supabase.auth.onAuthStateChange((event, session) => {
  if (session && window.location.pathname.includes("login.html")) {
    window.location.href = 'admin.html';
  }
});

// import { auth } from "./firebase.js";

// import {
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup
// } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// window.addEventListener("DOMContentLoaded", () => {
  // const form = document.getElementById("loginForm");
  // const email = document.getElementById("em");
  // const password = document.getElementById("pass");
  
  // const emailBtn = document.getElementById("emailLoginBtn");
  // const googleBtn = document.getElementById("googleBtn");
  

//   // 🚨 حماية لو العناصر مش موجودة
//   if (!form || !email || !password || !emailBtn || !googleBtn) {
//     console.error("Missing HTML elements!");
//     return;
//   }

//   // 🔐 Email / Password login (عن طريق الفورم)
//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     try {
//       console.log('hello before')
//       await signInWithEmailAndPassword(auth, email.value, password.value);
//       console.log('hello before')

//       alert("Login successful ✅");
//       window.location.href = "admin.html";

//     } catch (error) {
//       alert('hello' + error.message);
//     }
//   });

//   // 🔐 Email button (اختياري)
//   emailBtn.addEventListener("click", async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email.value, password.value);

//       alert("Login successful ✅");
//       window.location.href = "admin.html";

//     } catch (error) {
//       alert(error.message);
//     }
//   });

//   // 🔐 Google login
//   googleBtn.addEventListener("click", async () => {
//     const provider = new GoogleAuthProvider();

//     try {
//       await signInWithPopup(auth, provider);

//       alert("Google login successful ✅");
//       window.location.href = "admin.html";

//     } catch (error) {
//       alert(error.message);
//     }
//   });

// });


// import { supabase } from './supabaseClient';

// const handleLogin = async () => {
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email: 'white@gmail.com',     // غيرها بإيميلك
//     password: 'white123',  // غيرها بالباسورد
//   });

//   if (error) {
//     console.error('Login error:', error.message);
//   } else {
//     console.log('تم تسجيل الدخول بنجاح!', data.user);
//     // هنا تقدر توجه المستخدم لصفحة الأدمن
//   }
// };