import React from "react";

type Props = {
  rating: number;
  sizeRem?: number; // размер в rem, может быть дробным
};

// Функция для перевода rem в px (через вычисление в DOM)
function remToPx(rem: number): number {
  if (typeof window === "undefined") return rem * 16; // fallback для SSR
  const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return rem * fontSize;
}

export default function StarRating({ rating, sizeRem = 1.5}: Props) {
  const sizePx = remToPx(sizeRem);

  // "Звезда", подогнанная под viewBox 24x24, чтобы занять всю площадь SVG
  // Пример path — простой пятиконечник, масштабируется по размеру SVG
  const starPath =
    "M12 2.5 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 Z";

  const stars = Array.from({ length: 5 }, (_, i) => {
    const fillPercent = Math.min(1, Math.max(0, rating - i)) * 100;

    return (
      <svg
        key={i}
        width={sizePx}
        height={sizePx}
        viewBox="0 0 24 24"
        preserveAspectRatio="xMidYMid meet"
        style={{ marginRight: 2, display: "inline-block", verticalAlign: "middle" }}
      >
        <defs>
          <clipPath id={`clip-star-${i}`}>
            <rect x="0" y="0" width={`${fillPercent}%`} height="24" />
          </clipPath>
        </defs>

        {/* Фон — пустая звезда */}
        <path d={starPath} fill="#ccc" />

        {/* Заливка с клиппингом */}
        <path d={starPath} fill="gold" clipPath={`url(#clip-star-${i})`} />
      </svg>
    );
  });

  return <div style={{ display: "flex", alignItems: "center" }}>{stars}</div>;
}
