# JSON Test Data cho API CreateOrder - Sử dụng sản phẩm thực tế

## Lưu ý quan trọng:
- Thay thế `PRODUCT_ID_XXX` bằng ID thực tế từ database sau khi tạo sản phẩm
- Thay thế `VARIANT_ID_XXX` bằng ID thực tế của variant sau khi tạo sản phẩm
- Các ID này sẽ được tạo tự động khi bạn tạo sản phẩm từ file `create-products-for-testing.json`

## Category IDs đã có sẵn:
- `68c13cbe79030c79b3be42a0` - Laptops
- `68c238afd4f800c0b623385d` - Thời trang  
- `68c238afd4f800c0b623385e` - Điện tử
- `68c238afd4f800c0b623385f` - Mỹ phẩm
- `68c238afd4f800c0b6233860` - Đồng hồ
- `68c238afd4f800c0b6233861` - Đồ chơi

## 1. JSON Test Case Cơ Bản (Sản phẩm đơn giản)

```json
{
  "items": [
    {
      "product": "PRODUCT_ID_SIMPLE",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "addressLine1": "123 Đường Lê Lợi",
    "addressLine2": "Tầng 5, Tòa nhà ABC",
    "city": "Hồ Chí Minh",
    "state": "TP.HCM",
    "postalCode": "700000",
    "country": "Việt Nam"
  },
  "billingAddress": {
    "addressLine1": "123 Đường Lê Lợi",
    "addressLine2": "Tầng 5, Tòa nhà ABC",
    "city": "Hồ Chí Minh",
    "state": "TP.HCM",
    "postalCode": "700000",
    "country": "Việt Nam"
  },
  "paymentMethod": "credit_card"
}
```
**Sản phẩm**: Sản phẩm đơn giản không có variant (SPDG001)

## 2. JSON Test Case với Product Variant (Áo thun)

```json
{
  "items": [
    {
      "product": "PRODUCT_ID_AO_THUN",
      "variantId": "VARIANT_ID_AO_THUN_S_TRANG",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "addressLine1": "456 Nguyễn Huệ",
    "city": "Hà Nội",
    "state": "Hà Nội",
    "postalCode": "100000",
    "country": "Việt Nam"
  },
  "billingAddress": {
    "addressLine1": "456 Nguyễn Huệ",
    "city": "Hà Nội",
    "state": "Hà Nội",
    "postalCode": "100000",
    "country": "Việt Nam"
  },
  "paymentMethod": "paypal"
}
```
**Sản phẩm**: Áo thun nam cao cấp - Size S, Màu Trắng

## 3. JSON Test Case Đơn hàng nhiều sản phẩm

```json
{
  "items": [
    {
      "product": "PRODUCT_ID_SIMPLE",
      "quantity": 3
    },
    {
      "product": "PRODUCT_ID_AO_THUN",
      "variantId": "VARIANT_ID_AO_THUN_M_XANH",
      "quantity": 1
    },
    {
      "product": "PRODUCT_ID_GIAY_NIKE",
      "variantId": "VARIANT_ID_GIAY_NIKE_40_TRANG",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "addressLine1": "789 Đường Võ Văn Tần",
    "addressLine2": "Chung cư XYZ, Căn hộ 1203",
    "city": "Đà Nẵng",
    "state": "Đà Nẵng",
    "postalCode": "550000",
    "country": "Việt Nam"
  },
  "billingAddress": {
    "addressLine1": "789 Đường Võ Văn Tần",
    "addressLine2": "Chung cư XYZ, Căn hộ 1203",
    "city": "Đà Nẵng",
    "state": "Đà Nẵng",
    "postalCode": "550000",
    "country": "Việt Nam"
  },
  "paymentMethod": "bank_transfer"
}
```
**Sản phẩm**: Mix sản phẩm đơn giản + Áo thun Size M Xanh + Giày Nike Size 40 Trắng

## 4. JSON Test Case Thanh toán COD

