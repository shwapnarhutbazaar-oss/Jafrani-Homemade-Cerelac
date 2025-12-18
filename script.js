// ১. স্ক্রল অ্যানিমেশন (AOS)
AOS.init({
    duration: 1000,
    once: true
});

// ২. কাউন্টডাউন টাইমার
const targetDate = new Date().getTime() + (5 * 24 * 60 * 60 * 1000);

function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (document.getElementById("days")) {
        document.getElementById("days").innerText = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("mins").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("secs").innerText = seconds < 10 ? "0" + seconds : seconds;
    }
}
setInterval(updateTimer, 1000);
updateTimer();

// ৩. ফর্ম সাবমিশন ও পিক্সেল ট্র্যাকিং
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = document.querySelector('.order-submit-btn');
    const selectedWeight = document.querySelector('input[name="weight"]:checked').value;
    
    // দাম নির্ধারণ
    let price = selectedWeight === '500g' ? 600 : (selectedWeight === '1kg' ? 1160 : 2240);

    submitBtn.innerText = "অর্ডার প্রসেস হচ্ছে...";
    submitBtn.disabled = true;

    // পিক্সেল ট্র্যাকিং (সফল অর্ডারের পর ডাটা পাঠানো)
    if (typeof fbq === 'function') {
        fbq('track', 'Purchase', {
            content_name: 'Premium Jaffrani Homemade Cerelac',
            value: price,
            currency: 'BDT'
        });
    }

    setTimeout(() => {
        alert("ধন্যবাদ! আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।");
        document.getElementById('orderForm').reset();
        submitBtn.innerText = "অর্ডার নিশ্চিত করুন";
        submitBtn.disabled = false;
    }, 1500);
});
