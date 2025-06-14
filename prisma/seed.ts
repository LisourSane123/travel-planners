import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seed() {
  // Dodaj użytkownika
  const { data: user } = await supabase.auth.admin.createUser({
    email: 'demo@planer.pl',
    password: 'demo1234',
    email_confirm: true,
  });

  // Dodaj przykładowe podróże
  if (user?.user?.id) {
    await supabase.from('trips').insert([
      { user_id: user.user.id, destination: 'Paryż', date: '2025-07-01', status: 'nowa' },
      { user_id: user.user.id, destination: 'Rzym', date: '2025-08-15', status: 'zakończona' },
    ]);
  }
  console.log('Seed complete');
}

seed();
