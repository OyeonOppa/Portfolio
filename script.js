// Skills Progress Animation
const progressBars = document.querySelectorAll(".progress-bar");
const animateBars = () => {
  progressBars.forEach(bar => {
    const target = bar.getAttribute("data-width");
    const barTop = bar.getBoundingClientRect().top;
    if (barTop < window.innerHeight - 50 && bar.style.width === "0%") {
      bar.style.width = target + "%";
    }
  });
};
window.addEventListener("scroll", animateBars);
animateBars();

// Projects Filter
const filterBtns = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.getAttribute("data-filter");
    projectItems.forEach(item => {
      if(filter==="all"||item.getAttribute("data-category")===filter){
        item.style.display="block"; item.classList.remove("fade-out"); item.classList.add("fade-in");
      } else {
        item.classList.remove("fade-in"); item.classList.add("fade-out");
        setTimeout(()=>{item.style.display="none";},300);
      }
    });
  });
});

// Counters
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = Math.ceil(target / 200);
    if(count < target){ counter.innerText = count + increment; setTimeout(updateCount,20); } else { counter.innerText = target; }
  };
  const observer = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting){ updateCount(); observer.unobserve(counter); }
  }, { threshold: 1 });
  observer.observe(counter);
});

// เปิด tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})


// Back to Top
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => { backToTop.style.display = window.scrollY > 300 ? 'block':'none'; });
backToTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

