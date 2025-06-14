import { NextRequest, NextResponse } from 'next/server';
import { getAllMessages } from '../../../lib/csvDB';

export async function GET(req: NextRequest) {
  try {
    // Get all messages
    const messages = getAllMessages();

    return NextResponse.json(
      { messages },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Błąd pobierania wiadomości:', error);
    return NextResponse.json(
      { error: error.message || 'Wystąpił problem z pobieraniem wiadomości' },
      { status: 500 }
    );
  }
}
