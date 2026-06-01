"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const fetchHealth = (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/health`);
        const data = await res.json();

        setMessage(data.message);

      } catch {
        setMessage("Backend connection failed");
      }
    });

    fetchHealth();

  }, []);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">
        Cron Queue Monitoring Dashboard
      </h1>

      <p className="mt-4">
        Backend status: {message}
      </p>
    </main>
  );
}
