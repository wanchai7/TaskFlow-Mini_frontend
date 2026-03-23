import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useThemeStore } from "./useThemeStore";

export const useAuthStore = create(
    devtools((set) => ({
        authUser: null,
        isRegistering: false,
        isLoggingIn: false,
        isCheckingAuth: true,

        checkAuth: async () => {
            try {
                const res = await axiosInstance.get("/auth/me");
                set({ authUser: res.data });
                if (res.data.theme) {
                    useThemeStore.getState().setThemeSilent(res.data.theme);
                }
            } catch (error) {
                console.log("Error in checkAuth:", error);
                set({ authUser: null });
            } finally {
                set({ isCheckingAuth: false });
            }
        },

        register: async (data) => {
            set({ isRegistering: true });
            try {
                const res = await axiosInstance.post("/auth/register", data);
                set({ authUser: res.data });
                if (res.data.theme) {
                    useThemeStore.getState().setThemeSilent(res.data.theme);
                }
                toast.success("Account created successfully");
            } catch (error) {
                toast.error(error.response?.data?.message || "Registration failed");
            } finally {
                set({ isRegistering: false });
            }
        },

        login: async (data) => {
            set({ isLoggingIn: true });
            try {
                const res = await axiosInstance.post("/auth/login", data);
                set({ authUser: res.data });
                if (res.data.theme) {
                    useThemeStore.getState().setThemeSilent(res.data.theme);
                }
                toast.success("Logged in successfully");
            } catch (error) {
                toast.error(error.response?.data?.message || "Login failed");
            } finally {
                set({ isLoggingIn: false });
            }
        },

        logout: async () => {
            try {
                await axiosInstance.post("/auth/logout");
                set({ authUser: null });
                // Reset to system default theme on logout
                useThemeStore.getState().setThemeSilent("dark");
                localStorage.removeItem("chat-theme");
                toast.success("Logged out successfully");
            } catch (error) {
                toast.error(error.response?.data?.message || "Logout failed");
            }
        },
    }), { name: "AuthStore" })
);
