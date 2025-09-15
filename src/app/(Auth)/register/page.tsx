"use client"

import React, { useState } from "react";
import { SignUpEmailPassword } from "./action"
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");

    const router = useRouter()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    const isValidPhone = (p) => /^\d{10}$/.test(p);
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

    const mutation = useMutation({
        mutationFn: async () => {
            // Passa un oggetto invece di parametri separati
            return await SignUpEmailPassword({
                email: form.email,
                password: form.password,
                name: form.name,
                surname: form.surname,
                phone: form.phone,
                role: 'customer' // Aggiungi il ruolo richiesto
            });
        },
        onSuccess: (result) => {
            if (result.error) {

                if (result.error === 'duplicate key value violates unique constraint "profiles_phone_key"') {
                    setError('Telefono esistente! \n Prego, inserisci un altro numero.');
                }
                if (result.error === 'duplicate key value violates unique constraint "profiles_email_key"') {
                    setError('Email esistente! \n Prego, inserisci un altra e-mail.');
                }
                return;
            }

            setForm({
                name: "",
                surname: "",
                email: "",
                phone: "",
                password: "",
                confirmPassword: ""
            });
            toast.success(`Registrazione avvenuta con successo! \n Conferma la tua email per completare la registrazione.`);
            router.push('/login');
        },
        onError: (err) => {
            console.error('Mutation error:', err);
            setError(err?.message || "Errore durante la registrazione");
            toast.error(err?.message || "Errore durante la registrazione");
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!isValid()) {
            setError("Compila correttamente tutti i campi.");
            return;
        }
        mutation.mutate();
    };

    return (
        <div className="w-full mx-auto bg-white/80 dark:bg-slate-800/80 border rounded-2xl p-6 shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Registrati</h2>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Nome</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Mario"
                        required
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Cognome</label>
                    <input
                        type="text"
                        name="surname"
                        value={form.surname}
                        onChange={handleChange}
                        placeholder="Rossi"
                        required
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="mario@esempio.com"
                        required
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Telefono</label>
                    <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="1234567890"
                        required
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="••••••"
                        required
                        minLength={6}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Conferma Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••"
                        required
                        minLength={6}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                    type="submit"
                    disabled={!isValid() || mutation.isPending}
                    className="w-full py-2 rounded-xl font-medium shadow-sm disabled:opacity-60 disabled:cursor-not-allowed bg-indigo-600 text-white"
                >
                    {mutation.isPending ? "Registrando..." : "Registrati"}
                </button>
            </form>
        </div>
    );
}