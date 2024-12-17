import { fetchClient } from "@/lib/client";
import { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export const LoginComponent = () => {
    const [role, setRole] = useState<"conductor" | "manager" | "inspector">("conductor");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [focusedInput, setFocusedInput] = useState<"username" | "password" | null>(null);


    
    async function handleLogin() {
        try {
            const { data } = await fetchClient.post<{ error: string; token: string }>("/auth/login", {
                username,
                password,
                role
            });

            if (data.error) {
                setError(data.error);
            } else {
                setError("");
                location.href = "/login/verify?token=" + data.token;
            }
        } catch (e) {
            setError("An error occurred during login. Please try again.");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-2xl border-t-4 border-blue-500">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome Back
                    </h1>
                    <p className="text-gray-600">Sign in to your account to continue</p>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                )}

                <div className="space-y-6">
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">Select Role</label>
                        <div className="grid grid-cols-3 gap-3">
                            {["conductor", "manager", "inspector"].map((r) => (
                                <button
                                    key={r}
                                    onClick={() => setRole(r as typeof role)}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                                        role === r 
                                            ? "bg-blue-500 text-white shadow-lg" 
                                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                                    }`}
                                >
                                    {r.charAt(0).toUpperCase() + r.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color="#9CA3AF" size={16} />
                                </div>
                                <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onFocus={() => setFocusedInput("username")}
                                    onBlur={() => setFocusedInput(null)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 text-gray-900"
                                    type="text"
                                    placeholder="Enter your username"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock color="#9CA3AF" size={16} />
                                </div>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setFocusedInput("password")}
                                    onBlur={() => setFocusedInput(null)}
                                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:border-blue-500 text-gray-900"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                />
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <FaEyeSlash color="#9CA3AF" size={16} /> : <FaEye color="#9CA3AF" size={16} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleLogin}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
};
