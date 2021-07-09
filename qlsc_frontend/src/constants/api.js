export const PORT = 'http://localhost:8686';
export const API_ENDPOINT = 'http://localhost:8080/admin';
export const API_USER_AUTH = 'http://localhost:8085/auth';
export const API_GATEWAY = 'http://localhost:8762/api';
export const API_USER = `${API_GATEWAY}/user/admin`;
export const API_CUSTOMER = `${API_GATEWAY}/customer/admin`;
export const API_PRODUCT = `${API_GATEWAY}/product/admin`;
export const API_IMAGE = `${API_GATEWAY}/image/admin`;
export const API_MAINTENANCECARD = `${API_GATEWAY}/maintenancecard/admin`;
export const API_REPORT_V2 = `${API_GATEWAY}/maintenancecard/report_v2`;
export const SOCKET_URL = `${API_GATEWAY}/maintenancecard/notification`;
// export const SOCKET_URL_V2 = `http://localhost:8086/notification`;
export const SOCKET_URL_V2 = `http://localhost:8085/notification`;

export const STATUS_CODE = {
    SUCCESS: 200,
    CREATED: 201,
    UPDATED: 202,
    UNAUTHORIZED: 401,
    FAILED: 500
}