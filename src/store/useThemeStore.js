import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { axiosInstance } from "../lib/axios";

export const useThemeStore = create(
    devtools((set) => ({
        theme: localStorage.getItem("chat-theme") || "night",
        setTheme: async (theme) => {
            localStorage.setItem("chat-theme", theme);
            set({ theme });
            try {
                await axiosInstance.put("/auth/theme", { theme });
            } catch (error) {
                console.log("Could not sync theme to database (user might be logged out).");
            }
        },
        setThemeSilent: (theme) => {
            localStorage.setItem("chat-theme", theme);
            set({ theme });
        }
    }), { name: "ThemeStore" }));
