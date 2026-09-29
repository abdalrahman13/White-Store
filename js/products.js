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

