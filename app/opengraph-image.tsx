import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'RiscLens - SOC 2 Readiness Index for Early-Stage Companies';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 80,
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 24,
            fontFamily: 'Arial, sans-serif',
          }}
        >
          RiscLens
        </div>
        <div
          style={{
            fontSize: 44,
            color: 'rgba(255, 255, 255, 0.95)',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
            lineHeight: 1.3,
            maxWidth: 900,
          }}
        >
          SOC 2 Readiness Index
        </div>
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255, 255, 255, 0.8)',
            marginTop: 16,
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          for Early-Stage Companies
        </div>
        <div
          style={{
            fontSize: 24,
            color: 'rgba(255, 255, 255, 0.7)',
            marginTop: 40,
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          Clear readiness score and gap analysis in minutes
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
