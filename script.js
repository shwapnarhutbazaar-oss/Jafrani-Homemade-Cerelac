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

// ৪. মোবাইল অপ্টিমাইজড অর্ডার ফর্ম ও পপআপ সেটআপ
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = document.querySelector('.order-submit-btn');
    
    // তথ্য সংগ্রহ
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const selectedWeight = document.querySelector('input[name="weight"]:checked').value;
    
    let price = 1160; 
    if(selectedWeight === '500g') price = 600;
    if(selectedWeight === '2kg') price = 2240;

    // লোডিং ওভারলে (Loading Overlay)
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'customLoading';
    loadingOverlay.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 9999; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; font-family: 'Hind Siliguri', sans-serif; backdrop-filter: blur(5px); text-align: center; padding: 20px;">
            <div class="loader-spinner" style="border: 5px solid #333; border-top: 5px solid #fbbf24; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite;"></div>
            <h3 style="margin-top: 20px; font-size: 20px; font-weight: 600; color: #fbbf24;">অনুগ্রহ করে অপেক্ষা করুন...</h3>
            <p style="font-size: 14px; color: #eee; margin-top: 8px;">আপনার অর্ডারটি প্রসেস করা হচ্ছে</p>
        </div>
        <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
    `;
    document.body.appendChild(loadingOverlay);
    submitBtn.disabled = true;

    // গুগল শিটে ডেটা পাঠানো
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwbTFMk4ivQWSL1P9HWUQme_bsz-LnxZTEcIIv9KKNR08PcfjqUUpE3Cf4aIxmwIb5-/exec';
    
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&address=${encodeURIComponent(address)}&weight=${encodeURIComponent(selectedWeight)}&price=${price}`
    })
    .then(() => {
        // ফেসবুক পিক্সেল ইভেন্ট
        if (window.fbq) {
            fbq('track', 'Purchase', {
                content_name: 'Premium Jaffrani Homemade Cerelac',
                value: price,
                currency: 'BDT'
            });
        }

        if(document.getElementById('customLoading')) document.getElementById('customLoading').remove();
        
        // রেসপন্সিভ সাকসেস পপআপ
        const successPopup = document.createElement('div');
        successPopup.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 10000; display: flex; align-items: center; justify-content: center; font-family: 'Hind Siliguri', sans-serif; padding: 15px;">
                <div style="background: white; padding: 30px 20px; border-radius: 20px; text-align: center; max-width: 400px; width: 100%; box-shadow: 0 25px 50px rgba(0,0,0,0.5); animation: popupIn 0.3s ease-out;">
                    <div style="font-size: 60px; color: #2ecc71; margin-bottom: 15px;"><i class="fas fa-check-circle"></i></div>
                    <h2 style="color: #064e3b; margin-bottom: 10px; font-size: 24px;">অর্ডার সফল হয়েছে!</h2>
                    <p style="color: #444; line-height: 1.5; margin-bottom: 25px; font-size: 16px;">ধন্যবাদ! আপনার অর্ডারটি আমরা গ্রহণ করেছি। খুব শীঘ্রই আমাদের প্রতিনিধি কল করে অর্ডারটি নিশ্চিত করবেন।</p>
                    <button id="closeSuccess" style="background: #fbbf24; color: #064e3b; border: none; padding: 14px; border-radius: 10px; font-size: 18px; font-weight: 700; cursor: pointer; width: 100%; box-shadow: 0 5px 15px rgba(251, 191, 36, 0.3);">ঠিক আছে</button>
                </div>
            </div>
            <style>@keyframes popupIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }</style>
        `;
        document.body.appendChild(successPopup);

        document.getElementById('closeSuccess').addEventListener('click', function() {
            window.location.href = "#home"; 
            window.location.reload(); 
        });
    })
    .catch(error => {
        if(document.getElementById('customLoading')) document.getElementById('customLoading').remove();
        alert("দুঃখিত, আবার চেষ্টা করুন।");
        submitBtn.disabled = false;
    });
});
