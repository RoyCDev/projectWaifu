import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const apiRequest = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
})

const useUserFetch = () => useQuery({
    queryKey: ["user"],
    queryFn: async () => {
        const info = await apiRequest.get("/api/user/data/info");
        const profile = await apiRequest.get("/api/user/data/profile");
        const coin = await apiRequest.get("/api/user/data/coins");
        return { ...info.data, ...profile.data, ...coin.data }
    },
    retry: false,
    refetchOnWindowFocus: false
})

const useLogFetch = () => useQuery({
    queryKey: ["chat history"],
    queryFn: async () => {
        const res = await apiRequest.get("/api/user/data/history")
        return res.data
    },
    retry: false,
    refetchOnWindowFocus: false
})

export { apiRequest, useUserFetch, useLogFetch }