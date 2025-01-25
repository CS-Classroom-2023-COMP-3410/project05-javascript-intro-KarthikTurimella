const clock = document.getElementById('clock');
const toggleFormatButton = document.getElementById('toggleFormat');
const colorPicker = document.getElementById('color');
const fontSizeInput = document.getElementById('fontSize');
const alarmInput = document.getElementById('alarmTime');
const setAlarmButton = document.getElementById('setAlarm');

let is24Hour = false;
let alarmTime = null;

// Update clock every second
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  if (!is24Hour) {
    hours = hours % 12 || 12;
  }
  const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  clock.textContent = timeString;

  if (alarmTime && timeString === alarmTime) {
    alert('Alarm ringing!');
    alarmTime = null; // Reset alarm
  }
}

setInterval(updateClock, 1000);

// Toggle between 12-hour and 24-hour formats
toggleFormatButton.addEventListener('click', () => {
  is24Hour = !is24Hour;
  toggleFormatButton.textContent = is24Hour ? 'Switch to 12-hour' : 'Switch to 24-hour';
});

// Change clock color
colorPicker.addEventListener('input', () => {
  clock.style.color = colorPicker.value;
});

// Change font size
fontSizeInput.addEventListener('input', () => {
  clock.style.fontSize = `${fontSizeInput.value}px`;
});

// Set alarm
setAlarmButton.addEventListener('click', () => {
  alarmTime = alarmInput.value;
  if (alarmTime) {
    alarmTime += ':00'; // Append seconds for format consistency
    alert(`Alarm set for ${alarmTime}`);
  }
});
