class EmployeesList {
  constructor() {
    this.danhSachNhanVien = [];
  }

  addEmployee(nv) {
    this.danhSachNhanVien.push(nv);
  }

  deleteEmployee(taiKhoan) {
    if (this.danhSachNhanVien.length === 0) return;

    var newDSNV = this.danhSachNhanVien.filter((nv) => {
      return !(nv.taiKhoan === taiKhoan);
    });

    this.danhSachNhanVien = newDSNV;
  }

  findEmployeeAccout(taiKhoan) {
    if (taiKhoan === undefined || taiKhoan === "") return; 
    return this.danhSachNhanVien.find((nv) => {
      return nv.taiKhoan === taiKhoan;
    });
  }

  findEmployeeType(loaiNV) { 
    
    if (loaiNV === undefined || loaiNV === "") {
      return this.danhSachNhanVien;
    }

    let listNhanVien = this.danhSachNhanVien.filter((nv) => {
      return nv.xepLoaiNhanVien.toLowerCase() === loaiNV.toLowerCase();
    });

    return listNhanVien;
  }

  updateEmployee(nv){
    var index = this.danhSachNhanVien.findIndex((nhanVien) => {
      return nhanVien.taiKhoan === nv.taiKhoan;
    });

    // nếu như không tìm thấy. thì dừng function
    if (index === -1) return;

    // nếu như tìm thấy thì cập nhật giá trị của vị trí index
    this.danhSachNhanVien[index] = nv;
  }
}

export default EmployeesList;
