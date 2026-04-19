// js/products.js
import { supabase } from './supabaseClient.js';

const productsContainer = document.getElementById('productsContainer');

async function loadProducts() {
  // رسالة تحميل
  productsContainer.innerHTML = `
    <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
      جاري تحميل المنتجات...
    </div>
  `;

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    productsContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; color: red;">
        حدث خطأ أثناء تحميل المنتجات
      </div>
    `;
    return;
  }

  if (products.length === 0) {
    productsContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
        لا توجد منتجات حالياً
      </div>
    `;
    return;
  }

  // تنظيف الحاوية
  productsContainer.innerHTML = '';
  
  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    let message = `تفاصيل المنتج ${product.name}`

    card.innerHTML = `
      <img src="${product.image_url}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
      
      <div class="content">
        <h3><span>Product Name:</span> ${product.name}</h3>
        <p><span>Product Price:</span> ${product.price} جنيه</p>
        
        ${product.category ? `<p><span>Category:</span> ${product.category}</p>` : ''}
        ${product.description ? `<p><span>Description:</span> ${product.description}</p>` : ''}
        
        <div class="buyBtn" data-id="${product.id}"><a href="https://wa.me/+201212990941?text=${message}">Buy Now</a></div>
      </div>
    `;

    productsContainer.appendChild(card);
  });
}

// تحميل المنتجات عند فتح الصفحة
document.addEventListener('DOMContentLoaded', loadProducts);


// let nameInput = document.getElementById("name");
// let priceInput = document.getElementById("price");
// let imageInput = document.getElementById("image");
// let addBtn = document.getElementById("addBtn");
// let categoryInput = document.getElementById("category");
// let descriptionInput = document.getElementById("description");

// console.log(addBtn)
// addBtn.addEventListener("click", async function () {
//   if (!nameInput.value || !priceInput.value) {
//     alert("من فضلك املأ كل الحقول!");
//     return;
//   }

//   let product = {
//     image: imageInput.value,
//     name: nameInput.value,
//     price: +priceInput.value,
//     category: categoryInput.value,
//     description: descriptionInput.value,
//   };

//   await addDoc(collection(db, "products"), product);

//   alert("تم إضافة المنتج ✅");

//   // إعادة عرض المنتجات بعد الإضافة
//   renderProducts();

//   // تفريغ الحقول
//   nameInput.value = "";
//   priceInput.value = "";
//   imageInput.value = "";
//   categoryInput.value = "";
//   descriptionInput.value = "";
// });

// // ---------- جلب وعرض المنتجات ----------
// async function renderProducts() {
//   const productsContainer = document.getElementById("productsContainer");
//   productsContainer.innerHTML = ""; // نمسح القديم

//   const querySnapshot = await getDocs(collection(db, "products"));

//   querySnapshot.forEach((docSnap) => {
//     const product = docSnap.data();
//     const productId = docSnap.id;

//     const div = document.createElement("div");
//     div.classList.add("product-card");
//     div.innerHTML = `
//     <img src="${product.image}" alt="${product.name}" width="150">
//     <div class="content">
//       <h3>Product Name: ${product.name}</h3>
//       <p>Price: $${product.price}</p>
//       <p>Product Category: $${product.price}</p>
//       <p>Product Description: $${product.price}</p>
//       <button class="deleteBtn" data-id="${productId}">Delete</button>
//     </div>
//     `;
//     productsContainer.appendChild(div);
//   });

//   // إضافة أحداث الحذف
//   const deleteBtns = document.querySelectorAll(".deleteBtn");
//   deleteBtns.forEach((btn) => {
//     btn.addEventListener("click", async function () {
//       const id = this.dataset.id;
//       await deleteDoc(doc(db, "products", id));
//       alert("تم حذف المنتج ✅");
//       renderProducts(); // إعادة عرض المنتجات بعد الحذف
//     });
//   });
// }

// // ---------- تحميل المنتجات عند فتح الصفحة ----------
// window.addEventListener("DOMContentLoaded", renderProducts);