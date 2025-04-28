




// --- Weather
function showWeather() {
  const el = document.getElementById('weatherList');
  el.innerHTML = weatherList.map(w => `
    <div class="weather-card">
      <div class="weather-location">${w.location}</div>
      <div class="weather-data">${w.cond}</div>
      <div class="weather-temp">${w.temp}</div>
      <div class="weather-data">Snow: ${w.snow}</div>
      <div class="weather-data">Wind: ${w.wind}</div>
    </div>
  `).join('');
}

// --- Search functionality
function handleSearch() {
  const input = document.getElementById('locationInput').value.trim();
  const heroResult = document.getElementById('heroResult');
  if (!input) {
    heroResult.innerHTML = `<span style='color: #cb3a3a;'>Please enter a location!</span>`;
    return;
  }
  heroResult.innerHTML = `<span class="loader"></span> Searching resorts near <b>${input}</b>...`;
  setTimeout(() => {
    heroResult.innerHTML = `
      <b>Closest Resort:</b> <span style="color:#20589c">Brezovica Resort</span> <br>
      <b>Distance:</b> 30 km <br>
      <b>Snow Quality:</b> Good <br>
      <b>Weather:</b> Sunny, -3°C <br>
      <b>Lifts Open:</b> 5 <br>
      <b>Rating:</b> 4.5 ⭐ <br>
      <b>Cost:</b> €35 / day
    `;
  }, 1100);
}
function detectLocation() {
  const input = document.getElementById('locationInput');
  const heroResult = document.getElementById('heroResult');
  heroResult.innerHTML = `<span class="loader"></span> Detecting location...`;
  setTimeout(() => {
    input.value = "Prishtina, Kosovo";
    heroResult.innerHTML = "Location detected: <b>Prishtina, Kosovo</b>";
  }, 900);
}

// Loader spinner style
document.addEventListener("DOMContentLoaded", () => {
  showWeather();
  // Loader style
  const style = document.createElement('style');
  style.innerHTML = `
    .loader {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 3px solid #93badb;
      border-top: 3px solid #2f436e;
      border-radius: 50%;
      animation: spin 0.9s linear infinite;
      margin-bottom: -4px;
      margin-right: 7px;
      vertical-align: middle;
    }
    @keyframes spin {
      0% { transform: rotate(0deg);}
      100% { transform: rotate(360deg);}
    }
  `;
  document.head.appendChild(style);
  renderNewsCarousel();
});

/// Carousel statik me HTML

let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

function showSlide(idx) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === idx);
    slide.style.display = (i === idx) ? 'flex' : 'none';
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === idx);
  });
  slideIndex = idx;
}

// Inicializim: fsheh të tjerat, tregon vetëm të parën
showSlide(0);

// Butonat
prevBtn.addEventListener('click', () => {
  let idx = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(idx);
});
nextBtn.addEventListener('click', () => {
  let idx = (slideIndex + 1) % slides.length;
  showSlide(idx);
});

// Dot-at
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => showSlide(i));
});

// Opsionale: Auto-slide
setInterval(() => {
  let idx = (slideIndex + 1) % slides.length;
  showSlide(idx);
}, 6000);


// -------------- Newsletter JS --------------
function subscribeNewsletter(e){
  e.preventDefault();
  const email = document.getElementById('newsletterEmail').value;
  const msg = document.getElementById('newsletterMessage');
  if(!email.match(/^[^@]+@[^@]+\.[^@]+$/)){
    msg.style.color = "#eb4559";
    msg.innerText = "Please enter a valid email!";
    return;
  }
  msg.style.color = "#36c3ff";
  msg.innerText = "Thanks for subscribing!";
  document.getElementById('newsletterForm').reset();
  setTimeout(()=>{ msg.innerText=""; },2000);
}

// -------------- Back to Top --------------
window.onscroll = function() {
  document.getElementById('backToTopBtn').style.display = (window.scrollY > 280) ? 'flex' : 'none';
}
function scrollToTop(){
  window.scrollTo({top:0,behavior:'smooth'});
}
