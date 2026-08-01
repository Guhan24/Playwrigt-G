/* ==========================================================================
   Playwright-G Application Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initAccordions();
  initCurriculumFilter();
  initAssessmentQuiz();
  initContactForm();
  initScrollAnimations();
});

/* Navbar Scroll Effect & Mobile Menu */
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

    // Close menu when clicking a link
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

/* Curriculum Accordion Toggle */
function initAccordions() {
  const moduleCards = document.querySelectorAll('.module-card');

  moduleCards.forEach(card => {
    const header = card.querySelector('.module-header');
    header.addEventListener('click', () => {
      const isActive = card.classList.contains('active');
      
      // Optionally close other modules
      // moduleCards.forEach(c => c.classList.remove('active'));

      if (!isActive) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  });
}

/* Curriculum Category Filter */
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
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* Interactive QA Assessment Quiz */
const quizQuestions = [
  {
    question: "1. What is your current background in Software Testing?",
    options: [
      { text: "A. Manual Tester looking to transition into Automation", score: 3 },
      { text: "B. Experienced QA / Automation Engineer looking to master Playwright", score: 3 },
      { text: "C. Fresh Graduate / Student starting a QA career", score: 2 },
      { text: "D. Complete Beginner with basic computer knowledge", score: 2 }
    ]
  },
  {
    question: "2. What is your primary career goal in the next 3 to 6 months?",
    options: [
      { text: "A. Secure a high-paying QA Automation job", score: 3 },
      { text: "B. Build enterprise-level Playwright automation frameworks", score: 3 },
      { text: "C. Implement CI/CD & API Testing in my current workplace", score: 3 },
      { text: "D. Crack QA Automation interviews with confidence", score: 3 }
    ]
  },
  {
    question: "3. Do you have prior JavaScript or TypeScript coding experience?",
    options: [
      { text: "A. Yes, I write JS/TS code regularly", score: 3 },
      { text: "B. I know basic syntax and concepts", score: 2 },
      { text: "C. No coding experience, but willing to learn from scratch", score: 2 },
      { text: "D. I come from a non-coding background", score: 2 }
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
    // Show Final Readiness Result
    container.innerHTML = `
      <div style="text-align: center; padding: 20px 0;">
        <div style="width: 70px; height: 70px; background: rgba(16, 185, 129, 0.15); border: 2px solid #10b981; color: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; margin: 0 auto 20px;">
          <i class="fas fa-check"></i>
        </div>
        <h3 style="font-size: 1.8rem; margin-bottom: 12px;">🎉 You Are 100% Eligible!</h3>
        <p style="color: var(--text-muted); max-width: 550px; margin: 0 auto 24px;">
          Based on your background and goals, this Playwright course is the <strong>perfect fit</strong> to make you a job-ready QA Automation Engineer!
        </p>
        <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
          <a href="#pricing" class="btn btn-primary"><i class="fas fa-rocket"></i> Enroll Now & Save 30%</a>
          <a href="#contact" class="btn btn-secondary"><i class="fas fa-calendar-alt"></i> Book Free Discovery Call</a>
        </div>
      </div>
    `;
    return;
  }

  let optionsHtml = '';
  q.options.forEach((opt, idx) => {
    optionsHtml += `
      <div class="quiz-option" onclick="selectQuizOption(${opt.score})">
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
    <div style="text-align: right; color: var(--text-dim); font-size: 0.85rem;">
      Question ${currentQuizIndex + 1} of ${quizQuestions.length}
    </div>
  `;
}

window.selectQuizOption = function(score) {
  totalQuizScore += score;
  currentQuizIndex++;
  renderQuizQuestion();
};

/* Contact Form Handler */
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
      alertBox.className = 'glass-card';
      alertBox.style.borderColor = '#10b981';
      alertBox.style.color = '#10b981';
      alertBox.innerHTML = `
        <i class="fas fa-check-circle"></i> Thank you, <strong>${name}</strong>! Your message has been sent successfully. Our team will reach out to <strong>${email}</strong> within 2 hours.
      `;
    }

    form.reset();
  });
}

/* Scroll Triggered Animations */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.glass-card, .feature-card, .module-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}
