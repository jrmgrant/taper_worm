import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Login from './Login';

const meds = [
  { name: 'Clonazepam AM', dose: '0.5 mg' },
  { name: 'Clonazepam PM', dose: '0.5 mg' },
  { name: 'Zopiclone', dose: '5 mg' },
  { name: 'Suboxone', dose: '6 mg' },
  { name: 'Bupropion', dose: '150 mg' },
  { name: 'Sertraline', dose: '100 mg' },
  { name: 'Dextroamphetamine', dose: '10 mg' },
];

const moodOptions = ['Happy', 'Sad', 'Depressed', 'Anxious', 'Lonely', 'Neutral'];

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) =>
      setSession(session)
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (!session) return <Login />;

  return <TaperTracker session={session} />;
}

function TaperTracker({ session }) {
  const today = new Date().toISOString().split('T')[0];

  const [log, setLog] = useState({
    date: today,
    medsTaken: {},
    sleep: '',
    energy: '',
    appetite: '',
    mood: '',
    notes: '',
  });

  const toggleMed = (med) => {
    setLog((prev) => ({
      ...prev,
      medsTaken: {
        ...prev.medsTaken,
        [med]: !prev.medsTaken[med],
      },
    }));
  };

  // 🧠 Make sure to use session.user.id for saving entries later

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-4">
        Welcome, {session.user.email}
      </h1>
      {/* Your taper tracker UI continues here... */}
    </>
  );
}

export default App;
