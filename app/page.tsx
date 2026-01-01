'use client';

import { useEffect, useState } from "react";

export default function Home() {
  const [releases, setReleases] = useState(0);
  const [rollbacks, setRollbacks] = useState(0);

  useEffect(() => {
    const storedReleases = localStorage.getItem('releases');
    const storedRollbacks = localStorage.getItem('rollbacks');

    if (storedReleases) setReleases(parseInt(storedReleases, 10));
    if (storedRollbacks) setRollbacks(parseInt(storedRollbacks, 10));
  }, []);

  const incrementReleases = () => {
    const newCount = releases + 1;
    setReleases(newCount);
    localStorage.setItem('releases', newCount.toString());
  };

  const incrementRollbacks = () => {
    const newCount = rollbacks + 1;
    setRollbacks(newCount);
    localStorage.setItem('rollbacks', newCount.toString());
  };

  const resetCounters = () => {
    setReleases(0);
    setRollbacks(0);
    localStorage.setItem('releases', '0');
    localStorage.setItem('rollbacks', '0');
  };

  const successRate = releases > 0
    ? ((releases - rollbacks) / releases * 100).toFixed(1)
    : '0.0';

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 font-sans dark:from-black dark:to-zinc-900">
      <main className="w-full max-w-4xl px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tight text-black dark:text-zinc-50 mb-2">
            Release Tracker
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Monitor your deployment success rate
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8 border border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300">
                Releases
              </h2>
              <span className="text-5xl font-bold text-green-600 dark:text-green-400">
                {releases}
              </span>
            </div>
            <button
              onClick={incrementReleases}
              className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
            >
              + Add Release
            </button>
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8 border border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300">
                Rollbacks
              </h2>
              <span className="text-5xl font-bold text-red-600 dark:text-red-400">
                {rollbacks}
              </span>
            </div>
            <button
              onClick={incrementRollbacks}
              className="w-full py-3 px-6 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
            >
              + Add Rollback
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8 border border-zinc-200 dark:border-zinc-700 mb-6">
          <h2 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300 mb-4 text-center">
            Statistics
          </h2>
          <div className="grid gap-4 md:grid-cols-3 text-center">
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Success Rate</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{successRate}%</p>
            </div>
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Total Deployments</p>
              <p className="text-3xl font-bold text-zinc-700 dark:text-zinc-300">{releases}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Rollback Rate</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {releases > 0 ? ((rollbacks / releases) * 100).toFixed(1) : '0.0'}%
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={resetCounters}
            className="py-2 px-8 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 rounded-lg font-medium transition-colors"
          >
            Reset Counters
          </button>
        </div>
      </main>
    </div>
  );
}
