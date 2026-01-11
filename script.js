/**
 * ১. ইন্টারফেস অ্যানিমেশন ও নেভিগেশন
 */
AOS.init({ duration: 1000, once: true });

window.addEventListener('scroll', function() {
    const nav = document.getElementById('mainNav');
    if (nav) {
        window.scrollY > 50 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
    }
});

// ২. সার্ভারে ডাটা পাঠানোর কমন ফাংশন
const scriptURL = 'https://script.google.com/macros/s/AKfycbxXd6_mcPq0rABAbHGtJU9JTpL3EUbduWCrMpFbjyO2gqgTI-QXDeTf8SnazDb0r3TU/exec';

async function sendToServer(eventName, eventID, extraData = {}) {
    const formData = new FormData();
    formData.append('event_name', eventName);
    formData.append('event_id', eventID);
    formData.append('user_agent', navigator.userAgent);
    formData.append('page_url', window.location.href);

    for (const key in extraData) {
        formData.append(key, extraData[key]);
    }

    try {
        await fetch(scriptURL, { method: 'POST', body: formData, mode: 'no-cors' });
        console.log("✅ Server " + eventName + " Sent");
    } catch (e) {
        console.error("❌ Server Error", e);
    }
}

/**
 * ৩. অটোমেটিক ইভেন্ট ট্র্যাকিং (PageView, TimeOnPage, Scroll)
 */
// PageView
const pvID = 'pv-' + Date.now();
if (typeof fbq === "function") fbq('track', 'PageView', {}, { eventID: pvID });
sendToServer('PageView', pvID);

// TimeOnPage_10s
setTimeout(() => {
    const topID = 'top-' + Date.now();
    sendToServer('TimeOnPage_10s', topID);
}, 10000);

// CustomScroll
let scrollFired = false;
window.addEventListener('scroll', () => {
    if (window.scrollY > 400 && !scrollFired) {
        const scrollID = 'scroll-' + Date.now();
        sendToServer('CustomScroll', scrollID);
        scrollFired = true;
    }
});

/**
 * ৪. অর্ডারের মেইন ফাংশন (Purchase + AddToCart)
 */
document.getElementById('orderForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const eventID = 'order-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const selectedWeight = document.querySelector('input[name="weight"]:checked').value;
    
    let price = selectedWeight === '500g' ? 600 : (selectedWeight === '2kg' ? 2240 : 1160);

    // ব্রাউজার পিক্সেল (Deduplication এর জন্য eventID সহ)
    if (typeof fbq === "function") {
        fbq('track', 'Purchase', {
            value: price,
            currency: 'BDT',
            content_name: 'Premium Zafrani Cerelac',
            content_type: 'product',
            ph: phone, 
            fn: name   
        }, { eventID: eventID });
    }

    // লোডিং দেখানো
    const loading = document.createElement('div');
    loading.id = 'customLoading';
    loading.innerHTML = `
    <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999;display:flex;justify-content:center;align-items:center;color:#fff;flex-direction:column;font-family:sans-serif;">
        <div style="width:50px;height:50px;border:5px solid #f3f3f3;border-top:5px solid #FF5722;border-radius:50%;animation:spin 1s linear infinite;"></div>
        <p style="margin-top:20px;font-size:18px;">আপনার অর্ডারটি প্রসেস হচ্ছে...</p>
        <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
    </div>`;
    document.body.appendChild(loading);

    // সার্ভার ট্র্যাকিং (Purchase)
    await sendToServer('Purchase', eventID, {
        name: name,
        phone: phone,
        address: address,
        weight: selectedWeight,
        price: price
    });
    
    document.getElementById('customLoading')?.remove();
    const successModal = document.getElementById('successModal');
    if(successModal) successModal.style.display = 'flex';
    document.getElementById('orderForm')?.reset();
});

// AddToCart
document.querySelector('.btn-order-premium')?.addEventListener('click', () => {
    const atcID = 'atc-' + Date.now();
    if (typeof fbq === "function") fbq('track', 'AddToCart', { content_name: 'Premium Zafrani Cerelac' }, { eventID: atcID });
    sendToServer('AddToCart', atcID, { product_name: 'Premium Zafrani Cerelac' });
});

/**
 * ৫. টাইমার ও স্লাইডার (আপনার আগের কোড)
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
startTimer((4 * 24 * 3600) + (18 * 3600));

let currentSlide = 0;
const slides = document.querySelectorAll('.review-card');
function showSlide(index) {
    slides.forEach((slide, i) => { slide.style.display = i === index ? 'block' : 'none'; });
}
if(slides.length > 0) {
    showSlide(0);
    setInterval(() => { currentSlide = (currentSlide + 1) % slides.length; showSlide(currentSlide); }, 5000);
}

window.closeModal = function() {
    document.getElementById('successModal').style.display = 'none';
    window.location.reload(); 
}
