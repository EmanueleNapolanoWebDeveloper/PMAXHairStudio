export default function DividerPoint() {
    return (
        <div className="flex justify-center items-center w-full h-[3rem] bg-white">
            <div className="flex items-center gap-3">
                <div className="w-16 h-px bg-black/20"></div>
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <div className="w-8 h-px bg-black"></div>
                <div className="w-3 h-3 bg-black rounded-full"></div>
                <div className="w-16 h-px bg-black/20"></div>
            </div>
        </div>
    )
}    