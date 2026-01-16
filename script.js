/**
 * 1. Interface Initialization (AOS & Navigation)
 */
AOS.init({ duration: 1000, once: true });

window.addEventListener('scroll', function() {
    const nav = document.getElementById('mainNav');
    if (nav) {
        window.scrollY > 50 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
    }
});

/**
 * 2. Constants & Variables
 */
const productPrices = {
    '500g': { old: 750, current: 600, label: '৫০০ গ্রাম' },
    '1kg': { old: 1450, current: 1160, label: '১ কেজি' },
    '2kg': { old: 2800, current: 2240, label: '২ কেজি' }
};

window.dataLayer = window.dataLayer || [];

/**
 * 3. Order Submission (Google Sheet + Advanced Purchase Tracking)
 */
document.getElementById('orderForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();

    const eventID = 'order-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const selectedWeight = document.querySelector('input[name="weight"]:checked').value;
    const price = productPrices[selectedWeight].current;

    // Loading Screen
    const loading = document.createElement('div');
    loading.id = 'customLoading';
    loading.innerHTML = `<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999;display:flex;justify-content:center;align-items:center;color:#fff;flex-direction:column;font-family:sans-serif;"><div style="width:50px;height:50px;border:5px solid #f3f3f3;border-top:5px solid #FF5722;border-radius:50%;animation:spin 1s linear infinite;"></div><p style="margin-top:20px;font-size:18px;">আপনার অর্ডারটি প্রসেস হচ্ছে...</p></div>`;
    document.body.appendChild(loading);

    const scriptURL = 'https://script.google.com/macros/s/AKfycbywcQmIEtNjVNrPn0CQ9KY1Wtmh0Ak7H-ts78o-XFMRPHCjrmDlq_AyZk7EaG19wHNb/exec';
    
    try {
        const formData = new FormData();
        formData.append('event_id', eventID);
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('weight', selectedWeight);
        formData.append('price', price);

        await fetch(scriptURL, { method: 'POST', body: formData });

        // --- ULTRA ADVANCED PURCHASE EVENT (GTM & Pixel) ---
        window.dataLayer.push({
            'event': 'purchase',
            'transaction_id': eventID,
            'value': price,
            'currency': 'BDT',
            'user_data': {
                'fn': name,    // User name for Advanced Matching
                'ph': phone,   // User phone for Advanced Matching
                'ct': address  // User address
            },
            'items': [{
                'item_name': 'Premium Jafrani Cerelac',
                'item_id': 'CERELAC-001',
                'price': price,
                'item_variant': selectedWeight,
                'quantity': 1
            }]
        });

        document.getElementById('customLoading')?.remove();
        if(document.getElementById('customerName')) document.getElementById('customerName').innerText = name;
        if(document.getElementById('successModal')) document.getElementById('successModal').style.display = 'flex';
        document.getElementById('orderForm')?.reset();
        
    } catch (error) {
        document.getElementById('customLoading')?.remove();
        alert("দুঃখিত, অর্ডারটি সম্পন্ন করা সম্ভব হয়নি। আবার চেষ্টা করুন।");
    }
});

/**
 * 4. Dynamic Tracking & UI Logic
 */

// ViewContent on Page Load
window.addEventListener('load', () => {
    window.dataLayer.push({
        'event': 'view_content',
        'content_name': 'Premium Jafrani Cerelac',
        'value': 1160,
        'currency': 'BDT'
    });
});

// Update Summary and AddToCart (Only on Click)
function updateOrderSummary(shouldTrack = false) {
    const summaryWeight = document.getElementById('summaryWeight');
    const oldPriceDisp = document.getElementById('oldPrice');
    const discountPriceDisp = document.getElementById('discountPrice');
    const totalPriceDisp = document.getElementById('totalPrice');
    
    const weightInput = document.querySelector('input[name="weight"]:checked');
    if(!weightInput) return;

    const selectedWeight = weightInput.value;
    const data = productPrices[selectedWeight];

    if (data) {
        summaryWeight.innerText = data.label;
        oldPriceDisp.innerText = '৳ ' + data.old;
        discountPriceDisp.innerText = '৳ ' + data.current;
        totalPriceDisp.innerText = '৳ ' + data.current;

        if (shouldTrack) {
            window.dataLayer.push({
                'event': 'add_to_cart',
                'content_name': 'Premium Jafrani Cerelac',
                'value': data.current,
                'currency': 'BDT',
                'item_variant': selectedWeight
            });
        }
    }
}

// Initial UI load (No tracking)
updateOrderSummary(false);

// User click on weight
document.querySelectorAll('input[name="weight"]').forEach(input => {
    input.addEventListener('change', () => updateOrderSummary(true));
});

// InitiateCheckout (On focus)
const inputs = document.querySelectorAll('#name, #phone, #address');
inputs.forEach(field => {
    field.addEventListener('focus', function() {
        if (!window.initiateCheckoutFired) {
            window.dataLayer.push({
                'event': 'initiate_checkout',
                'value': 1160,
                'currency': 'BDT'
            });
            window.initiateCheckoutFired = true;
        }
    }, { once: true });
});

/**
 * 5. Utility Functions (Timer & Slider)
 */
function startTimer(duration) {
    let timer = duration;
    setInterval(function () {
        let days = Math.floor(timer / (24 * 3600)), hours = Math.floor((timer % (24 * 3600)) / 3600), mins = Math.floor((timer % 3600) / 60), secs = Math.floor(timer % 60);
        if(document.getElementById('days')) document.getElementById('days').textContent = String(days).padStart(2, '0');
        if(document.getElementById('hours')) document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        if(document.getElementById('mins')) document.getElementById('mins').textContent = String(mins).padStart(2, '0');
        if(document.getElementById('secs')) document.getElementById('secs').textContent = String(secs).padStart(2, '0');
        if (--timer < 0) timer = 0;
    }, 1000);
}
startTimer((4 * 24 * 3600) + (18 * 3600));

let currentSlide = 0;
const slider = document.getElementById('reviewSlider');
const slides = document.querySelectorAll('.slide');
function nextSlide() { if(slides.length > 0) { currentSlide = (currentSlide + 1) % slides.length; if(slider) slider.style.transform = `translateX(-${currentSlide * 100}%)`; } }
if(slides.length > 0) setInterval(nextSlide, 4000);

window.closeModal = function() { const modal = document.getElementById('successModal'); if (modal) modal.style.display = 'none'; };
