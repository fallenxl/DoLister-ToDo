const BASE_URL = 'http://localhost:4001/api/';
export enum Endpoints {
    LOGIN = BASE_URL + 'auth/login',
    REGISTER = BASE_URL + 'auth/register',
    REFRESH_TOKEN = BASE_URL + 'auth/refresh-token',
    
}
