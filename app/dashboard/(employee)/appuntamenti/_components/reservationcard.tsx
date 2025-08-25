import { User, Scissors, CheckCircle, Clock, XCircle } from "lucide-react";

interface ReservationCardProps {
    client: string;
    service: string;
    status: "confirmed" | "pending" | "in_progress" | "completed" | "denied";
    start_time: string; // HH:mm
    end_time: string;   // HH:mm
    slotHeight?: number; // altezza mezz'ora in px, default 32
    morningStart?: number; // ora inizio mattina (es. 8)
    afternoonStart?: number; // ora inizio pomeriggio (es. 13)
    tab?: "morning" | "afternoon";
}

export default function ReservationCard({
    client,
    service,
    status,
    start_time,
    end_time,
    slotHeight = 32,
    morningStart = 8,
    afternoonStart = 13,
    tab = "morning"
}: ReservationCardProps) {

    const getStatusStyles = (status: ReservationCardProps["status"]) => {
        switch (status) {
            case "confirmed": return { color: "bg-green-100 text-green-700", icon: <CheckCircle className="w-4 h-4" /> };
            case "pending": return { color: "bg-yellow-100 text-yellow-700", icon: <Clock className="w-4 h-4" /> };
            case "in_progress": return { color: "bg-orange-100 text-orange-700", icon: <Clock className="w-4 h-4" /> };
            case "completed": return { color: "bg-blue-100 text-blue-700", icon: <CheckCircle className="w-4 h-4" /> };
            case "denied": return { color: "bg-red-100 text-red-700", icon: <XCircle className="w-4 h-4" /> };
        }
    };

    const statusStyle = getStatusStyles(status);

    const [startHour, startMinute] = start_time.split(":").map(Number);
    const [endHour, endMinute] = end_time.split(":").map(Number);

    // calcola durata in minuti
    const duration = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);

    // calcola top in px
    const top = ((startHour - (tab === "morning" ? morningStart : afternoonStart)) * 2 + (startMinute / 30)) * slotHeight;

    // calcola altezza in px
    const height = (duration / 30) * slotHeight;

    return (
        <div
            className={`absolute left-0 right-0 bg-white shadow-md rounded-xl p-2 border ${statusStyle.color}`}
            style={{ top, height }}
        >
            <div className="flex items-center gap-2 font-semibold text-gray-900">
                <User className="w-4 h-4" />
                {client}
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Scissors className="w-4 h-4" />
                {service}
            </div>
            <div className="text-xs flex items-center gap-1 mt-1">
                {statusStyle.icon}
                {status.replace("_", " ")}
            </div>
        </div>
    );
}
