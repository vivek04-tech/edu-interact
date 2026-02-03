# Edu-Interact API Documentation

## Overview
Comprehensive REST API for the university-focused education and career platform. All endpoints use JSON for request/response bodies. Authentication is handled via HTTP-only cookies containing JWT tokens.

---

## Authentication Endpoints

### 1. User Signup
**POST** `/api/auth/signup`

Creates a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "student",
  "university": "aktu"
}
```

**Request Body (Teacher):**
```json
{
  "name": "Prof. Smith",
  "email": "smith@example.com",
  "password": "securePassword123",
  "role": "teacher"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "university": "aktu"
  }
}
```

**Validation Rules:**
- `name`: Required, max 50 characters
- `email`: Required, valid email format, unique
- `password`: Required, minimum 6 characters
- `role`: Required, must be 'student', 'teacher', or 'admin'
- `university`: Required for students only, must be 'aktu' or 'lu'

---

### 2. User Login
**POST** `/api/auth/login`

Authenticates user and returns session token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "university": "aktu"
  }
}
```

**Error Cases:**
- Invalid email/password: 401 Unauthorized
- Teacher account not approved: 403 Forbidden
- User not found: 401 Unauthorized

---

### 3. User Logout
**POST** `/api/auth/logout`

Clears authentication token.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Student Endpoints

### 4. Get Courses by University
**GET** `/api/courses?university=aktu&approved=true`

Retrieves all approved courses for a specific university.

**Query Parameters:**
- `university`: 'aktu' or 'lu' (optional)
- `approved`: true/false (optional, defaults to all)

