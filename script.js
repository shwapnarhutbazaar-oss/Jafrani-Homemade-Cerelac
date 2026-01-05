// ১. একটি ইউনিক ইভেন্ট আইডি তৈরির ফাংশন
function generateEventID() {
    return 'id_' + Math.floor(Math.random() * 1000000) + '_' + Date.now();
}

// ২. ইউজার ডাটা এনক্রিপশন ফাংশন (Privacy Protection)
async function hashData(string) {
    if (!string) return null;
    const utf8 = new TextEncoder().encode(string.trim().toLowerCase());
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ৩. AOS (Animate On Scroll) ইনিশিয়েলাইজেশন
AOS.init({ 
    duration: 1000, 
    once: false, 
    mirror: true 
});

// ৪. Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const nav = document.getElementById('mainNav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});

// ৫. টাইমার ফাংশন
function startTimer(totalSeconds) {
    let timer = totalSeconds;
    let days, hours, minutes, seconds;
    
    let interval = setInterval(function () {
        days = parseInt(timer / (3600 * 24), 10);
        hours = parseInt((timer % (3600 * 24)) / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);

        if(document.getElementById('days')) document.getElementById('days').textContent = days < 10 ? "0" + days : days;
        if(document.getElementById('hours')) document.getElementById('hours').textContent = hours < 10 ? "0" + hours : hours;
        if(document.getElementById('mins')) document.getElementById('mins').textContent = minutes < 10 ? "0" + minutes : minutes;
        if(document.getElementById('secs')) document.getElementById('secs').textContent = seconds < 10 ? "0" + seconds : seconds;

        if (--timer < 0) {
            clearInterval(interval);
        }
    }, 1000);
}

window.onload = function () {
    const D = 4, H = 18, M = 37, S = 29;
    let totalSeconds = (D * 24 * 3600) + (H * 3600) + (M * 60) + S;
    startTimer(totalSeconds);
};

// --- উন্নত ট্র্যাকিং ইভেন্টসমূহ (Browser + Server) ---

// ক. InitiateCheckout Tracking (যখন ইউজার ফর্মে ক্লিক করবে)
const orderFormInputs = document.querySelectorAll('#orderForm input, #orderForm textarea');
let checkoutTracked = false;

orderFormInputs.forEach(input => {
    input.addEventListener('focus', function() {
        if (!checkoutTracked) {
            if (typeof trackProEvent === 'function') {
                trackProEvent('InitiateCheckout', {
                    content_name: 'Premium Jaffrani Homemade Cerelac',
                    content_category: 'Baby Food',
                    currency: 'BDT'
                });
            }
            checkoutTracked = true; 
        }
    });
});

// খ. AddToCart Tracking (যখন ইউজার ওজন বা পরিমাণ পরিবর্তন করবে)
const weightInputs = document.querySelectorAll('input[name="weight"]');
weightInputs.forEach(input => {
    input.addEventListener('change', function() {
        let selectedVal = this.value;
        let p = 1160; 
        if(selectedVal === '500g') p = 600;
        if(selectedVal === '2kg') p = 2240;

        if (typeof trackProEvent === 'function') {
            trackProEvent('AddToCart', {
                content_name: 'Premium Jaffrani Homemade Cerelac',
                value: p,
                currency: 'BDT',
                content_ids: [selectedVal],
                content_type: 'product'
            });
        }
    });
});

// গ. অর্ডার ফর্ম প্রসেসিং এবং Purchase Tracking
document.getElementById('orderForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const submitBtn = document.querySelector('.order-submit-btn');
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const selectedWeight = document.querySelector('input[name="weight"]:checked').value;
    
    let price = 1160; 
    if(selectedWeight === '500g') price = 600;
    if(selectedWeight === '2kg') price = 2240;

    const pID = 'order_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    // লোডিং অ্যানিমেশন দেখানো
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'customLoading';
    loadingOverlay.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 9999; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; font-family: 'Hind Siliguri', sans-serif; backdrop-filter: blur(5px);">
            <div style="border: 5px solid #333; border-top: 5px solid #fbbf24; border-radius: 50%; width: 60px; height: 60px; animation: spin 1s linear infinite;"></div>
            <h3 style="margin-top: 25px; font-size: 22px; font-weight: 600; color: #fbbf24;">অনুগ্রহ করে অপেক্ষা করুন...</h3>
            <p style="font-size: 16px; color: #eee; margin-top: 10px;">আপনার অর্ডারটি সিস্টেম নিশ্চিত করছে</p>
        </div>
        <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
    `;
    document.body.appendChild(loadingOverlay);
    submitBtn.disabled = true;

    const scriptURL = 'https://script.google.com/macros/s/AKfycbzjD7vlyYEBDZFmH8JvOE62bZplRDTH5D_tRGfj_fHgFLeaKDtJbIFC3qc5XibMS1hF/exec';
    
    try {
        // গুগল শিটে ডাটা পাঠানো
        await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&address=${encodeURIComponent(address)}&weight=${encodeURIComponent(selectedWeight)}&price=${price}&eventID=${pID}`
        });

        // ৫. Purchase Tracking (Browser + Server-Side API)
        const hashedPhone = await hashData(phone); 
        const hashedName = await hashData(name);    

        if (typeof trackProEvent === 'function') {
            trackProEvent('Purchase', {
                content_name: 'Premium Jaffrani Homemade Cerelac',
                value: price,
                currency: 'BDT',
                num_items: 1,
                content_ids: [selectedWeight],
                ph: hashedPhone, // সার্ভার সাইড ম্যাচিংয়ের জন্য
                fn: hashedName,
                eventID: pID 
            });
        }

        // ডাটা লেয়ার ফর গুগল ট্যাগ ম্যানেজার (ঐচ্ছিক)
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'purchase',
            'ecommerce': {
                'transaction_id': pID,
                'value': price,
                'currency': 'BDT',
                'items': [{
                    'item_name': 'Premium Jaffrani Homemade Cerelac',
                    'item_id': selectedWeight,
                    'price': price,
                    'quantity': 1
                }]
            }
        });

        // সাকসেস মেসেজ দেখানো
        if(document.getElementById('customLoading')) document.getElementById('customLoading').remove();
        
        const successPopup = document.createElement('div');
        successPopup.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 10000; display: flex; align-items: center; justify-content: center; font-family: 'Hind Siliguri', sans-serif; padding: 20px;">
                <div style="background: white; padding: 40px; border-radius: 25px; text-align: center; max-width: 450px; width: 100%; box-shadow: 0 25px 50px rgba(0,0,0,0.5);">
                    <div style="font-size: 70px; color: #2ecc71; margin-bottom: 20px;"><i class="fas fa-check-circle"></i></div>
                    <h2 style="color: #064e3b; margin-bottom: 15px; font-size: 28px;">অর্ডার সফল হয়েছে!</h2>
                    <p style="color: #444; line-height: 1.6; margin-bottom: 30px; font-size: 18px;">ধন্যবাদ! আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।</p>
                    <button id="closeSuccess" style="background: #fbbf24; color: #064e3b; border: none; padding: 15px 40px; border-radius: 12px; font-size: 18px; font-weight: 700; cursor: pointer; width: 100%;">ঠিক আছে</button>
                </div>
            </div>
        `;
        document.body.appendChild(successPopup);

        document.getElementById('closeSuccess').addEventListener('click', function() {
            window.location.reload(); 
        });

    } catch (error) {
        console.error('Error!', error.message);
        if(document.getElementById('customLoading')) document.getElementById('customLoading').remove();
        alert("দুঃখিত, কোনো একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        submitBtn.disabled = false;
    }
});
