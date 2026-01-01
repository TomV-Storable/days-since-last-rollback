'use client';

import { useEffect, useState } from "react";

interface Config {
  releases: number;
  rollbacks: number;
}

export default function Home() {
  const [releases, setReleases] = useState(0);
  const [rollbacks, setRollbacks] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
        const response = await fetch(`${basePath}/config.json`);
        const config: Config = await response.json();

        setReleases(config.releases);
        setRollbacks(config.rollbacks);
      } catch (error) {
        console.error('Failed to load config:', error);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  const successRate = releases > 0
    ? ((releases - rollbacks) / releases * 100).toFixed(1)
    : '0.0';

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 font-sans dark:from-black dark:to-zinc-900">
        <div className="text-center">
          <p className="text-lg text-zinc-600 dark:text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 font-sans dark:from-black dark:to-zinc-900">
      <main className="w-full max-w-4xl px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tight text-black dark:text-zinc-50 mb-2">
            2026 Release Tracker
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Monitor your deployment success rate
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8 border border-zinc-200 dark:border-zinc-700">
            <h2 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300 mb-4 text-center">
              Releases
            </h2>
            <p className="text-6xl font-bold text-green-600 dark:text-green-400 text-center">
              {releases}
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8 border border-zinc-200 dark:border-zinc-700">
            <h2 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300 mb-4 text-center">
              Rollbacks
            </h2>
            <p className="text-6xl font-bold text-red-600 dark:text-red-400 text-center">
              {rollbacks}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8 border border-zinc-200 dark:border-zinc-700">
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
      </main>
    </div>
  );
}
