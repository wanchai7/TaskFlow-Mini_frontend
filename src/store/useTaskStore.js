import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useTaskStore = create(
    devtools((set, get) => ({
        tasks: [],
        isLoading: false,
        isCreating: false,
        isUpdating: false,
        isDeleting: false,
        error: null,

        fetchTasks: async () => {
            set({ isLoading: true, error: null });
            try {
                const res = await axiosInstance.get("/tasks");
                set({ tasks: res.data });
            } catch (error) {
                console.error("Error fetching tasks:", error);
                set({ error: error.response?.data?.message || "Failed to load tasks" });
            } finally {
                set({ isLoading: false });
            }
        },

        createTask: async (taskData) => {
            set({ isCreating: true, error: null });
            try {
                const res = await axiosInstance.post("/tasks", taskData);
                set((state) => ({ tasks: [res.data, ...state.tasks] }));
                toast.success("Task created");
            } catch (error) {
                console.error("Error creating task:", error);
                toast.error(error.response?.data?.message || "Failed to create task");
                set({ error: error.response?.data?.message });
            } finally {
                set({ isCreating: false });
            }
        },

        updateTask: async (id, taskData) => {
            set({ isUpdating: true, error: null });
            try {
                const res = await axiosInstance.put(`/tasks/${id}`, taskData);
                set((state) => ({
                    tasks: state.tasks.map((task) => (task._id === id ? res.data : task)),
                }));
                toast.success("Task updated");
            } catch (error) {
                console.error("Error updating task:", error);
                toast.error(error.response?.data?.message || "Failed to update task");
                set({ error: error.response?.data?.message });
            } finally {
                set({ isUpdating: false });
            }
        },

        deleteTask: async (id) => {
            set({ isDeleting: true, error: null });
            try {
                await axiosInstance.delete(`/tasks/${id}`);
                set((state) => ({
                    tasks: state.tasks.filter((task) => task._id !== id),
                }));
                toast.success("Task deleted");
            } catch (error) {
                console.error("Error deleting task:", error);
                toast.error(error.response?.data?.message || "Failed to delete task");
                set({ error: error.response?.data?.message });
            } finally {
                set({ isDeleting: false });
            }
        },
    }), { name: "TaskStore" })
);
