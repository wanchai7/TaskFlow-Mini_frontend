import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Key, Mail, CheckSquare } from "lucide-react";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { login, isLoggingIn } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-base-300 bg-gradient-to-br from-base-300 via-base-200 to-base-100">
            {/* Background blur effects using theme colors */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary rounded-full mix-blend-screen filter blur-[120px] opacity-40"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary rounded-full mix-blend-screen filter blur-[120px] opacity-30"></div>

            <div className="relative z-10 w-full max-w-sm px-6">
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-4">
                        <div className="size-16 rounded-3xl bg-primary/20 flex items-center justify-center shadow-inner border border-primary/20">
                            <CheckSquare className="size-8 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-base-content tracking-wide">Sign in</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="form-control">
                        <div className="relative flex items-center">
                            <div className="absolute left-5 flex items-center pointer-events-none">
                                <Mail className="size-5 text-base-content/50" />
                            </div>
                            <input
                                type="email"
                                className="input w-full pl-14 pr-6 h-14 rounded-full bg-base-100/40 border border-base-content/10 text-base-content placeholder-base-content/50 focus:outline-none focus:bg-base-100/60 focus:border-primary transition-all font-medium backdrop-blur-sm shadow-sm"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <div className="relative flex items-center">
                            <div className="absolute left-5 flex items-center pointer-events-none">
                                <Key className="size-5 text-base-content/50" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="input w-full pl-14 h-14 pr-12 rounded-full bg-base-100/40 border border-base-content/10 text-base-content placeholder-base-content/50 focus:outline-none focus:bg-base-100/60 focus:border-primary transition-all font-medium backdrop-blur-sm shadow-sm"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                className="absolute right-5 flex items-center text-base-content/50 hover:text-base-content transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="size-5" />
                                ) : (
                                    <Eye className="size-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-2 text-sm text-base-content/80 font-medium mt-2">
                        <label className="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" className="checkbox checkbox-xs rounded-full border-base-content/30 checked:border-primary checked:bg-primary" />
                            <span className="label-text">Remember Me</span>
                        </label>
                        <a href="#" className="hover:text-primary hover:underline transition-colors">Forgot Password?</a>
                    </div>

                    <button 
                        type="submit" 
                        className="btn w-full h-14 rounded-full bg-primary hover:bg-primary-focus text-primary-content border-0 text-lg font-semibold tracking-wide mt-6 shadow-lg hover:shadow-primary/30 transition-shadow" 
                        disabled={isLoggingIn}
                    >
                        {isLoggingIn ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span>Loading...</span>
                            </div>
                        ) : (
                            "Sign in"
                        )}
                    </button>
                </form>

                <div className="text-center mt-8">
                    <p className="text-base-content/60 text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to="/signup" className="text-primary font-bold hover:underline transition-colors">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
