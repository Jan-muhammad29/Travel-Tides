import { useId } from "react";
// Original vector scenery; an illustration, never presented as a destination photo.
export default function Scene({ kind = "hills", label = "", className = "" }) {
  const id = useId().replaceAll(":", "");
  const palette = {
    hills: ["#e8c69a", "#ddad70", "#77866b", "#395b4c", "#203f36"],
    lake: ["#c3dbd7", "#f0dbab", "#87a99a", "#477f7d", "#285b5d"],
    forest: ["#d9dfc1", "#f2d6a0", "#90a580", "#557451", "#2e513d"],
    village: ["#ecd4bb", "#e8b77d", "#bc9c77", "#97694e", "#594f3d"],
  }[kind];
  if (!palette)
    return (
      <div
        className={`scene fallback ${className}`}
        role="img"
        aria-label={label || "Scenic illustration unavailable"}
      >
        <span>
          More to discover
          <br />
          <small>Illustration unavailable</small>
        </span>
      </div>
    );
  return (
    <svg
      className={`scene ${className}`}
      viewBox="0 0 700 460"
      role={label ? "img" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={id} x2="0" y2="1">
          <stop stopColor={palette[0]} />
          <stop offset="1" stopColor={palette[1]} />
        </linearGradient>
        <pattern
          id={`${id}p`}
          width="9"
          height="9"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r=".65" fill="#fff" opacity=".15" />
        </pattern>
      </defs>
      <path fill={`url(#${id})`} d="M0 0h700v460H0z" />
      <circle cx="505" cy="118" r="48" fill="#fff2cb" />
      <path
        d="M0 276 130 149 245 251 381 120 566 272 700 189V460H0Z"
        fill={palette[2]}
      />
      <path
        d="M0 325 167 235 312 330 499 208 700 308V460H0Z"
        fill={palette[3]}
      />
      {kind === "lake" ? (
        <>
          <path d="M0 340q170-60 350 0t350 0v120H0Z" fill="#83b3ac" />
          <path
            d="M245 390h150m45 27h160m-430 14h140"
            stroke="#d4e7d3"
            strokeWidth="3"
            opacity=".8"
          />
          <path d="m420 365 70 0-15 12h-40Z" fill={palette[4]} />
          <path
            d="m451 344 0 21m-9-13 22 16"
            stroke={palette[4]}
            strokeWidth="4"
          />
        </>
      ) : kind === "village" ? (
        <>
          <path d="M0 378q200-35 390-3t310-16v101H0Z" fill="#d2b28e" />
          {[125, 220, 390, 480].map((x, i) => (
            <g key={x}>
              <path
                d={`M${x} 358v-70h65v70Z`}
                fill={i % 2 ? "#caa17a" : "#e2c5a0"}
              />
              <path d={`m${x - 7} 288 40-34 40 34Z`} fill={palette[4]} />
              <path
                d={`M${x + 24} 358v-30h17v30m-25-49h12m14 0h12`}
                stroke={palette[4]}
                strokeWidth="5"
              />
            </g>
          ))}
        </>
      ) : (
        <>
          <path d="M0 396q160-78 350-14t350-36v114H0Z" fill={palette[4]} />
          <path
            d="M365 460q-115-58-52-98t32-37q85 29 26 65t82 70"
            fill="#e0c49d"
            opacity=".88"
          />
          {[35, 83, 151, 560, 607, 661].map((x, i) => (
            <g key={x} transform={`translate(${x},${290 + (i % 3) * 29})`}>
              <path d="m0-89-25 53h12l-26 48h78L13-36h12Z" fill={palette[4]} />
              <path d="M0-8v34" stroke={palette[4]} strokeWidth="7" />
            </g>
          ))}
        </>
      )}
      <path fill={`url(#${id}p)`} d="M0 0h700v460H0z" />
    </svg>
  );
}
