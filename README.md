# 🎭 Playwright-G — Coaching & Learning Website

A high-converting, modern single-page website for **Playwright Automation Testing with QA — Complete Job-Ready Course**.

Built with pure **HTML5, CSS3, and JavaScript** (No heavy frameworks or build steps required). Ready to host **100% FREE** on **GitHub Pages**.

---

## ✨ Features Included

- **🎭 Brand & Theme**: Sleek Dark Tech Aesthetic with Electric Cyan & Indigo accents.
- **📚 Interactive Curriculum**: 35+ topics organized into 8 expandable modules with category filtering.
- **🎥 Video Lesson Preview**: Embedded YouTube video player for sample lessons.
- **📊 Interactive Assessment Quiz**: Built-in 3-question eligibility check with instant score modal.
- **👨‍🏫 Instructor Section**: Professional bio, profile photo, and skill tags.
- **⭐ Student Reviews**: Glowing reviews from Rahul S., Priya K., Mohammed A., Sneha R., Arjun P., and Neha T.
- **💰 3-Tier Pricing**: Self-Paced, Live Cohort + Placement, and 1-on-1 Mentorship plans.
- **📬 Functional Contact Form**: Web3Forms ready with email delivery.
- **📅 Session Booking**: Cal.com integration point for 1-on-1 discovery calls.
- **📱 Fully Responsive**: Optimized for Mobile, Tablet, and Desktop.

---

## 🚀 How to Host for FREE on GitHub Pages (Step-by-Step)

### Step 1: Create a GitHub Repository
1. Log into your [GitHub account](https://github.com).
2. Click **New Repository**.
3. Name it `playwright-g` (or `<your-username>.github.io` if you want it on your main root URL).
4. Set visibility to **Public** (required for free GitHub Pages).
5. Click **Create repository**.

### Step 2: Upload Project Files
Push the files using Git command line or upload them directly via GitHub Web UI:

```bash
git init
git add .
git commit -m "Initial commit - Playwright-G Website"
git branch -M main
git remote add origin https://github.com/<your-username>/playwright-g.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository settings: **Settings > Pages** (under Code and Automation).
2. Under **Build and Deployment > Source**, select **Deploy from a branch**.
3. Under **Branch**, select `main` branch and `/ (root)` folder.
4. Click **Save**.
5. Wait 1–2 minutes! Your site will be live at:
   `https://<your-username>.github.io/playwright-g/`

---

## 🔌 Connecting Free Third-Party Integrations

### 1. Contact Form (Web3Forms - Free 250 submissions/mo)
1. Go to [Web3Forms.com](https://web3forms.com) and enter your email to get a free Access Key.
2. Open `index.html` and replace `YOUR_WEB3FORMS_ACCESS_KEY_HERE` with your key:
   ```html
   <input type="hidden" name="access_key" value="your-access-key-here">
   ```

### 2. Live Session Booking (Cal.com / Calendly - Free)
1. Sign up on [Cal.com](https://cal.com) (Unlimited event types for free).
2. Create a "15-Minute Discovery Call" event.
3. Replace the booking link in `index.html` with your Cal.com link (e.g., `https://cal.com/your-username/15min`).

### 3. YouTube Sample Video
1. Upload your course intro video to YouTube.
2. Update the `src` attribute in `index.html` video `<iframe>` with your YouTube video ID:
   ```html
   <iframe src="https://www.youtube-nocookie.com/embed/YOUR_VIDEO_ID" ...></iframe>
   ```

---

## 📂 Project Structure

```
playwright-g/
├── index.html          # Main HTML structure with all 11 sections
├── css/
│   └── styles.css      # CSS variables, glassmorphism, animations, media queries
├── js/
│   └── app.js          # Navbar scroll, curriculum filter, accordion, quiz, form
└── README.md           # Deployment & integration guide
```
