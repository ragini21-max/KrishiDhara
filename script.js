// Application State Engine
let appData = {
    lang: 'en',
    otpCode: null,
    otpVerified: false,
    otpTimerId: null,
    delayMinutes: 0,
    activeToken: null,
    dailyCapacities: {
        'Azadpur Mandi (Delhi)': { booked: 0, max: 50 },
        'Vashi APMC (Mumbai)': { booked: 0, max: 50 },
        'Lasalgaon Mandi (Nashik)': { booked: 0, max: 50 },
        'Kalyan APMC (Maharashtra)': { booked: 0, max: 50 }
    },
    tokens: [],
    html5QrScanner: null
};

// Multilingual Translations Engine
const translations = {
    en: {
        otpTitle: "1. Farmer Mobile Authentication",
        otpDesc: "Enter your mobile number to get a temporary demo verification OTP.",
        bookingTitle: "2. Mandi Slot Booking",
        farmerName: "Farmer Name",
        mandiSelect: "Select Real Mandi Location",
        quantity: "Produce Quantity (In Tons)",
        slotTime: "Booking Slot Time (9 AM to 5 PM)",
        submitBooking: "Confirm & Book Slot",
        posText: "Queue Position",
        etaText: "Exact Arrival Time",
        summaryTitle: "Mandis Daily Operational Summary",
        totalGoods: "Total Goods Collected",
        totalMoney: "Total Money Disbursed",
        speechMsg: (name, pos, time) => `Hello ${name}. Your booking is confirmed. Your queue position is ${pos}, and your arrival time is ${time}.`
    },
    hi: {
        otpTitle: "1. किसान मोबाइल सत्यापन",
        otpDesc: "डेमो सत्यापन ओटीपी प्राप्त करने के लिए अपना मोबाइल नंबर दर्ज करें।",
        bookingTitle: "2. मंडी स्लोटी बुकिंग",
        farmerName: "किसान का नाम",
        mandiSelect: "मंडी का स्थान चुनें",
        quantity: "उपज की मात्रा (टन में)",
        slotTime: "बुकिंग समय (सुबह 9 से शाम 5 बजे)",
        submitBooking: "बुक स्लॉट की पुष्टि करें",
        posText: "कतार में स्थिति",
        etaText: "पहुंचने का सटीक समय",
        summaryTitle: "मंडी दैनिक परिचालन सारांश",
        totalGoods: "कुल एकत्रित उपज",
        totalMoney: "कुल वितरित राशि",
        speechMsg: (name, pos, time) => `नमस्ते ${name}। आपकी बुकिंग पक्की हो गई है। कतार में आपका नंबर ${pos} है, और आपके पहुँचने का समय ${time} है।`
    },
    mr: {
        otpTitle: "1. शेतकरी मोबाईल पडताळणी",
        otpDesc: "डेमो पडताळणी ओटीपी मिळविण्यासाठी तुमचा मोबाईल नंबर प्रविष्ट करा.",
        bookingTitle: "2. मंदी स्लॉट बुकिंग",
        farmerName: "शेटकऱ्याचे नाव",
        mandiSelect: "मंडीचे ठिकाण निवडा",
        quantity: "मालाचे प्रमाण (टन मध्ये)",
        slotTime: "बुकिंग वेळ (सकाळी 9 ते संध्याकाळी 5)",
        submitBooking: "स्लॉट बुक निश्चित करा",
        posText: "रांगेतील क्रमांक",
        etaText: "पोहोचण्याची अचूक वेळ",
        summaryTitle: "मंडी दैनिक कार्य अहवाल",
        totalGoods: "एकूण जमा माल",
        totalMoney: "एकूण वाटप केलेली रक्कम",
        speechMsg: (name, pos, time) => `नमस्कार ${name}. तुमची बुकिंग निश्चित झाली आहे. रांगेत तुमचा क्रमांक ${pos} आहे, आणि तुमच्या पोहोचण्याची वेळ ${time} आहे.`
    }
};

