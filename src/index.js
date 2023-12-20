// import Employee, {OVER_160H,OVER_176H,OVER_192H}  from "./model/employee.js";
import EmployeesList from "./model/employees-list.js";
import Employee from "./model/employee.js";
import {
  setTouches,
  domId,
  isValid,
  handleBlur,
  renderErrors,
  deleteErrors,
  createNhanVien,
  luuDanhSachNhanVienLocal,
  layDanhSachNhanVienLocal,
  renderTable,
  init,
  addClickEventForEditBtn
} from "./model/methods.js";
import { Validator } from "./model/validator.js";
export const dsnv = new EmployeesList();
export const touches = {};
export const errors = {};
// document.querySelector('img.ui-datepicker-trigger').onclick = function(){
//   alert(123)
// }
// console.log(linkToFocus)
// let inputToFocus = document.getElementById('inputToFocus');

export const mapper = {
  tknv: "tbTKNV",
  name: "tbTen",
  email: "tbEmail",
  password: "tbMatKhau",
  datepicker: "tbNgay",
  luongCB: "tbLuongCB",
  chucvu: "tbChucVu",
  gioLam: "tbGiolam",
};

export const mapperEmployee = {
  tknv: "taiKhoan",
  name: "hoTen",
  email: "email",
  password: "password",
  datepicker: "ngayLam",
  luongCB: "luongCoBan",
  chucvu: "chucVu",
  gioLam: "gioLam",
}

export const validationMapper = {
  tknv: (value) =>
    new Validator(value)
      .require()
      .checkAccount()
      .checkLenAccount(4, 6)
      .getMessage(),
  name: (value) => new Validator(value).require().checkName().getMessage(),
  email: (value) => new Validator(value).require().checkEmail().getMessage(),
  password: (value) =>
    new Validator(value).require().checkPassword().min(6).max(10).getMessage(),
  datepicker: (value) =>
    new Validator(value).require().checkDay().checkDateLimit().getMessage(),
  luongCB: (value) =>
    new Validator(value).require().checkSalary().min(1e6).max(2e7).getMessage(),
  chucvu: (value) => new Validator(value).require().getMessage(),
  gioLam: (value) =>
    new Validator(value).require().checkHour().min(80).max(200).getMessage(),
};
export let listEle = document.querySelectorAll(
  ".modal-body input.form-control:not([disabled]),.modal-body select.form-control,.form-control#tknv"
);
setTouches(false);

console.log(touches);

init();

//* Disable Update button when you wanna add employee
domId("btnThem").onclick = () => {
  domId("btnCapNhat").disabled = true;
  domId("btnThemNV").disabled = false;
  domId('tknv').disabled = false;
  domId('email').disabled =false;
  domId('password').type = 'password'
};

//* --Validate--
listEle.forEach(function (ele) {
  ele.onblur = handleBlur;
});

// //*  Ngăn chăn việc click thẻ con có class .modal-content sẽ tác động lên thẻ cha có id #myModal
document.querySelector(".modal-content").onclick = (event) => {
  if (event.target.id !== "btnDong") {
    event.stopPropagation();
  }
};

//* reset form when close modal by  click close button or click outside modal
let buttonGroup = document.querySelectorAll("#myModal,#btnDong");
buttonGroup.forEach((ele) => {
  ele.onclick = () => {
    listEle.forEach((ele) => {
      domId(mapper[ele.id]).innerHTML = "";
      ele.value = "";
    });
    deleteErrors();
  };
});

// * add user
domId("btnThemNV").onclick = () => {
  if (!isValid()) {
    renderErrors();
    return;
  }

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

  // lưu vào danhSachSinhVien
  createNhanVien(nhanVien);

  listEle.forEach((ele) => (ele.value = ""));

  console.log("dsnv", dsnv.danhSachNhanVien);

  // luu vào localStorage
  luuDanhSachNhanVienLocal();

  renderTable();

  addClickEventForEditBtn();
};
// deleteErrors()
console.log(dsnv.danhSachNhanVien);
addClickEventForEditBtn();
