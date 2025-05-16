// 안전한 현재 시간 문자열을 리턴하는 유틸 함수
export function getNowString() {
  return new Date()
    .toISOString()
    .replace('T', ' ')
    .replace(/\..+/, '')
    .replace('Z', '')
    .replace(/:/g, '-');
}
