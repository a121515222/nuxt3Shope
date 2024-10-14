export function getCookie(name: string) {
  const cookieArr = document.cookie.split("; ");
  for (let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].split("=");
    if (name === cookiePair[0]) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null; // 如果找不到 cookie，則返回 null
}

export function getCookieExpires() {
  const date = new Date();
  return date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
}
// #todo
// 這裡的 getCookieExpires 弄清楚能不能存時間
export function isTokenExpired(): boolean {
  const token = getCookie("token");
  if (!token) return true;
  console.log("expires", getCookie("expired"));
  const expired = Number(getCookie("expired"));
  const now = Date.now();
  console.log("now", now, "expires", expired);
  return now > expired;
}
