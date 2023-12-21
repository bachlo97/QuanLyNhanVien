
function convertDay(dateString) {
    const [month, day, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
}

function isValidDate(dateString) {
    const dateObject = convertDay(dateString);
    const [month, day, year] = dateString.split('/').map(Number);

    return (
        dateObject.getMonth() === month - 1 &&
        dateObject.getDate() === day &&
        dateObject.getFullYear() === year
    );
}


export class Validator {
    constructor(value) {
        this.value = value;
        this.message = "";
    }

    require(message = 'Không được bỏ trống') {
        if (this.message) return this;

        if (this.value.trim().length === 0) {
            this.message = message
        }

        return this;
    }

    checkAccount(message = 'Yêu cầu ký tự số nguyên dương hoặc chữ cái la tinh & không có ký tự đặc biệt') {
        if (this.message) return this;
        let regex = /^(?!-)[a-zA-Z0-9]+$/;

        if (!regex.test(this.value)) {
            this.message = message;
        }
        return this;
    }

    checkLenAccount(valueMin,valueMax,message = 'Tên tài khoản phải từ 4-6 ký tự'){
        if (this.message) return this;

        if(this.value.length < valueMin || this.value.length > valueMax){
            this.message = message
        }
        
        return this;
        
    }

    checkName(message = "Yêu cầu toàn bộ là ký tự chữ.") {
        if (this.message) return this;

        let regex =
            /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/u;

        if (!regex.test(this.value)) {
            this.message = message;
        }
        return this;
    };

    checkEmail(message = "Sai định dạng email.") {
        if (this.message) return this;

        let regexEmail =
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

        if (!regexEmail.test(this.value)) {
            this.message = message;
        }

        return this;
    }

    checkPassword(message = "Ít nhất là 1 ký tự số, 1 ký tự in hoa & 1 ký tự đặc biệt") {
        if (this.message) return this;
        let regexPw = /^(?=.*\d)(?=.*[A-Z])(?=.*[\W_]).+$/;

        if (!regexPw.test(this.value)) {
            this.message = message;
        }
        return this;
    }

    checkDay(message = 'Nhập đúng định dạng mm/dd/yyyy và ngày phải hợp lệ') {
        if (this.message) return this;
        let regexDay = /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/\d{4}$/;
        if (!regexDay.test(this.value) || !isValidDate(this.value)) {
            this.message = message
        }
        return this;
    }

    checkDateLimit(message = 'Nhập vào ngày nằm trong giới hạn từ 01/01/2023 đến 12/20/2023') {
        if (this.message) return this;
        const minDate = new Date(2023, 0, 1); // Tháng bắt đầu từ 0
        const maxDate = new Date(2023, 11, 20);
        const inputDate = convertDay(this.value)
        
        if (inputDate < minDate || inputDate > maxDate) {
            this.message = message;
        }
        return this;
    }

    checkSalary(message = "Nhập vào 1 số nguyên dương") {
        if (this.message) return this;

        let regexSalary = /^[1-9]\d*$/

        if (!regexSalary.test(this.value)) {
            this.message = message;
        }
        return this;
    }

    checkHour(message = 'Nhập vào số giờ hợp lệ') {
        if (this.message) return this;

        let regexHour = /^(?!\-)\d*\.?\d+$/;

        if (!regexHour.test(this.value)) {
            this.message = message;
        }
        return this;
    }

    min(valueMin, message) {
        if (this.message) return this;
        let regexNumber = /^-?\d*\.?\d+$/;
        // Nếu là số
        if (regexNumber.test(this.value.trim())) {
            if (Number(this.value) < valueMin) {
                this.message = message || "Không được nhỏ hơn số " + valueMin;
            }
        }
        // Ngược lại là string
        else {
            if (this.value.trim().length < valueMin) {
                this.message = message || `Không được ít hơn ${valueMin} ký tự.`;
            }
        }
        return this;
    }

    max(valueMax, message) {
        if (this.message) return this;

        let regexNumber = /^-?\d*\.?\d+$/;
        // Nếu là số
        if (regexNumber.test(this.value.trim())) {
            if (Number(this.value) > valueMax) {
                this.message = message || "Không được lớn hơn số " + valueMax;
            }
        } else {
            if (this.value.trim().length > valueMax) {
                this.message = message || `Không được nhiều hơn ${valueMax} ký tự.`;
            }
        }
        return this;
    }

    getMessage() {
        return this.message;
    };

}