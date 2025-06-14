import { NextRequest, NextResponse } from 'next/server';
import { createMessage } from '../../../lib/csvDB';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, message } = body;

    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email i wiadomość są wymagane' },
        { status: 400 }
      );
    }

    // Zapisz wiadomość w pliku CSV
    const newMessage = createMessage(email, message);

    if (!newMessage) {
      throw new Error('Nie można zapisać wiadomości');
    }

    console.log('Zapisano wiadomość w CSV:', { email, message, timestamp: newMessage.timestamp });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Wiadomość otrzymana i zapisana', 
        id: newMessage.id 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Błąd obsługi formularza kontaktowego:', error);
    return NextResponse.json(
      { error: error.message || 'Wystąpił problem z przetwarzaniem żądania' },
      { status: 500 }
    );
  }
}
