// ১. AOS (Animate On Scroll) ইনিশিয়েলাইজেশন
AOS.init({ 
    duration: 1000, 
    once: false, 
    mirror: true 
});

// ২. Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const nav = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ৩. টাইমার ফাংশন
function startTimer(totalSeconds) {
    let timer = totalSeconds;
    let days, hours, minutes, seconds;
    
    let interval = setInterval(function () {
        days = parseInt(timer / (3600 * 24), 10);
        hours = parseInt((timer % (3600 * 24)) / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);

        document.getElementById('days').textContent = days < 10 ? "0" + days : days;
        document.getElementById('hours').textContent = hours < 10 ? "0" + hours : hours;
        document.getElementById('mins').textContent = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById('secs').textContent = seconds < 10 ? "0" + seconds : seconds;

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

// --- আপডেট করা ট্র্যাকিং ইভেন্টসমূহ ---

// ক. InitiateCheckout Tracking
const orderFormInputs = document.querySelectorAll('#orderForm input, #orderForm textarea');
let checkoutTracked = false;

orderFormInputs.forEach(input => {
    input.addEventListener('focus', function() {
        if (!checkoutTracked) {
            if (window.fbq) {
                fbq('track', 'InitiateCheckout', {
                    content_name: 'Premium Jaffrani Homemade Cerelac',
                    currency: 'BDT'
                });
            }
            checkoutTracked = true; 
        }
    });
});

// খ. AddToCart Tracking (ওজন সিলেক্ট করলে)
const weightInputs = document.querySelectorAll('input[name="weight"]');
weightInputs.forEach(input => {
    input.addEventListener('change', function() {
        let selectedVal = this.value;
        let p = 1160; 
        if(selectedVal === '500g') p = 600;
        if(selectedVal === '2kg') p = 2240;

        if (window.fbq) {
            fbq('track', 'AddToCart', {
                content_name: 'Premium Jaffrani Homemade Cerelac',
                content_category: 'Cerelac',
                value: p,
                currency: 'BDT',
                content_ids: [selectedVal]
            });
        }
    });
});

// গ. Custom WhatsApp Event Tracking
const whatsappBtn = document.querySelector('.whatsapp-btn');
if (whatsappBtn) {
    whatsappBtn.addEventListener('click', function() {
        if (window.fbq) {
            fbq('trackCustom', 'WhatsAppContact', {
                content_name: 'Jafrani Cerelac Inquiry'
            });
        }
    });
}

// ৪. অর্ডার ফর্ম প্রসেসিং (Advanced Matching সহ Purchase ইভেন্ট)
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = document.querySelector('.order-submit-btn');
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const selectedWeight = document.querySelector('input[name="weight"]:checked').value;
    
    let price = 1160; 
    if(selectedWeight === '500g') price = 600;
    if(selectedWeight === '2kg') price = 2240;

    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'customLoading';
    loadingOverlay.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 9999; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; font-family: 'Hind Siliguri', sans-serif; backdrop-filter: blur(5px);">
            <div class="loader-spinner" style="border: 5px solid #333; border-top: 5px solid #fbbf24; border-radius: 50%; width: 60px; height: 60px; animation: spin 1s linear infinite;"></div>
            <h3 style="margin-top: 25px; font-size: 22px; font-weight: 600; color: #fbbf24;">অনুগ্রহ করে অপেক্ষা করুন...</h3>
            <p style="font-size: 16px; color: #eee; margin-top: 10px;">আপনার অর্ডারটি সিস্টেম নিশ্চিত করছে</p>
        </div>
        <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
    `;
    document.body.appendChild(loadingOverlay);
    submitBtn.disabled = true;

    const scriptURL = 'https://script.google.com/macros/s/AKfycbwbTFMk4ivQWSL1P9HWUQme_bsz-LnxZTEcIIv9KKNR08PcfjqUUpE3Cf4aIxmwIb5-/exec';
    
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&address=${encodeURIComponent(address)}&weight=${encodeURIComponent(selectedWeight)}&price=${price}`
    })
    .then(() => {
        // Advanced Matching সহ ফেসবুক পিক্সেল Purchase ইভেন্ট
        if (window.fbq) {
            // ইউজার ডেটা ফেসবুককে জানানো (Advanced Matching)
            fbq('track', 'Purchase', {
                content_name: 'Premium Jaffrani Homemade Cerelac',
                value: price,
                currency: 'BDT',
                num_items: 1,
                external_id: phone, // ফোন নম্বর ইউনিক আইডি হিসেবে
                fn: name,           // First Name (Advanced Matching)
                ph: phone           // Phone (Advanced Matching)
            });
        }

        const loading = document.getElementById('customLoading');
        if(loading) loading.remove();
        
        const successPopup = document.createElement('div');
        successPopup.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 10000; display: flex; align-items: center; justify-content: center; font-family: 'Hind Siliguri', sans-serif; padding: 20px;">
                <div style="background: white; padding: 40px; border-radius: 25px; text-align: center; max-width: 450px; width: 100%; box-shadow: 0 25px 50px rgba(0,0,0,0.5); animation: popupIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);">
                    <div style="font-size: 70px; color: #2ecc71; margin-bottom: 20px;"><i class="fas fa-check-circle"></i></div>
                    <h2 style="color: #064e3b; margin-bottom: 15px; font-size: 28px;">অর্ডার সফল হয়েছে!</h2>
                    <p style="color: #444; line-height: 1.6; margin-bottom: 30px; font-size: 18px;">ধন্যবাদ! আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। খুব শীঘ্রই আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।</p>
                    <button id="closeSuccess" style="background: #fbbf24; color: #064e3b; border: none; padding: 15px 40px; border-radius: 12px; font-size: 18px; font-weight: 700; cursor: pointer; width: 100%; transition: 0.3s; box-shadow: 0 10px 20px rgba(251, 191, 36, 0.3);">ঠিক আছে</button>
                </div>
            </div>
        `;
        document.body.appendChild(successPopup);

        document.getElementById('closeSuccess').addEventListener('click', function() {
            window.location.reload(); 
        });
    })
    .catch(error => {
        console.error('Error!', error.message);
        const loading = document.getElementById('customLoading');
        if(loading) loading.remove();
        alert("দুঃখিত, কোনো একটি সমস্যা হয়েছে।");
        submitBtn.disabled = false;
    });
});
