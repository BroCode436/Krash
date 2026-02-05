
import React from 'react';
import { MOCK_ALERTS } from '../constants';
import { AlertTriangle, Calendar, Bell, CheckCircle } from 'lucide-react';

const Alerts: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'exam': return <AlertTriangle className="text-red-400" size={20} />;
      case 'holiday': return <Calendar className="text-cyan-400" size={20} />;
      case 'note': return <Bell className="text-jade-400" size={20} />;
      case 'system': return <CheckCircle className="text-gray-400" size={20} />;
      default: return <Bell size={20} />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Alert Center</h1>
        <span className="text-[10px] font-bold text-jade-500 bg-jade-900/10 px-3 py-1 rounded-full border border-jade-900/20 tracking-widest uppercase">4 New</span>
      </div>

      <div className="space-y-4">
        {MOCK_ALERTS.map((alert) => (
          <div 
            key={alert.id}
            className={`relative bg-surface border rounded-[2rem] p-6 transition-all duration-300 group cursor-pointer ${
              alert.isNew ? 'border-jade-900/30 ring-1 ring-jade-900/10' : 'border-white/5 opacity-80 hover:opacity-100'
            }`}
          >
            {alert.isNew && (
              <div className="absolute top-6 right-6 w-2 h-2 bg-jade-500 rounded-full shadow-lg shadow-jade-500/40" />
            )}
            
            <div className="flex gap-5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                alert.isNew ? 'bg-jade-900/20' : 'bg-white/5'
              }`}>
                {getIcon(alert.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-base font-bold text-off-white group-hover:text-jade-400 transition-colors">{alert.title}</h4>
                  <span className="text-[10px] font-bold text-gray-600 uppercase">{alert.timestamp}</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed max-w-md">{alert.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-10 text-center">
        <button className="text-xs font-bold text-gray-600 hover:text-jade-500 transition-colors uppercase tracking-widest">
          Clear all notifications
        </button>
      </div>
    </div>
  );
};

export default Alerts;
