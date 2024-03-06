import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate >= Date.now()) {
      userSelectedDate = selectedDate;
      startBtn.removeAttribute('disabled');
      console.log(userSelectedDate);
    } else {
      userSelectedDate = null;
      startBtn.setAttribute('disabled', true);
      iziToast.error({
        message: 'Please choose a date in the future',
        messageColor: 'white',
        backgroundColor: '#EF4040',
        position: 'topRight',
        timeout: 3000,
        titleColor: 'white',
      });
    }
  },
};
flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function padTime(value) {
  return value.toString().padStart(2, '0');
}

function updateTimer() {
  if (!userSelectedDate) return;

  const currentTime = new Date();
  const timeDifference = userSelectedDate - currentTime;

  if (timeDifference <= 0) {
    clearInterval(timerInterval);
    return;
  }

  const {
    days: daysLeft,
    hours: hoursLeft,
    minutes: minutesLeft,
    seconds: secondsLeft,
  } = convertMs(timeDifference);

  days.textContent = padTime(daysLeft);
  hours.textContent = padTime(hoursLeft);
  minutes.textContent = padTime(minutesLeft);
  seconds.textContent = padTime(secondsLeft);
}

let timerInterval;

startBtn.addEventListener('click', () => {
  input.setAttribute('disabled', true);
  startBtn.setAttribute('disabled', true);

  timerInterval = setInterval(() => {
    updateTimer();

    if (userSelectedDate - new Date() <= 0) {
      clearInterval(timerInterval);
      input.removeAttribute('disabled');
      startBtn.removeAttribute('disabled');
    }
  }, 1000);
});
