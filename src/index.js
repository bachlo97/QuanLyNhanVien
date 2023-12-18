// import Employee, {OVER_160H,OVER_176H,OVER_192H}  from "./model/employee.js";
import EmployeesList from "./model/employees-list.js";

const dsnv = new EmployeesList()
let isEdit = false;
let listEle = document.querySelectorAll(
    ".modal-body input.form-control:not([disabled]),.modal-body select.form-control,.form-control#tknv"
  );