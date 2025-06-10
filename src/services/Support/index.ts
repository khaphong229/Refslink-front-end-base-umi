import { ipRoot } from "@/utils/ip";
import axios from "axios"


export const postSupport = async (data: Support.Record) => {
    const res = await axios.post(`${ipRoot}/support`, data);
    console.log(res);
    return res?.data;
}