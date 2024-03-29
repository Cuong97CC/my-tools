// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

export const apiUrl: string = "http://localhost:8080";
// export const apiUrl: string = "https://my-tools-server.herokuapp.com";
export const hostName: string = getHostName();
export const tags = ['Đi lại', 'Ăn uống', 'Nhà ở', 'Đồ dùng', 'Thú cưng', 'Game', 'Khác'];

function getHostName(): string {
  if (location.port != "80") {
    return 'http://' + location.hostname + ':' + location.port;
  } else {
    return 'https://' + location.hostname;
  }
}
