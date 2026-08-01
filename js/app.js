/* ==========================================================================
   Playwright-G Application Script — V2 Enhanced
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initAccordions();
  initCurriculumFilter();
  initAssessmentQuiz();
  initContactForm();
  initScrollReveal();
  initSmoothScroll();
  initActiveNavHighlight();
});

/* ── Navbar Scroll Effect & Mobile Menu ── */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-active');
      const icon = hamburger.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
        const icon = hamburger.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }
}

/* ── Smooth Scroll for Anchor Links ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ── Active Nav Link Highlight on Scroll ── */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a:not(.btn)');

  function updateActive() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const id = section.getAttribute('id');
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActive);
  updateActive();
}

/* ── Curriculum Accordion Toggle ── */
function initAccordions() {
  const moduleCards = document.querySelectorAll('.module-card');

  moduleCards.forEach(card => {
    const header = card.querySelector('.module-header');
    header.addEventListener('click', () => {
      card.classList.toggle('active');
    });
  });
}

/* ── Curriculum Category Filter ── */
function initCurriculumFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const moduleCards = document.querySelectorAll('.module-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      moduleCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ── Interactive QA Assessment Quiz ── */
const quizQuestions = [
  {
    question: "1. What is your current background in Software Testing?",
    options: [
      { text: "Manual Tester looking to transition into Automation", score: 3 },
      { text: "Experienced QA / Automation Engineer looking to master Playwright", score: 3 },
      { text: "Fresh Graduate / Student starting a QA career", score: 2 },
      { text: "Complete Beginner with basic computer knowledge", score: 2 }
    ]
  },
  {
    question: "2. What is your primary career goal in the next 3–6 months?",
    options: [
      { text: "Secure a high-paying QA Automation job", score: 3 },
      { text: "Build enterprise-level Playwright automation frameworks", score: 3 },
      { text: "Implement CI/CD & API Testing in my current workplace", score: 3 },
      { text: "Crack QA Automation interviews with confidence", score: 3 }
    ]
  },
  {
    question: "3. Do you have prior JavaScript or TypeScript experience?",
    options: [
      { text: "Yes, I write JS/TS code regularly", score: 3 },
      { text: "I know basic syntax and concepts", score: 2 },
      { text: "No coding experience, but willing to learn from scratch", score: 2 },
      { text: "I come from a non-coding background", score: 2 }
    ]
  }
];

let currentQuizIndex = 0;
let totalQuizScore = 0;

function initAssessmentQuiz() {
  const container = document.getElementById('quiz-container');
  if (!container) return;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const container = document.getElementById('quiz-container');
  const q = quizQuestions[currentQuizIndex];
  const progressPercent = ((currentQuizIndex + 1) / quizQuestions.length) * 100;

  if (currentQuizIndex >= quizQuestions.length) {
    container.innerHTML = `
      <div style="text-align: center; padding: 30px 0;">
        <div style="width: 80px; height: 80px; background: rgba(52, 211, 153, 0.12); border: 2px solid #34d399; color: #34d399; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.4rem; margin: 0 auto 24px;">
          <i class="fas fa-check"></i>
        </div>
        <h3 style="font-size: 1.8rem; margin-bottom: 14px;">🎉 You Are 100% Eligible!</h3>
        <p style="color: var(--text-muted); max-width: 550px; margin: 0 auto 28px; line-height: 1.7;">
          Based on your background and goals, this Playwright course is the <strong style="color: #fff;">perfect fit</strong> to make you a job-ready QA Automation Engineer!
        </p>
        <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
          <a href="#pricing" class="btn btn-primary"><i class="fas fa-rocket"></i> Enroll Now</a>
          <a href="#contact" class="btn btn-secondary"><i class="fas fa-calendar-alt"></i> Book Free Call</a>
        </div>
      </div>
    `;
    return;
  }

  const labels = ['A', 'B', 'C', 'D'];
  let optionsHtml = '';
  q.options.forEach((opt, idx) => {
    optionsHtml += `
      <div class="quiz-option" onclick="selectQuizOption(${opt.score})">
        <span style="
          display: inline-flex; align-items: center; justify-content: center;
          width: 30px; height: 30px; border-radius: 50%;
          background: rgba(0, 229, 255, 0.08); border: 1px solid rgba(0, 229, 255, 0.2);
          color: var(--accent-cyan); font-weight: 700; font-size: 0.8rem; flex-shrink: 0;
        ">${labels[idx]}</span>
        <span>${opt.text}</span>
      </div>
    `;
  });

  container.innerHTML = `
    <div class="quiz-progress">
      <div class="quiz-progress-bar" style="width: ${progressPercent}%;"></div>
    </div>
    <h3 class="quiz-question">${q.question}</h3>
    <div class="quiz-options">
      ${optionsHtml}
    </div>
    <div style="text-align: right; color: var(--text-dim); font-size: 0.82rem;">
      Question ${currentQuizIndex + 1} of ${quizQuestions.length}
    </div>
  `;
}

window.selectQuizOption = function(score) {
  totalQuizScore += score;
  currentQuizIndex++;
  renderQuizQuestion();
};

/* ── Contact Form Handler ── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-alert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value;
    const email = form.querySelector('[name="email"]').value;

    if (alertBox) {
      alertBox.style.display = 'block';
      alertBox.style.padding = '16px 20px';
      alertBox.style.borderRadius = '12px';
      alertBox.style.background = 'rgba(52, 211, 153, 0.08)';
      alertBox.style.border = '1px solid rgba(52, 211, 153, 0.3)';
      alertBox.style.color = '#34d399';
      alertBox.style.fontSize = '0.95rem';
      alertBox.innerHTML = `
        <i class="fas fa-check-circle"></i> Thank you, <strong>${name}</strong>! Your message has been sent. We'll reach out to <strong>${email}</strong> within 2 hours.
      `;
    }

    form.reset();
  });
}

/* ── Scroll Reveal (Intersection Observer) ── */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the reveal by index for cascading effect
        const delay = (entry.target.dataset.delay || 0) * 100;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  // Apply reveal to key elements
  const selectors = [
    '.glass-card',
    '.feature-card',
    '.module-card',
    '.testimonial-card',
    '.pricing-card',
    '.section-header',
    '.instructor-grid',
    '.video-container',
    '.quiz-card',
    '.metrics-bar',
    '.booking-box'
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, idx) => {
      el.classList.add('reveal');
      el.dataset.delay = idx % 6; // stagger within groups
      observer.observe(el);
    });
  });
}
