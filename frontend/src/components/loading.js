import React from "react";

function Loading({ text = "Loading..." }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "200px",
        color: "#3273dc",
      }}
    >
      <span className="loader" style={{ fontSize: 32, marginBottom: 10 }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle
            cx="20"
            cy="20"
            r="18"
            stroke="#3273dc"
            strokeWidth="4"
            opacity="0.2"
          />
          <circle
            cx="20"
            cy="20"
            r="18"
            stroke="#3273dc"
            strokeWidth="4"
            strokeDasharray="90 60"
            strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 20 20"
              to="360 20 20"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </span>
      <span style={{ fontSize: 18 }}>{text}</span>
    </div>
  );
}

export default Loading;
