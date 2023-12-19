// import Employee, {OVER_160H,OVER_176H,OVER_192H}  from "./model/employee.js";
import EmployeesList from "./model/employees-list.js";
import { setTouches, domId, isValid } from "./model/methods.js";
import { Validator } from "./model/validator.js";

export const dsnv = new EmployeesList()
export const touches = {};
export const errors = {};
let isEdit = false;


const validationMapper = {
  tknv: (value) => new Validator(value).require().checkAccount().checkLenAccount(4,6).getMessage(),
  name: (value) => new Validator(value).require().checkName().getMessage(),
  email: (value) => new Validator(value).require().checkEmail().getMessage(),
  passWord: (value) => new Validator(value).require().checkPassword().min(6).max(10).getMessage(),
  datepicker: (value) => new Validator(value).require().checkDay().checkDateLimit().getMessage(),
  luongCB: (value) => new Validator(value).require().checkSalary().min(1e+6).max(2e+7).getMessage(),
  chucvu: (value) => new Validator(value).require().getMessage(),
  gioLam: (value) => new Validator(value).require().checkHour().min(80).max(200).getMessage(),
};

export let listEle = document.querySelectorAll(
  ".modal-body input.form-control:not([disabled]),.modal-body select.form-control,.form-control#tknv"
);
setTouches(false)

console.log(touches)
//Disable Update button when you wanna add employee
domId('btnThem').onclick = () => {
  domId('btnCapNhat').disabled = true
  domId('btnThemNV').disabled = false
}

domId('btnThemNV').onclick = () => {
  if (!isValid()) {
    renderErrors();
    return;
  }
}

