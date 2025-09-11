# Hướng dẫn tạo sản phẩm cho testing

## 1. Categories đã có sẵn

Các categories đã được tạo trong database với các ID sau:

- `68c13cbe79030c79b3be42a0` - Laptops
- `68c238afd4f800c0b623385d` - Thời trang  
- `68c238afd4f800c0b623385e` - Điện tử
- `68c238afd4f800c0b623385f` - Mỹ phẩm
- `68c238afd4f800c0b6233860` - Đồng hồ
- `68c238afd4f800c0b6233861` - Đồ chơi

**Lưu ý**: File JSON sản phẩm đã được cập nhật với các Category ID thực tế này.

## 2. Tạo Products

Sử dụng API tạo sản phẩm với JSON từ file `create-products-for-testing.json`:

```bash
POST /products
Content-Type: application/json
Authorization: Bearer <your-jwt-token>

{
  "name": "Áo thun nam cao cấp",
  "description": "Áo thun nam chất liệu cotton 100%, thoáng mát, dễ giặt",
  "price": 299000,
  "compareAtPrice": 399000,
  "images": [
    "https://example.com/images/ao-thun-nam-1.jpg",
    "https://example.com/images/ao-thun-nam-2.jpg"
  ],
  "category": "68c238afd4f800c0b623385d",
  "brand": "Fashion Brand",
  "sku": "ATN001",
  "quantity": 50,
  "attributes": [
    {
      "name": "Chất liệu",
      "value": "Cotton 100%"
    },
    {
      "name": "Xuất xứ",
      "value": "Việt Nam"
    }
  ],
  "variants": [
    {
      "sku": "ATN001-S-M",
      "attributes": [
        {
          "name": "Size",
          "value": "S"
        },
        {
          "name": "Màu sắc",
          "value": "Trắng"
        }
      ],
      "price": 299000,
      "quantity": 20,
      "images": [
        "https://example.com/images/ao-thun-s-trang.jpg"
      ]
    }
    // ... các variant khác
  ]
}
```

## 3. Danh sách sản phẩm đã tạo

### Sản phẩm có nhiều variant:

1. **Áo thun nam cao cấp** (ATN001)
   - 3 variant: Size S/M/L với màu Trắng/Xanh/Đỏ
   - Category: Thời trang

2. **iPhone 15 Pro Max** (IP15PM001)
   - 3 variant: 128GB/256GB/512GB với màu Titanium khác nhau
   - Category: Điện tử

3. **Giày thể thao Nike Air Max** (NAM001)
   - 4 variant: Size 40/41/42/43 với màu Trắng/Đen/Xanh/Đỏ
   - Category: Thời trang

4. **Laptop Dell XPS 13** (DXPS13001)
   - 2 variant: 16GB-512GB / 32GB-1TB
   - Category: Điện tử

5. **MacBook Pro 14 inch** (MBP14001)
   - 2 variant: 18GB-512GB / 18GB-1TB
   - Category: Điện tử

6. **Son môi cao cấp** (SM001)
   - 4 variant: Màu sắc khác nhau + Loại da khác nhau
   - Category: Mỹ phẩm

7. **Kem dưỡng da ban đêm** (KDD001)
   - 4 variant: Loại da khác nhau + Dung tích 30ml/50ml
   - Category: Mỹ phẩm

8. **Đồng hồ Rolex Submariner** (RS001)
   - 3 variant: Màu sắc + Chất liệu khác nhau
   - Category: Đồng hồ

9. **Đồng hồ Omega Seamaster** (OS001)
   - 3 variant: Màu sắc khác nhau với chất liệu thép
   - Category: Đồng hồ

10. **Bộ đồ chơi LEGO Creator** (LC001)
    - 4 variant: Chủ đề khác nhau + Số mảnh khác nhau
    - Category: Đồ chơi

11. **Robot đồ chơi thông minh** (RT001)
    - 4 variant: Màu sắc + Phiên bản Cơ bản/Nâng cao
    - Category: Đồ chơi

### Sản phẩm đơn giản:

12. **Sản phẩm đơn giản không có variant** (SPDG001)
    - Không có variant, chỉ sản phẩm chính
    - Category: Thời trang

13. **Sản phẩm số lượng lớn** (SPSL001)
    - Không có variant, số lượng tồn kho lớn (1000)
    - Category: Thời trang

## 4. Mapping với Test Cases

Sau khi tạo xong, bạn có thể sử dụng các `_id` thực tế để thay thế trong các test case:

- **Test Case 9**: Sử dụng sản phẩm "Áo thun nam cao cấp" với 3 variant
- **Test Case 10**: Mix các sản phẩm có và không có variant
- **Test Case 11**: Sử dụng "iPhone 15 Pro Max" với 3 variant
- **Test Case 12**: Sử dụng "Giày thể thao Nike Air Max" với 4 variant
- **Test Case 13**: Sử dụng "Laptop Dell XPS 13" và "MacBook Pro 14 inch"
- **Test Case 14**: Sử dụng "Son môi cao cấp" và "Kem dưỡng da ban đêm"
- **Test Case 15**: Sử dụng "Đồng hồ Rolex Submariner" và "Omega Seamaster"
- **Test Case 16**: Mix tất cả các sản phẩm
- **Test Case 17**: Sử dụng "Áo thun nam cao cấp" và "Giày thể thao Nike Air Max"
- **Test Case 18**: Sử dụng "Bộ đồ chơi LEGO Creator" và "Robot đồ chơi thông minh"

## 5. Lưu ý quan trọng

1. **Thay thế Category IDs**: Sau khi tạo categories, thay thế `CATEGORY_ID_1`, `CATEGORY_ID_2`, v.v. bằng các `_id` thực tế.

2. **Thay thế Product IDs**: Sau khi tạo products, lưu lại các `_id` để sử dụng trong test cases.

3. **Thay thế Variant IDs**: Các variant sẽ được tạo tự động và có `_id` riêng, cần lưu lại để sử dụng trong test cases.

4. **Kiểm tra tồn kho**: Đảm bảo số lượng tồn kho đủ để test các đơn hàng lớn.

5. **Images**: Các URL hình ảnh trong JSON là ví dụ, bạn có thể thay thế bằng URL thực tế hoặc để trống.

## 6. Script tự động (tùy chọn)

Bạn có thể tạo script để tự động tạo tất cả sản phẩm:

```javascript
// Ví dụ script Node.js
const fs = require('fs');
const axios = require('axios');

const data = JSON.parse(fs.readFileSync('create-products-for-testing.json', 'utf8'));

// Tạo categories trước
async function createCategories() {
  for (const category of data.categories) {
    try {
      const response = await axios.post('http://localhost:3000/categories', category);
      console.log(`Created category: ${category.name} - ID: ${response.data._id}`);
    } catch (error) {
      console.error(`Error creating category ${category.name}:`, error.message);
    }
  }
}

// Tạo products sau
async function createProducts() {
  for (const product of data.products) {
    try {
      const response = await axios.post('http://localhost:3000/products', product);
      console.log(`Created product: ${product.name} - ID: ${response.data._id}`);
    } catch (error) {
      console.error(`Error creating product ${product.name}:`, error.message);
    }
  }
}

// Chạy script
createCategories().then(() => createProducts());
```
