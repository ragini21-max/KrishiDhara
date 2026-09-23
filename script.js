/* ==================== INTERNATIONALIZATION (BHASHINI DICTIONARY) ==================== */
const translations = {
  en: {
    tabFarmer: "Farmer App",
    tabOfficer: "Officer Desk",
    tabQueue: "Queue Engine",
    tabSms: "SMS Logs",
    farmerTitle: "Farmer Portal & Digital Pass",
    farmerSub: "Verify your mobile number and reserve a procurement slot.",
    kisanOtpTitle: "Kisan OTP Authentication",
    kisanOtpDesc: "Use your registered mobile number.",
    mobileLabel: "Mobile Number",
    enterOtpLabel: "Enter 6-Digit Demo OTP",
    timeRemaining: "Time Remaining:",
    sendOtp: "Send OTP",
    verifyOtp: "Verify OTP & Generate Pass",
    securePass: "SECURE PASS",
    digitalPassTitle: "Digital Gate Pass",
    slotConfirmed: "SLOT CONFIRMED",
    showQrText: "Show this QR code at the entry gate.",
    farmerName: "Farmer Name / ID",
    mandiCenter: "Mandi Center",
    commodity: "Commodity Type",
    quantity: "Produce Quantity (Tons)",
    vehicle: "Vehicle Type",
    livePosition: "Live Position",
    dynamicEta: "Dynamic ETA",
    gracePeriod: "Grace Period",
    listenStatus: "Listen to Status",
    checkCapacityTitle: "Check Mandi Capacity",
    checkCapacityHeader: "Check Mandi Capacity",
    capacitySub: "Real-time daily limits and availability status",
    capacityStatusLabel: "Capacity Status:",
    capacityStatusDesc: "Select Date, Mandi & Commodity to check availability.",
    dailyQuota: "Daily Quota Utilization",
    mobileInboxTitle: "Mobile SMS Inbox (Simulation)",
    noSmsYet: "No SMS alerts received yet.",
    officerTitle: "Mandi Officer Control Desk",
    officerSub: "Verify passes and manage gate operations.",
    gateVerificationTitle: "Gate Pass Verification",
    gateVerificationDesc: "Scan or enter token ID at the mandi entry gate.",
    tokenLabel: "Token ID",
    verifyEntryBtn: "Verify Entry",
    openCameraBtn: "Open Camera Scanner",
    weighbridgeTitle: "Automated Weighbridge Station",
    weighbridgeDesc: "Simulate live weight scale input from the IoT sensor.",
    captureWeightBtn: "Capture Weight from Scale",
    entryProcessTitle: "2. Entry & Process Action",
    approveGateBtn: "Approve Gate Entry",
    recordWeightBtn: "Record Weight",
    approveDbtBtn: "Approve & Release Payment (DBT)",
    queueExceptionsTitle: "Queue Exceptions & Controls",
    grantBufferBtn: "Grant 15-min Buffer",
    pauseEntryBtn: "Pause Gate Entry",
    queueEngineTitle: "Queue Processing Engine",
    queueEngineSub: "Adjust capacity and monitor the current mandi workload.",
    adjusterTitle: "Capacity & Speed Adjuster",
    activeWeighbridges: "Active Weighbridges",
    shiftEfficiency: "Shift Efficiency Factor",
    normalSpeed: "Normal Speed (100%)",
    highSpeed: "High Speed (150%)",
    slowSpeed: "Slow Speed (70%)",
    calculatedThroughput: "Calculated system throughput:",
    activeMandiStatusTitle: "Active Mandi Status",
    inQueue: "In Queue",
    vehicles: "Vehicles",
    averageWait: "Average Wait",
    minutes: "Minutes",
    clearedToday: "Cleared Today",
    tons: "Tons",
    smsTitle: "SMS Gateway & Broadcast Logs",
    smsSub: "View system and farmer communication events.",
    liveTelephonyLogs: "Live Telephony Logs"
  },
  hi: {
    tabFarmer: "किसान ऐप",
    tabOfficer: "अधिकारी डेस्क",
    tabQueue: "कतार इंजन",
    tabSms: "एसएमएस लॉग",
    farmerTitle: "किसान पोर्टल और डिजिटल पास",
    farmerSub: "अपना मोबाइल नंबर सत्यापित करें और स्लॉट आरक्षित करें।",
    kisanOtpTitle: "किसान ओटीपी प्रमाणीकरण",
    kisanOtpDesc: "अपने पंजीकृत मोबाइल नंबर का उपयोग करें।",
    mobileLabel: "मोबाइल नंबर",
    enterOtpLabel: "6-अंकीय डेमो ओटीपी दर्ज करें",
    timeRemaining: "शेष समय:",
    sendOtp: "ओटीपी भेजें",
    verifyOtp: "ओटीपी सत्यापित करें और पास प्राप्त करें",
    securePass: "सुरक्षित पास",
    digitalPassTitle: "डिजिटल गेट पास",
    slotConfirmed: "स्लॉट की पुष्टि हुई",
    showQrText: "प्रवेश द्वार पर यह क्यूआर कोड दिखाएं।",
    farmerName: "किसान का नाम / आईडी",
    mandiCenter: "मंडी केंद्र",
    commodity: "जिंस का प्रकार",
    quantity: "उपज की मात्रा (टन)",
    vehicle: "वाहन का प्रकार",
    livePosition: "लाइव स्थिति",
    dynamicEta: "अनुमानित समय (ETA)",
    gracePeriod: "छूट की अवधि",
    listenStatus: "स्थिति सुनें",
    checkCapacityTitle: "मंडी क्षमता की जांच करें",
    checkCapacityHeader: "मंडी क्षमता जांचें",
    capacitySub: "वास्तविक समय की दैनिक सीमाएं और उपलब्धता की स्थिति",
    capacityStatusLabel: "क्षमता स्थिति:",
    capacityStatusDesc: "उपलब्धता की जांच के लिए तिथि, मंडी और जिंस का चयन करें।",
    dailyQuota: "दैनिक कोटा उपयोग",
    mobileInboxTitle: "मोबाइल एसएमएस इनबॉक्स (सिमुलेशन)",
    noSmsYet: "अभी तक कोई एसएमएस प्राप्त नहीं हुआ है।",
    officerTitle: "मंडी अधिकारी नियंत्रण डेस्क",
    officerSub: "पास सत्यापित करें और गेट संचालन का प्रबंधन करें।",
    gateVerificationTitle: "गेट पास सत्यापन",
    gateVerificationDesc: "मंडी प्रवेश द्वार पर टोकन आईडी स्कैन या दर्ज करें।",
    tokenLabel: "टोकन आईडी",
    verifyEntryBtn: "प्रवेश सत्यापित करें",
    openCameraBtn: "कैमरा स्कैनर खोलें",
    weighbridgeTitle: "स्वचालित वेब्रिज स्टेशन",
    weighbridgeDesc: "आईओटी सेंसर से लाइव वजन स्केल इनपुट का सिमुलेशन करें।",
    captureWeightBtn: "स्केल से वजन कैप्चर करें",
    entryProcessTitle: "2. प्रवेश और प्रक्रिया कार्रवाई",
    approveGateBtn: "गेट प्रवेश स्वीकृत करें",
    recordWeightBtn: "वजन दर्ज करें",
    approveDbtBtn: "स्वीकृत करें और भुगतान जारी करें (DBT)",
    queueExceptionsTitle: "कतार अपवाद और नियंत्रण",
    grantBufferBtn: "15 मिनट की छूट दें",
    pauseEntryBtn: "गेट प्रवेश रोकें",
    queueEngineTitle: "कतार प्रसंस्करण इंजन",
    queueEngineSub: "क्षमता को समायोजित करें और वर्तमान मंडी कार्यभार की निगरानी करें।",
    adjusterTitle: "क्षमता और गति समायोजक",
    activeWeighbridges: "सक्रिय धर्म कांटा (वेब्रिज)",
    shiftEfficiency: "शिफ्ट दक्षता कारक",
    normalSpeed: "सामान्य गति (100%)",
    highSpeed: "उच्च गति (150%)",
    slowSpeed: "धीमी गति (70%)",
    calculatedThroughput: "गणना की गई प्रणाली की गति:",
    activeMandiStatusTitle: "सक्रिय मंडी स्थिति",
    inQueue: "कतार में",
    vehicles: "वाहन",
    averageWait: "औसत प्रतीक्षा",
    minutes: "मिनट",
    clearedToday: "आज पूर्ण किया गया",
    tons: "टन",
    smsTitle: "एसएमएस गेटवे और प्रसारण लॉग",
    smsSub: "सिस्टम और किसान संचार की घटनाएं देखें।",
    liveTelephonyLogs: "लाइव टेलीफोनी लॉग"
  }
};

