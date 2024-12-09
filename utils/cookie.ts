export function setCookie(name: string, value: string, days: number) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ""}${expires}; path=/`;
}

export function getAuthorizationCookie() {
  // 用正則表達式提取 key 為 'authorization' 的值
  const match = document.cookie.match(/(?:^|;)\s*authorization=([^;]+)/);

  // 如果找到了，返回值，否則返回 null
  return match ? match[1] : null;
}
export function clearCookie(name: string, path = "/") {
  document.cookie = `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}
