import axios from "axios";
import { baseUrl } from "../constants/baseUrl";

export const loginApi = axios.create({
  baseURL: baseUrl
})