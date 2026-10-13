// File: frontend/src/components/NotificationAuditDrawer.tsx

import React, { useState, useEffect } from 'react';
import { X, Mail, CheckCircle2, AlertOctagon, Send, RefreshCw } from 'lucide-react';
import { DeliveryLog } from '../types';
import { api } from '../services/api';

interface NotificationAuditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationAuditDrawer: React.FC<NotificationAuditDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [logs, setLogs] = useState<DeliveryLog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [testRecipient, setTestRecipient] = useState<string>('manager@farmoperations.com');
  const [testType, setTestType] = useState<'MORTALITY' | 'INVENTORY'>('MORTALITY');
  const [dispatchStatus, setDispatchStatus] = useState<string | null>(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const data = await api.getDeliveryLogs();
      setLogs(data);
    } catch (err) {
      console.error('Failed to load delivery logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLogs();
    }
  }, [isOpen]);

  const handleTriggerTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setDispatchStatus('Dispatching test alert...');
    try {
      await api.triggerTestAlert({
        recipient: testRecipient,
        alertType: testType,
        tagNumber: 'TAG-SIM-902',
        penLocation: 'Barn 2 - North',
        details: 'Simulated diagnostic telemetry dispatch',
      });
      setDispatchStatus('Test email successfully dispatched to SMTP queue!');
      fetchLogs();
      setTimeout(() => setDispatchStatus(null), 3000);
    } catch (err: any) {
      setDispatchStatus('Error: ' + (err.message || 'Dispatch failed'));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border-l border-slate-800 w-full max-w-lg h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Notification Audit Logs</h3>
              <p className="text-xs text-slate-400">Gmail SMTP & Thymeleaf Mailing Telemetry</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={fetchLogs}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              title="Refresh Logs"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Test Dispatch Form */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold uppercase text-slate-300 mb-2 flex items-center justify-between">
              <span>Trigger Test Dispatch</span>
              <span className="text-[10px] text-slate-500">Local SMTP Simulation</span>
            </h4>
            <form onSubmit={handleTriggerTest} className="space-y-3">
              <div>
                <input
                  type="email"
                  value={testRecipient}
                  onChange={(e) => setTestRecipient(e.target.value)}
                  placeholder="Recipient Email"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                  required
                />
              </div>
              <div className="flex space-x-2">
                <select
                  value={testType}
                  onChange={(e) => setTestType(e.target.value as any)}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white flex-1"
                >
                  <option value="MORTALITY">Emergency Mortality Alert</option>
                  <option value="INVENTORY">Feed Stock Reorder Alert</option>
                </select>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center space-x-1 transition"
                >
                  <Send className="h-3 w-3" />
                  <span>Send</span>
                </button>
              </div>
              {dispatchStatus && (
                <p className="text-[11px] text-indigo-300 mt-1">{dispatchStatus}</p>
              )}
            </form>
          </div>

          {/* Logs List */}
          <div>
            <h4 className="text-xs font-bold uppercase text-slate-400 mb-3">
              Recent Dispatches ({logs.length})
            </h4>

            {logs.length === 0 ? (
              <div className="text-center py-10 text-slate-500 text-xs">
                No notification audit logs recorded yet.
              </div>
            ) : (
              <div className="space-y-3">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200 truncate max-w-[240px]">
                        {log.subject}
                      </span>
                      {log.status === 'SENT' ? (
                        <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>SENT</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                          <AlertOctagon className="h-3 w-3" />
                          <span>FAILED</span>
                        </span>
                      )}
                    </div>

                    <div className="text-slate-400 text-[11px]">
                      <span>To: {log.recipient}</span> • <span>Template: {log.templateUsed}</span>
                    </div>

                    {log.errorMessage && (
                      <p className="text-rose-400/90 text-[11px] bg-rose-950/30 p-1.5 rounded border border-rose-900/30">
                        {log.errorMessage}
                      </p>
                    )}

                    <div className="text-[10px] text-slate-500 border-t border-slate-800/80 pt-1.5">
                      Dispatched: {new Date(log.dispatchedAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
