:root {
    --primary: #FF5722;
    --secondary: #004D40;
    --whatsapp: #25D366;
    --bg-light: #fff8f5;
    --accent: #FFC107;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { font-family: 'Hind Siliguri', sans-serif; overflow-x: hidden; background: #fff; color: #333; transition: padding-bottom 0.3s; }
.container { width: 92%; max-width: 1100px; margin: auto; }

/* --- Navbar --- */
.navbar { 
    padding: 15px 0; background: rgba(255,255,255,0.95); 
    position: sticky; top: 0; z-index: 1000; 
    transition: all 0.3s ease; backdrop-filter: blur(10px);
}
.navbar.scrolled { padding: 8px 0; box-shadow: 0 5px 20px rgba(0,0,0,0.1); }

/* --- Buttons & Interactive Elements --- */
.ripple { 
    position: relative; overflow: hidden; transform: translate3d(0, 0, 0); 
    transition: transform 0.2s;
}
.ripple:active { transform: scale(0.95); }

.btn-order-premium { 
    background: var(--primary); color: #fff; padding: 15px 35px; border-radius: 8px; 
    text-decoration: none; font-size: 20px; font-weight: 700; display: inline-block;
    box-shadow: 0 4px 15px rgba(255,87,34,0.3); animation: pulse-red 2.5s infinite;
}

@keyframes pulse-red {
    0% { box-shadow: 0 0 0 0 rgba(255, 87, 34, 0.7); }
    70% { box-shadow: 0 0 0 15px rgba(255, 87, 34, 0); }
    100% { box-shadow: 0 0 0 0 rgba(255, 87, 34, 0); }
}

/* --- Ingredients Card --- */
.ingredient-card { 
    background: #fff; padding: 30px; border-radius: 15px; border-bottom: 4px solid var(--secondary); 
    transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}
.ingredient-card:hover { transform: translateY(-10px); box-shadow: 0 15px 30px rgba(0,0,0,0.1); border-color: var(--primary); }

/* --- Animations & Effects --- */
.shimmer {
    background: linear-gradient(90deg, var(--accent) 25%, #fff 50%, var(--accent) 75%);
    background-size: 200% 100%; animation: shimmer 2s infinite linear;
}
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

.floating { animation: float 3s ease-in-out infinite; }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }

.flash-icon { animation: blink 1s infinite; margin-right: 5px; }
@keyframes blink { 50% { opacity: 0; } }

/* --- Announcement Bar --- */
.top-announcement-bar { background: linear-gradient(90deg, #FF5722, #D84315); color: #fff; padding: 10px 0; text-align: center; font-size: 16px; font-weight: 600; }
.nav-flex { display: flex; justify-content: space-between; align-items: center; }

/* --- Logo Style --- */
.logo { 
    font-size: 24px; font-weight: 700; color: var(--secondary); text-decoration: none;
    border: 2px solid var(--secondary); padding: 5px 20px; border-radius: 50px; display: inline-block;
}
.logo span { color: var(--primary); }

.desktop-nav a { text-decoration: none; color: #444; margin-left: 20px; font-weight: 600; transition: 0.3s; }
.desktop-nav a:hover { color: var(--primary); }
.nav-cta { background: var(--primary); color: #fff !important; padding: 8px 18px; border-radius: 50px; }

/* --- Hero Section --- */
.hero { padding: 60px 0; }
.hero-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 40px; align-items: center; }
.badge { background: #E8F5E9; color: var(--secondary); padding: 5px 15px; border-radius: 50px; font-weight: 700; font-size: 14px; display: inline-block; margin-bottom: 15px; }
.hero-content h1 { font-size: 42px; line-height: 1.3; margin-bottom: 20px; color: #1a1a1a; }
.highlight { color: var(--primary); }
.hero-content p { font-size: 18px; margin-bottom: 30px; color: #555; }
.hero-img img { width: 100%; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }

/* --- Ingredients Section --- */
.ingredients-section { padding: 80px 0; background: #fff; }
.ingredients-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; }
.ingredient-card h3 { color: var(--secondary); margin-bottom: 15px; display: flex; align-items: center; gap: 10px; }
.ingredient-card ul { list-style: none; }
.ingredient-card li { margin-bottom: 10px; font-weight: 500; display: flex; align-items: center; gap: 10px; }
.ingredient-card li i { color: #4CAF50; }

/* --- Offer Area --- */
.mega-offer-area { padding: 80px 0; background: #004D40; color: #fff; overflow: hidden; }
.offer-wrapper-new { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 30px; display: grid; grid-template-columns: 1.2fr 1fr; gap: 40px; padding: 50px; align-items: center; position: relative; }
.special-tag { background: var(--accent); color: #000; padding: 5px 15px; border-radius: 50px; font-weight: 700; margin-bottom: 20px; display: inline-block; }
.offer-left h2 { font-size: 36px; margin-bottom: 20px; }
.highlight-text { color: var(--accent); }
.benefit-list { list-style: none; margin-bottom: 35px; }
.benefit-list li { margin-bottom: 12px; font-size: 18px; display: flex; align-items: center; gap: 12px; }
.benefit-list i { color: var(--accent); }
.offer-right { position: relative; text-align: center; }
.offer-right img { width: 100%; max-width: 400px; border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); animation: floatImage 3s ease-in-out infinite; }
.discount-badge-new { position: absolute; top: -20px; right: -20px; background: #FFC107; color: #000; width: 100px; height: 100px; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; font-weight: 900; box-shadow: 0 10px 20px rgba(0,0,0,0.2); transform: rotate(15deg); z-index: 5; animation: pulseBadge 1.5s infinite; }
.discount-badge-new .pct { font-size: 28px; }
.discount-badge-new .off { font-size: 16px; margin-top: -5px; }

/* --- Timer --- */
.action-flex-container { display: flex; flex-wrap: wrap; gap: 20px; align-items: center; margin-top: 30px; }
.order-btn-flash { background: #fff; color: #004D40; padding: 18px 35px; border-radius: 50px; text-decoration: none; font-size: 22px; font-weight: 800; transition: 0.3s; }
.order-btn-flash:hover { background: var(--accent); transform: scale(1.05); }
.timer-card p { font-size: 14px; margin-bottom: 8px; color: var(--accent); text-align: center; }
.flash-timer { display: flex; gap: 8px; align-items: center; }
.timer-box { background: rgba(255,255,255,0.1); padding: 8px; border-radius: 8px; min-width: 55px; text-align: center; border: 1px solid rgba(255,255,255,0.2); }
.timer-box span { display: block; font-size: 20px; font-weight: 700; color: #fff; }
.timer-box small { font-size: 10px; color: #ccc; }

/* --- Order Section --- */
.order-section { padding: 80px 0; background: var(--bg-light); }
.form-card { 
    max-width: 700px; 
    margin: auto; 
    background: #fff; 
    padding: 40px; 
    border-radius: 20px; 
    box-shadow: 0 15px 40px rgba(0,0,0,0.08);
    border-top: 6px solid var(--primary);
    border-bottom: 6px solid var(--primary);
}
#orderForm input, #orderForm textarea { width: 100%; padding: 15px; margin-bottom: 20px; border: 1px solid #ddd; border-radius: 8px; font-family: inherit; font-size: 16px; }
#orderForm input:focus, #orderForm textarea:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 10px rgba(255,87,34,0.2); }

/* --- Weight Selection --- */
.weight-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 25px; }
.weight-option input { display: none; }
.weight-card { border: 2px solid #eee; padding: 15px; border-radius: 12px; text-align: center; cursor: pointer; transition: 0.3s; }
.weight-option input:checked + .weight-card { border-color: var(--primary); background: #FFF3E0; transform: scale(1.05); }
.weight-title { display: block; font-weight: 700; font-size: 18px; }
.weight-price { display: block; color: var(--primary); font-size: 20px; font-weight: 800; }
.old-price { font-size: 14px; text-decoration: line-through; color: #888; }

.order-submit-btn { width: 100%; padding: 20px; background: var(--secondary); color: #fff; border: none; border-radius: 10px; font-size: 22px; font-weight: 700; cursor: pointer; transition: 0.3s; }
.order-submit-btn:hover { background: #00332c; transform: translateY(-2px); }

/* --- Floating Elements --- */
.whatsapp-btn { position: fixed; bottom: 30px; right: 30px; background: var(--whatsapp); color: #fff; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 30px; z-index: 1000; text-decoration: none; box-shadow: 0 10px 25px rgba(37, 211, 102, 0.4); }
.wa-badge { position: absolute; top: 0; left: 0; background: #ff0000; width: 22px; height: 22px; border-radius: 50%; font-size: 12px; display: flex; align-items: center; justify-content: center; font-weight: bold; animation: badge-bounce 1s infinite alternate; }

footer { background: #1a1a1a; color: #fff; text-align: center; padding: 30px 0; }

/* --- Mobile Sticky Footer Styling --- */
.mobile-sticky-footer {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    padding: 12px 15px;
    box-shadow: 0 -5px 15px rgba(0,0,0,0.1);
    z-index: 998;
    backdrop-filter: blur(8px);
}

.sticky-order-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: var(--primary);
    color: #fff;
    text-decoration: none;
    padding: 14px;
    border-radius: 12px;
    font-size: 18px;
    font-weight: 700;
    width: 100%;
    animation: sticky-pulse 2s infinite;
}

@keyframes sticky-pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
}

/* --- Keyframes --- */
@keyframes floatImage { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
@keyframes pulseBadge { 0% { transform: rotate(15deg) scale(1); } 50% { transform: rotate(15deg) scale(1.1); } 100% { transform: rotate(15deg) scale(1); } }
@keyframes badge-bounce { from { transform: translateY(0); } to { transform: translateY(-5px); } }

/* ======================================================
   MOBILE RESPONSIVE 
========================================================= */
@media (max-width: 768px) { 
    .container { width: 94%; }
    body { padding-bottom: 80px; } /* Space for sticky button */

    .mobile-sticky-footer { display: block; }

    .whatsapp-btn { 
        bottom: 85px; /* Moved up to avoid sticky button */
        right: 20px;
        width: 50px;
        height: 50px;
        font-size: 25px;
    }

    /* Hero Section Mobile */
    .hero { padding: 40px 0; }
    .hero-grid { grid-template-columns: 1fr; text-align: center; flex-direction: column-reverse; display: flex; gap: 30px; } 
    .hero-content h1 { font-size: 30px; line-height: 1.2; } 
    .hero-content p { font-size: 16px; margin-bottom: 25px; }
    .hero-img img { max-width: 90%; margin: 0 auto; }

    /* Nav Mobile */
    .desktop-nav { display: none; } 
    .nav-flex { justify-content: center; }
    .logo { font-size: 20px; padding: 5px 15px; }

    /* Offer Section Mobile */
    .offer-wrapper-new { grid-template-columns: 1fr; padding: 30px 15px; text-align: center; } 
    .offer-left h2 { font-size: 26px; }
    .benefit-list li { font-size: 15px; justify-content: center; }
    .action-flex-container { justify-content: center; flex-direction: column; } 
    .discount-badge-new { right: 10px; top: -15px; width: 75px; height: 75px; } 
    .discount-badge-new .pct { font-size: 22px; } 
    .offer-right img { max-width: 280px; margin-top: 20px; }

    /* Ingredients Grid Mobile */
    .ingredients-grid { grid-template-columns: 1fr; }

    /* Form & Weight Grid Mobile */
    .form-card { padding: 25px 15px; }
    .weight-grid { grid-template-columns: 1fr; }
    .order-submit-btn { font-size: 19px; padding: 15px; }

    /* Announcement Bar Mobile */
    .top-announcement-bar { font-size: 13px; padding: 8px 5px; }
}/* Floating Order Button Style */
.floating-order-btn {
    position: fixed;
    bottom: 30px;
    left: 30px; /* এটি বাম পাশে থাকবে কারণ ডান পাশে হোয়াটসঅ্যাপ বাটন আছে */
    background: var(--primary); /* আপনার থিমের লাল/কমলা রঙ */
    color: #fff;
    width: 65px;
    height: 65px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    z-index: 1000;
    text-decoration: none;
    box-shadow: 0 10px 25px rgba(255, 87, 34, 0.4);
    animation: float 3s ease-in-out infinite;
    transition: all 0.3s ease;
}

/* মাউস নিলে টেক্সট দেখাবে (Desktop এর জন্য) */
.order-text-tooltip {
    position: absolute;
    left: 75px;
    background: #333;
    color: #fff;
    padding: 5px 12px;
    border-radius: 5px;
    font-size: 14px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;
}

.floating-order-btn:hover .order-text-tooltip {
    opacity: 1;
    visibility: visible;
    left: 85px;
}

.floating-order-btn:hover {
    transform: scale(1.1);
    background: var(--secondary); /* হোভার করলে সবুজ হবে */
}

/* মোবাইল রেসপন্সিভ পরিবর্তন */
@media (max-width: 768px) {
    .floating-order-btn {
        bottom: 85px; /* মোবাইল ফুটারে স্টিকি বাটন থাকে তাই একটু উপরে রাখা হয়েছে */
        left: 20px;
        width: 55px;
        height: 55px;
        font-size: 22px;
    }
    
    /* মোবাইলে টুলটিপ দরকার নেই */
    .order-text-tooltip {
        display: none;
    }
}
/* Review Image Grid Styling */
.review-image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

.review-img-card {
    background: #fff;
    padding: 10px;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: 0.3s;
    border: 1px solid #eee;
}

.review-img-card:hover {
    transform: scale(1.03);
    border-color: var(--primary);
}

.review-img-card img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    display: block;
}

/* মোবাইলের জন্য ছোট অ্যাডজাস্টমেন্ট */
@media (max-width: 768px) {
    .review-image-grid {
        grid-template-columns: repeat(2, 1fr); /* মোবাইলে এক সারিতে ২টা করে ছবি দেখাবে */
        gap: 10px;
    }
}
@media (max-width: 768px) {
    /* নিচের চওড়া সাদা বারটি বন্ধ করার জন্য */
    .mobile-sticky-footer {
        display: none !important;
    }
    
    /* বডির নিচের অতিরিক্ত জায়গা সরিয়ে ফেলা */
    body {
        padding-bottom: 0 !important;
    }

    /* আপনার নতুন গোল অর্ডার বাটনটিকে নিচে সুন্দরভাবে সেট করা */
    .floating-order-btn {
        bottom: 20px !important; /* নিচ থেকে ২০ পিক্সেল উপরে থাকবে */
        left: 20px;
    }
}
/* --- Success Modal Styling --- */
.modal-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    display: none; /* শুরুতে লুকানো */
    justify-content: center;
    align-items: center;
    z-index: 10000;
}

.modal-content {
    background: #fff;
    padding: 40px 30px;
    border-radius: 25px;
    text-align: center;
    max-width: 450px;
    width: 90%;
    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
    animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

@keyframes popIn {
    from { transform: scale(0.7); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}

.success-icon {
    font-size: 70px;
    color: #4CAF50;
    margin-bottom: 20px;
    animation: scaleUp 0.5s ease;
}

@keyframes scaleUp {
    0% { transform: scale(0); }
    100% { transform: scale(1); }
}

.modal-content h2 {
    font-size: 28px;
    color: #222;
    margin-bottom: 15px;
}

.modal-close-btn {
    background: var(--primary);
    color: white;
    border: none;
    padding: 12px 35px;
    border-radius: 50px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 20px;
    box-shadow: 0 5px 15px rgba(255, 87, 34, 0.4);
}
/* প্রফেশনাল ফর্ম ডিজাইন */
.form-card {
    background: #ffffff;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 15px 40px rgba(0,0,0,0.08);
    border: 1px solid #eee;
}

.form-header {
    text-align: center;
    margin-bottom: 30px;
}

.form-header h2 {
    color: var(--secondary);
    font-size: 26px;
    margin-bottom: 10px;
}

.form-header p {
    color: #666;
    font-size: 15px;
}

.input-group {
    margin-bottom: 20px;
    text-align: left;
}

.input-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #444;
    font-size: 15px;
}

.input-group label i {
    color: var(--primary);
    margin-right: 8px;
}

.input-group input, 
.input-group textarea {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #f0f0f0;
    border-radius: 10px;
    font-family: 'Hind Siliguri', sans-serif;
    transition: all 0.3s ease;
    background: #fdfdfd;
}

.input-group input:focus, 
.input-group textarea:focus {
    border-color: var(--primary);
    outline: none;
    background: #fff;
    box-shadow: 0 0 10px rgba(255, 87, 34, 0.1);
}

.weight-label {
    font-weight: 700;
    margin-bottom: 15px;
    color: #333;
}

/* অর্ডার বাটনটিকে আরও আকর্ষণীয় করা */
.order-submit-btn {
    width: 100%;
    background: linear-gradient(45deg, var(--primary), #ff7043);
    color: white;
    padding: 18px;
    border: none;
    border-radius: 12px;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    box-shadow: 0 10px 20px rgba(255, 87, 34, 0.3);
    transition: 0.3s;
}

.order-submit-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 25px rgba(255, 87, 34, 0.4);
}
/* --- Professional Order Summary Box Styling --- */
#orderSummaryBox {
    margin: 25px 0;
    border: 2px solid #004D40;
    border-radius: 12px;
    background: #ffffff;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

.summary-header {
    background: #004D40;
    color: #fff;
    padding: 12px;
    text-align: center;
    font-weight: 700;
    font-size: 18px;
}

.summary-body {
    padding: 15px 20px;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 15px;
    color: #444;
}

.bold-text { font-weight: 700; color: #000; }
.strikethrough { text-decoration: line-through; color: #999; }
.highlight-red { color: #d32f2f; font-weight: 700; }
.highlight-green { color: #2e7d32; font-weight: 700; }

.free-tag {
    background: #e8f5e9;
    padding: 2px 8px;
    border-radius: 5px;
    font-size: 13px;
}

.summary-divider {
    height: 1px;
    background: #eee;
    margin: 12px 0;
}

.summary-total {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    font-weight: 800;
    color: #004D40;
}

.summary-footer {
    background: #f9f9f9;
    padding: 10px;
    text-align: center;
    font-size: 13px;
    color: #666;
    border-top: 1px solid #eee;
}
