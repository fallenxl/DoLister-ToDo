import { Endpoints } from "../constants/endpoints";
import { AuthCredentials, RegisterCredentials } from "../interfaces";
import axios from "axios";

export const signIn = async (credentials: AuthCredentials) => {
    try {
        const { data } = await axios.post(Endpoints.LOGIN, credentials);
        return data;
    } catch (error) {

    }
};

export const signUp = async (credentials: RegisterCredentials) => {
    try {
        const { data } = await axios.post(Endpoints.REGISTER, credentials);
        return data;
    } catch (error) {

    }
};

export const regfreshToken = async () => {
    try {
        const { data } = await axios.get(Endpoints.REFRESH_TOKEN);
        return data;
    } catch (error) {

    }
};