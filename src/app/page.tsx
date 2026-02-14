"use client";

import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { CHAPTERS, PERSONAL_DATA, MODAL_DATA } from "@/data/content";

const pageVariant = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

function ValentineApp() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const step = searchParams.get("step") || "intro";
  const currentChapter = parseInt(searchParams.get("id") || "0", 10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [yesPosition, setYesPosition] = useState<"left" | "right">("left");
  const [expandedDesc, setExpandedDesc] = useState<number | null>(null);

  const navigate = (direction: "next" | "prev") => {
    if (step === "intro" && direction === "next") {
      router.push("?step=chapter&id=0");
    } else if (step === "chapter") {
      if (direction === "next") {
        if (currentChapter < CHAPTERS.length - 1) {
          router.push(`?step=chapter&id=${currentChapter + 1}`);
        } else {
          router.push("?step=final");
        }
      } else if (direction === "prev") {
        if (currentChapter > 0) {
          router.push(`?step=chapter&id=${currentChapter - 1}`);
        } else {
          router.push("?step=intro");
        }
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleToggleClick = (side: "left" | "right") => {
    if (side === yesPosition) setIsModalOpen(true);
    else setYesPosition(side);
  };

  const styleYes =
    "bg-love-500 text-white shadow-lg shadow-love-500/20 hover:bg-love-600 border border-transparent";
  const styleNo =
    "bg-white text-stone-400 border border-stone-200 hover:bg-primary-50 hover:text-stone-600";

  return (
    <main className="max-w-md mx-auto min-h-screen relative flex flex-col cursor-default">
      <AnimatePresence mode="wait">
        {/* --- INTRO --- */}
        {step === "intro" && (
          <motion.div
            key="intro"
            variants={pageVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex-1 flex flex-col justify-center items-center text-center p-8 min-h-screen"
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-soft mb-8 border border-primary-100 animate-floating">
              <span className="text-3xl text-love-500">💙</span>
            </div>

            <p className="text-[11px] font-bold tracking-[0.4em] text-stone-400 uppercase mb-4">
              A Digital Journal
            </p>

            <h1 className="text-[3.25rem] font-serif font-bold text-stone-800 leading-tight tracking-tight">
              Our Little
              <br />
              <span className="text-love-500 italic">Universe</span>
            </h1>

            <div className="mt-6 mb-12">
              <p className="font-cursive text-5xl text-stone-500">
                {PERSONAL_DATA.yourName}{" "}
                <span className="text-3xl text-stone-400 mx-1">&</span>{" "}
                {PERSONAL_DATA.partnerName}
              </p>
            </div>

            <button
              onClick={() => navigate("next")}
              className="cursor-pointer px-10 py-4 bg-stone-800 text-white rounded-full text-sm font-semibold tracking-wide shadow-float hover:bg-stone-700 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 group"
            >
              <span>Chapter 1</span>
              <svg
                className="w-4 h-4 text-primary-200 group-hover:translate-x-1 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </motion.div>
        )}

        {/* --- CHAPTER --- */}
        {step === "chapter" && CHAPTERS[currentChapter] && (
          <motion.div
            key={`chapter-${currentChapter}`}
            variants={pageVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="px-5 py-8 pb-36 w-full"
          >
            <div className="text-center mb-10">
              <p className="text-[10px] font-bold tracking-[0.3em] text-love-500 uppercase mb-3">
                Volume {CHAPTERS[currentChapter].id}{" "}
                <span className="mx-2 text-stone-300">|</span>{" "}
                {CHAPTERS[currentChapter].year}
              </p>
              <h2 className="text-3xl font-serif font-bold text-stone-800 tracking-tight">
                {CHAPTERS[currentChapter].title}
              </h2>
              <p className="text-sm text-stone-400 font-serif italic mt-2">
                &quot;{CHAPTERS[currentChapter].subtitle}&quot;
              </p>
            </div>

            {CHAPTERS[currentChapter].events.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="mb-8"
              >
                <div className="bg-white rounded-[1.75rem] shadow-sm border border-primary-100 overflow-hidden group flex flex-col min-h-[520px] transition-all duration-300">
                  <div className="h-48 shrink-0 overflow-hidden relative">
                    <img
                      src={event.img}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-stone-900/10"></div>
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider text-love-600 shadow-sm">
                      {event.month}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-serif font-bold text-stone-800 mb-4 shrink-0">
                      {event.title}
                    </h3>

                    <a
                      href={event.locUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="cursor-pointer shrink-0 flex items-center gap-3 bg-primary-50 p-2.5 rounded-xl w-full border border-primary-100/50 mb-4 hover:bg-primary-100 transition-all duration-200 group/loc"
                    >
                      <img
                        src={event.locImg}
                        alt="Loc"
                        className="w-10 h-10 rounded-lg object-cover border border-white shadow-sm"
                      />
                      <div className="flex-1">
                        <p className="text-[9px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-0.5">
                          Lokasi
                        </p>
                        <p className="text-sm font-semibold text-stone-600 group-hover/loc:text-love-600 transition-colors">
                          {event.locName}
                        </p>
                      </div>
                      <div className="text-stone-300 group-hover/loc:text-love-500 transition-all pr-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </a>

                    <div className="relative flex-1 flex flex-col overflow-hidden">
                      <div
                        className={`transition-all duration-300 ${expandedDesc === i ? "" : "line-clamp-custom overflow-hidden"}`}
                      >
                        <p
                          className="text-sm text-stone-500 font-light leading-relaxed text-justify"
                          dangerouslySetInnerHTML={{ __html: event.desc }}
                        />
                      </div>

                      <div className="flex-1"></div>

                      {event.desc.length > 150 && (
                        <button
                          onClick={() =>
                            setExpandedDesc(expandedDesc === i ? null : i)
                          }
                          className="cursor-pointer mt-4 text-[11px] self-start uppercase tracking-wider font-bold text-love-500 hover:text-love-700 transition-colors shrink-0"
                        >
                          {expandedDesc === i
                            ? "Tutup Cerita"
                            : "Baca Selengkapnya"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="fixed bottom-8 left-0 w-full px-5 z-40 pointer-events-none flex gap-3 justify-center">
              <button
                onClick={() => navigate("prev")}
                className="cursor-pointer pointer-events-auto bg-white/90 backdrop-blur-xl border border-primary-100 text-stone-400 p-4 rounded-full shadow-float hover:shadow-xl hover:text-love-600 hover:-translate-y-1 active:scale-[0.98] transition-all duration-200 group"
              >
                <svg
                  className="w-5 h-5 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={() => navigate("next")}
                className="cursor-pointer pointer-events-auto flex-1 max-w-xs bg-stone-800 text-white py-4 rounded-full shadow-float hover:shadow-xl hover:bg-stone-700 hover:-translate-y-1 active:scale-[0.98] transition-all duration-200 flex justify-center items-center px-8 gap-3 group"
              >
                <span className="text-[11px] font-bold uppercase tracking-widest">
                  {currentChapter === CHAPTERS.length - 1
                    ? "Selesai"
                    : "Lanjut"}
                </span>
                <svg
                  className="w-4 h-4 text-primary-200 group-hover:translate-x-1 transition-all duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}

        {/* --- FINAL --- */}
        {step === "final" && (
          <motion.div
            key="final"
            variants={pageVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex-1 flex flex-col justify-center items-center px-5 py-10 min-h-screen"
          >
            <div className="w-full max-w-sm bg-white rounded-[2.5rem] shadow-float overflow-hidden relative z-10 flex flex-col border border-white">
              <div className="h-56 w-full relative shrink-0">
                <img
                  src={CHAPTERS[1].events[0].img}
                  alt="Final"
                  className="w-full h-full object-cover blur-[2px] scale-105"
                />
                <div className="absolute inset-0 bg-stone-900/10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
              </div>

              <div className="px-8 pb-10 text-center relative bg-white -mt-10 z-20 flex-1 rounded-t-3xl">
                <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center text-3xl shadow-soft border border-primary-50 -mt-10 mb-6 relative z-30">
                  💙
                </div>

                <h2 className="text-3xl font-serif font-bold text-stone-800 mb-4">
                  Satu Pertanyaan
                </h2>
                <p className="text-stone-500 text-sm font-light leading-relaxed mb-10 px-2">
                  Setelah melihat semua kenangan kita, aku cuma mau tanya satu
                  hal untuk petualangan berikutnya...
                </p>

                <div className="flex flex-row gap-3 justify-center items-center w-full relative min-h-[60px]">
                  <button
                    onClick={() => handleToggleClick("left")}
                    className={`cursor-pointer transition-all duration-200 flex-1 py-3.5 rounded-xl text-sm font-bold tracking-wide z-20 ${yesPosition === "left" ? styleYes : styleNo}`}
                  >
                    {yesPosition === "left" ? "Yes, I Will!" : "No, thanks"}
                  </button>
                  <button
                    onClick={() => handleToggleClick("right")}
                    className={`cursor-pointer transition-all duration-200 flex-1 py-3.5 rounded-xl text-sm font-bold tracking-wide z-20 ${yesPosition === "right" ? styleYes : styleNo}`}
                  >
                    {yesPosition === "right" ? "Yes, I Will!" : "No, thanks"}
                  </button>
                </div>
              </div>
            </div>

            <footer className="mt-10 text-[9px] text-stone-400 font-bold tracking-[0.2em] uppercase">
              Made with 💙 exclusively for you.
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MODAL (FULL WIDTH IMAGE & HOVER TITLE MAPS) --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsModalOpen(false)}
              className="cursor-pointer absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl relative z-10 flex flex-col overflow-hidden"
            >
              {/* Gambar Full Width tanpa padding */}
              <div className="w-full h-40 relative shrink-0">
                <img
                  src={MODAL_DATA.img}
                  alt="Location"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-stone-900/10"></div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="cursor-pointer absolute top-4 right-4 bg-black/20 backdrop-blur text-white rounded-full p-2 hover:bg-black/40 transition-colors z-20"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Konten Text Modal */}
              <div className="p-6 pb-8 text-center flex flex-col">
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-love-500 mb-2">
                  {MODAL_DATA.subtitle}
                </p>

                {/* Judul Hover Effect & Mengarah ke Maps */}
                <a
                  href={MODAL_DATA.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block cursor-pointer group/title mx-auto"
                >
                  <h3 className="text-2xl font-serif font-bold text-stone-800 group-hover/title:text-love-600 group-hover/title:scale-[1.03] transition-all duration-300 inline-block">
                    {MODAL_DATA.title}
                  </h3>
                  {/* Garis bawah animasi saat di hover */}
                  <div className="h-[2px] w-0 bg-love-500 mx-auto mt-1 group-hover/title:w-full transition-all duration-300 rounded-full"></div>
                </a>

                <div className="flex justify-center gap-3 mt-6 mb-5">
                  <div className="flex-1 bg-primary-50 rounded-2xl p-3 flex flex-col items-center justify-center border border-primary-100">
                    <span className="text-[9px] uppercase tracking-widest text-stone-400 font-bold mb-1">
                      Tanggal
                    </span>
                    <span className="text-sm font-semibold text-love-600">
                      {MODAL_DATA.date}
                    </span>
                  </div>
                  <div className="flex-1 bg-primary-50 rounded-2xl p-3 flex flex-col items-center justify-center border border-primary-100">
                    <span className="text-[9px] uppercase tracking-widest text-stone-400 font-bold mb-1">
                      Pukul
                    </span>
                    <span className="text-sm font-semibold text-love-600">
                      {MODAL_DATA.time}
                    </span>
                  </div>
                </div>

                <p className="text-stone-500 text-[13px] font-light leading-relaxed px-2">
                  {MODAL_DATA.desc}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
          <div className="animate-pulse text-2xl text-[#7DA0C9]">💙</div>
        </div>
      }
    >
      <ValentineApp />
    </Suspense>
  );
}
