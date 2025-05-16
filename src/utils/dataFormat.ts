// 오타 수정: funciton → function
export function getNowString() {
    // ISO 포맷에서 T를 공백으로, 소수점 이하 및 Z 제거
    return new Date().toISOString().replace('T', ' ').replace(/\..+/, '').replace('Z', '');
}