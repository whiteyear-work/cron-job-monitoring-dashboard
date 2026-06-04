"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  // variable & state
  const [dashboard, setDash] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //once page load then handle element animation
  useEffect(() => { 
    const fetchDashboard = async () => {
      try {

        await new Promise((resolve) => setTimeout(resolve, 1000));
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`);
        const data = await res.json();

        setDash(data);
      } catch {
        setError("failed to get dashboard data");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  if (loading) {
    return <p className="p-8">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="p-8 text-red-500">{error}</p>;
  }

  return (
    dashboard && (
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded border p-4">
          <p>Total Cron Jobs</p>
          <h2 className="text-2xl font-bold">{dashboard.totalCronJobs}</h2>
        </div>

        <div className="rounded border p-4">
          <p>Failed Cron Runs</p>
          <h2 className="text-2xl font-bold">{dashboard.failedCronRuns}</h2>
        </div>

        <div className="rounded border p-4">
          <p>Unresolved Alerts</p>
          <h2 className="text-2xl font-bold">{dashboard.unresolvedAlerts}</h2>
        </div>
      </div>
    )
  )
}
