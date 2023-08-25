import { ImageResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // ?text=<text>
    const text = searchParams.get('text')?.slice(0, 100).replace('.jpg', '') || '';
    // ?fontSize=200
    const fontSize = (searchParams.get('fontSize')?.slice(0, 100) || 100) as any * 1;

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: 'indigo',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            padding: '10px',
          }}
        >
          <div
            style={{
              fontSize: fontSize,
              fontWeight: 'bold',
              letterSpacing: '-0.025em',
              color: 'white',
              marginTop: 30,
              padding: '0 120px',
              lineHeight: 1.4,
              whiteSpace: 'pre-wrap',
            }}
          >
            {text}
          </div>
        </div>
      ),
      {
        width: 600,
        height: 430,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