```json
{
  "items": [
    {
      "product": "PRODUCT_ID_ROBOT_TOY",
      "variantId": "VARIANT_ID_ROBOT_TOY_XANH_CO_BAN",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "addressLine1": "321 Đường Trần Hưng Đạo",
    "city": "Cần Thơ",
    "state": "Cần Thơ",
    "postalCode": "900000",
    "country": "Việt Nam"
  },
  "billingAddress": {
    "addressLine1": "321 Đường Trần Hưng Đạo",
    "city": "Cần Thơ",
    "state": "Cần Thơ",
    "postalCode": "900000",
    "country": "Việt Nam"
  },
  "paymentMethod": "cash_on_delivery"
}
```
**Sản phẩm**: Robot đồ chơi thông minh - Màu Xanh, Phiên bản Cơ bản

## 5. JSON Test Case Địa chỉ giao hàng khác địa chỉ thanh toán

```json
{
  "items": [
    {
      "product": "PRODUCT_ID_IPHONE",
      "variantId": "VARIANT_ID_IPHONE_128_TITANIUM",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "addressLine1": "111 Đường Nguyễn Thị Minh Khai",
    "addressLine2": "Văn phòng công ty ABC",
    "city": "Hồ Chí Minh",
    "state": "TP.HCM",
    "postalCode": "700000",
    "country": "Việt Nam"
  },
  "billingAddress": {
    "addressLine1": "222 Đường Lê Văn Việt",
    "addressLine2": "Nhà riêng",
    "city": "Hồ Chí Minh",
    "state": "TP.HCM",
    "postalCode": "700000",
    "country": "Việt Nam"
  },
  "paymentMethod": "credit_card"
}
```
**Sản phẩm**: iPhone 15 Pro Max - 128GB, Titanium Tự nhiên

## 6. JSON Test Case Số lượng lớn

```json
{
  "items": [
    {
      "product": "PRODUCT_ID_BULK",
      "quantity": 10
    },
    {
      "product": "PRODUCT_ID_LEGO",
      "variantId": "VARIANT_ID_LEGO_XE_DUA_1000",
      "quantity": 5
    }
  ],
  "shippingAddress": {
    "addressLine1": "333 Đường Cách Mạng Tháng 8",
    "city": "Hồ Chí Minh",
    "state": "TP.HCM",
    "postalCode": "700000",
    "country": "Việt Nam"
  },
  "billingAddress": {
    "addressLine1": "333 Đường Cách Mạng Tháng 8",
    "city": "Hồ Chí Minh",
    "state": "TP.HCM",
    "postalCode": "700000",
    "country": "Việt Nam"
  },
  "paymentMethod": "bank_transfer"
}
```
**Sản phẩm**: Sản phẩm số lượng lớn + LEGO Xe đua 1000 mảnh

## 7. JSON Test Case Không có addressLine2

```json
{
  "items": [
    {
      "product": "PRODUCT_ID_SON_MOI",
      "variantId": "VARIANT_ID_SON_MOI_DA_THUONG_DO_ANH_DAO",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "addressLine1": "444 Đường Điện Biên Phủ",
    "city": "Hà Nội",
    "state": "Hà Nội",
    "postalCode": "100000",
    "country": "Việt Nam"
  },
  "billingAddress": {
    "addressLine1": "444 Đường Điện Biên Phủ",
    "city": "Hà Nội",
    "state": "Hà Nội",
    "postalCode": "100000",
    "country": "Việt Nam"
  },
  "paymentMethod": "paypal"
}
```
**Sản phẩm**: Son môi cao cấp - Da thường, Màu Đỏ anh đào

## 8. JSON Test Case Nhiều sản phẩm với nhiều variant (Áo thun)

```json
{
  "items": [
    {
      "product": "PRODUCT_ID_AO_THUN",
      "variantId": "VARIANT_ID_AO_THUN_S_TRANG",
      "quantity": 2
    },
    {
      "product": "PRODUCT_ID_AO_THUN",
      "variantId": "VARIANT_ID_AO_THUN_M_XANH",
      "quantity": 1
    },
    {
      "product": "PRODUCT_ID_AO_THUN",
      "variantId": "VARIANT_ID_AO_THUN_L_DO",
      "quantity": 3
    }
  ],
  "shippingAddress": {
    "addressLine1": "666 Đường Nguyễn Trãi",
    "addressLine2": "Cửa hàng thời trang XYZ",
    "city": "Hồ Chí Minh",
    "state": "TP.HCM",
    "postalCode": "700000",
    "country": "Việt Nam"
  },
  "billingAddress": {
    "addressLine1": "666 Đường Nguyễn Trãi",
    "addressLine2": "Cửa hàng thời trang XYZ",
    "city": "Hồ Chí Minh",
    "state": "TP.HCM",
    "postalCode": "700000",
    "country": "Việt Nam"
  },
  "paymentMethod": "paypal"
}
```
**Sản phẩm**: Áo thun nam - 3 variant khác nhau (S-Trắng, M-Xanh, L-Đỏ)

