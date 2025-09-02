

import * as motion from "motion/react-client"

type TOProps = {
    children : React.ReactNode
}

export default function TransitionOptions({children} : TOProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                
                ease: [0, 0.71, 0.2, 1.01],
            }}
        >
        {children}
        </motion.div>
    )
}

