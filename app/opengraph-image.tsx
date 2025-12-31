import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'RiscLens - SOC 2 Cost Calculator';

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
            fontSize: 72,
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
            fontSize: 48,
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          SOC 2 Cost Calculator
        </div>
        <div
          style={{
            fontSize: 28,
            color: 'rgba(255, 255, 255, 0.7)',
            marginTop: 32,
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          Get your personalized readiness score and cost estimate
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

