import Navbar from "@/src/components/Layout/Navbar/Navbar";
import { Toaster } from "react-hot-toast";


export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen w-screen flex flex-col items-center justify-center">
            <Navbar />
            {children}
        </main>
    );
}
