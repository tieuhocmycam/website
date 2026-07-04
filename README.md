# 🏫 Website Trường Tiểu học Mỹ Cẩm
**Xã Mỹ Cẩm, Huyện Càng Long, Tỉnh Trà Vinh**


---

## 📁 Cấu trúc thư mục

```
TH Mỹ Cẩm/
├── index.html              → Trang chủ
├── css/
│   └── style.css           → CSS toàn bộ (responsive, animations)
├── js/
│   └── main.js             → JavaScript chính
├── images/                 → Thư mục ảnh (thêm ảnh thật vào đây)
│   ├── slide1.jpg          → Ảnh Hero Slider 1
│   ├── slide2.jpg          → Ảnh Hero Slider 2
│   └── slide3.jpg          → Ảnh Hero Slider 3
└── pages/
    ├── gioi-thieu.html     → Giới thiệu trường
    ├── tin-tuc.html        → Tin tức & Sự kiện
    ├── kho-tai-lieu.html   → Kho Tài liệu số
    ├── tuyen-sinh.html     → Tuyển sinh lớp 1
    ├── thu-vien-anh.html   → Thư viện ảnh
    ├── lien-he.html        → Liên hệ
    └── login.html          → Đăng nhập nội bộ (GV/BGH)
```

---

## 🎨 Hệ thống màu sắc

| Biến | Mã màu | Dùng cho |
|---|---|---|
| `--primary` | `#1A6FB5` | Màu chủ đạo xanh dương |
| `--secondary` | `#F5A623` | Màu vàng ấm – nút CTA |
| `--accent` | `#2ECC71` | Màu xanh lá – nhấn |
| `--danger` | `#E74C3C` | Thông báo khẩn – ticker |
| `--bg` | `#F4F7FC` | Nền trang |

---

## 🌐 Hướng dẫn đưa lên hosting miễn phí

### Bước 1 – Đưa lên GitHub
```bash
git init
git add .
git commit -m "Initial commit - TH My Cam website"
git remote add origin https://github.com/ten-truong/thmycam.git
git push -u origin main
```

### Bước 2 – Deploy lên Vercel (miễn phí)
1. Truy cập [vercel.com](https://vercel.com) → Đăng nhập bằng GitHub
2. Click **"New Project"** → Chọn repo vừa tạo
3. Click **"Deploy"** → Vercel tự động deploy
4. Website sẽ có địa chỉ: `thmycam.vercel.app`

### Bước 3 – Trỏ tên miền .edu.vn (nếu có)
- Mua tên miền `thmycam.edu.vn` tại VNPT hoặc Viettel
- Cấu hình DNS CNAME trỏ về Vercel

---

## 📋 Checklist trước khi đưa lên mạng

- [ ] Thay tất cả `img-placeholder` bằng ảnh thật của trường
- [ ] Cập nhật số điện thoại thật (hiện: 0235 123 456)
- [ ] Cập nhật email thật (hiện: thmycam@vinhlongedu.vn)
- [ ] Kiểm tra bản đồ Google Maps hiển thị đúng vị trí
- [ ] Kết nối Google Sheets cho form đăng ký tuyển sinh
- [ ] Test responsive trên điện thoại Android/iPhone
- [ ] Cài SSL certificate (Vercel tự động có)

---

## 🔐 Phân quyền truy cập

| Vai trò | Tài khoản | Quyền truy cập |
|---|---|---|
| Khách (PH/HS) | Không cần | Trang chủ, Tin tức, Tài liệu công khai |
| Giáo viên | Tài khoản trường cấp | Tài liệu nội bộ, nhập số liệu lớp |
| Ban Giám Hiệu | Tài khoản BGH | Toàn bộ hệ thống, báo cáo |
| Quản trị | Admin | Quản lý tài khoản, cài đặt hệ thống |

---

## 📞 Thông tin liên hệ

- **Trường:** Tiểu học Mỹ Cẩm
- **Địa chỉ:** Xã Càng Long, Huyện Càng Long, Tỉnh Vĩnh Long
- **Điện thoại:** (0235) 123 456
- **Email:** thmycam@vinhlongedu.vn

---

*Thiết kế bởi đội CNTT Trường Tiểu học Mỹ Cẩm · 2025*
