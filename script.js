// ১. AOS Init
AOS.init({ duration: 1000, once: true });

// ২. টাইমার ফাংশন (২৪ ঘণ্টার টাইমার)
function startTimer(duration, display) {
    let timer = duration, days, hours, minutes, seconds;
    setInterval(function () {
        days = 0;
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);

        document.getElementById('days').textContent = "00";
        document.getElementById('hours').textContent = hours < 10 ? "0" + hours : hours;
        document.getElementById('mins').textContent = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById('secs').textContent = seconds < 10 ? "0" + seconds : seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    let twentyFourHours = 24 * 60 * 60;
    startTimer(twentyFourHours);
};

// ৩. অর্ডার ফর্ম ও পিক্সেল ট্র্যাকিং
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = document.querySelector('.order-submit-btn');
    const selectedWeight = document.querySelector('input[name="weight"]:checked').value;
    
    let price = 1160; 
    if(selectedWeight === '500g') price = 600;
    if(selectedWeight === '2kg') price = 2240;

    submitBtn.innerText = "প্রসেস হচ্ছে...";
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
        alert("ধন্যবাদ! আপনার অর্ডারটি গ্রহণ করা হয়েছে।");
        document.getElementById('orderForm').reset();
        submitBtn.innerText = "অর্ডার নিশ্চিত করুন";
        submitBtn.disabled = false;
    }, 1500);
});
