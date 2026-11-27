/**
 * The Octant logo, drawn in: the grid's strokes trace one after another, then
 * the cube's faces settle top, right, left.
 * Geometry from `public/octant-app-icon.svg`; motion in `app/global.css`.
 */
const GRID =
  "M22.43 67.05L22.43 128.0M22.43 67.05L75.21 36.57M22.43 67.05L75.21 97.52M22.43 128.0L22.43 188.95M22.43 128.0L75.21 97.52M22.43 128.0L75.21 158.48M22.43 188.95L75.21 158.48M22.43 188.95L75.21 219.43M75.21 36.57L75.21 97.52M75.21 36.57L128.0 6.1M75.21 36.57L128.0 67.05M75.21 97.52L75.21 158.48M75.21 97.52L128.0 67.05M75.21 97.52L128.0 128.0M75.21 158.48L75.21 219.43M75.21 158.48L128.0 128.0M75.21 158.48L128.0 188.95M75.21 219.43L128.0 188.95M75.21 219.43L128.0 249.9M128.0 6.1L128.0 67.05M128.0 6.1L180.79 36.57M128.0 67.05L128.0 128.0M128.0 67.05L180.79 36.57M128.0 67.05L180.79 97.52M128.0 128.0L128.0 188.95M128.0 128.0L180.79 97.52M128.0 128.0L180.79 158.48M128.0 188.95L128.0 249.9M128.0 188.95L180.79 158.48M128.0 188.95L180.79 219.43M128.0 249.9L180.79 219.43M180.79 36.57L180.79 97.52M180.79 36.57L233.57 67.05M180.79 97.52L180.79 158.48M180.79 97.52L233.57 67.05M180.79 97.52L233.57 128.0M180.79 158.48L180.79 219.43M180.79 158.48L233.57 128.0M180.79 158.48L233.57 188.95M180.79 219.43L233.57 188.95M233.57 67.05L233.57 128.0M233.57 128.0L233.57 188.95";

/** The grid as separate segments, so each draws on its own delay. */
const SEGMENTS = GRID.split("M")
  .filter(Boolean)
  .map((seg) => `M${seg}`);

// Colors are the brand's light and dark logos (`assets/brand/svg/octant-logo-*.svg`), set per theme in global.css.
const FACES = [
  {
    points: "128,67.05 180.79,97.52 128,128 75.21,97.52",
    fill: "var(--logo-top)",
  },
  {
    points: "180.79,158.48 180.79,97.52 128,128 128,188.95",
    fill: "var(--logo-right)",
  },
  {
    points: "75.21,158.48 128,188.95 128,128 75.21,97.52",
    fill: "var(--logo-left)",
  },
];

export function AnimatedLogo({ size = 112 }: { size?: number }) {
  return (
    <svg
      className="octant-logo"
      width={size}
      height={size}
      viewBox="0 0 256 256"
      role="img"
      aria-label="Octant"
    >
      <g
        fill="none"
        stroke="var(--logo-grid)"
        strokeOpacity="0.45"
        strokeWidth="2.6"
        strokeLinecap="round"
      >
        {SEGMENTS.map((d, i) => (
          <path
            key={d}
            className="octant-logo-grid"
            style={{ animationDelay: `${0.1 + i * 0.016}s` }}
            d={d}
            pathLength={1}
          />
        ))}
      </g>
      {FACES.map((f, i) => (
        <polygon
          key={f.fill}
          className="octant-logo-face"
          style={{ animationDelay: `${0.9 + i * 0.15}s` }}
          points={f.points}
          fill={f.fill}
          stroke="var(--logo-edge)"
          strokeWidth="2.05"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
