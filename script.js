// ১. ইউনিক ইভেন্ট আইডি তৈরির ফাংশন (ফেসবুক ডিডুপ্লিকেশন এর জন্য)
function generateEventID() {
    return 'id_' + Math.floor(Math.random() * 1000000) + '_' + Date.now();
}

// ২. AOS (Animate On Scroll) ইনিশিয়েলাইজেশন
AOS.init({ 
    duration: 1000, 
    once: false, 
    mirror: true 
});

// ৩. আইপি এড্রেস সংগ্রহ (অ্যাডভান্সড ট্র্যাকিং এর জন্য)
let userIp = "";
fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(data => { userIp = data.ip; })
    .catch(e => console.log("IP fetch error"));

// ৪. টাইমার ফাংশন (আপনার অফারের সময় দেখানোর জন্য)
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
        if(document.getElementById('minutes')) document.getElementById('minutes').textContent = minutes < 10 ? "0" + minutes : minutes;
        if(document.getElementById('seconds')) document.getElementById('seconds').textContent = seconds < 10 ? "0" + seconds : seconds;

        if (--timer < 0) {
            clearInterval(interval);
        }
    }, 1000);
}
// ৪৮ ঘণ্টার টাইমার শুরু
startTimer(48 * 3600);

// ৫. Navbar Scroll Effect
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

// ৬. ফরম সাবমিশন ও আল্ট্রা লেভেল ট্র্যাকিং
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // ডাটা সংগ্রহ
    const name = this.querySelector('input[name="name"]').value;
    const phone = this.querySelector('input[name="phone"]').value;
    const address = this.querySelector('textarea[name="address"]').value;
    const selectedWeight = this.querySelector('input[name="weight"]:checked').value;
    
    // দাম ক্যালকুলেশন
    let price = 650;
    if(selectedWeight === '1kg') price = 1150;
    if(selectedWeight === '2kg') price = 2240;

    const pID = generateEventID();

    // ক. ফেসবুক পিক্সেল ব্রাউজার ইভেন্ট
    if (window.fbq) {
        fbq('track', 'Purchase', {
            content_name: 'Premium Jaffrani Homemade Cerelac',
            content_ids: [selectedWeight],
            content_type: 'product',
            value: price,
            currency: 'BDT'
        }, { eventID: pID });
    }

    // খ. গুগল শিট ও ফেসবুক সার্ভার (CAPI) ইভেন্ট পাঠানো
    const scriptURL = 'https://script.google.com/macros/s/AKfycby0ytdSmwb0gY0Vsk3-ikJq5nUCHQ2eVBOQSgHOo8tEmntw79TDdJFjF5mzjhAYpbhO/exec';
    
    const bodyData = `name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&address=${encodeURIComponent(address)}&weight=${encodeURIComponent(selectedWeight)}&price=${price}&eventID=${pID}&userAgent=${encodeURIComponent(navigator.userAgent)}&clientIp=${userIp}`;

    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: bodyData
    }).then(() => {
        showSuccessModal();
    }).catch(error => {
        console.error('Error!', error.message);
        alert("অর্ডার করার সময় একটি ত্রুটি হয়েছে, দয়া করে আবার চেষ্টা করুন।");
    });
});

// ৭. হোয়াটসঅ্যাপ ট্র্যাকিং
document.querySelector('.whatsapp-btn').addEventListener('click', function() {
    if (window.fbq) {
        fbq('track', 'Contact', { 
            content_name: 'WhatsApp Inquiry',
            value: 0,
            currency: 'BDT'
        });
    }
});

// ৮. সাকসেস মডেল ফাংশন
function showSuccessModal() {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 10000; display: flex; align-items: center; justify-content: center; font-family: 'Hind Siliguri', sans-serif; padding: 20px;">
            <div style="background: white; padding: 40px; border-radius: 25px; text-align: center; max-width: 450px; width: 100%; box-shadow: 0 25px 50px rgba(0,0,0,0.5);">
                <div style="font-size: 70px; color: #2ecc71; margin-bottom: 20px;"><i class="fas fa-check-circle"></i></div>
                <h2 style="color: #064e3b; margin-bottom: 15px; font-size: 28px;">অর্ডার সফল হয়েছে!</h2>
                <p style="color: #444; line-height: 1.6; margin-bottom: 30px; font-size: 18px;">ধন্যবাদ! আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। খুব শীঘ্রই আমাদের প্রতিনিধি আপনাকে কল করবেন।</p>
                <button id="closeSuccess" style="background: #fbbf24; color: #064e3b; border: none; padding: 15px 40px; border-radius: 12px; font-size: 18px; font-weight: 700; cursor: pointer; width: 100%;">ঠিক আছে</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    document.getElementById('closeSuccess').addEventListener('click', function() {
        window.location.reload();
    });
}
