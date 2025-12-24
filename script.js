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

// ৪. অর্ডার ফর্ম, গুগল শিট ও প্রফেশনাল পপআপ সেটআপ
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

    // লোডিং ওভারলে (Loading Overlay) তৈরি - যা অর্ডার কনফার্ম হওয়া পর্যন্ত দেখাবে
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

    // গুগল শিটে ডেটা পাঠানো
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxsas-4cWgjbyarEDb5i7eyQLnAfdwO7bc0OJfOfCP23oKYMbWwSXHt7a-I1FKXQiM0/exec';
    
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&address=${encodeURIComponent(address)}&weight=${encodeURIComponent(selectedWeight)}&price=${price}`
    })
    .then(() => {
        // ফেসবুক পিক্সেল পারচেজ ইভেন্ট
        if (window.fbq) {
            fbq('track', 'Purchase', {
                content_name: 'Premium Jaffrani Homemade Cerelac',
                value: price,
                currency: 'BDT'
            });
        }

        // লোডিং স্ক্রিন সরিয়ে ফেলা
        const loading = document.getElementById('customLoading');
        if(loading) loading.remove();
        
        // সফলতার প্রফেশনাল পপআপ তৈরি
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
            <style>@keyframes popupIn { from { transform: scale(0.7); opacity: 0; } to { transform: scale(1); opacity: 1; } }</style>
        `;
        document.body.appendChild(successPopup);

        // "ঠিক আছে" বাটনে ক্লিক করলে হোম সেকশনে ফিরে যাওয়া ও রিলোড করা
        document.getElementById('closeSuccess').addEventListener('click', function() {
            window.location.href = "#home"; 
            window.location.reload(); 
        });
    })
    .catch(error => {
        console.error('Error!', error.message);
        const loading = document.getElementById('customLoading');
        if(loading) loading.remove();
        alert("দুঃখিত, কোনো একটি সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।");
        submitBtn.disabled = false;
    });
});