// Event Listeners Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Navigation Tabs
    document.getElementById('tab-farmer')?.addEventListener('click', () => switchTab('farmer'));
    document.getElementById('tab-officer')?.addEventListener('click', () => switchTab('officer'));
    document.getElementById('tab-summary')?.addEventListener('click', () => switchTab('summary'));

    // Language Change
    document.getElementById('langSelect')?.addEventListener('change', (e) => changeLanguage(e.target.value));

    // OTP Functionality
    document.getElementById('btn-gen-otp')?.addEventListener('click', generateOTP);
    document.getElementById('btn-verify-otp')?.addEventListener('click', verifyOTP);

    // Mandi Capacity Tracker
    document.getElementById('mandiSelect')?.addEventListener('change', updateMandiCapacityUI);

    // Form Booking
    document.getElementById('bookingForm')?.addEventListener('submit', handleBooking);

    // Audio Playback
    document.getElementById('btn-replay-audio')?.addEventListener('click', playAudioAnnouncement);

    // Officer Controls
    document.getElementById('btn-start-cam')?.addEventListener('click', startQRScanner);
    document.getElementById('btn-stop-cam')?.addEventListener('click', stopQRScanner);
    document.getElementById('btn-fetch-manual')?.addEventListener('click', loadManualToken);
    document.getElementById('btn-complete-pay')?.addEventListener('click', completeEntryAndPay);

    // Vehicle Speed Adjustment Buttons
    document.getElementById('btn-speed-slow')?.addEventListener('click', () => adjustVehicleSpeed('slow'));
    document.getElementById('btn-speed-normal')?.addEventListener('click', () => adjustVehicleSpeed('normal'));

    // Register Service Worker for Offline Functionality
    registerServiceWorker();
});

// Navigation Switcher Logic
function switchTab(tab) {
    document.querySelectorAll('main > section').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('nav button').forEach(el => {
        el.classList.remove('font-semibold', 'text-green-800', 'border-b-2', 'border-green-700');
        el.classList.add('text-slate-600');
    });
    
    document.getElementById(`sec-${tab}`)?.classList.remove('hidden');
    const activeBtn = document.getElementById(`tab-${tab}`);
    if (activeBtn) {
        activeBtn.classList.add('font-semibold', 'text-green-800', 'border-b-2', 'border-green-700');
        activeBtn.classList.remove('text-slate-600');
    }
}

// Multilingual Translation Update Logic
function changeLanguage(langKey) {
    appData.lang = langKey;
    const t = translations[langKey];

    if (document.getElementById('lbl-otp-title')) document.getElementById('lbl-otp-title').innerText = t.otpTitle;
    if (document.getElementById('lbl-otp-desc')) document.getElementById('lbl-otp-desc').innerText = t.otpDesc;
    if (document.getElementById('lbl-booking-title')) document.getElementById('lbl-booking-title').innerText = t.bookingTitle;
    if (document.getElementById('lbl-farmer-name')) document.getElementById('lbl-farmer-name').innerText = t.farmerName;
    if (document.getElementById('lbl-mandi-select')) document.getElementById('lbl-mandi-select').innerText = t.mandiSelect;
    if (document.getElementById('lbl-quantity')) document.getElementById('lbl-quantity').innerText = t.quantity;
    if (document.getElementById('lbl-slot-time')) document.getElementById('lbl-slot-time').innerText = t.slotTime;
    if (document.getElementById('btn-submit-booking')) document.getElementById('btn-submit-booking').innerText = t.submitBooking;
    if (document.getElementById('lbl-pos-text')) document.getElementById('lbl-pos-text').innerText = t.posText;
    if (document.getElementById('lbl-eta-text')) document.getElementById('lbl-eta-text').innerText = t.etaText;
    if (document.getElementById('lbl-summary-title')) document.getElementById('lbl-summary-title').innerText = t.summaryTitle;
    if (document.getElementById('lbl-total-goods')) document.getElementById('lbl-total-goods').innerText = t.totalGoods;
    if (document.getElementById('lbl-total-money')) document.getElementById('lbl-total-money').innerText = t.totalMoney;

    if (appData.activeToken) {
        playAudioAnnouncement();
    }
}

// Demo OTP & 20-Second Countdown
function generateOTP() {
    const mobile = document.getElementById('mobileNo').value;
    if (!mobile || mobile.length < 10) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    appData.otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    document.getElementById('demoOtpVal').innerText = appData.otpCode;
    document.getElementById('otpBox').classList.remove('hidden');

    let timeLeft = 20;
    document.getElementById('otpTimer').innerText = timeLeft;
    clearInterval(appData.otpTimerId);

    appData.otpTimerId = setInterval(() => {
        timeLeft--;
        document.getElementById('otpTimer').innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(appData.otpTimerId);
            appData.otpCode = null;
            alert("OTP Expired! Please generate a new OTP.");
            document.getElementById('otpBox').classList.add('hidden');
        }
    }, 1000);
}

