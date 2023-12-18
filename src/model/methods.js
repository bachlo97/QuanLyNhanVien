export function setTouches(value,listEle,touches) {
    listEle.forEach(function (ele) {
      touches[ele.id] = value;
    });
}