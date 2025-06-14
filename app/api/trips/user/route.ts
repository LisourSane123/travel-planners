import { NextRequest, NextResponse } from 'next/server';
import { getUserTrips } from '../../../../lib/tripsDB';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
  try {
    // Get the session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Nie jesteś zalogowany' },
        { status: 401 }
      );
    }

    // Get user trips
    const userId = session.user.id as string;
    const trips = getUserTrips(userId);

    return NextResponse.json(
      { trips },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Błąd pobierania podróży:', error);
    return NextResponse.json(
      { error: error.message || 'Wystąpił problem z pobieraniem podróży' },
      { status: 500 }
    );
  }
}
