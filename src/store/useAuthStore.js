import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useThemeStore } from "./useThemeStore";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

export const useAuthStore = create(
    devtools((set, get) => ({
        authUser: null,
        isRegistering: false,
        isLoggingIn: false,
        isCheckingAuth: true,
        isUpdatingProfile: false,
        onlineUsers: [],
        socket: null,

        connectSocket: () => {
            const { authUser } = get();
            if (!authUser || get().socket?.connected) return;

            const socket = io(BASE_URL, {
                query: {
                    userId: authUser._id,
                },
            });
            socket.connect();

            set({ socket: socket });

            socket.on("getOnlineUsers", (userIds) => {
                set({ onlineUsers: userIds });
            });
        },

        disconnectSocket: () => {
            if (get().socket?.connected) get().socket.disconnect();
            set({ socket: null, onlineUsers: [] });
        },

        checkAuth: async () => {
            try {
                const res = await axiosInstance.get("/auth/me");
                set({ authUser: res.data });
                get().connectSocket();
                if (res.data.theme) {
                    useThemeStore.getState().setThemeSilent(res.data.theme);
                }
            } catch (error) {
                console.log("Error in checkAuth:", error);
                set({ authUser: null });
                get().disconnectSocket();
            } finally {
                set({ isCheckingAuth: false });
            }
        },

        register: async (data) => {
            set({ isRegistering: true });
            try {
                const res = await axiosInstance.post("/auth/register", data);
                set({ authUser: res.data });
                get().connectSocket();
                if (res.data.theme) {
                    useThemeStore.getState().setThemeSilent(res.data.theme);
                }
                toast.success("สร้างบัญชีสำเร็จ");
            } catch (error) {
                toast.error(error.response?.data?.message || "การสมัครสมาชิกล้มเหลว");
            } finally {
                set({ isRegistering: false });
            }
        },

        login: async (data) => {
            set({ isLoggingIn: true });
            try {
                const res = await axiosInstance.post("/auth/login", data);
                set({ authUser: res.data });
                get().connectSocket();
                if (res.data.theme) {
                    useThemeStore.getState().setThemeSilent(res.data.theme);
                }
                toast.success("เข้าสู่ระบบสำเร็จ");
            } catch (error) {
                toast.error(error.response?.data?.message || "เข้าสู่ระบบล้มเหลว");
            } finally {
                set({ isLoggingIn: false });
            }
        },

        logout: async () => {
            try {
                await axiosInstance.post("/auth/logout");
                set({ authUser: null });
                get().disconnectSocket();
                // Reset to system default theme on logout
                useThemeStore.getState().setThemeSilent("night");
                localStorage.removeItem("chat-theme");
                toast.success("ออกจากระบบสำเร็จ");
            } catch (error) {
                toast.error(error.response?.data?.message || "ออกจากระบบล้มเหลว");
            }
        },

        updateProfile: async (data) => {
            set({ isUpdatingProfile: true });
            try {
                const res = await axiosInstance.put("/auth/update-profile", data);
                set({ authUser: res.data });
                toast.success("อัปเดตโปรไฟล์สำเร็จ");
            } catch (error) {
                console.log("Error in update profile:", error);
                toast.error(error.response?.data?.message || "อัปเดตโปรไฟล์ล้มเหลว");
            } finally {
                set({ isUpdatingProfile: false });
            }
        },
    }), { name: "AuthStore" })
);
