// ১. AOS (Animate On Scroll) ইনিশিয়েলাইজেশন
AOS.init({ 
    duration: 1000, 
    once: false, // স্ক্রল করলে বারবার অ্যানিমেশন হবে
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

// ৪. অর্ডার ফর্ম ও পিক্সেল ট্র্যাকিং
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = document.querySelector('.order-submit-btn');
    const selectedWeight = document.querySelector('input[name="weight"]:checked').value;
    
    let price = 1160; 
    if(selectedWeight === '500g') price = 600;
    if(selectedWeight === '2kg') price = 2240;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> প্রসেস হচ্ছে...';
    submitBtn.disabled = true;

    // ফেসবুক পিক্সেল পারচেজ ইভেন্ট
    if (window.fbq) {
        fbq('track', 'Purchase', {
            content_name: 'Premium Jaffrani Homemade Cerelac',
            content_category: 'Baby Food',
            value: price,
            currency: 'BDT'
        });
    }

    setTimeout(() => {
        alert("ধন্যবাদ! আপনার অর্ডারটি গ্রহণ করা হয়েছে। আমরা শীঘ্রই যোগাযোগ করবো।");
        document.getElementById('orderForm').reset();
        submitBtn.innerHTML = "অর্ডার নিশ্চিত করুন";
        submitBtn.disabled = false;
    }, 1500);
});
