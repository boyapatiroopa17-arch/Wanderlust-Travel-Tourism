document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  menu.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", open);
    menu.textContent = open ? "✕" : "☰";
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
      menu.textContent = "☰";
    });
  });

  const filters = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".package-card");
  filters.forEach(button => {
    button.addEventListener("click", () => {
      filters.forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;
      cards.forEach(card => {
        card.style.display = filter === "all" || card.dataset.category === filter ? "" : "none";
      });
    });
  });

  const quotes = document.querySelectorAll(".quote");
  const dots = document.querySelectorAll(".dot");
  let current = 0;

  function showQuote(index) {
    current = (index + quotes.length) % quotes.length;
    quotes.forEach((q, i) => q.classList.toggle("active", i === current));
    dots.forEach((d, i) => d.classList.toggle("active", i === current));
  }
  document.querySelector(".next").addEventListener("click", () => showQuote(current + 1));
  document.querySelector(".prev").addEventListener("click", () => showQuote(current - 1));
  dots.forEach((dot, i) => dot.addEventListener("click", () => showQuote(i)));
  setInterval(() => showQuote(current + 1), 7000);

  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  const toast = document.getElementById("toast");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    if (!name) return;
    formMessage.textContent = `Thanks, ${name}! We'll get back to you soon.`;
    toast.classList.add("show");
    form.reset();
    setTimeout(() => toast.classList.remove("show"), 3500);
  });

  const topBtn = document.querySelector(".top-btn");
  window.addEventListener("scroll", () => {
    topBtn.classList.toggle("show", window.scrollY > 500);
  });
  topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  document.querySelectorAll(".destination-card").forEach(card => {
    card.addEventListener("click", () => {
      const place = card.dataset.place;
      toast.textContent = `${place} selected — explore packages below!`;
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2500);
      document.querySelector("#packages").scrollIntoView({ behavior: "smooth" });
    });
  });
});