**Response (200 OK):**
```json
{
  "success": true,
  "courses": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Data Structures",
      "description": "Learn DSA from basics to advanced",
      "university": "aktu",
      "price": 4999,
      "trialDays": 7,
      "lectureCount": 45,
      "isApproved": true,
      "teacherId": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Prof. Smith",
        "email": "smith@example.com"
      },
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### 5. Enroll in Course
**POST** `/api/enrollments`

Creates enrollment in a course with 7-day trial period.

**Request Body:**
```json
{
  "courseId": "507f1f77bcf86cd799439012"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Enrolled successfully",
  "enrollment": {
    "_id": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439011",
    "courseId": {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Data Structures"
    },
    "trialStartDate": "2024-01-20T10:30:00Z",
    "trialEndDate": "2024-01-27T10:30:00Z",
    "isPaid": false,
    "progress": 0,
    "status": "active"
  }
}
```

**Error Cases:**
- Not authenticated: 401 Unauthorized
- Non-student role: 401 Unauthorized
- Already enrolled: 400 Bad Request
- Course not found: 404 Not Found
- Course not approved: 400 Bad Request

---

### 6. Get User Enrollments
**GET** `/api/enrollments`

Retrieves all enrollments for the authenticated student.

**Response (200 OK):**
```json
{
  "success": true,
  "enrollments": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "userId": "507f1f77bcf86cd799439011",
      "courseId": {
        "_id": "507f1f77bcf86cd799439012",
        "title": "Data Structures",
        "price": 4999
      },
      "trialStartDate": "2024-01-20T10:30:00Z",
      "trialEndDate": "2024-01-27T10:30:00Z",
      "isPaid": false,
      "progress": 25,
      "status": "active"
    }
  ]
}
```

---

### 7. Get Opportunities (Internships, Projects, Placements)
**GET** `/api/opportunities?type=internship&university=aktu`

Retrieves available opportunities for students.

**Query Parameters:**
- `type`: 'project', 'internship', or 'placement' (optional)
- `university`: 'aktu' or 'lu' (optional)

**Response (200 OK):**
```json
{
  "success": true,
  "opportunities": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "type": "internship",
      "title": "Software Engineer Intern",
      "description": "3-month internship at XYZ Company",
      "companyId": {
        "_id": "507f1f77bcf86cd799439015",
        "name": "XYZ Company",
        "logo": "https://example.com/logo.png"
      },
      "university": "all",
      "stipend": 15000,
      "duration": "3 months",
      "applicationDeadline": "2024-02-28T23:59:59Z",
      "status": "open"
    }
  ]
}
```

---

## Teacher Endpoints

### 8. Create Course
**POST** `/api/teacher/courses`

Creates a new course (requires teacher authentication).

**Request Body:**
```json
{
  "title": "Web Development with React",
  "description": "Learn React, Redux, and modern web development",
  "university": "aktu",
  "price": 3999,
  "trialDays": 7
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Course created successfully. Awaiting admin approval.",
  "course": {
    "_id": "507f1f77bcf86cd799439016",
    "title": "Web Development with React",
    "description": "Learn React, Redux, and modern web development",
    "university": "aktu",
    "teacherId": "507f1f77bcf86cd799439011",
    "price": 3999,
    "trialDays": 7,
    "lectureCount": 0,
    "isApproved": false
  }
}
```

**Authorization:** Teacher role required

---

### 9. Get Teacher's Courses
**GET** `/api/teacher/courses`

Retrieves all courses created by the authenticated teacher.

**Response (200 OK):**
```json
{
  "success": true,
  "courses": [
    {
      "_id": "507f1f77bcf86cd799439016",
      "title": "Web Development with React",
      "university": "aktu",
      "price": 3999,
      "lectureCount": 0,
      "isApproved": false
    }
  ]
}
```

**Authorization:** Teacher role required

---

## Admin Endpoints

### 10. Get All Users
**GET** `/api/admin/users?role=teacher&approved=false`

Retrieves all platform users with optional filtering.

**Query Parameters:**
- `role`: 'student', 'teacher', or 'admin' (optional)
- `approved`: true/false (optional)

**Response (200 OK):**
```json
{
  "success": true,
  "users": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Prof. Smith",
      "email": "smith@example.com",
      "role": "teacher",
      "isApproved": false,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

**Authorization:** Admin role required

---

### 11. Approve/Reject User or Course
**PUT** `/api/admin/approve`

Approves or rejects a user or course.

**Request Body:**
```json
{
  "type": "user",
  "id": "507f1f77bcf86cd799439011",
  "approved": true
}
```

**or for course approval:**
```json
{
  "type": "course",
  "id": "507f1f77bcf86cd799439016",
  "approved": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User approved successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Prof. Smith",
    "email": "smith@example.com",
    "role": "teacher",
    "isApproved": true
  }
}
```

**Authorization:** Admin role required

---

### 12. Get All Courses (Admin View)
**GET** `/api/admin/courses?approved=false`

Retrieves all courses with optional approval filter.

**Query Parameters:**
- `approved`: true/false (optional)

**Response (200 OK):**
```json
{
  "success": true,
  "courses": [
    {
      "_id": "507f1f77bcf86cd799439016",
      "title": "Web Development with React",
      "university": "aktu",
      "price": 3999,
      "lectureCount": 0,
      "isApproved": false,
      "teacherId": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Prof. Smith",
        "email": "smith@example.com"
      }
    }
  ]
}
```

**Authorization:** Admin role required

---

### 13. Create Company
**POST** `/api/admin/companies`

Adds a new company to the platform.

**Request Body:**
```json
{
  "name": "Google India",
  "description": "Leading tech company",
  "logo": "https://example.com/logo.png",
  "website": "https://google.com"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Company created successfully",
  "company": {
    "_id": "507f1f77bcf86cd799439015",
    "name": "Google India",
    "description": "Leading tech company",
    "logo": "https://example.com/logo.png",
    "website": "https://google.com"
  }
}
```

**Authorization:** Admin role required

---

### 14. Get All Companies
**GET** `/api/admin/companies`

Retrieves all companies.

**Response (200 OK):**
```json
{
  "success": true,
  "companies": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "name": "Google India",
      "description": "Leading tech company",
      "logo": "https://example.com/logo.png",
      "website": "https://google.com"
    }
  ]
}
```

---

### 15. Create Opportunity (Project/Internship/Placement)
**POST** `/api/admin/opportunities`

Posts a new opportunity.

**Request Body:**
```json
{
  "type": "internship",
  "title": "Summer Internship 2024",
  "description": "3-month paid internship for final year students",
  "companyId": "507f1f77bcf86cd799439015",
  "university": "aktu",
  "stipend": 20000,
  "duration": "3 months",
  "applicationDeadline": "2024-02-28T23:59:59Z"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Opportunity created successfully",
  "opportunity": {
    "_id": "507f1f77bcf86cd799439014",
    "type": "internship",
    "title": "Summer Internship 2024",
    "companyId": {
      "_id": "507f1f77bcf86cd799439015",
      "name": "Google India"
    },
    "university": "aktu",
    "stipend": 20000,
    "duration": "3 months",
    "applicationDeadline": "2024-02-28T23:59:59Z",
    "status": "open"
  }
}
```

**Authorization:** Admin role required

---

### 16. Get All Opportunities (Admin View)
**GET** `/api/admin/opportunities?type=internship&status=open`

Retrieves all opportunities with optional filters.

**Query Parameters:**
- `type`: 'project', 'internship', or 'placement' (optional)
- `status`: 'open', 'closed', or 'archived' (optional)

**Response (200 OK):**
```json
{
  "success": true,
  "opportunities": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "type": "internship",
      "title": "Summer Internship 2024",
      "companyId": {
        "_id": "507f1f77bcf86cd799439015",
        "name": "Google India"
      },
      "status": "open"
    }
  ]
}
```

**Authorization:** Admin role required

---

## Error Handling

### Standard Error Response
All errors follow this format:

```json
{
  "error": "Error message describing what went wrong",
  "status": 400
}
```

### Common HTTP Status Codes
- `200 OK`: Successful GET request
- `201 Created`: Successful resource creation
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Authentication required or failed
- `403 Forbidden`: User lacks required permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

---

## Authentication

### JWT Token
- Tokens are issued upon successful login/signup
- Valid for 7 days
- Stored in HTTP-only cookies (secure by default)
- Automatically sent with all subsequent requests

### Authorization Levels
1. **Public**: No authentication required
   - GET /api/courses
   - GET /api/opportunities

2. **Authenticated**: Any logged-in user
   - GET /api/enrollments
   - POST /api/enrollments

3. **Role-Specific**: Specific roles only
   - Teacher: POST /api/teacher/courses, GET /api/teacher/courses
   - Admin: All /api/admin/* endpoints

---

## Environment Variables Required

```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=production
```

---

## Rate Limiting & Best Practices

- No explicit rate limiting implemented (can be added with Upstash Redis)
- Always validate user input on both client and server
- Use HTTPS in production
- Keep JWT_SECRET secure and rotate regularly
- Test all endpoints before deployment

---

## Future Enhancements

- Payment gateway integration
- Video upload and streaming
- Chat system between students and teachers
- Advanced analytics and reporting
- Mobile app API endpoints
- Webhook integrations for notifications
- GraphQL alternative
