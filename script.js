/**
 * ১. ইন্টারফেস অ্যানিমেশন (AOS)
 */
AOS.init({ duration: 1000, once: true });

// ২. স্ক্রল ও নেভিগেশন লজিক
window.addEventListener('scroll', function() {
    const nav = document.getElementById('mainNav');
    if (nav) {
        window.scrollY > 50 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
    }
});

/**
 * ৩. অর্ডার সাবমিশন ও ট্র্যাকিং (Advanced Matching & Parameters)
 */
document.getElementById('orderForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // ডাটা সংগ্রহ
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const selectedWeight = document.querySelector('input[name="weight"]:checked').value;
    
    // দাম নির্ধারণ
    let price = selectedWeight === '500g' ? 600 : (selectedWeight === '2kg' ? 2240 : 1160);

    // --- Facebook & GTM Advanced Purchase (Data Layer Push) ---
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'purchase',
        'value': price,
        'currency': 'BDT',
        'customer_name': name,
        'customer_phone': phone, // Advanced Matching ডাটা
        'product_name': 'Premium Zafrani Cerelac',
        'weight': selectedWeight,
        'event_day': new Date().toLocaleDateString('en-US', {weekday: 'long'}),
        'event_hour': new Date().getHours() + '-' + (new Date().getHours() + 1),
        'event_month': new Date().toLocaleDateString('en-US', {month: 'long'}),
        'traffic_source': document.referrer ? document.referrer : 'direct',
        'user_role': 'guest',
        'landing_page': 'Show'
    });

    // Loading Show
    const loading = document.createElement('div');
    loading.id = 'customLoading';
    loading.innerHTML = `<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999;display:flex;justify-content:center;align-items:center;color:#fff;flex-direction:column;font-family:sans-serif;">
        <div style="width:50px;height:50px;border:5px solid #f3f3f3;border-top:5px solid #FF5722;border-radius:50%;animation:spin 1s linear infinite;"></div>
        <p style="margin-top:20px;font-size:18px;">আপনার অর্ডারটি প্রসেস হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...</p>
        <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
    </div>`;
    document.body.appendChild(loading);

    // Google Sheet Submission
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzjD7vlyYEBDZFmH8JvOE62bZplRDTH5D_tRGfj_fHgFLeaKDtJbIFC3qc5XibMS1hF/exec';
    
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('weight', selectedWeight);
        formData.append('price', price);

        await fetch(scriptURL, { method: 'POST', body: formData });
        
        document.getElementById('customLoading')?.remove();
        
        // সুন্দর সাকসেস পপআপ দেখানো
        const customerNameSpan = document.getElementById('customerName');
        if(customerNameSpan) customerNameSpan.innerText = name;
        
        const successModal = document.getElementById('successModal');
        if(successModal) successModal.style.display = 'flex';
        
        document.getElementById('orderForm')?.reset();
        
    } catch (error) {
        document.getElementById('customLoading')?.remove();
        alert("দুঃখিত, সার্ভার সমস্যা হচ্ছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
});

// পপআপ বন্ধ করার ফাংশন
window.closeModal = function() {
    document.getElementById('successModal').style.display = 'none';
    window.location.reload(); 
}
/**
 * ৪. টাইমার লজিক
 */
function startTimer(totalSeconds) {
    let timer = totalSeconds;
    setInterval(function () {
        let days = Math.floor(timer / (3600 * 24));
        let hours = Math.floor((timer % (3600 * 24)) / 3600);
        let mins = Math.floor((timer % 3600) / 60);
        let secs = Math.floor(timer % 60);

        if(document.getElementById('days')) document.getElementById('days').textContent = String(days).padStart(2, '0');
        if(document.getElementById('hours')) document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        if(document.getElementById('mins')) document.getElementById('mins').textContent = String(mins).padStart(2, '0');
        if(document.getElementById('secs')) document.getElementById('secs').textContent = String(secs).padStart(2, '0');

        if (--timer < 0) timer = 0;
    }, 1000);
}
// ৪ দিন ১৮ ঘণ্টা সেট করা হয়েছে
startTimer((4 * 24 * 3600) + (18 * 3600));

/**
 * ৫. রিভিউ স্লাইডার লজিক
 */
let currentSlide = 0;
const slides = document.querySelectorAll('.review-card');
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}
function nextSlide() {
    if(slides.length > 0) {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
}
if(slides.length > 0) {
    showSlide(0);
    setInterval(nextSlide, 5000);
}

/**
 * ৬. GTM Add to Cart (উন্নত প্যারামিটার সহ)
 */

// ক) বাটন ক্লিক ইভেন্ট
document.querySelector('.btn-order-premium')?.addEventListener('click', function() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'addToCart',
        'action': 'button_click',
        'product_name': 'Premium Zafrani Cerelac',
        'traffic_source': document.referrer ? document.referrer : 'direct',
        'user_role': 'guest'
    });
});

// খ) ওজন সিলেক্ট করলে ইভেন্ট পুশ (ডুপ্লিকেট রোধ ও অ্যাডভান্সড ডাটা)
let hasAddToCartFired = false; 
document.querySelectorAll('input[name="weight"]').forEach(radio => {
    radio.addEventListener('change', function() {
        if(this.checked && !hasAddToCartFired) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'addToCart',
                'action': 'weight_selection',
                'selected_weight': this.value,
                'product_name': 'Premium Zafrani Cerelac',
                'event_day': new Date().toLocaleDateString('en-US', {weekday: 'long'}),
                'event_hour': new Date().getHours() + '-' + (new Date().getHours() + 1),
                'traffic_source': document.referrer ? document.referrer : 'direct',
                'user_role': 'guest'
            });
            hasAddToCartFired = true; 
            console.log('Advanced AddToCart Data Pushed');
        }
    });
});
