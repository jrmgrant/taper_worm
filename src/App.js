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
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!session) {
    return <Login />;
  }

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

  const handleSave = async () => {
    const { data, error } = await supabase.from('daily_logs').insert([
      {
        user_id: session.user.id,
        date: log.date,
        clonazepam_am: log.medsTaken['Clonazepam AM'] ? '0.5 mg' : '',
        clonazepam_pm: log.medsTaken['Clonazepam PM'] ? '0.5 mg' : '',
        suboxone: log.medsTaken['Suboxone'] ? '6 mg' : '',
        bupropion: log.medsTaken['Bupropion'] ? '150 mg' : '',
        sertraline: log.medsTaken['Sertraline'] ? '100 mg' : '',
        dextroamphetamine: log.medsTaken['Dextroamphetamine'] ? '10 mg' : '',
        zopiclone: log.medsTaken['Zopiclone'] ? '5 mg' : '',
        sleep_score: Number(log.sleep),
        energy_score: Number(log.energy),
        appetite_score: Number(log.appetite),
        mood: log.mood,
        notes: log.notes,
      },
    ]);

    if (error) {
      alert('❌ Error saving entry: ' + error.message);
    } else {
      alert('✅ Entry saved!');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Taper Tracker – {today}</h1>
      <p className="text-center mb-6 text-sm">Logged in as {session.user.email}</p>

      {meds.map((med) => (
        <div key={med.name} className="flex justify-between py-1">
          <label>{med.name} ({med.dose})</label>
          <input
            type="checkbox"
            checked={!!log.medsTaken[med.name]}
            onChange={() => toggleMed(med.name)}
          />
        </div>
      ))}

      <div className="mt-4">
        <label>Sleep (1–10):</label>
        <input
          type="number"
          value={log.sleep}
          onChange={(e) => setLog({ ...log, sleep: e.target.value })}
          className="w-full border p-1 mb-2"
        />

        <label>Energy (1–10):</label>
        <input
          type="number"
          value={log.energy}
          onChange={(e) => setLog({ ...log, energy: e.target.value })}
          className="w-full border p-1 mb-2"
        />

        <label>Appetite (1–10):</label>
        <input
          type="number"
          value={log.appetite}
          onChange={(e) => setLog({ ...log, appetite: e.target.value })}
          className="w-full border p-1 mb-2"
        />

        <label>Mood:</label>
        <select
          value={log.mood}
          onChange={(e) => setLog({ ...log, mood: e.target.value })}
          className="w-full border p-1 mb-2"
        >
          <option value="">Select Mood</option>
          {moodOptions.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <label>Notes:</label>
        <textarea
          value={log.notes}
          onChange={(e) => setLog({ ...log, notes: e.target.value })}
          className="w-full border p-2 mb-4"
        />

        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Entry
        </button>
      </div>
    </div>
  );
}

export default App;
