import { dsnv, touches, listEle, errors, validationMapper } from "../index.js";

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
          value: "",
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
  let mapper = {
    tknv: 'tbTKNV',
    name: 'tbTen',
    email: 'tbEmail',
    password: 'tbMatKhau',
    datepicker: 'tbNgay',
    luongCB: 'tbLuongCB',
    chucvu: 'tbChucVu',
    gioLam: 'tbGiolam',
  };

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

export function handleBlur(event) {
  // event.target: chính là ô input của chúng ta.
  touches[event.target.id] = true; // true: đã từng đi qua ô input

  console.dir(touches);
  // Validate sau khi blur
  handleValidate(event);
  // Hiện errors mỗi khi người dùng blur khỏi ô input
  renderErrors();
}
