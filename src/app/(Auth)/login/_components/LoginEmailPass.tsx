"use client"

import Link from "next/link";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LoginWithEmailPassword } from "../actions"
import { toast } from "react-hot-toast";


export default function LoginEmailPassword() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    const isValid = () => isValidEmail(email) && password.length >= 6;

    const router = useRouter()

    const mutation = useMutation({
        mutationFn: async () => await LoginWithEmailPassword(email, password),
        onSuccess: (data) => {
            if (data?.success) {
                // Reset form
                setEmail("");
                setPassword("");
                setShowPassword(false);
                setRemember(false);
                setError("");

                toast.success("Login avvenuto con successo");
                router.push('/');
            } else {
                setError(data?.message || "Errore durante il login");
            }
        },
        onError: (err: any) => {
            setError(err?.message || "Errore durante il login");
            toast.error("Errore durante il login");
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!isValid()) {
            setError("Inserisci email valida e password di almeno 6 caratteri.");
            return;
        }

        mutation.mutate();
    };

    return (
        <div className="max-w-md mx-auto bg-white/80 dark:bg-slate-800/80 border rounded-2xl p-6 shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Accedi</h2>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tuo@esempio.com"
                        required
                        aria-invalid={!isValidEmail(email)}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Inserisci la password"
                            required
                            minLength={6}
                            className="w-full pr-20 px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((s) => !s)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm px-3 py-1 rounded-md bg-gray-100/60 dark:bg-slate-700/60 hover:bg-gray-200/80"
                            aria-pressed={showPassword}
                        >
                            {showPassword ? "Nascondi" : "Mostra"}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <label className="inline-flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 dark:border-slate-600"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-300">Ricordami</span>
                    </label>

                    <a href="#" className="text-sm underline text-indigo-600 dark:text-indigo-400">
                        Password dimenticata?
                    </a>
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                    type="submit"
                    disabled={!isValid() || submitting}
                    className="w-full py-2 rounded-xl font-medium shadow-sm disabled:opacity-60 disabled:cursor-not-allowed bg-indigo-600 text-white"
                >
                    {submitting ? "Accedendo..." : "Accedi"}
                </button>
            </form>

            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                Non hai un account? <Link href="/register" className="text-indigo-600 underline">Registrati</Link>
            </p>
        </div>
    );
}
