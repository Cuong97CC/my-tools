export const environment = {
  production: true
};

export const apiUrl: string = "https://app-c357ce85-989c-49fb-8f79-3720a0e82691.cleverapps.io";
export const internetConnection = navigator.onLine;
export const hostName: string = getHostName();

function getHostName(): string {
  if (location.port != "80") {
    return 'http://' + location.hostname + ':' + location.port;
  } else {
    return 'https://' + location.hostname;
  }
}
