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
 * ৩. অর্ডার সাবমিশন (Google Sheet Integration)
 * এখান থেকে সব ট্র্যাকিং/পিক্সেল কোড বাদ দেওয়া হয়েছে
 */
document.getElementById('orderForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();

    // ইউনিক আইডি (অর্ডার ট্র্যাক করার জন্য ইন্টারনাল রেফারেন্স)
    const eventID = 'order-' + Date.now() + '-' + Math.floor(Math.random() * 1000);

    // ডাটা সংগ্রহ
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const selectedWeight = document.querySelector('input[name="weight"]:checked').value;
    
    // দাম নির্ধারণ
    let price = selectedWeight === '1kg' ? 1160 : (selectedWeight === '500g' ? 600 : 2240);

    // লোডিং স্ক্রিন দেখানো
    const loading = document.createElement('div');
    loading.id = 'customLoading';
    loading.innerHTML = `
        <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999;display:flex;justify-content:center;align-items:center;color:#fff;flex-direction:column;font-family:sans-serif;">
            <div style="width:50px;height:50px;border:5px solid #f3f3f3;border-top:5px solid #FF5722;border-radius:50%;animation:spin 1s linear infinite;"></div>
            <p style="margin-top:20px;font-size:18px;">আপনার অর্ডারটি প্রসেস হচ্ছে...</p>
            <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
        </div>
    `;
    document.body.appendChild(loading);

    // আপনার গুগল শিট স্ক্রিপ্ট URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbywcQmIEtNjVNrPn0CQ9KY1Wtmh0Ak7H-ts78o-XFMRPHCjrmDlq_AyZk7EaG19wHNb/exec';
    
    try {
        const formData = new FormData();
        formData.append('event_id', eventID);
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('weight', selectedWeight);
        formData.append('price', price);

        // ডাটা পাঠানো
        await fetch(scriptURL, { method: 'POST', body: formData });
        // GTM Purchase Event DataLayer Push
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
    'event': 'purchase', // এই ইভেন্ট নাম দিয়ে GTM-এ ট্রিগার সেট করবেন
    'transaction_id': eventID,
    'value': price,
    'currency': 'BDT',
    'items': [{
        'item_name': 'Premium Jafrani Cerelac',
        'item_variant': selectedWeight,
        'price': price,
        'quantity': 1
    }]
});
        
        // সফল হলে লোডিং সরানো এবং সাকসেস মেসেজ দেখানো
        document.getElementById('customLoading')?.remove();
        if(document.getElementById('customerName')) document.getElementById('customerName').innerText = name;
        if(document.getElementById('successModal')) document.getElementById('successModal').style.display = 'flex';
        
        // ফর্ম রিসেট
        document.getElementById('orderForm')?.reset();
        
    } catch (error) {
        document.getElementById('customLoading')?.remove();
        alert("দুঃখিত, অর্ডারটি সম্পন্ন করা সম্ভব হয়নি। আবার চেষ্টা করুন।");
        console.error('Error!', error.message);
    }
});

// সাকসেস মোডাল বন্ধ করার ফাংশন
window.closeModal = function() {
    const modal = document.getElementById('successModal');
    if (modal) modal.style.display = 'none';
};

/**
 * ৪. ফ্ল্যাশ সেল টাইমার লজিক
 */
function startTimer(duration) {
    let timer = duration;
    setInterval(function () {
        let days = Math.floor(timer / (24 * 3600));
        let hours = Math.floor((timer % (24 * 3600)) / 3600);
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

/**
 * ৫. রিভিউ স্লাইডার লজিক
 */
let currentSlide = 0;
const slider = document.getElementById('reviewSlider');
const slides = document.querySelectorAll('.slide');

function nextSlide() {
    if(slides.length > 0) {
        currentSlide = (currentSlide + 1) % slides.length;
        if(slider) {
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
    }
}

if(slides.length > 0) {
    setInterval(nextSlide, 4000);
}
// Function to update Summary
function updateOrderSummary() {
    const summaryWeight = document.getElementById('summaryWeight');
    const oldPriceDisp = document.getElementById('oldPrice');
    const discountPriceDisp = document.getElementById('discountPrice');
    const totalPriceDisp = document.getElementById('totalPrice');
    
    const selectedWeight = document.querySelector('input[name="weight"]:checked').value;

    const prices = {
        '500g': { old: 750, current: 600, label: '৫০০ গ্রাম' },
        '1kg': { old: 1450, current: 1160, label: '১ কেজি' },
        '2kg': { old: 2800, current: 2240, label: '২ কেজি' }
    };

    const data = prices[selectedWeight];
    if (data) {
        summaryWeight.innerText = data.label;
        oldPriceDisp.innerText = '৳ ' + data.old;
        discountPriceDisp.innerText = '৳ ' + data.current;
        totalPriceDisp.innerText = '৳ ' + data.current;
    }
}

// Event Listeners for weight change
document.querySelectorAll('input[name="weight"]').forEach(input => {
    input.addEventListener('change', updateOrderSummary);
});

// Run once on load to set initial values
updateOrderSummary();
// ১. ViewContent ইভেন্ট (পেজ লোড হলে)
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
    'event': 'view_content',
    'content_name': 'Premium Jafrani Cerelac',
    'currency': 'BDT',
    'value': 1160 
});

// ২. AddToCart ইভেন্ট (শুধুমাত্র ওজন সিলেক্ট করলে ফায়ার হবে)
document.querySelectorAll('.weight-option input').forEach(button => {
    button.addEventListener('click', function() {
        window.dataLayer.push({
            'event': 'add_to_cart',
            'content_name': 'Premium Jafrani Cerelac',
            'currency': 'BDT',
            'value': 1160
        });
    });
});

// ৩. InitiateCheckout ইভেন্ট (নাম, ফোন বা ঠিকানায় ক্লিক করলে)
const inputFields = document.querySelectorAll('input[name="name"], input[name="phone"], textarea[name="address"], #name, #phone, #address');

inputFields.forEach(field => {
    field.addEventListener('focus', function() {
        if (!window.initiateCheckoutFired) {
            window.dataLayer.push({
                'event': 'initiate_checkout'
            });
            window.initiateCheckoutFired = true; // শুধু একবার ফায়ার হবে
            console.log('InitiateCheckout Fired!'); // চেক করার জন্য
        }
    }, { once: true });
});

// ৪. Time on Page (৩০ সেকেন্ড থাকলে)
setTimeout(function() {
    window.dataLayer.push({
        'event': 'time_on_page',
        'minutes': '0.5'
    });
}, 30000);

