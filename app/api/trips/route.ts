import { NextRequest, NextResponse } from 'next/server';
import { createTrip } from '../../../lib/tripsDB';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: NextRequest) {
  try {
    // Get the session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Nie jesteś zalogowany' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { destination, date, endDate, category, continent, adults, children, comments } = body;

    if (!destination || !date) {
      return NextResponse.json(
        { error: 'Cel podróży i data są wymagane' },
        { status: 400 }
      );
    }

    // Create the trip in CSV
    const userId = session.user.id as string;
    const newTrip = createTrip(
      userId, 
      destination, 
      date,
      endDate, 
      category, 
      continent,
      adults !== undefined ? Number(adults) : undefined,
      children !== undefined ? Number(children) : undefined,
      comments
    );

    if (!newTrip) {
      throw new Error('Nie można zapisać podróży');
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Podróż została zapisana', 
        trip: newTrip 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Błąd zapisywania podróży:', error);
    return NextResponse.json(
      { error: error.message || 'Wystąpił problem z zapisem podróży' },
      { status: 500 }
    );
  }
}
