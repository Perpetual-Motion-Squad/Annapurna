import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { IEvent, IRegisteredAddresses } from '~/db';

export const config = {
  runtime: 'experimental-edge',
};

const EventImage = (props: Omit<IEvent, 'imageURL'>) => {
  return (
    <div
      style={{
        backgroundColor: 'black',
        backgroundSize: '150px 150px',
        height: '100%',
        width: '100%',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flexWrap: 'nowrap',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          justifyItems: 'center',
        }}
      >
        <img
          alt="Vercel"
          height={200}
          src="data:image/svg+xml,%3Csvg width='116' height='100' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M57.5 0L115 100H0L57.5 0z' /%3E%3C/svg%3E"
          style={{ margin: '0 30px' }}
          width={232}
        />
      </div>
      <div
        style={{
          fontSize: 60,
          fontStyle: 'normal',
          letterSpacing: '-0.025em',
          color: 'white',
          marginTop: 30,
          padding: '0 120px',
          lineHeight: 1.4,
          whiteSpace: 'pre-wrap',
        }}
      >
        {JSON.stringify(props)}
      </div>
    </div>
  )
}

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const event: Omit<IEvent, 'imageURL'> = {
      event: searchParams.get('event') || '',
      date: searchParams.get('date') || '',
      location: searchParams.get('location') || '',
      ticketSupply: +searchParams.get('ticketSupply')!,
      registeredAddresses: [] as IRegisteredAddresses[],
      coordinates: {
        lat: +searchParams.get('lat')!,
        lng: +searchParams.get('lng')!,
      },
      tokenID: +(searchParams.get('tokenID') || 0),
    };

    return new ImageResponse(
      <EventImage {...event} />,
      { width: 1200, height: 630, },
    );
  } catch (e: any) {
    console.log(`${ e.message }`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}