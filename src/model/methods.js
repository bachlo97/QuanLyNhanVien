import Employee from "./employee.js";
import {
  dsnv,
  touches,
  listEle,
  errors,
  validationMapper,
  mapper,
  mapperEmployee
} from "../index.js";

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
  let isTouch = Object.values(touches).every(function (item) {
    return item;
  });

  // 2. Không được có message lỗi
  let isMessage = Object.values(errors).every(function (item) {
    return item.length === 0;
  });
  return isTouch && isMessage;
}

function handleValidate(event) {
  const id = event.target.id;
  const value = event.target.value;
  //! Phần được cộng điểm
  errors[id] = validationMapper[id](value);
}

export function renderErrors() {
  listEle.forEach(function (ele) {
    let thuocTinh = ele.id;
    let isShow = errors[thuocTinh] != undefined && touches[thuocTinh];

    if (!isShow) {
      // Dừng chạy hàm, không show message
      return;
    }
    document.getElementById(mapper[thuocTinh]).innerHTML = errors[thuocTinh];
    document.getElementById(mapper[thuocTinh]).style.display = "block";
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
export function addNhanVien(nhanVien) {
  const { taiKhoan, email } = nhanVien;

  if (
    dsnv.danhSachNhanVien.some(
      (item) => item.taiKhoan === taiKhoan || item.email === email
    )
  ) {
    alert(
      "Tên tài khoản hoặc email đã bị trùng với người dùng khác. Vui lòng nhập lại."
    );
  } else {
    dsnv.addEmployee(nhanVien);
  }
}

// == Function Cập nhật sinh viên ==
export function updateNhanVien(nhanVien) {
  // Đôi khi chúng ta mong muốn xử lý thêm logic
  dsnv.updateEmployee(nhanVien);

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
          <td>${new Intl.NumberFormat("vn-VN").format(nv.tongLuong)}</td>
          <td>${nv.xepLoaiNhanVien}</td>
        
          <td>
              <button id= btnSua${nv.taiKhoan
      } class="btn btn-warning" data-toggle='modal' data-target='#myModal'>Sửa</button>
              <button id= btnXoa${nv.taiKhoan
              } class="btn btn-danger">Xóa</button>
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
  renderDuLieuLenForm(nhanVien);
}

// == Xóa Sinh Viên ==
export function xoaNhanVien(taiKhoan) {
  dsnv.deleteEmployee(taiKhoan);

  // render lại table
  renderTable();

  //Gắn lại sự kiện onclick cho nút xóa vì sau khi render lại table thì các nút xóa sẽ được làm mới => mất đi onclick
  addClickEventForEditBtn()
  // cập nhật lại storage
  luuDanhSachNhanVienLocal();
}

function renderDuLieuLenForm(nv) {
  listEle.forEach(function (ele) {
    var thuocTinh = mapperEmployee[ele.id];

    ele.value = nv[thuocTinh];

    // Chặn không cho phép người dùng chỉnh sửa maSinhVien.
    if (ele.id === "tknv" || ele.id === "email") {
      ele.disabled = true;
    }
  });

}

export function addClickEventForEditBtn() {
  if (dsnv.danhSachNhanVien.length == 0) return;
  dsnv.danhSachNhanVien.forEach((item) => {

    domId(`btnSua${item.taiKhoan}`).onclick = () => {
      chinhSuaNhanVien(item.taiKhoan);
      domId('btnThemNV').disabled = true
      domId("btnCapNhat").disabled = false;
      domId('password').type = 'text'
    };

    domId(`btnXoa${item.taiKhoan}`).onclick = () =>{
      xoaNhanVien(item.taiKhoan)
    }
  });
}


export function createEmployee() {
  let nv = {};
  listEle.forEach((ele) => (nv[ele.id] = ele.value));
  let { tknv, name, email, password, datepicker, luongCB, chucvu, gioLam } = nv;
  let nhanVien = new Employee(
    tknv,
    name,
    email,
    password,
    datepicker,
    luongCB,
    chucvu,
    gioLam
  );
  return nhanVien;
}