## 9. JSON Test Case Mix sản phẩm có và không có variant

```json
{
  "items": [
    {
      "product": "PRODUCT_ID_SIMPLE",
      "quantity": 1
    },
    {
      "product": "PRODUCT_ID_IPHONE",
      "variantId": "VARIANT_ID_IPHONE_256_TITANIUM_BLUE",
      "quantity": 2
    },
    {
      "product": "PRODUCT_ID_BULK",
      "quantity": 1
    },
    {
      "product": "PRODUCT_ID_KEM_DUONG_DA",
      "variantId": "VARIANT_ID_KEM_DUONG_DA_THUONG_30ML",
      "quantity": 3
    },
    {
      "product": "PRODUCT_ID_ROBOT_TOY",
      "variantId": "VARIANT_ID_ROBOT_TOY_TRANG_NANG_CAO",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "addressLine1": "777 Đường Lê Văn Sỹ",
    "city": "Hà Nội",
    "state": "Hà Nội",
    "postalCode": "100000",
    "country": "Việt Nam"
  },
  "billingAddress": {
    "addressLine1": "777 Đường Lê Văn Sỹ",
    "city": "Hà Nội",
    "state": "Hà Nội",
    "postalCode": "100000",
    "country": "Việt Nam"
  },
  "paymentMethod": "bank_transfer"
}
```
**Sản phẩm**: Mix 5 sản phẩm có và không có variant

## 10. JSON Test Case Điện thoại với nhiều variant

```json
{
  "items": [
    {
      "product": "PRODUCT_ID_IPHONE",
      "variantId": "VARIANT_ID_IPHONE_128_TITANIUM",
      "quantity": 1
    },
    {
      "product": "PRODUCT_ID_IPHONE",
      "variantId": "VARIANT_ID_IPHONE_256_TITANIUM_BLUE",
      "quantity": 2
    },
    {
      "product": "PRODUCT_ID_IPHONE",
      "variantId": "VARIANT_ID_IPHONE_512_TITANIUM_WHITE",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "addressLine1": "888 Đường Cầu Giấy",
    "addressLine2": "Tòa nhà TechHub, Tầng 15",
    "city": "Hà Nội",
    "state": "Hà Nội",
    "postalCode": "100000",
    "country": "Việt Nam"
  },
  "billingAddress": {
    "addressLine1": "888 Đường Cầu Giấy",
    "addressLine2": "Tòa nhà TechHub, Tầng 15",
    "city": "Hà Nội",
    "state": "Hà Nội",
    "postalCode": "100000",
    "country": "Việt Nam"
  },
  "paymentMethod": "credit_card"
}
```
**Sản phẩm**: iPhone 15 Pro Max - 3 variant khác nhau (128GB, 256GB, 512GB)

## 11. JSON Test Case Giày thể thao với nhiều size và màu

```json
{
  "items": [
    {
      "product": "PRODUCT_ID_GIAY_NIKE",
      "variantId": "VARIANT_ID_GIAY_NIKE_40_TRANG",
      "quantity": 2
    },
    {
      "product": "PRODUCT_ID_GIAY_NIKE",
      "variantId": "VARIANT_ID_GIAY_NIKE_41_DEN",
      "quantity": 1
    },
    {
      "product": "PRODUCT_ID_GIAY_NIKE",
      "variantId": "VARIANT_ID_GIAY_NIKE_42_XANH",
      "quantity": 3
    },
    {
      "product": "PRODUCT_ID_GIAY_NIKE",
      "variantId": "VARIANT_ID_GIAY_NIKE_43_DO",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "addressLine1": "999 Đường Nguyễn Thị Minh Khai",
    "city": "Hồ Chí Minh",
    "state": "TP.HCM",
    "postalCode": "700000",
    "country": "Việt Nam"
  },
  "billingAddress": {
    "addressLine1": "999 Đường Nguyễn Thị Minh Khai",
    "city": "Hồ Chí Minh",
    "state": "TP.HCM",
    "postalCode": "700000",
    "country": "Việt Nam"
  },
  "paymentMethod": "paypal"
}
```
**Sản phẩm**: Giày Nike Air Max - 4 variant khác nhau (Size 40-43, Màu sắc khác nhau)

