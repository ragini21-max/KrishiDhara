let state = JSON.parse(localStorage.getItem('mandiStateTons')) || {
  targetCapacity: 50, // in Tons
  totalCollected: 0,  // in Tons
  registrations: [],
  isOtpVerified: false,
  machineState: 'NORMAL'
};

let generatedOtp = null;
let timerInterval = null;

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

function updateOnlineStatus() {
  const badge = document.getElementById('networkStatus');
  if (navigator.onLine) {
    badge.textContent = "Online";
    badge.className = "status-badge";
  } else {
    badge.textContent = "Offline (Local Saved)";
    badge.className = "status-badge offline";
  }
}

function saveState() {
  localStorage.setItem('mandiStateTons', JSON.stringify(state));
  renderSummary();
}

function switchTab(tabId, evt) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  if (evt && evt.target) {
    evt.target.classList.add('active');
  }
  renderSummary();
}

function sendDemoOTP() {
  generatedOtp = Math.floor(1000 + Math.random() * 9000);
  document.getElementById('demoOtpDisplay').textContent = generatedOtp;
  document.getElementById('otpSection').style.display = 'block';
  let timeLeft = 20;
  document.getElementById('timer').textContent = timeLeft;

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      generatedOtp = null;
      alert('OTP Expired! Click Get Demo OTP again.');
      document.getElementById('otpSection').style.display = 'none';
    }
  }, 1000);
}

function verifyOTP() {
  const input = document.getElementById('enteredOtp').value;
  if (input && parseInt(input, 10) === generatedOtp) {
    alert('OTP Verified Successfully!');
    clearInterval(timerInterval);
    document.getElementById('otpSection').style.display = 'none';
    state.isOtpVerified = true;
    document.getElementById('bookBtn').disabled = false;
  } else {
    alert('Invalid OTP. Please try again.');
  }
}

