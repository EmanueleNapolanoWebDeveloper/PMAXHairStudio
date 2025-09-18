import { StaffProvider } from "../store/StaffContext";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <StaffProvider>
                {children}
            </StaffProvider>
        </>

    )
}
