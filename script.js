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
};// ৪. অর্ডার ফর্ম সাবমিশন
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = document.querySelector('.order-submit-btn');
    
    // তথ্য সংগ্রহ
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const selectedWeight = document.querySelector('input[name="weight"]:checked').value;
    
    // ইউনিক ইভেন্ট আইডি (CAPI এবং পিক্সেলের জন্য)
    const eventID = 'order-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    
    let price = 1160; 
    if(selectedWeight === '500g') price = 600;
    if(selectedWeight === '2kg') price = 2240;

    // লোডিং ওভারলে তৈরি
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'customLoading';
    loadingOverlay.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 9999; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; font-family: 'Hind Siliguri', sans-serif; backdrop-filter: blur(5px);">
            <div class="loader-spinner" style="border: 5px solid #333; border-top: 5px solid #fbbf24; border-radius: 50%; width: 60px; height: 60px; animation: spin 1s linear infinite;"></div>
            <h3 style="margin-top: 25px; font-size: 22px; font-weight: 600; color: #fbbf24;">অর্ডার প্রসেসিং হচ্ছে...</h3>
        </div>
        <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
    `;
    document.body.appendChild(loadingOverlay);
    submitBtn.disabled = true;// আপনার নতুন গুগল স্ক্রিপ্ট URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwe1f-_Qc9fWahu5s3xxFSjpId4yeHbdYOhaEZnd7eL7c_ArSfSEbTSwkNS23yS6ouT/exec';
    
    // গুগল শিটে ডাটা পাঠানো (যা সার্ভার থেকে CAPI ও ট্রিগার করবে)
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&address=${encodeURIComponent(address)}&weight=${encodeURIComponent(selectedWeight)}&price=${price}&eventID=${eventID}`
    })
    .then(() => {
        // ব্রাউজার পিক্সেল পারচেজ ইভেন্ট (ইভেন্ট আইডি সহ)
        if (window.fbq) {
            fbq('track', 'Purchase', {
                content_name: 'Premium Jaffrani Homemade Cerelac',
                value: price,
                currency: 'BDT'
            }, {eventID: eventID}); 
        }// লোডিং স্ক্রিন সরিয়ে ফেলা
        const loading = document.getElementById('customLoading');
        if(loading) loading.remove();
        
        // সফলতার পপআপ
        const successPopup = document.createElement('div');
        successPopup.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 10000; display: flex; align-items: center; justify-content: center; font-family: 'Hind Siliguri', sans-serif; padding: 20px;">
                <div style="background: white; padding: 40px; border-radius: 25px; text-align: center; max-width: 450px; width: 100%; box-shadow: 0 25px 50px rgba(0,0,0,0.5);">
                    <div style="font-size: 70px; color: #2ecc71; margin-bottom: 20px;"><i class="fas fa-check-circle"></i></div>
                    <h2 style="color: #064e3b; margin-bottom: 15px; font-size: 28px;">অর্ডার সফল হয়েছে!</h2>
                    <p style="color: #444; margin-bottom: 30px; font-size: 18px;">আমাদের প্রতিনিধি খুব শীঘ্রই কল করে আপনার অর্ডারটি কনফার্ম করবেন।</p>
                    <button id="closeSuccess" style="background: #fbbf24; color: #064e3b; border: none; padding: 15px 40px; border-radius: 12px; font-size: 18px; font-weight: 700; cursor: pointer; width: 100%;">ঠিক আছে</button>
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
        document.getElementById('customLoading').remove();
        alert("দুঃখিত, আবার চেষ্টা করুন।");
        submitBtn.disabled = false;
    });
});
