import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "NaraSibolga — KKN Sibolga North Sumatra";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public/images/kkn-logo.png"),
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  const fontData = await readFile(
    join(
      process.cwd(),
      "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf",
    ),
  );

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        backgroundColor: "#1a3d2e",
      }}
    >
      {/* biome-ignore lint/performance/noImgElement: ImageResponse/satori requires <img>, not next/image */}
      <img
        src={logoSrc}
        alt="NaraSibolga logo"
        height={160}
        style={{ borderRadius: 12 }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            fontSize: 88,
            fontWeight: 400,
            color: "#f7f5f0",
            letterSpacing: "-0.02em",
          }}
        >
          NaraSibolga
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 400,
            color: "#a8c5b0",
          }}
        >
          KKN Sibolga North Sumatra
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Geist",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