/* State Variables */
let currentLang = 'en';
let generatedOtp = '';
let otpTimer = null;
let timerSeconds = 20;
let isOtpSent = false;

/* Initialize System on Page Load */
window.addEventListener('DOMContentLoaded', () => {
  addLog("System: Mandi Queue Engine initialized.");
  addLog("Bhashini Language Engine activated (EN/HI).");
});

/* Tab Switching Function */
function switchTab(tabId) {
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-section').forEach(sec => sec.classList.remove('active'));

  document.getElementById(`tab-${tabId}`).classList.add('active');
  document.getElementById(`sec-${tabId}`).classList.add('active');
}

/* Bhashini Dynamic Language Change */
function changeLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];

  document.querySelectorAll('[data-i18n]').forEach(elem => {
    const key = elem.getAttribute('data-i18n');
    if (t[key]) {
      elem.textContent = t[key];
    }
  });

  // Dynamic values update
  if (currentLang === 'hi') {
    document.getElementById('dispFarmerName').textContent = "रमेश पाटिल";
    document.getElementById('dispMandiCenter').textContent = "नासिक मुख्य एपीएमसी";
    document.getElementById('dispCommodity').textContent = "प्याज";
    document.getElementById('dispQuantity').textContent = "5 टन";
    document.getElementById('dispVehicle').textContent = "भारी वाणिज्‍यिक ट्रक";
    document.getElementById('dispGrace').textContent = "15 मिनट";
  } else {
    document.getElementById('dispFarmerName').textContent = "Ramesh Patil";
    document.getElementById('dispMandiCenter').textContent = "Nashik Main APMC";
    document.getElementById('dispCommodity').textContent = "Onion";
    document.getElementById('dispQuantity').textContent = "5 Tons";
    document.getElementById('dispVehicle').textContent = "Heavy Commercial Truck";
    document.getElementById('dispGrace').textContent = "15 Minutes";
  }

  addLog(`Bhashini Language changed to: ${lang === 'hi' ? 'Hindi (हिन्दी)' : 'English'}`);
}

