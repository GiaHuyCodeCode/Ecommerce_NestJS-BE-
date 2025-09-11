# Tóm tắt Category IDs và Mapping sản phẩm

## Category IDs thực tế từ database:

| ID | Tên Category | Mô tả |
|---|---|---|
| `68c13cbe79030c79b3be42a0` | Laptops | Laptop, máy tính xách tay |
| `68c238afd4f800c0b623385d` | Thời trang | Quần áo, giày dép, phụ kiện thời trang |
| `68c238afd4f800c0b623385e` | Điện tử | Điện thoại, laptop, máy tính bảng |
| `68c238afd4f800c0b623385f` | Mỹ phẩm | Son môi, kem dưỡng da, mỹ phẩm trang điểm |
| `68c238afd4f800c0b6233860` | Đồng hồ | Đồng hồ đeo tay, đồng hồ treo tường |
| `68c238afd4f800c0b6233861` | Đồ chơi | Đồ chơi trẻ em, đồ chơi giáo dục |

## Mapping sản phẩm với Category:

### Thời trang (`68c238afd4f800c0b623385d`):
- Áo thun nam cao cấp (ATN001)
- Giày thể thao Nike Air Max (NAM001)
- Sản phẩm đơn giản không có variant (SPDG001)
- Sản phẩm số lượng lớn (SPSL001)

### Điện tử (`68c238afd4f800c0b623385e`):
- iPhone 15 Pro Max (IP15PM001)

### Laptops (`68c13cbe79030c79b3be42a0`):
- Laptop Dell XPS 13 (DXPS13001)
- MacBook Pro 14 inch (MBP14001)

### Mỹ phẩm (`68c238afd4f800c0b623385f`):
- Son môi cao cấp (SM001)
- Kem dưỡng da ban đêm (KDD001)

### Đồng hồ (`68c238afd4f800c0b6233860`):
- Đồng hồ Rolex Submariner (RS001)
- Đồng hồ Omega Seamaster (OS001)

### Đồ chơi (`68c238afd4f800c0b6233861`):
- Bộ đồ chơi LEGO Creator (LC001)
- Robot đồ chơi thông minh (RT001)

## Files đã được cập nhật:

1. **`create-products-for-testing.json`** - Đã cập nhật tất cả Category IDs
2. **`test-create-order-with-real-products.md`** - Đã thêm Category IDs vào phần lưu ý
3. **`huong-dan-tao-san-pham.md`** - Đã cập nhật hướng dẫn

## Bước tiếp theo:

1. Sử dụng file `create-products-for-testing.json` để tạo sản phẩm
2. Lưu lại Product IDs và Variant IDs từ response
3. Thay thế các placeholder trong `test-create-order-with-real-products.md`
4. Test API createOrder với các JSON đã cập nhật
