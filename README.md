
# 🛡️ Life Insurance Recommendation MVP

A full-stack app that recommends life insurance plans based on age, income, dependents, and risk profile. Built using **Next.js**, **Express**, and **PostgreSQL**, and deployed on **Vercel (frontend)** and **Render (backend + DB)**.

---

## 🧰 Tech Stack

- **Frontend:** Next.js (TypeScript) → Vercel
- **Backend:** Node.js + Express → Render
- **Database:** PostgreSQL (Render)

---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/Ashishkr05/Life-insurance-mvp.git
````

### 2. Install dependencies

**Frontend**

```bash
cd frontend
npm install
```

**Backend**

```bash
cd ../backend
npm install
```

### 3. Environment Variables (`backend/.env`)

```env
DB_USER=******
DB_HOST=************
DB_NAME=******
DB_PASSWORD=************
DB_PORT=5432
PORT=4000
```

## 🧪 Local Development

**Backend**

```bash
cd backend
npm start
```

**Frontend**

```bash
cd frontend
npm run dev
```

App runs on [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deployment

### ✅ Frontend (Vercel)

* Repo: [https://github.com/Ashishkr05/Life-insurance-mvp](https://github.com/Ashishkr05/Life-insurance-mvp)
* Framework: Next.js
* No env vars needed if backend URL is hardcoded
* Production URL: [https://life-insurance-mvp.vercel.app](https://life-insurance-mvp.vercel.app)

### ✅ Backend (Render)

* Build: `npm install`
* Start: `node index.js`
* Environment: Node.js
* Public URL: [https://life-insurance-mvp-backend.onrender.com](https://life-insurance-mvp-backend.onrender.com)

---

