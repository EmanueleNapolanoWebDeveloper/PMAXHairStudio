"use client"

import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/src/app/store/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { createClient } from "@/src/utils/supabase/client";

export default function LoginEmailPassword() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();
    const { refreshProfile } = useAuth(); // aggiorna profile dopo login

    const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    const isValid = () => isValidEmail(email) && password.length >= 6;

    // funzione client-side per login
    const loginWithEmailPassword = async () => {
        const supabase = await createClient();

        if (!email || !password) return { success: false, message: "Inserisci email e password" };
        if (!isValidEmail(email)) return { success: false, message: "Email non valida" };
        if (password.length < 6) return { success: false, message: "Password troppo corta" };

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            switch (error.code) {
                case "invalid_credentials":
                    return { success: false, message: "Email o password non validi" };
                case "over_email_send_rate_limit":
                    return { success: false, message: "Troppi tentativi. Riprova tra poco." };
                default:
                    return { success: false, message: error.message };
            }
        }

        // Login riuscito
        if (data.user) await refreshProfile(); // aggiorna subito il profile dal context

        return { success: true, message: "Login avvenuto con successo", data };
    };

    const mutation = useMutation({
        mutationFn: loginWithEmailPassword,
        onSuccess: (res) => {
            if (res?.success) {
                toast.success(res.message);
                setEmail("");
                setPassword("");
                setShowPassword(false);
                setError("");
                router.push("/");
            } else {
                setError(res?.message || "Errore durante il login");
            }
        },
        onError: (err: Error) => {
            setError(err.message || "Errore durante il login");
            toast.error("Errore durante il login");
        },
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (!isValid()) {
            setError("Inserisci email valida e password di almeno 6 caratteri.");
            return;
        }
        mutation.mutate();
    };

    return (
        <div className="w-full md:max-w-md mx-auto bg-white/95 backdrop-blur-sm border border-gray-100 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-gray-50/30 rounded-3xl pointer-events-none" />
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full" />

            <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700 bg-clip-text ">
                    Accedi
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 ml-1">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tuo@esempio.com"
                            required
                            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200/60 bg-gray-50/30 focus:outline-none focus:ring-4 focus:ring-gray-200/40 focus:border-gray-400 text-gray-800 placeholder-gray-400 shadow-inner"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 ml-1">Password</label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Inserisci la password"
                                required
                                minLength={6}
                                className="w-full pr-24 px-5 py-4 rounded-2xl border-2 border-gray-200/60 bg-gray-50/30 focus:outline-none focus:ring-4 focus:ring-gray-200/40 focus:border-gray-400 text-gray-800 placeholder-gray-400 shadow-inner"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 border border-gray-200/60"
                            >
                                {showPassword ? "Nascondi" : "Mostra"}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between py-2">
                        <Link href="/forgot-password" className="text-sm font-semibold text-gray-600 hover:text-gray-900">Password dimenticata?</Link>
                    </div>

                    {error && (
                        <div className="p-3 rounded-xl bg-red-50 border-l-4 border-red-400">
                            <p className="text-sm text-red-700 font-medium">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={!isValid() || mutation.isPending}
                        className="w-full py-4 rounded-2xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white hover:from-gray-700 hover:via-gray-800 hover:to-gray-700"
                    >
                        {mutation.isPending ? "Accedendo..." : "Accedi"}
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200/60 text-center">
                    <p className="text-sm text-gray-600">
                        Non hai un account?{" "}
                        <Link href="/register" className="font-semibold text-gray-800 hover:text-black">Registrati</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
