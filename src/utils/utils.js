var Promise = require('es6-promise').Promise;

export function add(a, b) {
  return a + b;
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const formatMakettime = (dateString) => {
  return (new Date(dateString)).toString().split(' ', 4).slice(1, 4).join(' ')
};
// 让小程序支持promise
export function promisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      };

      obj.fail = function (res) {
        reject(res)
      };

      fn(obj)
    })
  }
}