function verifyOTP() {
    const userEntered = document.getElementById('otpInput').value;
    if (userEntered === appData.otpCode) {
        clearInterval(appData.otpTimerId);
        appData.otpVerified = true;
        alert("OTP Verified Successfully!");
        document.getElementById('otpBox').classList.add('hidden');
        
        const card = document.getElementById('booking-card');
        card.classList.remove('opacity-50', 'pointer-events-none');
    } else {
        alert("Invalid OTP! Please check and try again.");
    }
}

// Mandi Capacity Tracker
function updateMandiCapacityUI() {
    const selectedMandi = document.getElementById('mandiSelect').value;
    const cap = appData.dailyCapacities[selectedMandi];
    const statusElem = document.getElementById('capacityStatus');
    statusElem.innerText = `Booked: ${cap.booked} / ${cap.max} Tons`;
    if (cap.booked >= cap.max) {
        statusElem.className = "font-bold text-red-600";
    } else {
        statusElem.className = "font-bold text-green-700";
    }
}

// Slot Booking Processor
function handleBooking(event) {
    event.preventDefault();
    
    const name = document.getElementById('farmerName').value;
    const mandi = document.getElementById('mandiSelect').value;
    const weight = parseFloat(document.getElementById('produceWeight').value);
    const slotTime = document.getElementById('slotTime').value;

    const cap = appData.dailyCapacities[mandi];

    // Capacity Limit Enforcement (50 Tons)
    if (cap.booked + weight > cap.max) {
        alert(`Booking Rejected! Selected Mandi capacity full. Remaining allowance: ${cap.max - cap.booked} Tons.`);
        return;
    }

    cap.booked += weight;
    updateMandiCapacityUI();

    const queuePos = appData.tokens.filter(t => t.mandi === mandi).length + 1;
    const tokenId = "TKN-" + (100 + appData.tokens.length + 1);
    const exactArrivalTime = calculateArrivalETA(slotTime, queuePos, appData.delayMinutes);

    const tokenObj = {
        id: tokenId,
        farmer: name,
        mandi: mandi,
        weight: weight,
        slotTime: slotTime,
        position: queuePos,
        arrivalTime: exactArrivalTime,
        actualWeight: 0,
        disbursedMoney: 0,
        status: 'Booked'
    };

    appData.tokens.push(tokenObj);
    appData.activeToken = tokenObj;

    document.getElementById('ticket-token-id').innerText = tokenObj.id;
    document.getElementById('ticket-queue-pos').innerText = `#${tokenObj.position} in Line`;
    document.getElementById('ticket-arrival-time').innerText = tokenObj.arrivalTime;
    document.getElementById('ticket-mandi').innerText = tokenObj.mandi;
    document.getElementById('ticket-weight').innerText = `${tokenObj.weight} Tons`;
    document.getElementById('ticket-card').classList.remove('hidden');

    // QR Code Generation
    document.getElementById('qrcode').innerHTML = "";
    if (typeof QRCode !== 'undefined') {
        new QRCode(document.getElementById("qrcode"), {
            text: JSON.stringify({ id: tokenObj.id, farmer: tokenObj.farmer, mandi: tokenObj.mandi }),
            width: 128,
            height: 128
        });
    }

    playAudioAnnouncement();
}

// Calculate ETA Time
function calculateArrivalETA(baseTimeStr, queuePos, extraDelay) {
    let [time, modifier] = baseTimeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    let date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes + ((queuePos - 1) * 15) + extraDelay);

    let newHours = date.getHours();
    let newMinutes = date.getMinutes();
    let newMod = newHours >= 12 ? 'PM' : 'AM';
    newHours = newHours % 12 || 12;

    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')} ${newMod}`;
}

// Text-To-Speech Audio Output
function playAudioAnnouncement() {
    if (!appData.activeToken) return;
    const t = translations[appData.lang];
    const text = t.speechMsg(appData.activeToken.farmer, appData.activeToken.position, appData.activeToken.arrivalTime);

    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        
        if (appData.lang === 'hi') utterance.lang = 'hi-IN';
        else if (appData.lang === 'mr') utterance.lang = 'mr-IN';
        else utterance.lang = 'en-US';

        window.speechSynthesis.speak(utterance);
    }
}

// Officer QR Scanner & Manual Fetch
function startQRScanner() {
    if (typeof Html5QrcodeScanner === 'undefined') {
        alert("QR Scanner library not loaded.");
        return;
    }
    
    if (appData.html5QrScanner) {
        stopQRScanner();
    }

    appData.html5QrScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
    appData.html5QrScanner.render((decodedText) => {
        try {
            const parsed = JSON.parse(decodedText);
            loadTokenData(parsed.id);
            stopQRScanner();
        } catch(e) {
            loadTokenData(decodedText);
            stopQRScanner();
        }
    }, (error) => {});
}

