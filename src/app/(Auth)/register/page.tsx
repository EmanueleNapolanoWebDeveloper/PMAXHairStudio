"use client"

import React, { useState, ChangeEvent, FormEvent } from "react";
import { SignUpEmailPassword } from "./actionRegister"
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface RegisterForm {
    name: string;
    surname: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

interface MutationResult {
    success?: boolean
    message?: string
    error?: string;
}

const initialForm = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
}

export default function RegisterPage() {
    const [form, setForm] = useState<RegisterForm>(initialForm);
    const [error, setError] = useState<string>("");

    const router = useRouter();

    // Tipizza correttamente handleChange
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };


    // ------> VALIDAZIONI
    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPhone = (phone: string) => /^\d{10}$/.test(phone);

    const validateForm = (): string | null => {
        if (!form.name.trim()) return "Il nome è obbligatorio";
        if (!form.surname.trim()) return "Il cognome è obbligatorio";
        if (!isValidEmail(form.email)) return "Inserisci un'email valida";
        if (!isValidPhone(form.phone)) return "Il telefono deve contenere 10 cifre";
        if (form.password.length < 6) return "La password deve contenere almeno 6 caratteri";
        if (form.password !== form.confirmPassword) return "Le password non coincidono";
        return null;
    };

    const isValid = () => {
        return (
            form.name.trim() &&
            form.surname.trim() &&
            isValidEmail(form.email) &&
            isValidPhone(form.phone) &&
            form.password.length >= 6 &&
            form.password === form.confirmPassword
        );
    };

    // ----> reset form
    const resetForm = () => setForm(initialForm)

    const mutation = useMutation<MutationResult, Error>({
        mutationFn: async () => {
            return await SignUpEmailPassword({
                email: form.email,
                password: form.password,
                name: form.name,
                surname: form.surname,
                phone: form.phone,
            });
        },
        onSuccess: (res) => {
            if (res.error) {
                setError(res.error)
                toast.error(res.error)
                resetForm()
                return
            }
            toast.success(res.message || "Registrazione avvenuta con successo");
            resetForm()
            router.push("/login")
        },
        onError: (err) => {
            console.error('Mutation error:', err);
            setError(err.message || "Errore durante la registrazione");
            toast.error(err.message || "Errore durante la registrazione");
        }
    });

    // Tipizza handleSubmit
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            toast.error(validationError);
            // Resetta il form in caso di errore di validazione
            setForm(initialForm);
            return;
        }
        mutation.mutate();
    };

    return (
        <div className="w-full mx-auto bg-white/95 backdrop-blur-sm border border-gray-100 rounded-3xl p-8 shadow-2xl mt-[100px] relative overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-gray-50/30 rounded-3xl pointer-events-none" />

            {/* Top accent line */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full" />

            <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-6 text-gray-800/80 text-center bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700 bg-clip-text">
                    Registrati
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 ml-1">
                                Nome
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Mario"
                                required
                                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200/60 bg-gray-50/30 focus:outline-none focus:ring-4 focus:ring-gray-200/40 focus:border-gray-400 text-gray-800 placeholder-gray-400 shadow-inner"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 ml-1">
                                Cognome
                            </label>
                            <input
                                type="text"
                                name="surname"
                                value={form.surname}
                                onChange={handleChange}
                                placeholder="Rossi"
                                required
                                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200/60 bg-gray-50/30 focus:outline-none focus:ring-4 focus:ring-gray-200/40 focus:border-gray-400 text-gray-800 placeholder-gray-400 shadow-inner"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 ml-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="mario@esempio.com"
                            required
                            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200/60 bg-gray-50/30 focus:outline-none focus:ring-4 focus:ring-gray-200/40 focus:border-gray-400 text-gray-800 placeholder-gray-400 shadow-inner"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 ml-1">
                            Telefono
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="1234567890"
                            required
                            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200/60 bg-gray-50/30 focus:outline-none focus:ring-4 focus:ring-gray-200/40 focus:border-gray-400 text-gray-800 placeholder-gray-400 shadow-inner"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 ml-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="••••••"
                                required
                                minLength={6}
                                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200/60 bg-gray-50/30 focus:outline-none focus:ring-4 focus:ring-gray-200/40 focus:border-gray-400 text-gray-800 placeholder-gray-400 shadow-inner"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 ml-1">
                                Conferma Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••"
                                required
                                minLength={6}
                                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200/60 bg-gray-50/30 focus:outline-none focus:ring-4 focus:ring-gray-200/40 focus:border-gray-400 text-gray-800 placeholder-gray-400 shadow-inner"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 rounded-xl bg-red-50 border-l-4 border-red-400">
                            <p className="text-sm text-red-700 font-medium">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={!isValid() || mutation.isPending}
                        className="w-full py-4 rounded-2xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white hover:from-gray-700 hover:via-gray-800 hover:to-gray-700 relative overflow-hidden"
                    >
                        <span className="relative z-10">
                            {mutation.isPending ? "Registrando..." : "Registrati"}
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
}