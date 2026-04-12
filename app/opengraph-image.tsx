import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const alt = "Como Lake Suites";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background:
            "linear-gradient(130deg, #0f172a 0%, #1e3a8a 55%, #1f4f8f 100%)",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            fontSize: 36,
            letterSpacing: 5,
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          Luxury Suites
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 78, fontWeight: 600, lineHeight: 1.05 }}>
            Como Lake Suites
          </div>
          <div style={{ fontSize: 38, opacity: 0.92 }}>
            Lago di Como - Italia
          </div>
        </div>
      </div>
    ),
    size,
  );
}
