'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const cuisines = ['Chinese', 'Japanese', 'Thai'];

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [maxReadyTime, setMaxReadyTime] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    setIsButtonEnabled(Boolean(query.trim() || cuisine || Number(maxReadyTime) > 0));
  }, [query, cuisine, maxReadyTime]);

  const clickNextButton = () => {
    const params = new URLSearchParams();

    if (query) {
      params.append('query', query);
    }

    if (cuisine) {
      params.append('cuisine', cuisine);
    }

    if (maxReadyTime) {
      params.append('maxReadyTime', maxReadyTime);
    }

    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-green-50 p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-10 space-y-6 border border-green-100">
        <h1 className="text-2xl font-bold text-center text-black-700">Looking for a new recipe?</h1>

        <input
          type="text"
          className="w-full border border-green-200 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-green-300"
          placeholder="Search for a recipe"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="relative">
          <select
            className="w-full border border-green-200 rounded-2xl p-3 pr-10 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-green-300"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          >
            <option value="">Choose cuisine</option>
            {cuisines.map((cuisineOption) => (
              <option value={cuisineOption} key={cuisineOption}>
                {cuisineOption}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-green-500">▼</div>
        </div>

        <input
          type="number"
          className="w-full border border-green-200 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-green-300"
          placeholder="Maximum preparation time (in minutes)"
          value={maxReadyTime}
          onChange={(e) => setMaxReadyTime(e.target.value)}
          min="1"
        />

        <button
          className={`w-full py-3 rounded-2xl text-white font-semibold transition ${
            isButtonEnabled ? 'bg-green-400 hover:bg-green-500' : 'bg-green-200 cursor-not-allowed'
          }`}
          disabled={!isButtonEnabled}
          onClick={clickNextButton}
        >
          Next
        </button>
      </div>
    </main>
  );
}