## 12. JSON Test Case Laptop với nhiều cấu hình

```json
{
  "items": [
    {
      "product": "PRODUCT_ID_DELL_XPS",
      "variantId": "VARIANT_ID_DELL_XPS_16_512",
      "quantity": 1
    },
    {
      "product": "PRODUCT_ID_DELL_XPS",
      "variantId": "VARIANT_ID_DELL_XPS_32_1TB",
      "quantity": 2
    },
    {
      "product": "PRODUCT_ID_MACBOOK_PRO",
      "variantId": "VARIANT_ID_MACBOOK_PRO_18_512",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "addressLine1": "111 Đường Pasteur",
    "addressLine2": "Công ty ABC Technology",
    "city": "Hồ Chí Minh",
    "state": "TP.HCM",
    "postalCode": "700000",
    "country": "Việt Nam"
  },
  "billingAddress": {
    "addressLine1": "111 Đường Pasteur",
    "addressLine2": "Công ty ABC Technology",
    "city": "Hồ Chí Minh",
    "state": "TP.HCM",
    "postalCode": "700000",
    "country": "Việt Nam"
  },
  "paymentMethod": "bank_transfer"
}
```
**Sản phẩm**: Dell XPS 13 + MacBook Pro 14 - Các cấu hình khác nhau

## 13. JSON Test Case Mỹ phẩm với nhiều variant

```json
{
  "items": [
    {
      "product": "PRODUCT_ID_SON_MOI",
      "variantId": "VARIANT_ID_SON_MOI_DA_THUONG_DO_ANH_DAO",
      "quantity": 2
    },
    {
      "product": "PRODUCT_ID_SON_MOI",
      "variantId": "VARIANT_ID_SON_MOI_DA_KHO_HONG_THUY",
      "quantity": 1
    },
    {
      "product": "PRODUCT_ID_KEM_DUONG_DA",
      "variantId": "VARIANT_ID_KEM_DUONG_DA_THUONG_30ML",
      "quantity": 3
    },
    {
      "product": "PRODUCT_ID_KEM_DUONG_DA",
      "variantId": "VARIANT_ID_KEM_DUONG_DA_KHO_50ML",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "addressLine1": "222 Đường Lê Duẩn",
    "city": "Đà Nẵng",
    "state": "Đà Nẵng",
    "postalCode": "550000",
    "country": "Việt Nam"
  },
  "billingAddress": {
    "addressLine1": "222 Đường Lê Duẩn",
    "city": "Đà Nẵng",
    "state": "Đà Nẵng",
    "postalCode": "550000",
    "country": "Việt Nam"
  },
  "paymentMethod": "credit_card"
}
```
**Sản phẩm**: Son môi + Kem dưỡng da - Các variant khác nhau

## 14. JSON Test Case Đồng hồ với nhiều variant

```json
{
  "items": [
    {
      "product": "PRODUCT_ID_ROLEX",
      "variantId": "VARIANT_ID_ROLEX_THEP_VANG",
      "quantity": 1
    },
    {
      "product": "PRODUCT_ID_ROLEX",
      "variantId": "VARIANT_ID_ROLEX_THEP_DEN",
      "quantity": 2
    },
    {
      "product": "PRODUCT_ID_OMEGA",
      "variantId": "VARIANT_ID_OMEGA_THEP_XANH",
      "quantity": 1
    },
    {
      "product": "PRODUCT_ID_OMEGA",
      "variantId": "VARIANT_ID_OMEGA_THEP_DEN",
      "quantity": 3
    }
  ],
  "shippingAddress": {
    "addressLine1": "333 Đường Hai Bà Trưng",
    "addressLine2": "Showroom đồng hồ cao cấp",
    "city": "Hồ Chí Minh",
    "state": "TP.HCM",
    "postalCode": "700000",
    "country": "Việt Nam"
  },
  "billingAddress": {
    "addressLine1": "333 Đường Hai Bà Trưng",
    "addressLine2": "Showroom đồng hồ cao cấp",
    "city": "Hồ Chí Minh",
    "state": "TP.HCM",
    "postalCode": "700000",
    "country": "Việt Nam"
  },
  "paymentMethod": "paypal"
}
```
**Sản phẩm**: Rolex Submariner + Omega Seamaster - Các variant khác nhau

