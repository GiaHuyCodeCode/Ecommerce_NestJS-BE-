# Test API Register - Hướng dẫn và Dữ liệu mẫu

## Thông tin API
- **Endpoint**: `POST /auth/register`
- **Content-Type**: `application/json`

## Dữ liệu test mẫu

### Test Case 1: User cơ bản (không có địa chỉ)
```json
{
  "email": "john.doe@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+84901234567",
  "role": "customer"
}
```

### Test Case 2: User với địa chỉ đầy đủ
```json
{
  "email": "jane.sith@examplem.com",
  "password": "securepass456",
  "firstName": "Jane",
  "lastName": "Smith",
  "phoneNumber": "+84987654321",
  "addresses": [
    {
      "addressLine1": "123 Đường Lê Lợi",
      "addressLine2": "Tầng 5, Phòng 501",
      "city": "Hồ Chí Minh",
      "state": "TP.HCM",
      "postalCode": "700000",
      "country": "Việt Nam",
      "isDefault": true
    },
    {
      "addressLine1": "456 Đường Nguyễn Huệ",
      "city": "Hà Nội",
      "state": "Hà Nội",
      "postalCode": "100000",
      "country": "ViệtP
      "isDefault": false
    }
  ],
  "role": "customer"
}
```

### Test Case 3: Admin user
```json
{
  "email": "admin@company.com",
  "password": "adminpass789",
  "firstName": "Admin",
  "lastName": "User",
  "phoneNumber": "+84123456789",
  "role": "admin"
}
```

### Test Case 4: Vendor user
```json
{
  "email": "vendor@shop.com",
  "password": "vendorpass123",
  "firstName": "Vendor",
  "lastName": "Manager",
  "phoneNumber": "+84987654321",
  "addresses": [
    {
      "addressLine1": "789 Đường Cách Mạng Tháng 8",
      "city": "Đà Nẵng",
      "state": "Đà Nẵng",
      "postalCode": "500000",
      "country": "Việt Nam",
      "isDefault": true
    }
  ],
  "role": "vendor"
}
```

## Cách test với cURL

### 1. Test user cơ bản:
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+84901234567",
    "role": "customer"
  }'
```

### 2. Test user với địa chỉ:
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.smith@example.com",
    "password": "securepass456",
    "firstName": "Jane",
    "lastName": "Smith",
    "phoneNumber": "+84987654321",
    "addresses": [
      {
        "addressLine1": "123 Đường Lê Lợi",
        "addressLine2": "Tầng 5, Phòng 501",
        "city": "Hồ Chí Minh",
        "state": "TP.HCM",
        "postalCode": "700000",
        "country": "Việt Nam",
        "isDefault": true
      }
    ],
    "role": "customer"
  }'
```

## Response mẫu thành công:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f8b1234567890abcdef123",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "customer"
  }
}
```

## Response lỗi (email đã tồn tại):
```json
{
  "statusCode": 401,
  "message": "Email đã được sử dụng",
  "error": "Unauthorized"
}
```

## Lưu ý:
1. Đảm bảo server đang chạy trên port 3000
2. Tất cả trường bắt buộc: email, password, firstName, lastName
3. Trường role có thể là: 'customer', 'admin', 'vendor' (mặc định là 'customer')
4. Addresses là optional, có thể có nhiều địa chỉ
5. Password sẽ được hash trước khi lưu vào database
