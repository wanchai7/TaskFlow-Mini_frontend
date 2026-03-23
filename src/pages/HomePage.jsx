import { useEffect, useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { Loader, Plus, Trash2, Edit2, CheckCircle2, Circle, Clock, LayoutList } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
    const { tasks, isLoading, isCreating, isDeleting, fetchTasks, createTask, deleteTask } = useTaskStore();
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [filter, setFilter] = useState("all");
    
    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleCreateTask = (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;
        createTask({ title: newTaskTitle, status: "pending", priority: "medium" });
        setNewTaskTitle("");
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === "all") return true;
        return task.status === filter;
    });

    const stats = {
        total: tasks.length,
        completed: tasks.filter(t => t.status === "completed").length,
        pending: tasks.filter(t => t.status === "pending").length,
        inProgress: tasks.filter(t => t.status === "in-progress").length,
    };

    return (
        <div className="min-h-screen bg-base-300 bg-gradient-to-br from-base-300 via-base-200 to-base-100 relative overflow-hidden pt-24 pb-12">
            {/* Background blur effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary rounded-full mix-blend-screen filter blur-[120px] opacity-40 pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary rounded-full mix-blend-screen filter blur-[120px] opacity-30 pointer-events-none"></div>

            <div className="relative z-10 max-w-6xl mx-auto space-y-8 px-4 md:px-6">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-base-content tracking-wide">My Tasks</h1>
                        <p className="text-base-content/70 mt-2 font-medium">Manage your workflow and productivity today.</p>
                    </div>

                    <form onSubmit={handleCreateTask} className="flex gap-3 w-full md:w-auto items-center">
                        <input
                            type="text"
                            placeholder="I need to..."
                            className="input w-full md:w-80 h-14 rounded-full pl-6 pr-4 bg-base-100/40 border border-base-content/10 text-base-content placeholder-base-content/50 focus:outline-none focus:bg-base-100/60 focus:border-primary transition-all font-medium backdrop-blur-sm shadow-sm"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                        />
                        <button type="submit" className="btn h-14 px-8 rounded-full bg-primary hover:bg-primary-focus text-primary-content border-0 text-base font-bold tracking-wide shadow-lg hover:shadow-primary/30 transition-shadow" disabled={isCreating}>
                            {isCreating ? <Loader className="animate-spin size-5" /> : <Plus className="size-5" />}
                            <span className="hidden sm:inline ml-2">Add</span>
                        </button>
                    </form>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {[
                        { title: "Total Tasks", val: stats.total, icon: <LayoutList size={26} /> },
                        { title: "Completed", val: stats.completed, icon: <CheckCircle2 size={26} /> },
                        { title: "In Progress", val: stats.inProgress, icon: <Clock size={26} /> },
                        { title: "Pending", val: stats.pending, icon: <Circle size={26} /> },
                    ].map((st, i) => (
                        <div key={i} className="bg-base-100/40 backdrop-blur-md border border-base-content/10 rounded-[2rem] p-6 flex flex-col items-start gap-4 shadow-xl">
                            <div className="p-4 bg-primary/10 rounded-full text-primary shadow-inner border border-primary/10">
                                {st.icon}
                            </div>
                            <div>
                                <h3 className="text-3xl font-extrabold text-base-content mb-1">{st.val}</h3>
                                <p className="text-sm text-base-content/60 font-bold uppercase tracking-wider">{st.title}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filter and List Section */}
                <div className="bg-base-100/40 backdrop-blur-xl border border-base-content/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <div className="border-b border-base-content/10 p-5 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-base-200/50">
                        <h2 className="text-2xl font-bold text-base-content tracking-wide">Activity Board</h2>
                        <div className="flex bg-base-300/50 p-1.5 rounded-full border border-base-content/5 overflow-x-auto w-full md:w-auto">
                            {['all', 'pending', 'in-progress', 'completed'].map(f => (
                                <button 
                                    key={f}
                                    onClick={() => setFilter(f)} 
                                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all mr-1 last:mr-0 capitalize whitespace-nowrap 
                                        ${filter === f ? 'bg-primary text-primary-content shadow-md' : 'text-base-content/70 hover:bg-base-content/10 hover:text-base-content'}`}
                                >
                                    {f.replace('-', ' ')}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="p-4 md:p-8 min-h-[400px]">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center h-64 space-y-4">
                                <Loader className="size-12 animate-spin text-primary" />
                                <p className="text-base-content/60 font-medium tracking-wide">Fetching awesome tasks...</p>
                            </div>
                        ) : filteredTasks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64 space-y-4 text-center">
                                <div className="p-6 bg-base-content/5 border border-base-content/10 rounded-full shadow-inner">
                                    <LayoutList className="size-12 text-base-content/30" />
                                </div>
                                <div>
                                    <p className="text-xl font-bold text-base-content mb-1">No tasks to display</p>
                                    <p className="text-base text-base-content/50 font-medium">Time to clear your mind or add something new!</p>
                                </div>
                            </div>
                        ) : (
                            <div className="grid gap-3">
                                {filteredTasks.map((task) => (
                                    <div key={task._id} className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-base-100/50 hover:bg-base-100 border border-base-content/5 transition-all rounded-[1.5rem] shadow-sm hover:shadow-lg gap-4">
                                        <div className="flex flex-1 items-start sm:items-center gap-5">
                                            {/* Status Dot */}
                                            <div className="flex items-center justify-center pt-1 sm:pt-0">
                                                <div className={`
                                                    size-5 rounded-full border-2 border-base-200
                                                    ${task.status === 'completed' ? 'bg-success border-success/30' : task.status === 'in-progress' ? 'bg-warning border-warning/30' : 'bg-error border-error/30'}
                                                    shadow-sm
                                                `} />
                                            </div>

                                            <div className="flex-1">
                                                <h3 className={`font-bold text-xl tracking-wide transition-colors ${task.status === "completed" ? "line-through text-base-content/40" : "text-base-content/90"}`}>
                                                    {task.title}
                                                </h3>
                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${
                                                        task.priority === "high" ? "bg-error/20 text-error border-error/30" : 
                                                        task.priority === "medium" ? "bg-warning/20 text-warning-content border-warning-content/30" : "bg-success/20 text-success border-success/30"
                                                    }`}>
                                                        Priority: {task.priority}
                                                    </span>
                                                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-base-content/5 text-base-content/70 border border-base-content/10">
                                                        Status: {task.status.replace('-', ' ')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-2 sm:pl-4 mt-4 sm:mt-0 justify-end border-t border-base-content/10 sm:border-0 pt-4 sm:pt-0">
                                            <Link to={`/tasks/${task._id}`} className="flex items-center justify-center size-10 rounded-full bg-info/10 hover:bg-info/20 text-info transition-all border border-info/20 hover:border-info/40">
                                                <Edit2 size={18} />
                                            </Link>
                                            <button 
                                                onClick={() => deleteTask(task._id)}
                                                className="flex items-center justify-center size-10 rounded-full bg-error/10 hover:bg-error/20 text-error transition-all border border-error/20 hover:border-error/40"
                                                disabled={isDeleting}
                                            >
                                                {isDeleting ? <Loader className="size-4 animate-spin" /> : <Trash2 size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