function stopQRScanner() {
    if (appData.html5QrScanner) {
        appData.html5QrScanner.clear().catch(err => console.error("Error clearing scanner", err));
        appData.html5QrScanner = null;
    }
}

function loadManualToken() {
    const input = document.getElementById('manualTokenInput').value.trim();
    loadTokenData(input);
}

function loadTokenData(tokenId) {
    const token = appData.tokens.find(t => t.id.toLowerCase() === tokenId.toLowerCase());
    if (!token) {
        alert("Token not found!");
        return;
    }

    document.getElementById('officer-token-id').innerText = token.id;
    document.getElementById('officer-farmer-name').innerText = token.farmer;
    document.getElementById('actualWeight').value = token.weight;
    document.getElementById('weighbridgeForm').classList.remove('hidden');
}

function completeEntryAndPay() {
    const tokenId = document.getElementById('officer-token-id').innerText;
    const token = appData.tokens.find(t => t.id === tokenId);
    
    if (!token) return;

    const actualW = parseFloat(document.getElementById('actualWeight').value);
    const msp = parseFloat(document.getElementById('mspRate').value);

    token.actualWeight = actualW;
    token.disbursedMoney = actualW * msp;
    token.status = "Completed";

    alert(`Processing Complete!\nActual Weight: ${actualW} Tons\nTotal Disbursed: ₹ ${token.disbursedMoney.toLocaleString('en-IN')}`);

    document.getElementById('weighbridgeForm').classList.add('hidden');
    updateSummaryDashboard();
}

// Throttle Control & Dynamic ETA Recalculation
function adjustVehicleSpeed(mode) {
    if (mode === 'slow') {
        appData.delayMinutes += 15;
    } else {
        appData.delayMinutes = 0;
    }

    appData.tokens.forEach(t => {
        if (t.status === 'Booked') {
            t.arrivalTime = calculateArrivalETA(t.slotTime, t.position, appData.delayMinutes);
        }
    });

    if (appData.activeToken) {
        document.getElementById('ticket-arrival-time').innerText = appData.activeToken.arrivalTime;
        
        const smsText = `SMS Alert: Traffic/Weighbridge delay experienced at ${appData.activeToken.mandi}. Your updated estimated arrival time is ${appData.activeToken.arrivalTime}.`;
        document.getElementById('smsAlertText').innerText = smsText;
        document.getElementById('smsAlertBox').classList.remove('hidden');
    }

    alert(mode === 'slow' ? "Processing slowed down! Dynamic delay applied & SMS notifications sent." : "Normal intake speed restored.");
}

// Summary Dashboard Updates
function updateSummaryDashboard() {
    let totalGoods = 0;
    let totalMoney = 0;

    const tbody = document.getElementById('summaryTableBody');
    tbody.innerHTML = "";

    const completedTokens = appData.tokens.filter(t => t.status === "Completed");

    if (completedTokens.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="p-4 text-center text-slate-400">No completed entries logged today.</td></tr>`;
    } else {
        completedTokens.forEach(t => {
            totalGoods += t.actualWeight;
            totalMoney += t.disbursedMoney;

            const tr = document.createElement('tr');
            tr.className = "border-b text-slate-700 hover:bg-slate-50";
            tr.innerHTML = `
                <td class="p-3 font-bold">${t.id}</td>
                <td class="p-3">${t.farmer}</td>
                <td class="p-3">${t.mandi}</td>
                <td class="p-3 font-semibold">${t.actualWeight} Tons</td>
                <td class="p-3 text-emerald-700 font-bold">₹ ${t.disbursedMoney.toLocaleString('en-IN')}</td>
                <td class="p-3"><span class="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-bold">Completed</span></td>
            `;
            tbody.appendChild(tr);
        });
    }

    document.getElementById('sumTotalGoods').innerText = `${totalGoods.toFixed(1)} Tons`;
    document.getElementById('sumTotalMoney').innerText = `₹ ${totalMoney.toLocaleString('en-IN')}`;
}

// Service Worker Registration for Offline Capability
function registerServiceWorker() {
    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
        const swCode = `
            const CACHE_NAME = 'mandi-cache-v1';
            self.addEventListener('install', e => {
                e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(['./'])));
            });
            self.addEventListener('fetch', e => {
                e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
            });
        `;
        const blob = new Blob([swCode], { type: 'application/javascript' });
        const swUrl = URL.createObjectURL(blob);
        navigator.serviceWorker.register(swUrl).catch(() => {});
    }
}
