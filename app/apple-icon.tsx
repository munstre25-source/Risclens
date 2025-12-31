import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 100,
          background: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 32,
          color: 'white',
          fontWeight: 'bold',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        R
      </div>
    ),
    {
      ...size,
    }
  );
}

