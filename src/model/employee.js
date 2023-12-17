export const OVER_192H = 192;
export const OVER_176H = 176;
export const OVER_160H = 160;

class Employee{
    constructor(taiKhoan,hoTen,email,password,ngayLam,luongCoBan,chucVu,gioLam){
        this.taiKhoan = taiKhoan
        this.hoTen = hoTen
        this.email = email
        this.password = password
        this.ngayLam = ngayLam
        this.luongCoBan = luongCoBan
        this.chucVu = chucVu
        this.gioLam = gioLam
        this.tongLuong = this.tinhTongLuong()
        this.xepLoaiNhanVien = this.xepLoai()
    }
    tinhTongLuong(){
        if(this.chucVu == 'Sếp'){
            return this.luongCoBan * 3
        }else if(this.chucVu == 'Trưởng phòng'){
            return this.luongCoBan * 2
        }else{
            return this.luongCoBan
        }
    }
    xepLoai(){
        if(this.gioLam >= OVER_192H){
            return 'Xuất sắc'
        }else if(this.gioLam >=OVER_176H){
            return 'Giỏi'
        }else if(this.gioLam >= OVER_160H){
            return 'Khá'
        }else{
            return 'Trung bình'
        }
    }
}

export default Employee;
