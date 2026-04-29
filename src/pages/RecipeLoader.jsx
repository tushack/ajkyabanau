export default function RecipeLoader() {
  return (
    <>
      <style>{`
        @keyframes rotate-ring {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse-smooth {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }

        @keyframes bubble-soft {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.06); }
        }

        @keyframes lid-hover {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }

        @keyframes steam-rise-left {
          0% { opacity: 0; transform: translateY(0) translateX(0); }
          15% { opacity: 0.6; }
          50% { opacity: 0.8; }
          85% { opacity: 0.3; }
          100% { opacity: 0; transform: translateY(-35px) translateX(-8px); }
        }

        @keyframes steam-rise-center {
          0% { opacity: 0; transform: translateY(0); }
          15% { opacity: 0.7; }
          50% { opacity: 0.9; }
          85% { opacity: 0.2; }
          100% { opacity: 0; transform: translateY(-40px); }
        }

        @keyframes steam-rise-right {
          0% { opacity: 0; transform: translateY(0) translateX(0); }
          15% { opacity: 0.6; }
          50% { opacity: 0.8; }
          85% { opacity: 0.3; }
          100% { opacity: 0; transform: translateY(-35px) translateX(8px); }
        }

        @keyframes glow-breathe {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .recipe-loader-rotating-ring {
          animation: rotate-ring 4s linear infinite;
          transform-origin: center;
        }

        .recipe-loader-logo-pulse {
          animation: pulse-smooth 3s ease-in-out infinite;
          transform-origin: center;
        }

        .recipe-loader-pot-bubble {
          animation: bubble-soft 1.8s ease-in-out infinite;
          transform-origin: center;
        }

        .recipe-loader-lid-bounce {
          animation: lid-hover 2.2s ease-in-out infinite;
          transform-origin: center;
        }

        .recipe-loader-steam-left {
          animation: steam-rise-left 2.4s ease-out infinite;
        }

        .recipe-loader-steam-center {
          animation: steam-rise-center 2.8s ease-out infinite;
          animation-delay: 0.3s;
        }

        .recipe-loader-steam-right {
          animation: steam-rise-right 2.6s ease-out infinite;
          animation-delay: 0.6s;
        }

        .recipe-loader-glow {
          animation: glow-breathe 3.5s ease-in-out infinite;
        }
      `}</style>

      <div className="relative" style={{ width: 200, height: 200 }}>
        <div
          className="recipe-loader-glow absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(230, 126, 34, 0.08) 0%, transparent 70%)",
          }}
        />

        <svg
          className="absolute inset-0"
          width="200"
          height="200"
          viewBox="0 0 200 200"
        >
          <defs>
            <linearGradient id="recipeLoaderRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e67e22" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#d35400" stopOpacity="1" />
            </linearGradient>
          </defs>

          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="rgba(230, 126, 34, 0.12)"
            strokeWidth="1.5"
          />

          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="url(#recipeLoaderRingGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="283 566"
            className="recipe-loader-rotating-ring"
            style={{ transform: "rotate(-90deg)" }}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <div style={{ position: "relative", width: 120, height: 120 }}>
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="recipe-loader-logo-pulse"
            >
              <path
                d="M 30 45 Q 30 35 40 35 L 80 35 Q 90 35 90 45 L 88 85 Q 88 95 75 100 L 45 100 Q 32 95 32 85 Z"
                fill="#e67e22"
                stroke="#d35400"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />

              <ellipse
                cx="55"
                cy="50"
                rx="12"
                ry="6"
                fill="rgba(255, 255, 255, 0.25)"
              />

              <path
                d="M 40 65 Q 40 75 60 80 Q 80 75 80 65"
                fill="#c85a1a"
                opacity="0.7"
                className="recipe-loader-pot-bubble"
              />

              <g className="recipe-loader-lid-bounce">
                <ellipse
                  cx="60"
                  cy="36"
                  rx="25"
                  ry="8"
                  fill="#d4a574"
                  stroke="#a0714f"
                  strokeWidth="1"
                />
                <ellipse
                  cx="60"
                  cy="34"
                  rx="23"
                  ry="6"
                  fill="#e8c39f"
                  stroke="#d4a574"
                  strokeWidth="0.5"
                />
                <circle
                  cx="60"
                  cy="32"
                  r="3"
                  fill="#d4a574"
                  stroke="#a0714f"
                  strokeWidth="0.5"
                />
              </g>

              <ellipse cx="60" cy="102" rx="38" ry="6" fill="#d4a574" opacity="0.5" />
            </svg>

            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
            >
              <path
                d="M 45 20 Q 42 35 45 50 Q 48 65 42 80"
                fill="none"
                stroke="rgba(230, 126, 34, 0.35)"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="recipe-loader-steam-left"
              />
              <path
                d="M 60 15 Q 58 35 62 55 Q 65 75 60 90"
                fill="none"
                stroke="rgba(230, 126, 34, 0.32)"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="recipe-loader-steam-center"
              />
              <path
                d="M 75 22 Q 78 38 75 55 Q 72 72 78 85"
                fill="none"
                stroke="rgba(230, 126, 34, 0.3)"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="recipe-loader-steam-right"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}