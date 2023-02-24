export const formatCurrency = (number) => {
  const formatter = new Intl.NumberFormat('vi', {
    style: 'currency',
    currency: 'VND',
  })
  return formatter.format(number)
}

export const parseISOString = (s) => {
  console.log(s)
  var b = s.split(/\D+/)
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]))
}

export const formatDate = (d) => {
  const hours = d.toLocaleString('vn', { hour: 'numeric', minute: 'numeric', hour12: true })
  var datestring =
    ('0' + d.getDate()).slice(-2) +
    '-' +
    ('0' + (d.getMonth() + 1)).slice(-2) +
    '-' +
    d.getFullYear() +
    '   ' +
    hours
  return datestring
}
export function avatarLink(name) {
  if (!name) return ''

  var colors = ['ff9933', 'dd5588', 'dd00ff', 'ff3333', 'ff3388', 'ff6655']

  var randomColor = colors[Math.floor(Math.random() * colors.length)]
  const firstLetter = name.charAt(0).toUpperCase()
  const link = `https://ui-avatars.com/api/?name=${firstLetter}&background=${randomColor}&color=fff`
  return link
}
