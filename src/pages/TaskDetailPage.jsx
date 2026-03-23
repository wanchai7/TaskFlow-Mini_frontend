import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTaskStore } from "../store/useTaskStore";
import { Loader, ArrowLeft, Save, Briefcase, Flag, AlertCircle } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const TaskDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, fetchTasks, updateTask, isUpdating, isLoading } = useTaskStore();
    const { authUser } = useAuthStore();
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [deadline, setDeadline] = useState("");
    const [status, setStatus] = useState("pending");
    const [priority, setPriority] = useState("medium");
    
    useEffect(() => {
        if (tasks.length === 0) {
            fetchTasks();
        }
    }, [tasks.length, fetchTasks]);

    useEffect(() => {
        const task = tasks.find(t => t._id === id);
        if (task) {
            setTitle(task.title);
            setDescription(task.description || "");
            setStartDate(task.startDate ? new Date(task.startDate).toISOString().slice(0, 16) : "");
            setDeadline(task.deadline ? new Date(task.deadline).toISOString().slice(0, 16) : "");
            setStatus(task.status);
            setPriority(task.priority);
        }
    }, [tasks, id]);

    const task = tasks.find(t => t._id === id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateTask(id, { title, description, startDate, deadline, status, priority });
        navigate("/");
    };

    if (isLoading && !task) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-base-300 bg-gradient-to-br from-base-300 via-base-200 to-base-100">
                <Loader className="size-16 animate-spin text-primary mb-4" />
                <p className="text-xl text-base-content/80 font-bold tracking-wide">กำลังโหลดรายละเอียด...</p>
            </div>
        );
    }

    if (!task && !isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-base-300 bg-gradient-to-br from-base-300 via-base-200 to-base-100 p-4 pt-20">
                <AlertCircle className="size-20 text-base-content/50 mb-6 drop-shadow-md" />
                <h2 className="text-4xl font-extrabold mb-3 text-base-content">ไม่พบงาน</h2>
                <p className="text-base-content/60 text-lg mb-8 text-center max-w-sm font-medium">งานที่คุณค้นหาไม่มีอยู่หรือถูกลบไปแล้ว</p>
                <button onClick={() => navigate("/")} className="btn h-14 px-8 rounded-full bg-primary hover:bg-primary-focus text-primary-content border-0 shadow-xl font-bold text-lg hover:-translate-y-1 transition-transform">
                    <ArrowLeft size={18} className="mr-2" /> กลับสู่หน้าหลัก
                </button>
            </div>
        );
    }

    const isOwner = task.userId?._id === authUser._id || task.userId === authUser._id;
    if (!isOwner) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-base-300 bg-gradient-to-br from-base-300 via-base-200 to-base-100 p-4 pt-20">
                <AlertCircle className="size-20 text-error/80 mb-6 drop-shadow-md" />
                <h2 className="text-4xl font-extrabold mb-3 text-base-content text-error/90">ไม่มีสิทธิ์แก้ไข</h2>
                <p className="text-base-content/60 text-lg mb-8 text-center max-w-sm font-medium">คุณไม่สามารถแก้ไขหรืออัปเดตสถานะงานที่ผู้อื่นสร้างได้</p>
                <button onClick={() => navigate("/")} className="btn h-14 px-8 rounded-full bg-primary hover:bg-primary-focus text-primary-content border-0 shadow-xl font-bold text-lg hover:-translate-y-1 transition-transform">
                    <ArrowLeft size={18} className="mr-2" /> กลับสู่หน้าหลัก
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-300 bg-gradient-to-br from-base-300 via-base-200 to-base-100 relative overflow-hidden p-4 pt-24 pb-12">
            {/* Background blur effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary rounded-full mix-blend-screen filter blur-[120px] opacity-40 pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary rounded-full mix-blend-screen filter blur-[120px] opacity-30 pointer-events-none"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
                <button onClick={() => navigate("/")} className="flex items-center gap-2 mb-8 text-base-content/70 hover:text-base-content bg-base-100/30 hover:bg-base-100/50 border border-base-content/10 rounded-full px-6 py-3 transition-colors font-bold shadow-sm">
                    <ArrowLeft size={18} /> กลับสู่หน้าหลัก
                </button>
                
                <div className="bg-base-100/40 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-base-content/10 relative overflow-hidden">
                    <div className="flex items-center gap-5 mb-10">
                        <div className="size-14 rounded-2xl bg-primary/20 flex flex-shrink-0 items-center justify-center shadow-inner border border-primary/10">
                            <Briefcase className="size-7 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-wide text-base-content">แก้ไขงาน</h1>
                            <p className="text-base-content/60 mt-2 font-medium text-lg">อัปเดตรายละเอียดและคุณสมบัติด้านล่าง</p>
                        </div>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="form-control">
                            <label className="label mb-2 px-1">
                                <span className="label-text font-bold text-lg text-base-content/90">ชื่องาน</span>
                            </label>
                            <input
                                type="text"
                                className="input h-16 text-lg pl-6 rounded-full bg-base-100/40 border border-base-content/10 text-base-content placeholder-base-content/50 focus:bg-base-100/60 focus:outline-none focus:border-primary transition-all font-bold shadow-sm"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="เช่น ทำรายงานประจำเดือนให้เสร็จ..."
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label mb-2 px-1">
                                <span className="label-text font-bold text-lg text-base-content/90">รายละเอียด</span>
                            </label>
                            <textarea
                                className="textarea text-lg p-6 rounded-[2rem] bg-base-100/40 border border-base-content/10 text-base-content placeholder-base-content/50 focus:bg-base-100/60 focus:outline-none focus:border-primary transition-all font-bold shadow-sm"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="รายละเอียดเพิ่มเติม..."
                                rows={4}
                            ></textarea>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="form-control">
                                <label className="label mb-2 px-1">
                                    <span className="label-text font-bold text-lg text-base-content/90">เวลาที่สร้าง (เริ่ม)</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    className="input h-16 text-lg pl-6 rounded-full bg-base-100/40 border border-base-content/10 text-base-content placeholder-base-content/50 focus:bg-base-100/60 focus:outline-none focus:border-primary transition-all font-bold shadow-sm"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label mb-2 px-1">
                                    <span className="label-text font-bold text-lg text-base-content/90">สิ้นสุดกำหนดเมื่อไหร่</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    className="input h-16 text-lg pl-6 rounded-full bg-base-100/40 border border-base-content/10 text-base-content placeholder-base-content/50 focus:bg-base-100/60 focus:outline-none focus:border-primary transition-all font-bold shadow-sm"
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="form-control">
                                <label className="label mb-2 px-1">
                                    <span className="label-text font-bold text-lg text-base-content/90">สถานะความคืบหน้า</span>
                                </label>
                                <select 
                                    className="select h-16 text-lg rounded-full bg-base-100/40 border border-base-content/10 text-base-content focus:bg-base-100/60 focus:outline-none focus:border-primary transition-all font-bold shadow-sm [&>option]:bg-base-100 [&>option]:text-base-content"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="pending">⏳ รอดำเนินการ</option>
                                    <option value="in-progress">🚀 กำลังดำเนินการ</option>
                                    <option value="completed">✅ เสร็จสิ้น</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label mb-2 px-1">
                                    <span className="label-text font-bold text-lg text-base-content/90 flex gap-2 items-center">
                                        ระดับความสำคัญ <Flag className="size-5 opacity-70" />
                                    </span>
                                </label>
                                <div className="flex bg-base-100/40 p-1.5 rounded-full border border-base-content/10 w-full shadow-sm">
                                    <button
                                        type="button"
                                        onClick={() => setPriority("low")}
                                        className={`flex-1 rounded-full py-3 text-sm font-extrabold uppercase tracking-wider transition-all ${priority === "low" ? "bg-success text-success-content shadow-lg" : "text-base-content/60 hover:text-base-content hover:bg-base-content/10"}`}
                                    >
                                        ต่ำ
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPriority("medium")}
                                        className={`flex-1 rounded-full py-3 text-sm font-extrabold uppercase tracking-wider transition-all ${priority === "medium" ? "bg-warning text-warning-content shadow-lg" : "text-base-content/60 hover:text-base-content hover:bg-base-content/10"}`}
                                    >
                                        ปานกลาง
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPriority("high")}
                                        className={`flex-1 rounded-full py-3 text-sm font-extrabold uppercase tracking-wider transition-all ${priority === "high" ? "bg-error text-error-content shadow-lg" : "text-base-content/60 hover:text-base-content hover:bg-base-content/10"}`}
                                    >
                                        สูง
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 mt-4 border-t border-base-content/10 flex justify-end items-center gap-4">
                            <button 
                                type="button" 
                                onClick={() => navigate("/")} 
                                className="px-6 py-3 text-base-content/60 hover:text-base-content font-bold transition-colors" 
                                disabled={isUpdating}
                            >
                                ยกเลิก
                            </button>
                            <button 
                                type="submit" 
                                className="btn h-14 px-10 rounded-full bg-primary hover:bg-primary-focus text-primary-content border-0 text-lg font-extrabold tracking-wide shadow-xl hover:-translate-y-1 transition-transform" 
                                disabled={isUpdating}
                            >
                                {isUpdating ? (
                                    <span className="flex items-center gap-3">
                                        <Loader className="animate-spin size-5" /> กำลังบันทึก...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-3">
                                        <Save className="size-5" /> อัปเดตงาน
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailPage;
