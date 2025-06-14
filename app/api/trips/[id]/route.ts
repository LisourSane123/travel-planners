import { NextRequest, NextResponse } from 'next/server';
import { updateTrip, getTripById } from '../../../../../lib/tripsDB';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Nie jesteś zalogowany' },
        { status: 401 }
      );
    }

    const tripId = params.id;
    const userId = session.user.id as string;

    const trip = getTripById(tripId, userId);

    if (!trip) {
      return NextResponse.json(
        { error: 'Podróż nie została znaleziona' },
        { status: 404 }
      );
    }

    return NextResponse.json({ trip }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Wystąpił błąd podczas pobierania podróży' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Nie jesteś zalogowany' },
        { status: 401 }
      );
    }

    const tripId = params.id;
    const userId = session.user.id as string;
    const body = await req.json();
    
    // Validate required fields
    if (!body.destination || !body.date) {
      return NextResponse.json(
        { error: 'Cel podróży i data są wymagane' },
        { status: 400 }
      );
    }
    
    // Process number fields
    if (body.adults !== undefined) body.adults = Number(body.adults);
    if (body.children !== undefined) body.children = Number(body.children);

    // Update the trip
    const updatedTrip = updateTrip(tripId, userId, body);

    if (!updatedTrip) {
      return NextResponse.json(
        { error: 'Nie można zaktualizować podróży' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Podróż została zaktualizowana', trip: updatedTrip },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Wystąpił błąd podczas aktualizacji podróży' },
      { status: 500 }
    );
  }
}
