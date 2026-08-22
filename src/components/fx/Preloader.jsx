import { useEffect, useRef } from "react";
import gsap from "gsap";

const Preloader = ({ onComplete, label = "Weather" }) => {
  const overlayRef = useRef(null);
  const wordRef = useRef(null);
  const barRef = useRef(null);
  const tagRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const word = wordRef.current;
    if (!overlay || !word) return;

    gsap.set(word, { opacity: 0, y: 24 });
    gsap.set(tagRef.current, { opacity: 0, y: 10 });
    gsap.set(barRef.current, { scaleX: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlay, {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
          onComplete,
        });
      },
    });

    tl.to(word, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
      .to(tagRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
      .to(barRef.current, { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, "-=0.2")
      .to({}, { duration: 0.3 }); // small hold before slide-away

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        background: "#111008",
        color: "#f0ede6",
      }}
    >
      <span
        ref={wordRef}
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(2rem, 6vw, 3.2rem)",
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
        }}
      >
        {label}
        <span style={{ color: "#caff00" }}>.</span>
      </span>

      <div
        ref={barRef}
        style={{
          width: 120,
          height: 2,
          background: "#caff00",
          transformOrigin: "left",
        }}
      />

      <p
        ref={tagRef}
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "rgba(240,237,230,0.4)",
        }}
      >
        Loading catalog
      </p>
    </div>
  );
};

export default Preloader;
