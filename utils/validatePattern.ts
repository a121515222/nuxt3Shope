export const priceValidatePattern: RegExp = /^(?!0$)([1-9]\d*|\d+\.\d+)?$/;
// 只允許數字、英文
export const couponValidatePattern: RegExp = /^[A-Za-z0-9]*$/;
// 只允許中文、英文、空白(文字中間)
export const nameValidatePattern: RegExp = /^(?!\s*$)[A-Za-z\u4e00-\u9fa5\s]+$/;
// mail格式
export const emailValidatePattern: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// 手機與市話驗證可以支援分割符號 08-123-4567 0912-345-678 0912345678
export const telValidatePattern: RegExp = /^09[0-9]{2}[-\s]?[0-9]{3}[-\s]?[0-9]{3}$/;
// 可通過的地址格式
//"台北市信義區信義路五段7號"
// "台北市中正區重慶南路一段122號"
// "No. 7, Section 5, Xinyi Road"
// "台北市信義區101大樓"
export const addressValidatePattern: RegExp =
  /^[\u4e00-\u9fa5\d]{2,3}[市縣][\u4e00-\u9fa5\d]{2,3}[區鄉鎮市][\u4e00-\u9fa5\w\s,-]+$/;

// 定義密碼驗證的正則表達式：至少一個字母和至少7個數字
export const passwordValidatePattern: RegExp = /^(?=.*[a-zA-Z])(?=(?:\D*\d){7})[a-zA-Z\d]+$/;
// 不允許空白
export const noBlankValidatePattern: RegExp = /^\S+$/;
