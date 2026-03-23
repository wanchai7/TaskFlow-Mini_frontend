import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";
import { Plus, CheckCircle2, Circle } from "lucide-react";

const SettingsPage = () => {
    const { theme, setTheme } = useThemeStore();

    return (
        <div className="min-h-screen bg-base-300 bg-gradient-to-br from-base-300 via-base-200 to-base-100 relative overflow-hidden pt-24 pb-12">
            {/* Background blur effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary rounded-full mix-blend-screen filter blur-[120px] opacity-40 pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary rounded-full mix-blend-screen filter blur-[120px] opacity-30 pointer-events-none"></div>

            <div className="relative z-10 max-w-5xl mx-auto px-4">
                <div className="bg-base-100/40 backdrop-blur-xl border border-base-content/10 rounded-[2.5rem] overflow-hidden shadow-2xl p-6 md:p-10">
                    <div className="space-y-8">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-3xl font-extrabold text-base-content tracking-wide">ตั้งค่าธีม</h2>
                            <p className="text-lg text-base-content/60 font-medium">เลือกธีมเพื่อปรับแต่ง TaskFlow ในแบบของคุณ</p>
                        </div>

                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                            {THEMES.map((t) => (
                                <button
                                    key={t}
                                    className={`
                                        group flex flex-col items-center gap-2 p-2 rounded-2xl transition-all border
                                        ${theme === t ? "bg-base-100/80 border-primary shadow-md scale-105" : "bg-base-100/30 hover:bg-base-100/60 border-base-content/10 hover:border-base-content/30"}
                                    `}
                                    onClick={() => setTheme(t)}
                                >
                                    <div className="relative h-10 w-full rounded-xl overflow-hidden shadow-sm" data-theme={t}>
                                        <div className="absolute inset-0 grid grid-cols-4 gap-px p-1 bg-base-100">
                                            <div className="rounded-l bg-primary w-full h-full"></div>
                                            <div className="bg-secondary w-full h-full"></div>
                                            <div className="bg-accent w-full h-full"></div>
                                            <div className="rounded-r bg-neutral w-full h-full"></div>
                                        </div>
                                    </div>
                                    <span className={`text-[11px] font-bold truncate w-full text-center ${theme === t ? "text-primary" : "text-base-content/80"}`}>
                                        {t.charAt(0).toUpperCase() + t.slice(1)}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Preview Section */}
                        <div className="mt-12 pt-8 border-t border-base-content/10">
                            <h3 className="text-2xl font-bold mb-6 text-base-content">ตัวอย่าง UI</h3>
                            
                            <div className="rounded-3xl border border-base-content/10 overflow-hidden bg-base-100/30 shadow-inner max-w-2xl mx-auto p-4 md:p-8">
                                {/* Mock Task UI */}
                                <div className="bg-base-100/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-base-content/5">
                                    {/* App Header */}
                                    <div className="px-5 py-4 border-b border-base-content/10 flex justify-between items-center bg-base-200/50">
                                        <h3 className="font-bold text-lg text-base-content">กระดานกิจกรรม</h3>
                                        <button className="btn btn-sm btn-circle btn-primary shadow-md">
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    {/* Task List */}
                                    <div className="p-5 space-y-3">
                                        {/* Task 1 */}
                                        <div className="flex items-center gap-4 p-3 rounded-xl bg-base-100 border border-base-content/10 shadow-sm transition-transform hover:scale-[1.01] hover:shadow-md cursor-pointer">
                                            <div className="size-5 rounded-full border-2 border-emerald-400 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]"></div>
                                            <div className="flex-1">
                                                <p className="text-base-content/50 font-bold line-through">วิ่งตอนเช้า</p>
                                                <div className="flex gap-2 font-bold mt-1 opacity-70">
                                                    <span className="text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 rounded-full border border-emerald-500/30 uppercase">เสร็จสิ้น</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Task 2 */}
                                        <div className="flex items-center gap-4 p-3 rounded-xl bg-base-100 border border-base-content/10 shadow-sm transition-transform hover:scale-[1.01] hover:shadow-md cursor-pointer">
                                            <div className="size-5 rounded-full border-2 border-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.2)]"></div>
                                            <div className="flex-1">
                                                <p className="text-base-content font-bold">ตรวจสอบรายงานการเงินไตรมาส 3</p>
                                                <div className="flex gap-2 font-bold mt-1">
                                                    <span className="text-[10px] bg-error/10 text-error px-2 rounded-full border border-error/20 uppercase tracking-wider">ความสำคัญสูง</span>
                                                    <span className="text-[10px] bg-base-content/5 text-base-content/70 px-2 rounded-full border border-base-content/10 uppercase tracking-wider">รอดำเนินการ</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
