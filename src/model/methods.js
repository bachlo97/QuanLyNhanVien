import { dsnv, touches, listEle, errors, validationMapper, mapper } from "../index.js";
// import EmployeesList from "./model/employees-list.js";
// import Employee from "./model/employee.js";
export function setTouches(value) {
  listEle.forEach((ele) => (touches[ele.id] = value));
}

function print() {
  console.log(1234567);
}
export function domId(id) {
  return document.getElementById(id);
}

export function isValid() {
  // TH1: Nếu chưa nhập gì hết mà đã nhấn submit
  if (Object.values(errors).length !== listEle.length) {
    // set tất cả về true
    setTouches(true);
    // Lặp qua để set lại message lỗi của mỗi ô input
    listEle.forEach((ele) => {
      handleValidate({
        target: {
          id: ele.id,
          value: ele.value,
        },
      });
    });
    return false;
  }

  // TH2: Đã nhập đầy đủ
  // 1. Tất cả cả ô input đã từng đi qua
  var isTouch = Object.values(touches).every(function (item) {
    return item;
  });

  // 2. Không được có message lỗi
  var isMessage = Object.values(errors).every(function (item) {
    return item.length === 0;
  });

  return isTouch && isMessage;
}

function handleValidate(event) {
  const id = event.target.id;
  const value = event.target.value;
  errors[id] = validationMapper[id](value);
}

export function renderErrors() {
  ;
  listEle.forEach(function (ele) {
    let thuocTinh = ele.id;
    let isShow = errors[thuocTinh] != undefined && touches[thuocTinh];

    if (!isShow) {
      // Dừng chạy hàm, không show message
      return;
    }
    document.getElementById(mapper[thuocTinh]).innerHTML = errors[thuocTinh]
    document.getElementById(mapper[thuocTinh]).style.display = 'block'
  });
}

export function deleteErrors() {
  for (var key in errors) {
    delete errors[key];
  }
}

export function handleBlur(event) {
  // event.target: chính là ô input của chúng ta.
  touches[event.target.id] = true; // true: đã từng đi qua ô input

  console.dir(touches);
  // Validate sau khi blur
  handleValidate(event);
  // Hiện errors mỗi khi người dùng blur khỏi ô input
  renderErrors();

}

// == Function Tạo mới nhân viên ==
export function createNhanVien(nhanVien) {
  const { taiKhoan, email } = nhanVien;

  if (dsnv.danhSachNhanVien.some(item => item.taiKhoan === taiKhoan || item.email === email)) {
    alert('Tên tài khoản hoặc email đã bị trùng với người dùng khác. Vui lòng nhập lại.');
  } else {
    dsnv.addEmployee(nhanVien);
  }
}

// == Function Cập nhật sinh viên ==
export function updateNhanVien(nhanVien) {
  // Đôi khi chúng ta mong muốn xử lý thêm logic
  dsnv.updateEmployee(nhanVien);

  // Sau khi update xong thì chuyển trạng thái form về dạng create
  isEdit = false;

  // Mở lại input msv cho người dùng nhập sau khi cập nhật
  var inp = document.querySelector("input#tknv");
  inp.disabled = false;
}

//* == LocalStorage
export function luuDanhSachNhanVienLocal() {
  localStorage.setItem("dsnv", JSON.stringify(dsnv.danhSachNhanVien));
}

export function layDanhSachNhanVienLocal() {
  var res = localStorage.getItem("dsnv");

  // Kiểm tra xem thử localStorage có chứa dữ liệu của key: dsn hay không.
  if (res) {
    return JSON.parse(res);
  }

  return [];
}

export function renderTable(danhSachNhanVien) {
  let eleHtml = ``;
  if (!danhSachNhanVien) {
    danhSachNhanVien = dsnv.danhSachNhanVien;
  }
  // f2 đổi tên toàn bộ biến.
  danhSachNhanVien.forEach(function (nv) {
    // Chúng ta không thể truyền trực tiếp giá trị object sv vào function inline được.
    eleHtml += `
        <tr>
          <td>${nv.taiKhoan}</td>
          <td>${nv.hoTen}</td>
          <td>${nv.email}</td>
          <td>${nv.ngayLam}</td>
          <td>${nv.chucVu}</td>
          <td>${new Intl.NumberFormat('vn-VN').format(nv.tongLuong)}</td>
          <td>${nv.xepLoaiNhanVien}</td>
        
          <td>
              <button onclick="chinhSuaNhanVien('${nv.taiKhoan
      }')" class="btn btn-warning">Sửa</button>
              <button onclick="xoaNhanVien('${nv.taiKhoan
      }')" class="btn btn-danger">Xóa</button>
          </td>
        </tr>
      `;
  });

  let tbody = document.querySelector("#tableDanhSach");

  tbody.innerHTML = eleHtml;
}


export function init() {
  var danhSanhNhanVien = layDanhSachNhanVienLocal();
  dsnv.danhSachNhanVien = danhSanhNhanVien;
  renderTable();
}

export function chinhSuaNhanVien(taiKhoan) {
  let nhanVien = dsnv.findEmployeeAccout(taiKhoan);
  document.getElementById('myModal').style.display = 'block'
  renderDuLieuLenForm(nhanVien);
}

function renderDuLieuLenForm(nv) {
  listEle.forEach(function (ele) {
    var thuocTinh = mapper[ele.id];

    ele.value = nv[thuocTinh];

    // Chặn không cho phép người dùng chỉnh sửa maSinhVien.
    if (ele.id === "tknv" || ele.id === 'email') {
      ele.disabled = true;
    }
  });

  isEdit = true;
}