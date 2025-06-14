import { NextRequest, NextResponse } from 'next/server';
import { createUser, findUserByEmail } from '../../../../lib/csvDB';

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email i hasło są wymagane' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { message: 'Użytkownik z tym adresem email już istnieje' },
        { status: 409 }
      );
    }

    // Add basic validation
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Hasło musi mieć co najmniej 6 znaków' },
        { status: 400 }
      );
    }

    // Create user in CSV database
    const newUser = createUser(email, password, name);

    if (!newUser) {
      throw new Error('Nie udało się utworzyć użytkownika');
    }

    return NextResponse.json(
      { 
        message: 'Użytkownik został zarejestrowany', 
        user: { id: newUser.id, email: newUser.email } 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Błąd rejestracji:', error);
    return NextResponse.json(
      { message: error.message || 'Wystąpił błąd podczas rejestracji' },
      { status: 500 }
    );
  }
}