## 15. JSON Test Case Đơn hàng lớn với nhiều sản phẩm và variant

```json
{
  "items": [
    {
      "product": "PRODUCT_ID_BULK",
      "quantity": 5
    },
    {
      "product": "PRODUCT_ID_AO_THUN",
      "variantId": "VARIANT_ID_AO_THUN_S_TRANG",
      "quantity": 3
    },
    {
      "product": "PRODUCT_ID_AO_THUN",
      "variantId": "VARIANT_ID_AO_THUN_M_XANH",
      "quantity": 2
    },
    {
      "product": "PRODUCT_ID_GIAY_NIKE",
      "variantId": "VARIANT_ID_GIAY_NIKE_40_TRANG",
      "quantity": 4
    },
    {
      "product": "PRODUCT_ID_IPHONE",
      "variantId": "VARIANT_ID_IPHONE_128_TITANIUM",
      "quantity": 1
    },
    {
      "product": "PRODUCT_ID_IPHONE",
      "variantId": "VARIANT_ID_IPHONE_256_TITANIUM_BLUE",
      "quantity": 2
    },
    {
      "product": "PRODUCT_ID_LEGO",
      "variantId": "VARIANT_ID_LEGO_XE_DUA_1000",
      "quantity": 3
    }
  ],
  "shippingAddress": {
    "addressLine1": "444 Đường Nguyễn Huệ",
    "addressLine2": "Kho hàng trung tâm",
    "city": "Hồ Chí Minh",
    "state": "TP.HCM",
    "postalCode": "700000",
    "country": "Việt Nam"
  },
  "billingAddress": {
    "addressLine1": "555 Đường Lê Lợi",
    "addressLine2": "Văn phòng công ty",
    "city": "Hồ Chí Minh",
    "state": "TP.HCM",
    "postalCode": "700000",
    "country": "Việt Nam"
  },
  "paymentMethod": "bank_transfer"
}
```
**Sản phẩm**: Mix 7 sản phẩm khác nhau với nhiều variant

## 16. JSON Test Case Sản phẩm thời trang với nhiều size và màu

```json
{
  "items": [
    {
      "product": "PRODUCT_ID_AO_THUN",
      "variantId": "VARIANT_ID_AO_THUN_S_TRANG",
      "quantity": 2
    },
    {
      "product": "PRODUCT_ID_AO_THUN",
      "variantId": "VARIANT_ID_AO_THUN_M_XANH",
      "quantity": 1
    },
    {
      "product": "PRODUCT_ID_AO_THUN",
      "variantId": "VARIANT_ID_AO_THUN_L_DO",
      "quantity": 3
    },
    {
      "product": "PRODUCT_ID_GIAY_NIKE",
      "variantId": "VARIANT_ID_GIAY_NIKE_40_TRANG",
      "quantity": 1
    },
    {
      "product": "PRODUCT_ID_GIAY_NIKE",
      "variantId": "VARIANT_ID_GIAY_NIKE_41_DEN",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "addressLine1": "666 Đường Đồng Khởi",
    "city": "Hồ Chí Minh",
    "state": "TP.HCM",
    "postalCode": "700000",
    "country": "Việt Nam"
  },
  "billingAddress": {
    "addressLine1": "666 Đường Đồng Khởi",
    "city": "Hồ Chí Minh",
    "state": "TP.HCM",
    "postalCode": "700000",
    "country": "Việt Nam"
  },
  "paymentMethod": "credit_card"
}
```
**Sản phẩm**: Áo thun + Giày Nike - Nhiều size và màu sắc

## 17. JSON Test Case Đồ chơi với nhiều phiên bản

