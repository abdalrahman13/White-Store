// دالة الـ Alert المخصصة
function showAlert(message, title = "تنبيه", type = "info") {
  const overlay = document.getElementById("customAlert");
  const titleEl = document.getElementById("alertTitle");
  const msgEl = document.getElementById("alertMessage");
  const iconEl = document.getElementById("alertIcon");
  const actionsEl = document.getElementById("alertActions");

  if (!overlay) return;

  titleEl.textContent = title;
  msgEl.textContent = message;

  if (type === "success") iconEl.textContent = "✅";
  else if (type === "error") iconEl.textContent = "⚠️";
  else iconEl.textContent = "✨";

  // إرجاع شكل الزر المعتاد (زر واحد فقط)
  actionsEl.innerHTML = `
    <button class="custom-alert-btn" onclick="closeCustomAlert()">موافق</button>
  `;

  overlay.classList.add("active");
}

// دالة الـ Confirm المخصصة (لتأكيد الحذف)
function showConfirm(message, title = "تأكيد الحذف") {
  return new Promise((resolve) => {
    const overlay = document.getElementById("customAlert");
    const titleEl = document.getElementById("alertTitle");
    const msgEl = document.getElementById("alertMessage");
    const iconEl = document.getElementById("alertIcon");
    const actionsEl = document.getElementById("alertActions");

    if (!overlay) return resolve(false);

    titleEl.textContent = title;
    msgEl.textContent = message;
    iconEl.textContent = "🗑️";

    // إظهار زرارين: تأكيد وإلغاء
    actionsEl.innerHTML = `
      <button id="confirmYesBtn" class="custom-alert-btn custom-btn-danger">نعم، احذف</button>
      <button id="confirmNoBtn" class="custom-alert-btn custom-btn-secondary">إلغاء</button>
    `;

    overlay.classList.add("active");

    document.getElementById("confirmYesBtn").onclick = () => {
      closeCustomAlert();
      resolve(true);
    };

    document.getElementById("confirmNoBtn").onclick = () => {
      closeCustomAlert();
      resolve(false);
    };
  });
}

// دالة الإغلاق
function closeCustomAlert() {
  const overlay = document.getElementById("customAlert");
  if (overlay) overlay.classList.remove("active");
}
