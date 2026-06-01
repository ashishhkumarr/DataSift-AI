import { chart } from "@/lib/content";

/**
 * Lightweight multi-series line chart rendered as pure SVG (no client JS, no
 * charting dependency). Used in the hero as the concrete proof point — what a
 * single normalized, queryable source looks like.
 *
 * Data is illustrative (see content.ts) and labeled as such in the UI.
 */

const W = 520;
const H = 300;
const PAD = { top: 18, right: 16, bottom: 28, left: 30 };
const innerW = W - PAD.left - PAD.right;
const innerH = H - PAD.top - PAD.bottom;

const MAX = 45; // y-axis ceiling (percent)

function x(i: number, n: number) {
  return PAD.left + (innerW * i) / (n - 1);
}
function y(v: number) {
  return PAD.top + innerH - (innerH * v) / MAX;
}

function linePath(values: number[]) {
  return values
    .map((v, i) => `${i === 0 ? "M" : "L"} ${x(i, values.length).toFixed(1)} ${y(v).toFixed(1)}`)
    .join(" ");
}

export function SeriesChart() {
  const { series, years } = chart;
  const gridYs = [0, 15, 30, 45];
  const lastIdx = years.length - 1;

  return (
    <figure className="w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        role="img"
        aria-label="Illustrative Wyoming youth-health trends, 2004 to 2022, across four series."
      >
        {/* horizontal gridlines + y labels */}
        {gridYs.map((g) => (
          <g key={g}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(g)}
              y2={y(g)}
              stroke="#1e2940"
              strokeWidth="1"
            />
            <text x={PAD.left - 8} y={y(g) + 3} textAnchor="end" fontSize="9" fill="#6b7794">
              {g}%
            </text>
          </g>
        ))}

        {/* x labels: first + last year */}
        <text x={x(0, years.length)} y={H - 8} textAnchor="start" fontSize="9" fill="#6b7794">
          {years[0]}
        </text>
        <text x={x(lastIdx, years.length)} y={H - 8} textAnchor="end" fontSize="9" fill="#6b7794">
          {years[lastIdx]}
        </text>

        {/* series lines + end-point dots */}
        {series.map((s) => (
          <g key={s.name}>
            <path
              d={linePath(s.values)}
              fill="none"
              stroke={s.color}
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <circle cx={x(lastIdx, s.values.length)} cy={y(s.values[lastIdx])} r="3" fill={s.color} />
          </g>
        ))}
      </svg>

      {/* legend */}
      <figcaption className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
        {series.map((s) => (
          <span key={s.name} className="flex items-center gap-1.5 text-xs text-fog">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
            {s.name}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
