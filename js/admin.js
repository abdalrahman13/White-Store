// js/admin.js
import { supabase } from './supabaseClient.js';

const logoutBtn = document.getElementById('logoutBtn');
const addBtn = document.getElementById('addBtn');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const categoryInput = document.getElementById('category');
const descriptionInput = document.getElementById('description');
const imageInput = document.getElementById('image');
const productsContainer = document.getElementById('productsContainer');

// Logout
logoutBtn.addEventListener('click', async () => {
  await supabase.auth.signOut();
  window.location.href = 'login.html';
});

// حماية الصفحة - لازم يكون مسجل دخول
supabase.auth.onAuthStateChange((event, session) => {
  if (!session) {
    window.location.href = 'login.html';
  }
});


addBtn.addEventListener('click', async () => {
  const name = nameInput.value.trim();
  const price = parseFloat(priceInput.value);
  const category = categoryInput.value.trim();
  const description = descriptionInput.value.trim();
  const file = imageInput.files[0];

  // التحقق من الحقول الإجبارية فقط
  if (!name || isNaN(price) || price <= 0) {
    alert('من فضلك أدخل اسم المنتج والسعر بشكل صحيح');
    return;
  }

  let imageUrl = "https://via.placeholder.com/400x300?text=No+Image";  // صورة افتراضية

  try {
    // رفع الصورة لو موجودة فقط
    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, { upsert: false });

      if (uploadError) throw new Error('خطأ في رفع الصورة: ' + uploadError.message);

      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      imageUrl = data.publicUrl;
    }

    // إضافة المنتج
    const { error } = await supabase
      .from('products')
      .insert({
        name,
        price,
        category: category || null,        // اختياري
        description: description || null,  // اختياري
        image_url: imageUrl                // دائمًا فيه قيمة (افتراضية)
      });

    if (error) throw error;

    alert('✅ تم إضافة المنتج بنجاح!');
    clearForm();
    renderProducts();

  } catch (error) {
    console.error(error);
    alert('❌ خطأ: ' + error.message);
  }
});

function clearForm() {
  nameInput.value = '';
  priceInput.value = '';
  categoryInput.value = '';
  descriptionInput.value = '';
  imageInput.value = '';
}

// عرض المنتجات
async function renderProducts() {
  productsContainer.innerHTML = '<p>جاري تحميل المنتجات...</p>';

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    productsContainer.innerHTML = '<p>خطأ في تحميل المنتجات</p>';
    console.error(error);
    return;
  }

  productsContainer.innerHTML = '';

  products.forEach(product => {
    const div = document.createElement('div');
    div.classList.add('product-card');
    div.innerHTML = `
      <img src="${product.image_url}" alt="${product.name}">
      <div class="content">
        <h3>Product Name: ${product.name}</h3>
        <p>Price: ${product.price} جنيه</p>
        <p>Category: ${product.category || 'غير مصنف'}</p>
        <p>Description: ${product.description || 'لا يوجد وصف'}</p>
        <button class="deleteBtn" data-id="${product.id}">Delete</button>
        </div>
        `;
        // <button class="updateBtn" data-id="${product.id}">Update</button>
    productsContainer.appendChild(div);
  });

  // حذف المنتج
  document.querySelectorAll('.deleteBtn').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;

      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', btn.dataset.id);

      if (!error) {
        alert('✅ تم حذف المنتج');
        renderProducts();
      }
    });
  });
}

// تحميل المنتجات عند فتح الصفحة
window.addEventListener('DOMContentLoaded', renderProducts);