function calculateExactArrivalTime(startTimeStr, queuePosition, machineState) {
  // Processing time per truck based on weighbridge speed
  let minutesPerTruck = 15;
  if (machineState === 'SLOW') minutesPerTruck = 30;

  // Calculate total delay minutes from queue position
  const delayMinutes = (queuePosition - 1) * minutesPerTruck;

  // Convert shift start time string to Date object
  let [timeStr, modifier] = startTimeStr.split(' ');
  let [hours, minutes] = timeStr.split(':').map(Number);
  if (modifier === 'PM' && hours < 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  let arrivalDate = new Date();
  arrivalDate.setHours(hours, minutes + delayMinutes, 0, 0);

  // Format time back to 12-hour format
  let finalHours = arrivalDate.getHours();
  let finalMinutes = arrivalDate.getMinutes();
  let finalModifier = finalHours >= 12 ? 'PM' : 'AM';
  finalHours = finalHours % 12 || 12;
  finalMinutes = finalMinutes < 10 ? '0' + finalMinutes : finalMinutes;

  return `${finalHours}:${finalMinutes} ${finalModifier}`;
}

document.getElementById('farmerForm').addEventListener('submit', function(e) {
  e.preventDefault();

  if (state.totalCollected >= state.targetCapacity || state.machineState === 'HALT') {
    alert('Registration currently closed due to capacity limit or machine failure.');
    return;
  }

  const mandi = document.getElementById('mandiName').value;
  const name = document.getElementById('farmerName').value;
  const mobile = document.getElementById('mobileNo').value;
  const qty = parseFloat(document.getElementById('cropQty').value);
  const slotWindow = document.getElementById('timeSlot').value;
  const lang = document.getElementById('languagePref').value;

  if (state.totalCollected + qty > state.targetCapacity) {
    alert(`Cannot accept ${qty} Tons. Only ${(state.targetCapacity - state.totalCollected).toFixed(2)} Tons quota remaining.`);
    return;
  }

  const queuePos = state.registrations.length + 1;
  const exactArrivalTime = calculateExactArrivalTime(slotWindow, queuePos, state.machineState);
  const token = 'MND-' + Math.floor(10000 + Math.random() * 90000);

  const record = { 
    mandi, name, mobile, qty, slotWindow, exactArrivalTime, queuePos, lang, token, timestamp: new Date().toLocaleString() 
  };

  state.registrations.push(record);
  state.totalCollected += qty;
  saveState();

  // Display Ticket details
  document.getElementById('lblMandi').textContent = mandi;
  document.getElementById('lblToken').textContent = token;
  document.getElementById('lblQueuePos').textContent = `#${queuePos} in Queue`;
  document.getElementById('lblExactTime').textContent = exactArrivalTime;
  document.getElementById('lblSlot').textContent = slotWindow;

  // Generate QR Code
  document.getElementById('qrcode').innerHTML = '';
  new QRCode(document.getElementById('qrcode'), {
    text: JSON.stringify({ token: token, name: name, qty: qty + ' Tons', time: exactArrivalTime }),
    width: 128,
    height: 128
  });

  // Multilingual Speech/Text
  const bhashiniMsg = getBhashiniMessage(lang, name, queuePos, exactArrivalTime);
  document.getElementById('bhashiniTextMsg').textContent = bhashiniMsg;
  document.getElementById('ticketResult').style.display = 'block';

  checkCapacityLimit();
  this.reset();
  document.getElementById('bookBtn').disabled = true;
});

function getBhashiniMessage(lang, name, queuePos, exactTime) {
  if (lang === 'hi-IN') {
    return `नमस्ते ${name}, टोकन स्वीकृत। आपका लाइन नंबर #${queuePos} है। सही समय पर प्रवेश करें: ${exactTime}।`;
  } else if (lang === 'mr-IN') {
    return `नमस्कार ${name}, टोकन मंजूर. तुमचा रांगेतील नंबर #${queuePos} आहे. नक्की या वेळेत या: ${exactTime}.`;
  } else {
    return `Hello ${name}, token confirmed. Your position in queue is #${queuePos}. Exact entry time: ${exactTime}.`;
  }
}

function playVoiceMessage() {
  const text = document.getElementById('bhashiniTextMsg').textContent;
  const lang = document.getElementById('languagePref').value;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  window.speechSynthesis.speak(utterance);
}

function verifyTokenByOfficer() {
  const tokenInput = document.getElementById('verifyTokenInput').value.trim();
  const found = state.registrations.find(r => r.token === tokenInput);
  const resultDiv = document.getElementById('verificationResult');

  if (found) {
    resultDiv.style.color = '#1b5e20';
    resultDiv.textContent = ` VALID PASS: ${found.name} | Queue #${found.queuePos} | ${found.qty} Tons | Arrival: ${found.exactArrivalTime}`;
  } else {
    resultDiv.style.color = '#c62828';
    resultDiv.textContent = ` INVALID TOKEN: Gate pass not found in database.`;
  }
}

function checkCapacityLimit() {
  if (state.totalCollected >= state.targetCapacity) {
    document.getElementById('registrationBlocked').style.display = 'block';
    document.getElementById('bookBtn').disabled = true;
  }
}

function updateTarget() {
  const val = parseFloat(document.getElementById('maxTarget').value);
  if (val) {
    state.targetCapacity = val;
    saveState();
    alert('Daily max capacity target updated.');
  }
}

function toggleMachineStatus() {
  const status = document.getElementById('machineStatus').value;
  state.machineState = status;
  const label = document.getElementById('speedStatus');
  if (status === 'NORMAL') label.textContent = "Normal Operations (100% Intake - 15 mins/truck)";
  if (status === 'SLOW') label.textContent = "Slowdown Mode (Slot arrival interval extended to 30 mins/truck)";
  if (status === 'HALT') label.textContent = "CRITICAL: Weighbridge failure. Registrations paused.";
  saveState();
}

function sendSmsAlert() {
  const targetToken = document.getElementById('smsFarmerList').value;
  const msg = document.getElementById('customSms').value;
  if (targetToken && msg) {
    alert(`SMS Broadcast Sent to Token ${targetToken}:\n"${msg}"`);
    document.getElementById('customSms').value = '';
  }
}

function renderSummary() {
  document.getElementById('sumQty').textContent = state.totalCollected.toFixed(2) + ' Tons';
  document.getElementById('sumLimit').textContent = state.targetCapacity + ' Tons';
  const mspPricePerTon = 22750; // Equivalent MSP rate per ton
  const totalVal = state.totalCollected * mspPricePerTon;
  document.getElementById('sumValue').textContent = '₹' + Math.round(totalVal).toLocaleString('en-IN');

  const smsSelect = document.getElementById('smsFarmerList');
  const logContainer = document.getElementById('farmersListLog');
  smsSelect.innerHTML = '';
  logContainer.innerHTML = '';

  state.registrations.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r.token;
    opt.textContent = `${r.name} (${r.token})`;
    smsSelect.appendChild(opt);

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<strong>Token: ${r.token}</strong> | Queue #${r.queuePos} | ${r.name} | ${r.qty} Tons | Exact Time: ${r.exactArrivalTime} | Mandi: ${r.mandi}`;
    logContainer.appendChild(card);
  });

  checkCapacityLimit();
}

document.addEventListener('DOMContentLoaded', () => {
  updateOnlineStatus();
  renderSummary();
});
