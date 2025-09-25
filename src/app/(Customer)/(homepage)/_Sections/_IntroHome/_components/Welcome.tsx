"use client";
import styles from "@/src/app/(Customer)/homepage.module.css";

export default function AboutUs() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 ">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <h1 className="text-7xl md:text-8xl font-black text-white tracking-wider mb-4">
              CHI SIAMO
            </h1>
            <div className="w-24 h-1 bg-red-800 mx-auto rounded-full shadow-lg shadow-red-900/50"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Story */}
          <div className="space-y-6">
            
            {/* Vintage Welcome Title */}
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-start w-full drop-shadow-lg">
                <span className="text-red-400 font-light block mb-2">La Storia di</span>
                <span className="text-red-600 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700 text-6xl">
                  P
                </span>
                <span className="text-white font-light text-5xl">-MAX</span>
                <br />
                <span className={`${styles.barberGradient} font-extrabold text-3xl md:text-4xl block mt-2`}>
                  Hair Studio
                </span>
              </h2>
              
              {/* Decorative line */}
              <div className="flex items-center gap-4 mt-6">
                <div className="w-16 h-px bg-red-600"></div>
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <div className="w-8 h-px bg-red-400"></div>
              </div>
            </div>

            {/* Story Text */}
            <div className="space-y-4">
              <p className="text-lg text-gray-300 leading-relaxed">
                <span className="text-red-400 font-semibold text-xl">Dal 1985</span>, la nostra passione per l &apos; arte del barbiere 
                si tramanda di generazione in generazione. Quello che è iniziato come un piccolo negozio di quartiere 
                è diventato un punto di riferimento per chi cerca <span className="text-white font-semibold">stile, 
                tradizione e innovazione</span>.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                Ogni taglio racconta una storia, ogni cliente è parte della nostra famiglia. 
                Utilizziamo <span className="text-red-400 font-semibold">tecniche tradizionali</span> unite 
                alle più moderne tendenze per offrirti un &apos; esperienza unica e personalizzata.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl border border-red-800/20">
                <div className="text-3xl font-bold text-red-400 mb-2">40+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Anni di Esperienza</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl border border-red-800/20">
                <div className="text-3xl font-bold text-red-400 mb-2">∞</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Passione</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl border border-red-800/20">
                <div className="text-3xl font-bold text-red-400 mb-2">100%</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Soddisfazione</div>
              </div>
            </div>
          </div>

          {/* Right Side - Visual Elements */}
          <div className="space-y-8">
            
            {/* Vintage Quote Box */}
            <div className="bg-gradient-to-br from-red-900/20 to-red-800/10 p-8 rounded-2xl border border-red-700/30 shadow-xl">
              <div className="text-6xl text-red-600 font-serif mb-4">&quot;</div>
              <blockquote className="text-xl text-gray-200 italic leading-relaxed mb-4">
                Non tagliamo solo capelli, creiamo stile. 
                Non facciamo solo la barba, coltiviamo fiducia.
              </blockquote>
              <cite className="text-red-400 font-semibold">— Massimo Polverino, Master Barber</cite>
              <div className="text-6xl text-red-600 font-serif text-right">&quot;</div>
            </div>

            {/* Services Highlights */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-4">La Nostra Arte</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="font-medium">Taglio tradizionale con rasoio</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="font-medium">Cura della barba classica</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="font-medium">Styling contemporaneo</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="font-medium">Consulenza personalizzata</span>
                </div>
              </div>
            </div>

            {/* Vintage Badge */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center border-4 border-red-600/30 shadow-2xl shadow-red-900/50">
                  <div className="text-center">
                    <div className="text-white text-xs font-bold uppercase tracking-wider">Est.</div>
                    <div className="text-white text-2xl font-black">1985</div>
                    <div className="text-red-200 text-xs uppercase tracking-wider">Tradizione</div>
                  </div>
                </div>
                
                {/* Decorative elements around badge */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-600 rotate-45"></div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-600 rotate-45"></div>
                <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-red-600 rotate-45"></div>
                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-red-600 rotate-45"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="flex justify-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-gray-600"></div>
            <div className="w-3 h-3 bg-red-800 rounded-full shadow-lg shadow-red-900/50"></div>
            <div className="w-8 h-px bg-gray-500"></div>
            <div className="w-2 h-2 bg-red-700 rounded-full"></div>
            <div className="w-16 h-px bg-gray-600"></div>
          </div>
        </div>
      </div>
    </section>
  );
}