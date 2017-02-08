export function add(a, b) {
  return a + b;
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const formatMakettime = (dateString) => {
  return (new Date(dateString)).toString().split(' ', 4).slice(1, 4).join(' ')
}