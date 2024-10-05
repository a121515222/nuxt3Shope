export function formatTimestamp(timestamp: number | string): string {
  // 將時間戳從秒轉換為毫秒
  if (typeof timestamp !== "number" || typeof timestamp !== "string") {
    const date = new Date(Number(timestamp) * 1000);

    // 取得年份、月份和日期
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份從 0 開始，所以要加 1
    const day = String(date.getDate()).padStart(2, "0");

    // 格式化日期
    return `${year}/${month}/${day}`;
  }
  return "時間格式錯誤";
}
