# Deployment Progress

## Purpose

Track deployment steps for Vercel (frontend) + Render (backend + PostgreSQL).

---

## Phase 1: Pre-deployment Preparations

- [x] **1.1** Add `psycopg2-binary` to `requirements.txt`
- [x] **1.2** Configure Django CORS to allow Vercel domain
- [x] **1.3** Set `DEBUG=False` in production settings
- [x] **1.4** Add `ALLOWED_HOSTS` environment variable support
- [x] **1.5** Create `.env` file locally for testing (do not commit)
- [x] **1.6** Run `npm run build` locally to verify frontend builds
- [x] **1.7** Commit and push all changes to GitHub

---

## Phase 2: Backend Deployment on Render

### 2.1 Create PostgreSQL Database

- [x] **2.1.1** Create Render account and connect GitHub
- [x] **2.1.2** Create new PostgreSQL service
- [x] **2.1.3** Note the `Internal Database URL`

### 2.2 Deploy Django API

- [x] **2.2.1** Create new Web Service on Render
- [x] **2.2.2** Connect to GitHub repository
- [x] **2.2.3** Configure Root Directory (leave empty for monorepo)
- [x] **2.2.4** Set Build Command: `pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput`
- [x] **2.2.5** Set Start Command: `gunicorn dance_backend.wsgi:application`
- [x] **2.2.6** Add Environment Variables:
  - `DATABASE_URL` (from PostgreSQL)
  - `SECRET_KEY` (generate with `python -c "import secrets; print(secrets.token_urlsafe(50))"`)
  - `ALLOWED_HOSTS` (your-render-app.onrender.com)
  - `CORS_ALLOWED_ORIGINS` (your-vercel-app.vercel.app)
  - `DEBUG` = `False`
- [x] **2.2.7** Deploy and wait for build completion

### 2.3 Verify Backend

- [x] **2.3.1** Visit `https://dance-project.onrender.com/api/pages/`
- [x] **2.3.2** Verify JSON response is returned
- [x] **2.3.3** Note the backend URL for frontend configuration

---

## Phase 3: Frontend Deployment on Vercel

### 3.1 Connect and Configure

- [x] **3.1.1** Go to Vercel and import project from GitHub
- [x] **3.1.2** Set Root Directory to `dance_frontend/`
- [x] **3.1.3** Configure:
  - Framework Preset: Vite
  - Build Command: `npm run build`
  - Output Directory: `dist`
- [x] **3.1.4** Add Environment Variable:
  - `VITE_API_BASE_URL` = `https://dance-project.onrender.com`
- [x] **3.1.5** Deploy

### 3.2 Verify Frontend

- [x] **3.2.1** Visit `https://dance-project-8c8rm102n-nikos-stavrous-projects.vercel.app`
- [x] **3.2.2** Verify homepage loads correctly
- [x] **3.2.3** Test navigation to Classes, News, Pages
- [x] **3.2.4** Verify API data loads (check browser DevTools)

---

## Phase 4: Production Verification

- [x] **4.1** Test all pages load without errors
- [x] **4.2** Verify images render correctly
- [x] **4.3** Test responsive design on mobile
- [x] **4.4** Check browser console for errors
- [x] **4.5** Verify all API endpoints return data

---

## Deployment Complete

- [x] Backend URL: https://dance-project.onrender.com
- [x] Frontend URL: https://dance-project-8c8rm102n-nikos-stavrous-projects.vercel.app
- [x] Date completed: February 17, 2026
