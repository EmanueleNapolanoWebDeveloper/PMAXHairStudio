export default function DecorativeDivider({ colorScheme = "gold" }) {
    const colorSchemes = {
        gold: {
            lines: "bg-gradient-to-r from-transparent via-yellow-500/70 to-yellow-600",
            circle1: "bg-gradient-to-br from-yellow-400 to-yellow-600",
            circle1Shadow: "shadow-yellow-500/50",
            circle2: "bg-gradient-to-br from-yellow-600 to-yellow-800",
            smallLines: "bg-yellow-500/60"
        },
        red: {
            lines: "bg-gradient-to-r from-transparent via-red-500/70 to-red-600",
            circle1: "bg-gradient-to-br from-red-400 to-red-600",
            circle1Shadow: "shadow-red-500/50",
            circle2: "bg-gradient-to-br from-red-600 to-red-800",
            smallLines: "bg-red-500/60"
        }
    };

    const colors = colorSchemes[colorScheme] || colorSchemes.gold;

    return (
        <div className="flex justify-center p-3">
            <div className="flex items-center gap-4">
                {/* Left line */}
                <div className={`w-20 h-px ${colors.lines.replace('to-r', 'to-r')} animate-pulse`}></div>

                {/* Main circle */}
                <div className={`w-4 h-4 ${colors.circle1} rounded-full shadow-lg ${colors.circle1Shadow} animate-pulse`}></div>

                {/* Small line */}
                <div className={`w-8 h-px ${colors.smallLines}`}></div>

                {/* Small circle */}
                <div className={`w-2 h-2 ${colors.circle2} rounded-full animate-pulse delay-500`}></div>

                {/* Right line */}
                <div className={`w-20 h-px ${colors.lines.replace('to-r', 'to-l')} animate-pulse`}></div>
            </div>
        </div>
    )
}