/* OTP Flow Handler with 20-Second Countdown Timer */
function handleOtpClick() {
  const mobile = document.getElementById('mobileInput').value;

  if (!isOtpSent) {
    if (!mobile || mobile.length < 10) {
      alert(currentLang === 'hi' ? "कृपया 10-अंकीय वैध मोबाइल नंबर दर्ज करें।" : "Please enter a valid 10-digit mobile number.");
      return;
    }

    // Generate random 6-digit OTP
    generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    isOtpSent = true;

    // Show OTP input and timer
    document.getElementById('otpInputGroup').classList.remove('hidden');
    document.getElementById('otpBtnText').textContent = translations[currentLang].verifyOtp;

    // Alert user with demo OTP
    alert(`${currentLang === 'hi' ? 'आपका डेमो ओटीपी है' : 'Your Demo OTP is'}: ${generatedOtp}`);

    // Update Mobile Inbox Simulation (Side Box)
    const smsMsg = currentLang === 'hi' 
      ? `आपका एपीएमसी ओटीपी ${generatedOtp} है। यह 20 सेकंड के लिए मान्य है।`
      : `Your APMC Demo OTP is ${generatedOtp}. Valid for 20 seconds.`;
    document.getElementById('farmerSmsInbox').textContent = smsMsg;

    addLog(`Demo OTP sent successfully. +91-${mobile} [OTP: ${generatedOtp}]`);

    // Start 20-second timer
    timerSeconds = 20;
    document.getElementById('timerVal').textContent = timerSeconds;

    clearInterval(otpTimer);
    otpTimer = setInterval(() => {
      timerSeconds--;
      document.getElementById('timerVal').textContent = timerSeconds;

      if (timerSeconds <= 0) {
        clearInterval(otpTimer);
        alert(currentLang === 'hi' ? "ओटीपी समाप्त हो गया है! कृपया पुन: प्रयास करें।" : "OTP Expired! Please try again.");
        resetOtpState();
      }
    }, 1000);

  } else {
    // Verify OTP
    const enteredOtp = document.getElementById('otpCodeInput').value;
    if (enteredOtp === generatedOtp) {
      clearInterval(otpTimer);
      alert(currentLang === 'hi' ? "सत्यापन सफल! आपका गेट पास तैयार है।" : "Authentication successful! Your gate pass is generated.");

      document.getElementById('otpCard').classList.add('hidden');
      document.getElementById('digitalPassCard').classList.remove('hidden');

      // Update quota box
      document.getElementById('quotaProgressBar').style.width = "20%";
      document.getElementById('quotaText').textContent = "5 / 50 Tons Booked";

      addLog("Farmer authenticated successfully.");
      addLog("Booking confirmed. Your digital pass is ready. #MND-68019 — Ramesh Patil");
    } else {
      alert(currentLang === 'hi' ? "गलत ओटीपी! कृपया पुन: प्रयास करें।" : "Invalid OTP! Please check and try again.");
    }
  }
}

function resetOtpState() {
  isOtpSent = false;
  document.getElementById('otpInputGroup').classList.add('hidden');
  document.getElementById('otpBtnText').textContent = translations[currentLang].sendOtp;
  document.getElementById('otpCodeInput').value = '';
}

