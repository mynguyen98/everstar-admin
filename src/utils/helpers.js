export const formatCurrency = (number) => {
  const formatter = new Intl.NumberFormat('vi', {
    style: 'currency',
    currency: 'VND',
  })
  return formatter.format(number)
}
