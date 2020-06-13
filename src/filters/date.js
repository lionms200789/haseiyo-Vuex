// 建立 Date 物件再使用 toLocaleDateString 方法
export default function (time) {
  const date = new Date(time * 1000);
  return date.toLocaleDateString();
}