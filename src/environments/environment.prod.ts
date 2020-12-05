export const environment = {
  production: true
};

export const apiUrl: string = "https://api-mytool.cuongln.com";
export const internetConnection = navigator.onLine;
export const hostName: string = getHostName();
export const tags = ['Đi lại', 'Ăn uống', 'Nhà ở', 'Đồ dùng', 'Thú cưng', 'Game', 'Khác'];

function getHostName(): string {
  if (location.port != "80") {
    return 'http://' + location.hostname + ':' + location.port;
  } else {
    return 'https://' + location.hostname;
  }
}
