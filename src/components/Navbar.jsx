import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, CheckSquare, Settings, User } from "lucide-react";

const Navbar = () => {
    const { logout, authUser } = useAuthStore();

    return (
        <header className="fixed w-full top-0 z-40 bg-base-300/40 backdrop-blur-md border-b border-base-content/10 transition-all">
            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all text-base-content">
                            <div className="size-9 rounded-full bg-primary/20 flex items-center justify-center shadow-inner">
                                <CheckSquare className="w-5 h-5 text-primary" />
                            </div>
                            <h1 className="text-xl font-bold tracking-wide">TaskFlow Website Wanchai</h1>
                        </Link>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            to={"/settings"}
                            className="btn btn-sm sm:btn-md gap-2 rounded-full bg-base-100/50 hover:bg-base-200 border-0 text-base-content shadow-sm font-medium transition-all"
                        >
                            <Settings className="w-4 h-4" />
                            <span className="hidden sm:inline">ตั้งค่า</span>
                        </Link>

                        {authUser && (
                            <>
                                <Link to={"/profile"} className="btn btn-sm sm:btn-md gap-2 rounded-full bg-base-100/50 hover:bg-base-200 border-0 text-base-content shadow-sm font-medium transition-all">
                                    <User className="w-4 h-4" />
                                    <span className="hidden sm:inline">โปรไฟล์</span>
                                </Link>

                                <button onClick={logout} className="btn btn-sm sm:btn-md gap-2 rounded-full bg-base-100/50 hover:bg-base-200 hover:text-error border-0 text-base-content shadow-sm font-medium transition-colors">
                                    <LogOut className="w-4 h-4" />
                                    <span className="hidden sm:inline">ออกจากระบบ</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
