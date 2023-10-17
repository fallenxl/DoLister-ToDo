const BASE_URL = 'http://localhost:4001/api/';
export enum Endpoints {
    LOGIN = BASE_URL + 'auth/login',
    REGISTER = BASE_URL + 'auth/register',
    REFRESH_TOKEN = BASE_URL + 'auth/refresh-token',
    TASKS = BASE_URL + 'tasks/',
    TASK_STATUS = BASE_URL + 'tasks/status/',
    SELECTED_TASKS = BASE_URL + 'tasks/selected',
}

