# Backend Setup Guide - Edu-Interact

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- MongoDB instance (local or cloud)
- Git

---

## Environment Configuration

### 1. Create `.env.local` file

Create a `.env.local` file in the project root with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/edu-interact

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Node Environment
NODE_ENV=development
```

### 2. MongoDB Setup

#### Option A: MongoDB Atlas (Cloud - Recommended for Production)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new project and cluster
4. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
5. Replace `<username>`, `<password>`, and `<dbname>` in your `MONGODB_URI`

Example:
```
mongodb+srv://admin:MyPassword123@cluster0.abc123.mongodb.net/edu-interact?retryWrites=true&w=majority
```

#### Option B: MongoDB Community (Local Development)

1. Download and install MongoDB Community Edition
2. Start MongoDB service:
   - **macOS**: `brew services start mongodb-community`
   - **Windows**: MongoDB should auto-start
   - **Linux**: `sudo systemctl start mongod`
3. Use local connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/edu-interact
   ```

### 3. JWT Secret Generation

Generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Replace `JWT_SECRET` value with the generated string.

---

## Installation & Running

### 1. Install Dependencies

```bash
npm install
```

This will install:
- Next.js 16 and React 19
- MongoDB and Mongoose
- bcrypt for password hashing
- jsonwebtoken for JWT handling
- All UI components (Radix UI, Tailwind, shadcn)

### 2. Run Development Server

```bash
npm run dev
```

Server runs on `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
npm start
```

---

## Database Models

### User Model
```typescript
{
  name: string (required, max 50 chars)
  email: string (required, unique, valid email)
  password: string (required, hashed with bcrypt)
  role: 'student' | 'teacher' | 'admin'
  university: 'aktu' | 'lu' (required for students)
  isApproved: boolean (default: true for non-teachers)
  createdAt: Date
  updatedAt: Date
}
```

### Course Model
```typescript
{
  title: string (required, max 100 chars)
  description: string (required, max 2000 chars)
  university: 'aktu' | 'lu' (required)
  teacherId: ObjectId (references User)
  price: number (required, min 0)
  trialDays: number (default 7)
  lectureCount: number (default 0)
  isApproved: boolean (default false, requires admin approval)
  createdAt: Date
  updatedAt: Date
}
```

### Enrollment Model
```typescript
{
  userId: ObjectId (references User)
  courseId: ObjectId (references Course)
  trialStartDate: Date (default: now)
  trialEndDate: Date (calculated: trialStartDate + trialDays)
  isPaid: boolean (default false)
  progress: number (0-100, default 0)
  status: 'active' | 'expired' | 'completed' (default 'active')
  createdAt: Date
  updatedAt: Date
}
```

### Company Model
```typescript
{
  name: string (required, unique)
  description: string (required)
  logo: string
  website: string
  createdAt: Date
  updatedAt: Date
}
```

### Opportunity Model
```typescript
{
  type: 'project' | 'internship' | 'placement' (required)
  title: string (required)
  description: string (required)
  companyId: ObjectId (references Company, required)
  university: 'aktu' | 'lu' | 'all' (default 'all')
  stipend: number (optional)
  duration: string (optional)
  applicationDeadline: Date (required)
  status: 'open' | 'closed' | 'archived' (default 'open')
  createdAt: Date
  updatedAt: Date
}
```

---

## API Endpoints Overview

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Student Routes
- `GET /api/courses` - Get courses by university
- `POST /api/enrollments` - Enroll in course
- `GET /api/enrollments` - Get user enrollments
- `GET /api/opportunities` - Get opportunities

### Teacher Routes
- `POST /api/teacher/courses` - Create course
- `GET /api/teacher/courses` - Get teacher's courses

### Admin Routes
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/approve` - Approve/reject users/courses
- `GET /api/admin/courses` - Get all courses
- `POST /api/admin/companies` - Create company
- `GET /api/admin/companies` - Get all companies
- `POST /api/admin/opportunities` - Create opportunity
- `GET /api/admin/opportunities` - Get all opportunities

See `/API_DOCUMENTATION.md` for detailed endpoint documentation.

---

## Testing the Backend

### Using cURL

#### 1. Signup as Student
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "student",
    "university": "aktu"
  }'
```

#### 2. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### 3. Get Courses
```bash
curl -X GET "http://localhost:3000/api/courses?university=aktu&approved=true"
```

### Using Postman

1. Import the API endpoints into Postman
2. Set up environment variables:
   - `base_url`: http://localhost:3000
   - `token`: (automatically filled after login)
3. Test each endpoint collection

### Using VS Code REST Client

Create a `requests.http` file:

```http
### Signup
POST http://localhost:3000/api/auth/signup
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "role": "student",
  "university": "aktu"
}

### Login
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}

### Get Courses
GET http://localhost:3000/api/courses?university=aktu&approved=true
```

---

## Debugging & Troubleshooting

### MongoDB Connection Issues

**Error**: `MongoServerSelectionError: connect ECONNREFUSED`

**Solution**: 
- Ensure MongoDB is running
- Check connection string in `.env.local`
- For MongoDB Atlas, whitelist your IP address

### JWT Secret Issues

**Error**: `jwt malformed`

**Solution**:
- Ensure `JWT_SECRET` is set in `.env.local`
- Generate a new secret if corrupted

### Password Hashing Issues

**Error**: `bcrypt error during hashing`

**Solution**:
- Ensure bcrypt is properly installed: `npm install bcrypt`
- Check Node.js compatibility

### Duplicate Key Error

**Error**: `E11000 duplicate key error collection`

**Solution**:
- User email already exists
- Delete the document and try again, or use a different email

---

## Production Deployment

### 1. Environment Variables (Production)

Update `.env.production`:
```env
MONGODB_URI=mongodb+srv://prod_user:prod_pass@prod-cluster.mongodb.net/edu-interact
JWT_SECRET=super-secure-production-secret-key
NODE_ENV=production
```

### 2. Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
# Project Settings > Environment Variables > Add
```

### 3. Security Checklist

- [ ] Change `JWT_SECRET` to a strong, random value
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Set `NODE_ENV=production`
- [ ] Use MongoDB Atlas with IP whitelist
- [ ] Enable rate limiting (add Upstash Redis)
- [ ] Set secure cookies (already configured)
- [ ] Add CORS headers if needed
- [ ] Enable MongoDB backups
- [ ] Set up monitoring and logging

---

## Monitoring & Logging

### Log Files

By default, logs appear in console. For production, implement:

```bash
npm install winston
```

Then create `/lib/logger.ts`:

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export default logger;
```

### MongoDB Monitoring

- Use MongoDB Atlas dashboard for connection monitoring
- Enable slow query logs
- Monitor index usage

---

## Next Steps

1. **Frontend Integration**: Connect React components to API endpoints
2. **Authentication UI**: Build login/signup pages with form validation
3. **Payment Gateway**: Integrate Stripe for course payments
4. **Video Hosting**: Integrate Cloudinary or similar for video uploads
5. **Email Notifications**: Add nodemailer for sending emails
6. **Admin Dashboard**: Build admin interface for approvals
7. **Testing**: Write unit and integration tests with Jest/Vitest

---

## Support & Resources

- MongoDB Docs: [mongodb.com/docs](https://www.mongodb.com/docs)
- Mongoose Docs: [mongoosejs.com](https://mongoosejs.com)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)
- JWT Docs: [jwt.io](https://jwt.io)
- bcrypt Docs: [npmjs.com/package/bcrypt](https://www.npmjs.com/package/bcrypt)
