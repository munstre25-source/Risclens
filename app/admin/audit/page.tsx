'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Database } from 'lucide-react';

interface AuditLog {
  id: string;
  event_type: string;
  payload: any;
  created_at: string;
}

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/admin/audit/list');
      if (!res.ok) throw new Error('Failed to fetch audit logs');
      const data = await res.json();
      setLogs(data.logs || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading logs');
    } finally {
      setLoading(false);
    }
  };

  const formatPayload = (payload: any) => {
    try {
      return JSON.stringify(payload, null, 2);
    } catch {
      return 'Invalid payload';
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading audit logs...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">System Audit Logs</h1>
        <div className="flex gap-3">
          <Link 
            href="/admin/audit/content"
            className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-bold border border-emerald-100 hover:bg-emerald-100 transition-all"
          >
            <Database className="h-4 w-4" />
            Content Audit
          </Link>
          <button onClick={fetchLogs} className="btn-secondary text-sm">Refresh</button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="card overflow-hidden p-0">
        <table className="admin-table w-full">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Event Type</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-8 text-gray-500">No logs found.</td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 align-top">
                  <td className="whitespace-nowrap text-sm text-gray-500">
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      log.event_type.includes('error') || log.event_type.includes('fail')
                        ? 'bg-red-100 text-red-700'
                        : log.event_type.includes('success') || log.event_type.includes('distributed')
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {log.event_type}
                    </span>
                  </td>
                  <td>
                    <pre className="text-xs bg-gray-50 p-2 rounded border border-gray-100 max-h-32 overflow-y-auto font-mono text-gray-600">
                      {formatPayload(log.payload)}
                    </pre>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
