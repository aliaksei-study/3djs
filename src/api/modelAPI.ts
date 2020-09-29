import axios from "axios";
import {AxiosResponse} from 'axios'
import {TableState} from "../reducer/tableReducer";

const instance = axios.create({
    baseURL: "http://localhost:8080/"
});

export const modelAPI = {
    sendModel(tableState: TableState): Promise<AxiosResponse<TableState>> {
        return instance.post<TableState, AxiosResponse<TableState>>('states', tableState);
},
    getModel(): Promise<AxiosResponse<TableState>> {
        return instance.get<TableState, AxiosResponse<TableState>>('states');
    }
};