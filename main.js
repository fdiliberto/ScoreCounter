const minutesAndSecondsLimit = 59;
const hoursLimit = 99;
const zero = 0;

let intervalId;

function startTimer() {
  if (!intervalId) {
    intervalId = setInterval(increment, 1000);
  }
}

function pauseTimer() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function stopTimer(resetPoints) {
  pauseTimer();
  initialValues(resetPoints);
}

function increment() {
  const hourElement = getHoursElement();
  const minutesElement = getMinutesElement();
  const secondsElement = getSecondsElement();

  let hours = parseInt(hourElement.textContent);
  let minutes = parseInt(minutesElement.textContent);
  let seconds = parseInt(secondsElement.textContent);

  if (seconds < minutesAndSecondsLimit) {
    adaptContent(secondsElement, parseInt(seconds) + 1);
  } else if (seconds === minutesAndSecondsLimit) {
    adaptContent(secondsElement, zero);
    if (minutes < minutesAndSecondsLimit) {
      adaptContent(minutesElement, parseInt(minutes) + 1);
    } else if (minutes === minutesAndSecondsLimit) {
      adaptContent(minutesElement, zero);
      if (hours < hoursLimit) {
        adaptContent(hourElement, parseInt(hours) + 1);
      } else {
        stopTimer();
      }
    }
  }
}

function getHoursElement() {
  return document.getElementById("hours");
}

function getMinutesElement() {
  return document.getElementById("minutes");
}

function getSecondsElement() {
  return document.getElementById("seconds");
}

function adaptContent(element, result) {
  if (result.toString().length === 1) {
    element.textContent = "0" + result;
  } else {
    element.textContent = result;
  }
}

function addPoints(team, total) {
  const selector = team + "-point";
  let current = document.getElementById(selector).textContent;
  document.getElementById(selector).textContent = parseInt(current) + total;
  checkPoints();
}

function checkPoints() {
  const guestPointsElement = document.getElementById("guests-point");
  const homePointsElement = document.getElementById("home-point");

  const guestPoints = parseInt(guestPointsElement.textContent);
  const homePoints = parseInt(homePointsElement.textContent);

  if (homePoints > guestPoints) {
    guestPointsElement.style.color = "red";
    homePointsElement.style.color = "green";
  } else if (guestPoints > homePoints) {
    guestPointsElement.style.color = "green";
    homePointsElement.style.color = "red";
  } else {
    guestPointsElement.style.color = "black";
    homePointsElement.style.color = "black";
  }
}

function initialValues(resetPoints) {
  getHoursElement().textContent = "00";
  getMinutesElement().textContent = "00";
  getSecondsElement().textContent = "00";

  if (resetPoints) {
    document.getElementById("guests-point").textContent = "0";
    document.getElementById("home-point").textContent = "0";
  }
}
