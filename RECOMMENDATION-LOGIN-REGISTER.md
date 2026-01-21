# Rekomendasi Login & Register untuk S1 Health Fitness

## 🎯 Rekomendasi Flow

### **Pendekatan yang Disarankan:**

#### **1. Login/Register di Header (Recommended)**
- **Login Button** di header (sebelah "JOIN NOW")
- **Dropdown menu** saat user sudah login (menampilkan profile, bookings, logout)
- **Modal atau separate page** untuk login

#### **2. Flow Registrasi Member**

**Skenario A: Register dengan Create Password (RECOMMENDED)**
```
Register Form
  ↓
User mengisi:
  - Personal Info (nama, email, phone, dll)
  - Create Password (user input sendiri)
  - Confirm Password
  ↓
Payment
  ↓
Account otomatis dibuat dengan:
  - Email sebagai username
  - Password yang user buat
  - Member ID auto-generated
  ↓
User bisa langsung login setelah payment
```

**Skenario B: Auto-generate Password (Alternative)**
```
Register Form
  ↓
User mengisi:
  - Personal Info (nama, email, phone, dll)
  - TIDAK perlu password
  ↓
Payment
  ↓
System auto-generate:
  - Username: Email
  - Password: Random password (dikirim via email)
  ↓
User login dengan password dari email
```

### **3. Rekomendasi: Skenario A (User Create Password)**

**Alasan:**
✅ User lebih mudah mengingat password yang mereka buat sendiri
✅ Lebih user-friendly (tidak perlu cek email untuk password)
✅ Standard practice untuk fitness clubs
✅ User bisa langsung login setelah registrasi

**Flow:**
1. User klik "JOIN NOW" → Register page
2. Form registrasi termasuk field "Create Password" dan "Confirm Password"
3. Setelah payment, account otomatis dibuat
4. User bisa langsung login dengan email + password

### **4. Posisi Login/Register di UI**

**Option 1: Header dengan Dropdown (RECOMMENDED)**
```
[Logo] [Home] [Classes] [Gym] [Membership] [PT] [Login ▼] [JOIN NOW]
                                              ↓
                                    [Login] [Register]
```

**Option 2: Separate Buttons**
```
[Logo] [Home] [Classes] [Gym] [Membership] [PT] [Login] [JOIN NOW]
```

**Option 3: Modal/Overlay**
- Klik "Login" → Modal popup
- Klik "JOIN NOW" → Redirect ke register page

### **5. Fitur Setelah Login**

Setelah user login, header menampilkan:
- **User Menu Dropdown:**
  - My Profile
  - My Bookings (classes yang sudah di-book)
  - My Membership
  - Payment History
  - Logout

### **6. Use Cases**

**Use Case 1: Member Baru**
- Klik "JOIN NOW" → Register → Payment → Account created → Auto login

**Use Case 2: Member Existing**
- Klik "Login" → Masukkan email + password → Dashboard/Profile

**Use Case 3: Book Class (Sudah Login)**
- Login → Browse classes → Book class → Payment (jika perlu) → Confirmed

**Use Case 4: Book Class (Belum Login)**
- Browse classes → Book class → Redirect ke login → Setelah login, lanjut booking

## 📋 Implementation Plan

### **Step 1: Update Header**
- Tambahkan "Login" button
- Tambahkan user menu dropdown (jika sudah login)
- Conditional rendering: Login button vs User menu

### **Step 2: Update Register Page**
- Tambahkan field "Create Password"
- Tambahkan field "Confirm Password"
- Validasi password strength
- Store password (hashed) saat registrasi

### **Step 3: Create Login Page**
- Email/Username input
- Password input
- "Remember me" checkbox
- "Forgot password" link
- "Don't have account? Register" link

### **Step 4: Create User Dashboard/Profile**
- My Profile
- My Bookings
- My Membership
- Payment History

### **Step 5: Update Booking Flow**
- Check jika user sudah login
- Jika belum, redirect ke login dengan return URL
- Setelah login, lanjutkan booking

## 🔐 Security Considerations

1. **Password Requirements:**
   - Min 8 characters
   - At least 1 uppercase, 1 lowercase, 1 number
   - Optional: 1 special character

2. **Password Storage:**
   - Hash password dengan bcrypt atau similar
   - Jangan store plain password

3. **Session Management:**
   - JWT token untuk authentication
   - Token expiry (24 hours atau sesuai kebutuhan)
   - Refresh token untuk extended sessions

4. **Email Verification:**
   - Optional: Send verification email
   - User bisa login tanpa verification (untuk UX)
   - Tapi batasi fitur tertentu sampai email verified

## 💡 Best Practices

1. **Username = Email** (lebih mudah untuk user)
2. **Auto-login setelah registrasi** (better UX)
3. **Remember me** option untuk convenience
4. **Forgot password** flow dengan email reset
5. **Social login** (Google, Facebook) - optional tapi recommended

## 🎨 UI/UX Recommendations

1. **Login Modal** lebih baik daripada separate page (faster, less navigation)
2. **Clear error messages** untuk invalid credentials
3. **Loading states** saat processing
4. **Success feedback** setelah login/register
5. **Mobile-friendly** forms

---

**Kesimpulan:**
- **Login/Register di Header** (sebelah JOIN NOW)
- **User create password sendiri** saat registrasi
- **Email sebagai username**
- **Auto-login setelah registrasi**
- **User menu dropdown** setelah login
