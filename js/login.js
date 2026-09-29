// js/login.js
import { supabase } from "./supabaseClient.js";

const emailInput = document.getElementById("em");
const passwordInput = document.getElementById("pass");
const emailLoginBtn = document.getElementById("emailLoginBtn");
const googleBtn = document.getElementById("googleBtn");
const checkbox = document.getElementById("checkbox");

checkbox.addEventListener("change", function () {
  if (checkbox.checked === true) {
    console.log(passwordInput);
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";``
  }
});
// تسجيل الدخول بالإيميل والباسورد
emailLoginBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    showAlert("من فضلك أدخل الإيميل والباسورد");
    return;
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw error;

    showAlert("✅ تم تسجيل الدخول بنجاح");
    window.location.href = "admin.html";
  } catch (error) {
    console.error(error);
    showAlert("❌ خطأ في تسجيل الدخول: " + error.message);
  }
});


supabase.auth.onAuthStateChange((event, session) => {
  if (session && window.location.pathname.includes("login.html")) {
    window.location.href = "admin.html";
  }
});
