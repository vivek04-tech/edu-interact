# Edu-Interact: Quick Start Guide

## 1. Setup (5 minutes)

### Clone & Install
```bash
npm install
```

### Configure Environment
Create `.env.local`:
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/edu-interact
JWT_SECRET=your-random-secret-key-here
NODE_ENV=development
```

### Run
```bash
npm run dev
# Visit http://localhost:3000
```

---

## 2. Test API (Using cURL)

### Create Student Account
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice", "email": "alice@test.com", "password": "pass123",
    "role": "student", "university": "aktu"
  }'
```

### Create Teacher Account
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Prof. Smith", "email": "prof@test.com", "password": "pass123",
    "role": "teacher"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@test.com", "password": "pass123"
  }'
```

### Get Courses
```bash
curl http://localhost:3000/api/courses?university=aktu&approved=true
```

### Teacher: Create Course
```bash
curl -X POST http://localhost:3000/api/teacher/courses \
  -H "Content-Type: application/json" \
  -d '{
    "title": "React Advanced", "description": "Master React",
    "university": "aktu", "price": 2999, "trialDays": 7
  }'
```

### Student: Enroll in Course
```bash
curl -X POST http://localhost:3000/api/enrollments \
  -H "Content-Type: application/json" \
  -d '{
    "courseId": "COURSE_ID_HERE"
  }'
```

---

## 3. Database Models

### User
```javascript
{
  name, email, password (hashed), role, university, isApproved, createdAt
}
```

### Course
```javascript
{
  title, description, university, teacherId, price, trialDays,
  lectureCount, isApproved, createdAt
}
```

### Enrollment
```javascript
{
  userId, courseId, trialStartDate, trialEndDate, isPaid, progress, status
}
```

### Company
```javascript
{
  name, description, logo, website, createdAt
}
```

### Opportunity
```javascript
{
  type, title, description, companyId, university, stipend, duration,
  applicationDeadline, status, createdAt
}
```

---

## 4. API Endpoints (16 Total)

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | /api/auth/signup | ❌ | Register user |
| POST | /api/auth/login | ❌ | Login user |
| POST | /api/auth/logout | ✅ | Logout user |
| GET | /api/courses | ❌ | Get courses |
| POST | /api/enrollments | ✅ | Enroll in course |
| GET | /api/enrollments | ✅ | Get enrollments |
| GET | /api/opportunities | ❌ | Get opportunities |
| POST | /api/teacher/courses | ✅🧑‍🏫 | Create course |
| GET | /api/teacher/courses | ✅🧑‍🏫 | Get my courses |
| GET | /api/admin/users | ✅🧑‍💼 | Get all users |
| PUT | /api/admin/approve | ✅🧑‍💼 | Approve user/course |
| GET | /api/admin/courses | ✅🧑‍💼 | Get all courses |
| POST | /api/admin/companies | ✅🧑‍💼 | Create company |
| GET | /api/admin/companies | ✅🧑‍💼 | Get companies |
| POST | /api/admin/opportunities | ✅🧑‍💼 | Create opportunity |
| GET | /api/admin/opportunities | ✅🧑‍💼 | Get opportunities |

Legend: ✅ = Auth required, 🧑‍🏫 = Teacher only, 🧑‍💼 = Admin only

---

## 5. Key Files

| File | Purpose |
|------|---------|
| `/app/page.tsx` | Home landing page |
| `/app/login/page.tsx` | Login & role selection |
| `/app/api/auth/*` | Authentication endpoints |
| `/lib/models/User.ts` | User schema & validation |
| `/lib/db.ts` | MongoDB connection |
| `/lib/jwt.ts` | JWT utilities |
| `API_DOCUMENTATION.md` | Full API spec |
| `BACKEND_SETUP.md` | Deployment guide |

---

## 6. Common Tasks

### Add New User Type
Edit `/lib/models/User.ts` and update role enum

### Create New API
1. Create file: `/app/api/endpoint/route.ts`
2. Import `connectDB` and models
3. Add auth check with `getAuthFromRequest`
4. Implement GET/POST logic

### Query Database
```typescript
import connectDB from '@/lib/db';
import User from '@/lib/models/User';

await connectDB();
const users = await User.find({ role: 'teacher' }).select('-password');
```

### Check Authentication
```typescript
import { getAuthFromRequest } from '@/lib/middleware';

const auth = await getAuthFromRequest(request);
if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
```

---

## 7. Environment Variables

| Variable | Required | Example |
|----------|----------|---------|
| `MONGODB_URI` | Yes | `mongodb+srv://...` |
| `JWT_SECRET` | Yes | `abc123...` |
| `NODE_ENV` | No | `development` or `production` |

---

## 8. Deployment

### To Vercel
```bash
vercel --prod
```

### Set Environment Variables
In Vercel Dashboard:
- Settings > Environment Variables
- Add `MONGODB_URI` and `JWT_SECRET`

---

## 9. Debugging

### Check Logs
```bash
npm run dev  # Shows all logs
```

### Test with Postman
1. Create collection
2. Add requests with body
3. Set Authorization header if needed
4. Send request

### Database Issues
- Ensure MongoDB is running
- Check connection string
- Verify IP whitelist (MongoDB Atlas)

---

## 10. Next Steps

1. **Frontend**: Connect UI to API
2. **Payment**: Add Stripe integration
3. **Email**: Setup email notifications
4. **Admin Dashboard**: Build admin UI
5. **Analytics**: Add metrics tracking

---

## Documentation Links

- **Full API Spec**: See `API_DOCUMENTATION.md`
- **Setup Guide**: See `BACKEND_SETUP.md`
- **UI System**: See `ARCHITECTURE.md`
- **Complete Summary**: See `COMPLETE_BUILD_SUMMARY.md`

---

## Support

- Check `API_DOCUMENTATION.md` for endpoint details
- See `BACKEND_SETUP.md` for environment setup
- Review error messages in API responses
- Check browser console for client errors

---

**Time to Production: ~1 day to integrate frontend + payment + email**

Edu-Interact is ready. Let's build. 🚀