/* Bhashini Text-To-Speech Narration */
function speakPassStatus() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Stop any active speech

    let textToSpeak = "";
    if (currentLang === 'hi') {
      textToSpeak = "नमस्ते रमेश पाटिल। आपका डिजिटल पास MND-68019 नासिक मुख्य एपीएमसी के लिए पुष्टि किया गया है। आपकी उपज 5 टन प्याज है। आपकी वर्तमान कतार स्थिति नंबर 3 है, और अनुमानित समय सुबह 10 बजकर 45 मिनट है।";
    } else {
      textToSpeak = "Hello Ramesh Patil. Your Digital Gate Pass MND-68019 is confirmed for Nashik Main APMC. Produce: 5 Tons of Onion. Your current live position is #3, and estimated arrival time is 10:45 AM.";
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = currentLang === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 0.9; // Natural speed

    window.speechSynthesis.speak(utterance);
    addLog(`Bhashini TTS Narration triggered [${currentLang.toUpperCase()}]`);
  } else {
    alert("Text-to-speech is not supported in your browser.");
  }
}

/* Officer Desk Actions */
function verifyToken() {
  const token = document.getElementById('officerTokenInput').value;
  const resultBox = document.getElementById('verificationResultBox');
  resultBox.classList.remove('hidden');

  if (token === "MND-68019") {
    const msg = currentLang === 'hi' 
      ? `पास मान्य है (MND-68019) — गेट प्रवेश की अनुमति दी गई।`
      : `PASS VALID (MND-68019) — Gate entry permitted.`;
    document.getElementById('verificationMsg').textContent = msg;
    addLog(`Officer Desk: Token ${token} verified successfully.`);
  } else {
    document.getElementById('verificationMsg').textContent = `TOKEN INVALID OR EXPIRED (${token})`;
  }
}

function triggerCameraScan() {
  alert(currentLang === 'hi' ? "कैमरा स्कैनर सक्रिय किया गया। क्यूआर कोड की स्कैनिंग का अनुकरण..." : "Camera scanner activated. Simulating QR Code scan...");
  document.getElementById('officerTokenInput').value = "MND-68019";
  verifyToken();
}

function captureWeight() {
  const simulatedWeight = (4.8 + Math.random() * 0.4).toFixed(3);
  document.getElementById('weighDisplay').textContent = `${simulatedWeight} TONS`;
  document.getElementById('manualWeightInput').value = Math.round(simulatedWeight);
  addLog(`Weighbridge IoT Sensor: Captured weight ${simulatedWeight} Tons.`);
}

function approveGateEntry() {
  alert(currentLang === 'hi' ? "गेट प्रवेश स्वीकृत किया गया!" : "Gate Entry Approved!");
  document.getElementById('procStage').textContent = "GATE ENTERED";
  addLog("Officer Action: Gate Entry Approved for #MND-68019.");
}

function recordWeightManual() {
  const weight = document.getElementById('manualWeightInput').value;
  alert(`${currentLang === 'hi' ? 'वजन दर्ज किया गया' : 'Weight Recorded'}: ${weight} Tons`);
  document.getElementById('procStage').textContent = "WEIGHED";
  addLog(`Officer Action: Weight recorded manually as ${weight} Tons.`);
}

function approveDbtPayment() {
  alert(currentLang === 'hi' ? "डीबीटी भुगतान जारी किया गया!" : "DBT Payment Released successfully!");
  document.getElementById('procStage').textContent = "COMPLETED & PAID";
  addLog("Officer Action: DBT Direct Payment released to Ramesh Patil.");
}

function grantBuffer() {
  alert(currentLang === 'hi' ? "15 मिनट की अतिरिक्त छूट दी गई।" : "15-Minute Grace Buffer Granted.");
  addLog("Queue Exception: 15-min Buffer granted to Token #MND-68019.");
}

function pauseEntry() {
  alert(currentLang === 'hi' ? "गेट प्रवेश रोक दिया गया है!" : "Gate Entry Paused!");
  addLog("Queue Exception: Gate Entry PAUSED by Mandi Officer.");
}

/* Queue Engine Logic */
function recalculateThroughput() {
  const count = parseInt(document.getElementById('weighbridgeCount').value) || 1;
  const efficiency = parseInt(document.getElementById('efficiencySelect').value) || 10;
  const throughput = Math.max(2, Math.round(efficiency / count));

  const text = currentLang === 'hi' 
    ? `${throughput} मिनट प्रति वाहन` 
    : `${throughput} minutes per vehicle`;
  document.getElementById('throughputVal').textContent = text;
}

/* Centralized Telephony Logger */
function addLog(message) {
  const logsContainer = document.getElementById('logsTerminal');
  if (!logsContainer) return;

  const now = new Date();
  const timeStr = now.toTimeString().split(' ')[0].substring(0, 5);

  const logRow = document.createElement('div');
  logRow.className = 'log-entry';
  logRow.textContent = `[${timeStr}] ${message}`;

  logsContainer.prepend(logRow);
}
