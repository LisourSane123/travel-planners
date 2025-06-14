import { NextRequest, NextResponse } from 'next/server';
import { deleteTrip } from '../../../../../lib/tripsDB';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
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

    const success = deleteTrip(tripId, userId);

    if (!success) {
      return NextResponse.json(
        { error: 'Nie można usunąć podróży' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Podróż została usunięta' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Wystąpił błąd podczas usuwania podróży' },
      { status: 500 }
    );
  }
}
