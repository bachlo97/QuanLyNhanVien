import { dsnv, touches, listEle,errors } from "../index.js";

export function setTouches(value) {
  listEle.forEach(ele => touches[ele.id] = value);
}

function print(){
  console.log(1234567)
}
export function domId(id){
  return document.getElementById(id)
}

export function isValid(errors,listEle) {
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

function handleValidate(event){
  const id = event.target.id;
  const value = event.target.value;
  errors[id] = validationMapper[id](value);
}