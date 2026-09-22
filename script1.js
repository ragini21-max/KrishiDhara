let state = JSON.parse(localStorage.getItem('mandiState')) || {
  targetCapacity: 500,
  totalCollected: 0,
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
  localStorage.setItem('mandiState', JSON.stringify(state));
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

document.getElementById('farmerForm').addEventListener('submit', function(e) {
  e.preventDefault();

  if (state.totalCollected >= state.targetCapacity || state.machineState === 'HALT') {
    alert('Registration currently closed due to capacity or machine breakdown.');
    return;
  }

  const mandi = document.getElementById('mandiName').value;
  const name = document.getElementById('farmerName').value;
  const mobile = document.getElementById('mobileNo').value;
  const qty = parseFloat(document.getElementById('cropQty').value);
  const slot = document.getElementById('timeSlot').value;
  const lang = document.getElementById('languagePref').value;

  if (state.totalCollected + qty > state.targetCapacity) {
    alert(`Cannot accept ${qty} Qtls. Only ${state.targetCapacity - state.totalCollected} Qtls quota remaining.`);
    return;
  }

  const token = 'MND-' + Math.floor(10000 + Math.random() * 90000);
  const record = { mandi, name, mobile, qty, slot, lang, token, timestamp: new Date().toLocaleString() };

  state.registrations.push(record);
  state.totalCollected += qty;
  saveState();

  document.getElementById('lblMandi').textContent = mandi;
  document.getElementById('lblToken').textContent = token;
  document.getElementById('lblSlot').textContent = slot + " (Strict)";
  
  const bhashiniMsg = getBhashiniMessage(lang, name, slot);
  document.getElementById('bhashiniTextMsg').textContent = bhashiniMsg;
  document.getElementById('ticketResult').style.display = 'block';

  checkCapacityLimit();
  this.reset();
  document.getElementById('bookBtn').disabled = true;
});

function getBhashiniMessage(lang, name, slot) {
  if (lang === 'hi-IN') {
    return `नमस्ते ${name}, आपका मंडी गेट-पास टोकन स्वीकृत हो गया है। आपका प्रवेश समय है: ${slot}। कृपया समय पर आएं।`;
  } else if (lang === 'mr-IN') {
    return `नमस्कार ${name}, तुमचे मंडी गेट-पास टोकन मंजूर झाले आहे. तुमची प्रवेश वेळ: ${slot} अशी आहे. वेळेवर उपस्थित राहा.`;
  } else {
    return `Hello ${name}, your Mandi Gate-Pass token is confirmed. Your strict arrival window is: ${slot}. Please report on time.`;
  }
}

function playVoiceMessage() {
  const text = document.getElementById('bhashiniTextMsg').textContent;
  const lang = document.getElementById('languagePref').value;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  window.speechSynthesis.speak(utterance);
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
    alert('Daily max target updated.');
  }
}

function toggleMachineStatus() {
  const status = document.getElementById('machineStatus').value;
  state.machineState = status;
  const label = document.getElementById('speedStatus');
  if (status === 'NORMAL') label.textContent = "Normal Operations (100% Intake)";
  if (status === 'SLOW') label.textContent = "Slowdown Mode (Slot processing speed reduced by 50%)";
  if (status === 'HALT') label.textContent = "CRITICAL: All operations halted due to failure";
  saveState();
}

function sendSmsAlert() {
  const targetToken = document.getElementById('smsFarmerList').value;
  const msg = document.getElementById('customSms').value;
  if (targetToken && msg) {
    alert(`SMS Alert Sent to Token ${targetToken}:\n"${msg}"`);
    document.getElementById('customSms').value = '';
  }
}

function renderSummary() {
  document.getElementById('sumQty').textContent = state.totalCollected + ' Qtl';
  document.getElementById('sumLimit').textContent = state.targetCapacity + ' Qtl';
  const mspPrice = 2275;
  const totalVal = state.totalCollected * mspPrice;
  document.getElementById('sumValue').textContent = '₹' + totalVal.toLocaleString('en-IN');

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
    card.innerHTML = `<strong>Token: ${r.token}</strong> | ${r.name} | ${r.qty} Qtl | Slot: ${r.slot} | Mandi: ${r.mandi}`;
    logContainer.appendChild(card);
  });

  checkCapacityLimit();
}

document.addEventListener('DOMContentLoaded', () => {
  updateOnlineStatus();
  renderSummary();
});