```json
{
  "items": [
    {
      "product": "PRODUCT_ID_LEGO",
      "variantId": "VARIANT_ID_LEGO_XE_DUA_1000",
      "quantity": 2
    },
    {
      "product": "PRODUCT_ID_LEGO",
      "variantId": "VARIANT_ID_LEGO_NHA_CUA_1000",
      "quantity": 1
    },
    {
      "product": "PRODUCT_ID_ROBOT_TOY",
      "variantId": "VARIANT_ID_ROBOT_TOY_XANH_CO_BAN",
      "quantity": 3
    },
    {
      "product": "PRODUCT_ID_ROBOT_TOY",
      "variantId": "VARIANT_ID_ROBOT_TOY_DO_CO_BAN",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "addressLine1": "777 Đường Lê Văn Việt",
    "addressLine2": "Cửa hàng đồ chơi trẻ em",
    "city": "Hồ Chí Minh",
    "state": "TP.HCM",
    "postalCode": "700000",
    "country": "Việt Nam"
  },
  "billingAddress": {
    "addressLine1": "777 Đường Lê Văn Việt",
    "addressLine2": "Cửa hàng đồ chơi trẻ em",
    "city": "Hồ Chí Minh",
    "state": "TP.HCM",
    "postalCode": "700000",
    "country": "Việt Nam"
  },
  "paymentMethod": "cash_on_delivery"
}
```
**Sản phẩm**: LEGO Creator + Robot đồ chơi - Nhiều phiên bản khác nhau

## Mapping ID thực tế

Sau khi tạo sản phẩm từ database, thay thế các ID sau:

### Product IDs:
- `PRODUCT_ID_SIMPLE` → ID của "Sản phẩm đơn giản không có variant"
- `PRODUCT_ID_AO_THUN` → ID của "Áo thun nam cao cấp"
- `PRODUCT_ID_IPHONE` → ID của "iPhone 15 Pro Max"
- `PRODUCT_ID_GIAY_NIKE` → ID của "Giày thể thao Nike Air Max"
- `PRODUCT_ID_DELL_XPS` → ID của "Laptop Dell XPS 13"
- `PRODUCT_ID_MACBOOK_PRO` → ID của "MacBook Pro 14 inch"
- `PRODUCT_ID_SON_MOI` → ID của "Son môi cao cấp"
- `PRODUCT_ID_KEM_DUONG_DA` → ID của "Kem dưỡng da ban đêm"
- `PRODUCT_ID_ROLEX` → ID của "Đồng hồ Rolex Submariner"
- `PRODUCT_ID_OMEGA` → ID của "Đồng hồ Omega Seamaster"
- `PRODUCT_ID_LEGO` → ID của "Bộ đồ chơi LEGO Creator"
- `PRODUCT_ID_ROBOT_TOY` → ID của "Robot đồ chơi thông minh"
- `PRODUCT_ID_BULK` → ID của "Sản phẩm số lượng lớn"

### Variant IDs (sẽ được tạo tự động):
- `VARIANT_ID_AO_THUN_S_TRANG` → ID của variant Size S, Màu Trắng
- `VARIANT_ID_AO_THUN_M_XANH` → ID của variant Size M, Màu Xanh
- `VARIANT_ID_AO_THUN_L_DO` → ID của variant Size L, Màu Đỏ
- `VARIANT_ID_IPHONE_128_TITANIUM` → ID của variant 128GB, Titanium Tự nhiên
- `VARIANT_ID_IPHONE_256_TITANIUM_BLUE` → ID của variant 256GB, Titanium Xanh
- `VARIANT_ID_IPHONE_512_TITANIUM_WHITE` → ID của variant 512GB, Titanium Trắng
- `VARIANT_ID_GIAY_NIKE_40_TRANG` → ID của variant Size 40, Màu Trắng
- `VARIANT_ID_GIAY_NIKE_41_DEN` → ID của variant Size 41, Màu Đen
- `VARIANT_ID_GIAY_NIKE_42_XANH` → ID của variant Size 42, Màu Xanh
- `VARIANT_ID_GIAY_NIKE_43_DO` → ID của variant Size 43, Màu Đỏ
- Và các variant khác...

## Cách sử dụng:

1. **Tạo sản phẩm** từ file `create-products-for-testing.json`
2. **Lưu lại các ID** thực tế từ response
3. **Thay thế** các placeholder ID trong test cases
4. **Test API** createOrder với các JSON đã cập nhật -->
