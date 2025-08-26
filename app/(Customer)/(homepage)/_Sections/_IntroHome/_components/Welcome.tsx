"use client";
import styles from "@/app/(Customer)/homepage.module.css";

export default function Welcome() {
  return (
    <div className="w-[20rem] md:w-[30rem]">
      <h3 className="text-[2.5rem] md:text-[3rem] font-bold text-start fontTitlesHome w-full drop-shadow-lg">
        <span className="text-red-600 animate-slideUp font-light">Benvenuto in</span>
        <br />
        <span className="text-red-600 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
          P
        </span>
        <span className="text-black font-light">-MAX</span>{" "}
        {/* Hair Studio con effetto girandola */}
        <span className={`${styles.barberGradient} font-extrabold text-[2.5rem] md:text-[3rem]`}>
          Hair Studio!
        </span>
      </h3>
    </div>
  );
}
