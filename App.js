// Jamie's Taper Tracker App - Extended React Prototype with Doses
import React, { useState } from 'react';

const meds = [
  { name: 'Clonazepam AM', dose: '0.5 mg' },
  { name: 'Clonazepam PM', dose: '0.5 mg' },
  { name: 'Zopiclone', dose: '5 mg' },
  { name: 'Suboxone', dose: '6 mg' },
  { name: 'Bupropion', dose: '150 mg' },
  { name: 'Sertraline', dose: '100 mg' },
  { name: 'Dextroamphetamine', dose: '10 mg' }
];

const moodOptions = ['Happy', 'Sad', 'Depressed', 'Anxious', 'Lonely', 'Neutral'];

export default function TaperTracker() {
  const today = new Date().toISOString().split('T')[0];

  const [log, setLog] = useState({
    date: today,
    medsTaken: {},
    sleep: '',
    energy: '',
    appetite: '',
    mood: '',
    notes: ''
  });

  const toggleMed = (med) => {
    setLog((prev) => ({
      ...prev,
      medsTaken: {
        ...prev.medsTaken,
        [med]: !prev.medsTaken[med]
      }
    }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Taper Tracker - {log.date}</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {meds.map(({ name, dose }) => (
          <label key={name} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={!!log.medsTaken[name]}
              onChange={() => toggleMed(name)}
            />
            <span>{name} ({dose})</span>
          </label>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <label className="flex flex-col">
          Sleep (1-10):
          <input
            type="number"
            value={log.sleep}
            onChange={(e) => setLog({ ...log, sleep: e.target.value })}
            className="border rounded px-2 py-1"
          />
        </label>
        <label className="flex flex-col">
          Energy (1-10):
          <input
            type="number"
            value={log.energy}
            onChange={(e) => setLog({ ...log, energy: e.target.value })}
            className="border rounded px-2 py-1"
          />
        </label>
        <label className="flex flex-col">
          Appetite (1-10):
          <input
            type="number"
            value={log.appetite}
            onChange={(e) => setLog({ ...log, appetite: e.target.value })}
            className="border rounded px-2 py-1"
          />
        </label>
      </div>

      <label className="block mb-4">
        Mood:
        <select
          value={log.mood}
          onChange={(e) => setLog({ ...log, mood: e.target.value })}
          className="border rounded px-2 py-1 w-full"
        >
          <option value="">Select Mood</option>
          {moodOptions.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </label>

      <label className="block mb-4">
        Notes:
        <textarea
          value={log.notes}
          onChange={(e) => setLog({ ...log, notes: e.target.value })}
          className="border rounded px-2 py-1 w-full"
          rows="4"
        ></textarea>
      </label>

      <button
        onClick={() => alert('Entry saved (placeholder)!')}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Entry
      </button>
    </div>
  );
}
