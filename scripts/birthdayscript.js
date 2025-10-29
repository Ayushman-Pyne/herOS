// Birthday Card

document.addEventListener('DOMContentLoaded', function() {
  
  const envelope = document.querySelector('.envelope');
  
  if (envelope && !envelope.classList.contains('open')) {
    envelope.addEventListener('click', function() {
      this.classList.remove('new');
      this.classList.add('open');
    });
  }
  
});

// Birthday Card End

// Count Down timer

const seconds = document.getElementById("seconds");
const minutes = document.getElementById("minutes");
const hours = document.getElementById("hours");
const days = document.getElementById("days");

function getNextBirthday() {
  const today = new Date();
  const currentYear = today.getFullYear();
  let birthday = new Date(currentYear, 10, 3); // November 3rd (month is 0-indexed)
  
  // If birthday has passed this year, set it to next year
  if (today > birthday) {
    birthday = new Date(currentYear + 1, 10, 1);
  }
  
  return birthday;
}

function updateClock() {
  const today = new Date();
  const deadline = getNextBirthday();
  const diff = deadline - today;
  
  if (diff <= 0) {
    clearInterval(interval);
    days.innerText = "00";
    hours.innerText = "00";
    minutes.innerText = "00";
    seconds.innerText = "00";
  } else {
    const sec = Math.floor((diff / 1000) % 60);
    const min = Math.floor((diff / 1000 / 60) % 60);
    const hrs = Math.floor((diff / 1000 / 60 / 60) % 24);
    const dys = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    days.innerText = String(dys).padStart(2, "0");
    hours.innerText = String(hrs).padStart(2, "0");
    minutes.innerText = String(min).padStart(2, "0");
    seconds.innerText = String(sec).padStart(2, "0");
  }
}

// Call immediately to avoid 1-second delay on page load
updateClock();
const interval = setInterval(updateClock, 1000);

// Countdown Timer End