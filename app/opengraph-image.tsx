import { ImageResponse } from "next/og";

export const alt = "Visiweal — Strategic M&A & Financial Advisory";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0C1820 0%, #0D2137 40%, #0F2A3A 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "50%",
            height: "80%",
            background:
              "radial-gradient(ellipse, rgba(20,184,166,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "-5%",
            width: "40%",
            height: "50%",
            background:
              "radial-gradient(ellipse, rgba(20,184,166,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 60px",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#14B8A6",
              fontFamily: "serif",
              marginBottom: 16,
            }}
          >
            Visiweal
          </span>
          <span
            style={{
              fontSize: 32,
              fontWeight: 300,
              color: "#E2E8F0",
              letterSpacing: "0.02em",
              fontFamily: "sans-serif",
              maxWidth: 700,
              lineHeight: 1.3,
            }}
          >
            Strategic M&A, Financial Advisory & Fractional CFO
          </span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 400,
              color: "#94A3B8",
              marginTop: 24,
              fontFamily: "sans-serif",
            }}
          >
            Premium advisory for enterprise clients across the Middle East and beyond
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
