// Certifications data
const certs = [
  { title: "Programming in Python", org: "Coursera" },
  { title: "C Programming with DSA Foundation", org: "Coursera" },
  { title: "Advanced Java Development", org: "Coursera" },
  { title: "Create a Supermarket App using Java OOP", org: "Coursera" },
  { title: "Preparing for the AZ-900 Microsoft Azure Fundamentals Exam", org: "Coursera" },
  { title: "MongoDB Basics for Students – Skill Badge", org: "ICT Academy (Skill-a-thon 2026)" },
  { title: "Celonis Foundations", org: "Celonis Academy" },
  { title: "Get Data Into Celonis", org: "Celonis Academy" },
  { title: "Process Mining – From Theory to Execution", org: "Celonis Academy" },
  { title: "Build Action Flows", org: "Celonis Academy" },
  { title: "Process Mining Audit Professional", org: "Celonis Academy" },
  { title: "Process Automation Concepts", org: "Celonis Academy" },
  { title: "Digital Application Fundamentals (STEM)", org: "FutureSkills Prime (NASSCOM)" }
];

const list = document.getElementById("certs");

function groupOf(org) {
  return org === "Coursera" || org === "Celonis Academy" ? org : "Other";
}

function renderCerts(filter) {
  list.innerHTML = "";
  certs
    .filter(c => filter === "all" || groupOf(c.org) === filter)
    .forEach(c => {
      const li = document.createElement("li");
      const strong = document.createElement("strong");
      strong.textContent = c.title;
      const span = document.createElement("span");
      span.textContent = c.org;
      li.append(strong, span);
      list.appendChild(li);
    });
}
renderCerts("all");

document.querySelectorAll(".filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderCerts(btn.dataset.filter);
  });
});

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

// Highlight the current section in the nav
const links = [...nav.querySelectorAll("a")];
const sections = links.map(a => document.querySelector(a.getAttribute("href")));
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });
sections.forEach(s => s && spy.observe(s));

// Animate skill bars once when they scroll into view
const skills = document.querySelector(".skills");
new IntersectionObserver((entries, obs) => {
  if (entries[0].isIntersecting) { skills.classList.add("in"); obs.disconnect(); }
}, { threshold: 0.3 }).observe(skills);

// Typing effect for the greeting (skipped if reduced motion is on)
const typed = document.getElementById("typed");
const text = "Hi, I'm";
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  typed.textContent = "";
  let i = 0;
  const t = setInterval(() => {
    typed.textContent = text.slice(0, ++i);
    if (i === text.length) clearInterval(t);
  }, 90);
}

// Contact form opens the visitor's email app
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const err = document.getElementById("formError");
  if (!name || !email || !message) { err.textContent = "Please fill in your name, email and message."; return; }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { err.textContent = "Please enter a valid email address."; return; }
  err.textContent = "";
  const subject = encodeURIComponent("Portfolio message from " + name);
  const body = encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")");
  window.location.href = "mailto:kanishkamohanraj31@gmail.com?subject=" + subject + "&body=" + body;
});

document.getElementById("year").textContent = new Date().getFullYear();
