import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);
    const [fullName, setFullName] = useState(authUser?.fullName || "");
    const [isEditingName, setIsEditingName] = useState(false);

    const handleSaveName = async () => {
        if (!fullName.trim() || fullName === authUser?.fullName) {
            setIsEditingName(false);
            return;
        }
        await updateProfile({ fullName });
        setIsEditingName(false);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({ profilePic: base64Image });
        };
    };

    return (
        <div className="h-dvh pt-20">
            <div className="max-w-2xl mx-auto p-4 py-8">
                <div className="bg-base-300 rounded-xl p-6 space-y-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold ">โปรไฟล์</h1>
                        <p className="mt-2 text-sm text-base-content/60">ข้อมูลโปรไฟล์ของคุณ</p>
                    </div>

                    {/* avatar upload section */}

                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <img
                                src={selectedImg || authUser.profilePic || "/avatar.png"}
                                alt="Profile"
                                className="size-32 rounded-full object-cover border-4 "
                            />
                            <label
                                htmlFor="avatar-upload"
                                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
                            >
                                <Camera className="w-5 h-5 text-base-200" />
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUpdatingProfile}
                                />
                            </label>
                        </div>
                        <p className="text-sm text-zinc-400">
                            {isUpdatingProfile ? "กำลังอัปโหลด..." : "คลิกที่ไอคอนกล้องเพื่ออัปเดตรูปภาพของคุณ"}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-1.5">
                            <div className="text-sm text-zinc-400 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    ชื่อ-นามสกุล
                                </div>
                                <button 
                                    onClick={() => isEditingName ? handleSaveName() : setIsEditingName(true)}
                                    className={`text-xs font-medium ${isUpdatingProfile ? 'text-zinc-500 cursor-not-allowed' : 'text-primary hover:underline'}`}
                                    disabled={isUpdatingProfile}
                                >
                                    {isUpdatingProfile ? "กำลังบันทึก..." : (isEditingName ? "บันทึก" : "แก้ไข")}
                                </button>
                            </div>
                            {isEditingName ? (
                                <input 
                                    type="text" 
                                    className="input input-bordered w-full bg-base-200" 
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    autoFocus
                                    onBlur={handleSaveName}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                                    disabled={isUpdatingProfile}
                                />
                            ) : (
                                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                อีเมล
                            </div>
                            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
                        </div>
                    </div>

                    <div className="mt-6 bg-base-300 rounded-xl p-6">
                        <h2 className="text-lg font-medium  mb-4">ข้อมูลบัญชี</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                                <span>เป็นสมาชิกตั้งแต่</span>
                                <span>{authUser.createdAt?.split("T")[0]}</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span>สถานะบัญชี</span>
                                <span className="text-green-500">ใช้งานอยู่</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProfilePage;
