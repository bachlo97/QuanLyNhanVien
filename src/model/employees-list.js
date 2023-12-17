class EmployeesList {
  constructor() {
    this.danhSachNhanVien = [];
  }

  addEmployee(nv) {
    this.danhSachNhanVien.push(nv);
  }

  deleteEmployee(taiKhoan) {
    if (this.danhSachNhanVien.length === 0) return;

    var newDSNV = this.danhSachNhanVien.filter(function (nv) {
      return !(nv.taiKhoan === taiKhoan);
    });
    
    this.danhSachNhanVien = newDSNV;
  }

  findEmployeeType() {}

  findEmployeeAccout() {}
}

export default EmployeesList;
