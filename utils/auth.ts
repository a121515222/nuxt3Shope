export function getCookie(name: string): string | null {
  const cookie = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
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
  const expired = Number(getCookie("expired"));
  const now = Date.now();
  console.warn("now", now, "expires", expired, "cookie過期");
  return now > expired;
}
