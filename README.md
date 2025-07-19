# 🎬 Nextflix-Web-Appliation

Nextflix-Web-Appliation แบบ Fullstack ด้วย **Next.js (App Router)** สำหรับ Frontend และ **NestJS** สำหรับ Backend API Gateway โดยใช้ **TMDB API** สำหรับข้อมูลภาพยนตร์ พร้อม UI ที่คล้าย Netflix จริง

---

## 🔧 Tech Stack

| Layer       | Technology                                     |
| ----------- | ---------------------------------------------- |
| Frontend    | Next.js 14+ (App Router)                       |
| Styling     | Tailwind CSS 4                                 |
| Backend     | NestJS                                         |
| API         | TMDB API                                       |
| Video Embed | YouTube (ผ่าน iframe)                      |
| Deployment  | GitHub (ต่อไป: Vercel / Render / Railway) |

---

## 📁 โครงสร้างโปรเจกต์

```
/frontend       ← Next.js Frontend
/backend        ← NestJS Backend (API Gateway)
```

---

## ⚙ วิธีใช้งาน

### 1. Clone Repo

```bash
git clone https://github.com/framenuttapong/Nextflix-Web-Appliation.git
cd Nextflix-Web-Appliation
```

### 2. ตั้งค่า `.env`

#### 📦 ใน `/backend/.env`:

```
MOVIE_API_KEY=your_tmdb_api_key
```

#### 🌐 ใน `/frontend/.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

### 3. ติดตั้ง Dependency

```bash
# ติดตั้ง backend
cd backend
npm install

# ติดตั้ง frontend
cd ../frontend
npm install
```

### 4. Run Dev Mode

```bash
# รัน Backend
cd backend
npm run start:dev

# รัน Frontend
cd ../frontend
npm run dev
```

---

## 📺 ฟีเจอร์ปัจจุบัน

- Click -> [Nextflix-Web-Application](https://nextflix-web-appliation-iota.vercel.app/)
- ✅ หน้า Home + Billboard video (Auto-play)
- ✅ ดึงข้อมูลภาพยนตร์จาก TMDB ผ่าน Backend
- ✅ แสดงวิดีโอผ่าน YouTube embed
- ✅ UI คล้าย Netflix: Navbar, เมนู, responsive design
- 🚫 ไม่มีระบบ login/signup

---

## 🧑‍💻 ผู้พัฒนา

- Nuttapong Nadee
