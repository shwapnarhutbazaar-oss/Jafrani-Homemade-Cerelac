/**
 * ১. ইউটিলিটি ফাংশনসমূহ (ID Generation & Encryption)
 */
function generateEventID() {
    // নিখুঁত ডিডুপ্লিকেশনের জন্য একটি ইউনিক আইডি তৈরি
    return 'id_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

async function hashData(string) {
    if (!string) return null;
    const utf8 = new TextEncoder().encode(string.trim().toLowerCase());
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * ২. ইন্টারফেস অ্যানিমেশন (AOS & Navbar)
 */
AOS.init({ 
    duration: 1000, 
    once: true, // পারফরম্যান্সের জন্য একবার অ্যানিমেশন হওয়া ভালো
    mirror: false 
});

window.addEventListener('scroll', function() {
    const nav = document.getElementById('mainNav');
    if (nav) {
        window.scrollY > 50 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
    }
});

/**
 * ৩. কাউন্টডাউন টাইমার
 */
function startTimer(totalSeconds) {
    let timer = totalSeconds;
    const interval = setInterval(function () {
        let days = Math.floor(timer / (3600 * 24));
        let hours = Math.floor((timer % (3600 * 24)) / 3600);
        let minutes = Math.floor((timer % 3600) / 60);
        let seconds = Math.floor(timer % 60);

        if(document.getElementById('days')) document.getElementById('days').textContent = String(days).padStart(2, '0');
        if(document.getElementById('hours')) document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        if(document.getElementById('mins')) document.getElementById('mins').textContent = String(minutes).padStart(2, '0');
        if(document.getElementById('secs')) document.getElementById('secs').textContent = String(seconds).padStart(2, '0');

        if (--timer < 0) clearInterval(interval);
    }, 1000);
}

window.onload = function () {
    const totalSeconds = (4 * 24 * 3600) + (18 * 3600) + (37 * 60) + 29;
    startTimer(totalSeconds);
};

/**
 * ৪. ট্র্যাকিং ইভেন্টসমূহ (Meta Pixel & Conversion API)
 */

// ক. InitiateCheckout (ইউজার যখন ফর্মে ফোকাস করবে)
let checkoutTracked = false;
document.querySelectorAll('#orderForm input, #orderForm textarea').forEach(input => {
    input.addEventListener('focus', function() {
        if (!checkoutTracked && typeof trackProEvent === 'function') {
            trackProEvent('InitiateCheckout', {
                content_name: 'Premium Jaffrani Homemade Cerelac',
                content_category: 'Baby Food',
                currency: 'BDT'
            });
            checkoutTracked = true; 
        }
    });
});

// খ. AddToCart (ওজন নির্বাচনের সময়)
document.querySelectorAll('input[name="weight"]').forEach(input => {
    input.addEventListener('change', function() {
        let selectedVal = this.value;
        let price = selectedVal === '500g' ? 600 : (selectedVal === '2kg' ? 2240 : 1160);

        if (typeof trackProEvent === 'function') {
            trackProEvent('AddToCart', {
                content_name: 'Premium Jaffrani Homemade Cerelac',
                value: price,
                currency: 'BDT',
                content_ids: [selectedVal],
                content_type: 'product'
            });
        }
    });
});

// গ. Purchase (অর্ডার সাবমিট এবং গুগল শিট)
document.getElementById('orderForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const submitBtn = document.querySelector('.order-submit-btn');
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const selectedWeight = document.querySelector('input[name="weight"]:checked').value;
    
    let price = selectedWeight === '500g' ? 600 : (selectedWeight === '2kg' ? 2240 : 1160);
    const pID = generateEventID(); // ইউনিক ইভেন্ট আইডি

    // লোডিং অ্যানিমেশন দেখানো
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'customLoading';
    loadingOverlay.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 9999; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; font-family: 'Hind Siliguri', sans-serif; backdrop-filter: blur(5px);">
            <div style="border: 5px solid #333; border-top: 5px solid #fbbf24; border-radius: 50%; width: 60px; height: 60px; animation: spin 1s linear infinite;"></div>
            <h3 style="margin-top: 25px; font-size: 22px; color: #fbbf24;">প্রসেসিং হচ্ছে...</h3>
        </div>
        <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
    `;
    document.body.appendChild(loadingOverlay);
    submitBtn.disabled = true;

    try {
        // ১. গুগল শিটে ডাটা পাঠানো
        const scriptURL = 'https://script.google.com/macros/s/AKfycbzjD7vlyYEBDZFmH8JvOE62bZplRDTH5D_tRGfj_fHgFLeaKDtJbIFC3qc5XibMS1hF/exec';
        await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&address=${encodeURIComponent(address)}&weight=${encodeURIComponent(selectedWeight)}&price=${price}&eventID=${pID}`
        });

        // ২. ফেসবুক পারচেজ ট্র্যাকিং (Browser + Server)
        const hashedPhone = await hashData(phone); 
        const hashedName = await hashData(name);    

        if (typeof trackProEvent === 'function') {
            trackProEvent('Purchase', {
                content_name: 'Premium Jaffrani Homemade Cerelac',
                value: price,
                currency: 'BDT',
                num_items: 1,
                content_ids: [selectedWeight],
                ph: hashedPhone,
                fn: hashedName,
                eventID: pID // অবশ্যই 'eventID' বড় হাতের অক্ষরে হবে
            });
        }

        // ৩. Data Layer (GTM এর জন্য)
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'purchase',
            'ecommerce': {
                'transaction_id': pID,
                'value': price,
                'currency': 'BDT',
                'items': [{ 'item_name': 'Premium Jaffrani Homemade Cerelac', 'item_id': selectedWeight, 'price': price, 'quantity': 1 }]
            }
        });

        // ৪. সাকসেস পপআপ দেখানো
        if(document.getElementById('customLoading')) document.getElementById('customLoading').remove();
        showSuccessPopup();

    } catch (error) {
        console.error('Submission Error:', error);
        if(document.getElementById('customLoading')) document.getElementById('customLoading').remove();
        alert("দুঃখিত, অর্ডারটি সম্পন্ন হয়নি। আবার চেষ্টা করুন।");
        submitBtn.disabled = false;
    }
});

function showSuccessPopup() {
    const popup = document.createElement('div');
    popup.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 10000; display: flex; align-items: center; justify-content: center; font-family: 'Hind Siliguri', sans-serif; padding: 20px;">
            <div style="background: white; padding: 40px; border-radius: 25px; text-align: center; max-width: 450px; width: 100%;">
                <div style="font-size: 70px; color: #2ecc71; margin-bottom: 20px;"><i class="fas fa-check-circle"></i></div>
                <h2 style="color: #064e3b; margin-bottom: 15px;">অর্ডার সফল হয়েছে!</h2>
                <p style="color: #444; margin-bottom: 30px;">ধন্যবাদ! আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।</p>
                <button onclick="window.location.reload()" style="background: #fbbf24; color: #064e3b; border: none; padding: 15px 40px; border-radius: 12px; font-weight: 700; cursor: pointer; width: 100%;">ঠিক আছে</button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
}
// অটোমেটিক রিভিউ স্লাইডার লজিক
let currentSlide = 0;
const slider = document.getElementById('reviewSlider');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// প্রতি ৩ সেকেন্ড (৩০০০ মিলি-সেকেন্ড) পর পর স্লাইড পরিবর্তন
if(slider) {
    setInterval(nextSlide, 3000);
}
