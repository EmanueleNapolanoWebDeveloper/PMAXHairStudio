import Navbar from "@/components/Layout/Navbar/Navbar";
import { Toaster } from "react-hot-toast";


export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="h-screen w-screen flex flex-col items-center justify-center">
            {children}
        </main>
    );
}
