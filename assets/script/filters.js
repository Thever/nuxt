export function fillzero(n){
  return n < 10 ? '0' + n : '' + n
}

export const data = time => {
  let d = new Date()
  d.setTime(time)
  let year = d.getFullYear()
  let month = d.getMonth()+1
  let date = d.getDate()
  let hour = d.getHours()
  let min = d.getMinutes()
  let sec = d.getSeconds()
  return `${year}年${fillzero(month)}月${fillzero(date)}日 ${fillzero(hour)}:${fillzero(min)}:${fillzero(sec)}`
}
