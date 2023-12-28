let stopwatch;
let isRunning = false;
let startTime;
let lapTimes = [];

function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    startTime = new Date().getTime() - (lapTimes.reduce((acc, lap) => acc + lap, 0) || 0);
    stopwatch = setInterval(updateDisplay, 10);
    document.querySelector('button:nth-of-type(1)').textContent = 'Pause';
  } else {
    pauseStopwatch();
  }
}

function pauseStopwatch() {
  if (isRunning) {
    isRunning = false;
    clearInterval(stopwatch);
    document.querySelector('button:nth-of-type(1)').textContent = 'Resume';
  }
}

function resetStopwatch() {
  isRunning = false;
  clearInterval(stopwatch);
  startTime = null;
  lapTimes = [];
  updateDisplay();
  document.querySelector('button:nth-of-type(1)').textContent = 'Start';
  document.getElementById('lapList').innerHTML = '';
}

function lapTime() {
  if (isRunning) {
    const lapTime = new Date().getTime() - startTime;
    lapTimes.push(lapTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = formatTime(lapTime);
    document.getElementById('lapList').appendChild(lapItem);
  }
}

function updateDisplay() {
  if (startTime !== null) {
    const elapsedTime = new Date().getTime() - startTime;
    document.querySelector('.display').textContent = formatTime(elapsedTime);
  }
}

function formatTime(time) {
  const minutes = Math.floor(time / (60 * 1000));
  const seconds = Math.floor((time % (60 * 1000)) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  const pad = (value) => (value < 10 ? '0' + value : value);

  return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}
