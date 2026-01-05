'use client';

import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [retentionDays, setRetentionDays] = useState(90);
  const [isPurging, setIsPurging] = useState(false);
  const [purgeResult, setPurgeResult] = useState<{ success: boolean; message: string; count?: number } | null>(null);
  const [testModeEnabled, setTestModeEnabled] = useState(false);
  const [isTogglingTestMode, setIsTogglingTestMode] = useState(false);
  
  // Pricing & Scoring Settings
  const [settings, setSettings] = useState<any>(null);
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);
  const [isSavingSetting, setIsSavingSetting] = useState<string | null>(null);

  useEffect(() => {
    // Check if test mode is enabled via cookie
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
    
    setTestModeEnabled(cookies['rls_test_mode'] === '1');
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      const data = await response.json();
      if (data.success) {
        setSettings(data.settings);
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    } finally {
      setIsLoadingSettings(false);
    }
  };

  const handleUpdateSetting = async (key: string, value: any) => {
    setIsSavingSetting(key);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
      });
      const data = await response.json();
      if (data.success) {
        setSettings({ ...settings, [key]: value });
      } else {
        alert('Failed to update setting: ' + data.error);
      }
    } catch (err) {
      alert('An error occurred while updating setting.');
    } finally {
      setIsSavingSetting(null);
    }
  };

  const handlePurge = async () => {
    if (!confirm(`Are you sure you want to purge leads older than ${retentionDays} days? This action cannot be undone.`)) {
      return;
    }

    setIsPurging(true);
    setPurgeResult(null);

    try {
      const response = await fetch('/api/admin/purge-retention', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ days: retentionDays, exclude_sold: true }),
      });

      const data = await response.json();
      if (data.success) {
        setPurgeResult({ 
          success: true, 
          message: `Successfully purged ${data.records_deleted} records.`,
          count: data.records_deleted 
        });
      } else {
        setPurgeResult({ success: false, message: data.error || 'Failed to purge records.' });
      }
    } catch (err) {
      setPurgeResult({ success: false, message: 'An unexpected error occurred.' });
    } finally {
      setIsPurging(false);
    }
  };

  const toggleTestMode = async () => {
    setIsTogglingTestMode(true);
    try {
      const response = await fetch('/api/admin/test-mode/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: !testModeEnabled }),
      });

      const data = await response.json();
      if (data.success) {
        setTestModeEnabled(data.enabled);
      }
    } catch (err) {
      console.error('Failed to toggle test mode:', err);
    } finally {
      setIsTogglingTestMode(false);
    }
  };

  const handleClearTestData = async () => {
    if (!confirm('Are you sure you want to clear all test data? This will remove all leads marked as "test".')) {
      return;
    }

    try {
      const response = await fetch('/api/admin/test-mode/clear', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.success) {
        alert('Test data cleared successfully.');
      } else {
        alert('Failed to clear test data: ' + data.error);
      }
    } catch (err) {
      alert('An error occurred while clearing test data.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">System Settings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Data Retention Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-800 border-b pb-2">Data Retention</h2>
            <p className="text-sm text-slate-600">
              Manage how long lead data is stored in the system. Purging old data helps maintain performance and data privacy.
            </p>
            <div className="flex flex-col space-y-2">
              <label htmlFor="retention-days" className="text-sm font-medium text-slate-700">
                Retention Period (Days)
              </label>
              <div className="flex space-x-2">
                <input
                  id="retention-days"
                  type="number"
                  min="30"
                  value={retentionDays}
                  onChange={(e) => setRetentionDays(parseInt(e.target.value) || 30)}
                  className="w-24 px-3 py-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={handlePurge}
                  disabled={isPurging}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isPurging 
                      ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isPurging ? 'Purging...' : 'Run Purge Now'}
                </button>
              </div>
              <p className="text-xs text-slate-500 italic">Minimum 30 days. Sold leads are excluded by default.</p>
            </div>
            {purgeResult && (
              <div className={`p-3 rounded-md text-sm ${purgeResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {purgeResult.message}
              </div>
            )}
          </div>

          {/* Configuration Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-800 border-b pb-2">Application Config</h2>
            
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Admin Test Mode</h3>
                <p className="text-xs text-slate-600">Simulate lead generation and bypass real webhooks.</p>
              </div>
              <button
                onClick={toggleTestMode}
                disabled={isTogglingTestMode}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  testModeEnabled ? 'bg-blue-600' : 'bg-slate-200'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    testModeEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Pricing & Scoring Management */}
        <div className="mt-12 pt-8 border-t border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Pricing & Scoring Management</h2>
          
          {isLoadingSettings ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Cost Parameters */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
                  Base Pricing Parameters
                  {isSavingSetting === 'cost_parameters' && <span className="text-xs font-normal text-blue-600 animate-pulse">Saving...</span>}
                </h3>
                <div className="bg-slate-50 rounded-lg p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Base Cost (Low)</label>
                      <input
                        type="number"
                        value={settings?.cost_parameters?.baseCost?.low || 0}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          const newParams = { ...settings.cost_parameters, baseCost: { ...settings.cost_parameters.baseCost, low: val } };
                          handleUpdateSetting('cost_parameters', newParams);
                        }}
                        className="w-full px-3 py-2 border rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Base Cost (High)</label>
                      <input
                        type="number"
                        value={settings?.cost_parameters?.baseCost?.high || 0}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          const newParams = { ...settings.cost_parameters, baseCost: { ...settings.cost_parameters.baseCost, high: val } };
                          handleUpdateSetting('cost_parameters', newParams);
                        }}
                        className="w-full px-3 py-2 border rounded-md text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Per Employee (Low)</label>
                      <input
                        type="number"
                        value={settings?.cost_parameters?.perEmployee?.low || 0}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          const newParams = { ...settings.cost_parameters, perEmployee: { ...settings.cost_parameters.perEmployee, low: val } };
                          handleUpdateSetting('cost_parameters', newParams);
                        }}
                        className="w-full px-3 py-2 border rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Per Employee (High)</label>
                      <input
                        type="number"
                        value={settings?.cost_parameters?.perEmployee?.high || 0}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          const newParams = { ...settings.cost_parameters, perEmployee: { ...settings.cost_parameters.perEmployee, high: val } };
                          handleUpdateSetting('cost_parameters', newParams);
                        }}
                        className="w-full px-3 py-2 border rounded-md text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Per Data Type (Low)</label>
                      <input
                        type="number"
                        value={settings?.cost_parameters?.perDataType?.low || 0}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          const newParams = { ...settings.cost_parameters, perDataType: { ...settings.cost_parameters.perDataType, low: val } };
                          handleUpdateSetting('cost_parameters', newParams);
                        }}
                        className="w-full px-3 py-2 border rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Per Data Type (High)</label>
                      <input
                        type="number"
                        value={settings?.cost_parameters?.perDataType?.high || 0}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          const newParams = { ...settings.cost_parameters, perDataType: { ...settings.cost_parameters.perDataType, high: val } };
                          handleUpdateSetting('cost_parameters', newParams);
                        }}
                        className="w-full px-3 py-2 border rounded-md text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Scoring Weights JSON Editor */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
                  Scoring Weights (JSON)
                  {isSavingSetting === 'scoring_weights' && <span className="text-xs font-normal text-blue-600 animate-pulse">Saving...</span>}
                </h3>
                <div className="bg-slate-900 rounded-lg p-2">
                  <textarea
                    rows={12}
                    className="w-full bg-transparent text-emerald-400 font-mono text-xs p-2 focus:outline-none resize-none"
                    defaultValue={JSON.stringify(settings?.scoring_weights, null, 2)}
                    onBlur={(e) => {
                      try {
                        const val = JSON.parse(e.target.value);
                        handleUpdateSetting('scoring_weights', val);
                      } catch (err) {
                        alert('Invalid JSON for Scoring Weights');
                      }
                    }}
                  />
                  <p className="text-[10px] text-slate-400 p-2 border-t border-slate-800 italic">
                    Tip: Changes are saved when the editor loses focus. Be careful with the schema.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Danger Zone */}
        <div className="mt-12 pt-8 border-t border-red-100">
          <h2 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h2>
          <div className="bg-red-50 border border-red-100 rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-red-900">Clear All Test Data</h3>
              <p className="text-xs text-red-700">
                Permanently delete all leads and associated data marked as "test". This cannot be undone.
              </p>
            </div>
            <button
              onClick={handleClearTestData}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
            >
              Clear Test Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
