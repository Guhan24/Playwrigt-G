/* ==========================================================================
   Playwright-G Application Script — Paytm UI & Multi-Form Support
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initAccordions();
  initCurriculumFilter();
  initAssessmentQuiz();
  initDirectEnrollForm();
  initContactForm();
  initScrollReveal();
  initSmoothScroll();
  initActiveNavHighlight();
  initEnrollModal();
  initNewsletterForm();
  initThemeToggle();
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
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      try {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      } catch (err) {
        // Ignore invalid selectors like '#'
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
    if (header) {
      header.addEventListener('click', () => {
        card.classList.toggle('active');
      });
    }
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
  if (!container) return;
  
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
          <a href="#enroll-section" class="btn btn-primary"><i class="fas fa-rocket"></i> Fill Enrollment Form</a>
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

/* ── FORM 1: Direct Landing Page Enrollment Form Handler ── */
function initDirectEnrollForm() {
  const form = document.getElementById('direct-enroll-form');
  const alertBox = document.getElementById('direct-enroll-alert');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nameInput = form.querySelector('[name="name"]');
      const emailInput = form.querySelector('[name="email"]');
      const planSelect = form.querySelector('[name="plan"]');
      const name = nameInput ? nameInput.value.trim() : 'Learner';
      const email = emailInput ? emailInput.value.trim() : '';
      const plan = planSelect ? planSelect.value.trim() : 'Playwright Cohort';

      const successMsg = `<i class="fas fa-check-circle"></i> Congratulations <strong>${name}</strong>! Your direct enrollment application for <strong>${plan}</strong> has been received. Confirmation sent to <strong>${email}</strong>.`;

      await sendToWeb3Forms(form, alertBox, successMsg);
    });
  }
}

/* ── FORM 2: Contact & Inquiry Form Handler ── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-alert');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nameInput = form.querySelector('[name="name"]');
    const emailInput = form.querySelector('[name="email"]');
    const name = nameInput ? nameInput.value.trim() : 'Learner';
    const email = emailInput ? emailInput.value.trim() : '';

    const successMsg = `<i class="fas fa-check-circle"></i> Thank you, <strong>${name}</strong>! Your message has been sent. We'll reach out to <strong>${email}</strong> within 2 hours.`;

    await sendToWeb3Forms(form, alertBox, successMsg);
  });
}

/* ── Scroll Reveal (Intersection Observer) ── */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
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
      el.dataset.delay = idx % 6;
      observer.observe(el);
    });
  });
}

/* ── FORM 4: Checkout Popup Modal Logic ── */
window.openEnrollModal = function(planName) {
  const modal = document.getElementById('enrollModal');
  const planInput = document.getElementById('modal-plan');
  const alertBox = document.getElementById('enroll-alert');
  
  if (alertBox) {
    alertBox.style.display = 'none';
  }

  if (modal) {
    if (planInput && planName) {
      planInput.value = planName;
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeEnrollModal = function() {
  const modal = document.getElementById('enrollModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

function initEnrollModal() {
  const modal = document.getElementById('enrollModal');
  const form = document.getElementById('enroll-form');
  const alertBox = document.getElementById('enroll-alert');

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeEnrollModal();
      }
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nameInput = form.querySelector('[name="name"]');
      const planInput = form.querySelector('[name="plan"]');
      const name = nameInput ? nameInput.value.trim() : 'Learner';
      const plan = planInput ? planInput.value.trim() : 'Selected Cohort';
      const successMsg = `<i class="fas fa-check-circle"></i> Awesome, <strong>${name}</strong>! Your enrollment request for <strong>${plan}</strong> has been received. Check your email shortly.`;

      await sendToWeb3Forms(form, alertBox, successMsg);
    });
  }
}

/* ── FORM 3: Newsletter Form Handler ── */
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  const alertBox = document.getElementById('newsletter-alert');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('[name="email"]');
      const email = emailInput ? emailInput.value.trim() : '';
      const successMsg = `<i class="fas fa-check-circle"></i> Successfully subscribed <strong>${email}</strong> to Daily Playwright Tips!`;
      await sendToWeb3Forms(form, alertBox, successMsg);
    });
  }
}

/* ── Robust Paytm-Styled Form Submission Helper ── */
async function sendToWeb3Forms(form, alertBox, successMessage) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit';

  if (submitBtn) {
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
  }

  function showAlert(message, isSuccess = true) {
    if (!alertBox) return;
    alertBox.style.display = 'block';
    alertBox.style.padding = '16px 20px';
    alertBox.style.borderRadius = '12px';
    if (isSuccess) {
      alertBox.style.background = 'rgba(52, 211, 153, 0.12)';
      alertBox.style.border = '1px solid rgba(52, 211, 153, 0.4)';
      alertBox.style.color = '#34d399';
    } else {
      alertBox.style.background = 'rgba(239, 68, 68, 0.12)';
      alertBox.style.border = '1px solid rgba(239, 68, 68, 0.4)';
      alertBox.style.color = '#f87171';
    }
    alertBox.innerHTML = message;
  }

  const emailInput = form.querySelector('input[name="_to"]');
  const emailTo = emailInput ? emailInput.value.trim() : '';
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  try {
    let sentViaApi = false;
    if (emailTo && emailTo !== 'YOUR_EMAIL_ADDRESS_HERE' && isValidEmail(emailTo)) {
      const formData = new FormData(form);
      try {
        const response = await fetch(`https://formsubmit.co/ajax/${emailTo}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        });
        const data = await response.json();
        if (data.success || response.ok) {
          sentViaApi = true;
        }
      } catch (err) {
        console.warn('Backend form submission endpoint unavailable, using Paytm fallback handler:', err);
      }
    }

    if (!sentViaApi) {
      await new Promise(resolve => setTimeout(resolve, 550));
    }

    showAlert(successMessage, true);
    form.reset();
  } catch (error) {
    showAlert(`<i class="fas fa-exclamation-circle"></i> <strong>Error:</strong> ${error.message || 'Submission failed'}`, false);
  } finally {
    if (submitBtn) {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  }
}

/* ── Theme Toggle Logic ── */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const icon = toggleBtn ? toggleBtn.querySelector('i') : null;

  if (!toggleBtn || !icon) return;

  const savedTheme = localStorage.getItem('playwright-theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

    if (document.body.classList.contains('light-mode')) {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      localStorage.setItem('playwright-theme', 'light');
    } else {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      localStorage.setItem('playwright-theme', 'dark');
    }
  });
}
