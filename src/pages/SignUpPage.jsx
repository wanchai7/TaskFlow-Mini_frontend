import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Key, Mail, User, CheckSquare } from "lucide-react";
import toast from "react-hot-toast";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const { register, isRegistering } = useAuthStore();

    const validateForm = () => {
        if (!formData.fullName.trim()) return toast.error("Full name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if (!formData.password) return toast.error("Password is required");
        if (formData.password.length < 4) return toast.error("Password must be at least 4 characters");
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = validateForm();
        if (success === true) register(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-base-300 bg-gradient-to-br from-base-300 via-base-200 to-base-100">
            {/* Background blur effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary rounded-full mix-blend-screen filter blur-[120px] opacity-40"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary rounded-full mix-blend-screen filter blur-[120px] opacity-30"></div>

            <div className="relative z-10 w-full max-w-sm px-6">
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-4">
                        <div className="size-16 rounded-3xl bg-primary/20 flex items-center justify-center shadow-inner border border-primary/20">
                            <CheckSquare className="size-8 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-base-content tracking-wide">Create Account</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="form-control">
                        <div className="relative flex items-center">
                            <div className="absolute left-5 flex items-center pointer-events-none">
                                <User className="size-5 text-base-content/50" />
                            </div>
                            <input
                                type="text"
                                className="input w-full pl-14 pr-6 h-14 rounded-full bg-base-100/40 border border-base-content/10 text-base-content placeholder-base-content/50 focus:outline-none focus:bg-base-100/60 focus:border-primary transition-all font-medium backdrop-blur-sm shadow-sm"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            />
                        </div>
                    </div>

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

                    <button 
                        type="submit" 
                        className="btn w-full h-14 rounded-full bg-primary hover:bg-primary-focus text-primary-content border-0 text-lg font-semibold tracking-wide shadow-lg hover:shadow-primary/30 transition-shadow mt-6" 
                        disabled={isRegistering}
                    >
                        {isRegistering ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span>Loading...</span>
                            </div>
                        ) : (
                            "Sign up"
                        )}
                    </button>
                </form>

                <div className="text-center mt-8">
                    <p className="text-base-content/60 text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary font-bold hover:underline transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
