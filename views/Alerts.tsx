
import React from 'react';
import { MOCK_ALERTS } from '../constants';
import { AlertTriangle, Calendar, Bell, CheckCircle, X, ArrowLeft } from 'lucide-react';

interface AlertsProps {
  onBack?: () => void;
}

const Alerts: React.FC<AlertsProps> = ({ onBack }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'exam': return <AlertTriangle className="text-red-400" size={20} />;
      case 'holiday': return <Calendar className="text-cyan-400" size={20} />;
      case 'note': return <Bell className="text-accent-primary" size={20} />;
      case 'system': return <CheckCircle className="text-text-muted" size={20} />;
      default: return <Bell size={20} />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'exam': return 'border-red-400/30 bg-red-400/5';
      case 'holiday': return 'border-cyan-400/30 bg-cyan-400/5';
      case 'note': return 'border-accent-primary/30 bg-accent-primary/5';
      case 'system': return 'border-muted/30 bg-surface/40';
      default: return 'border-muted/30 bg-surface/40';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between animate-fadeInDown">
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-surface/50 rounded-lg transition-all duration-200 group"
            >
              <ArrowLeft size={24} className="text-text-secondary group-hover:text-accent-primary transition-colors" />
            </button>
          )}
          <div>
            <h1 className="text-3xl font-display font-bold text-text-primary mb-1">Alert Center</h1>
            <p className="text-sm text-text-muted">Stay updated with campus notifications</p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-accent-primary bg-accent-primary/10 px-3 py-1.5 rounded-full border border-accent-primary/30 tracking-wider uppercase animate-pulse">
          {MOCK_ALERTS.filter(a => a.isNew).length} New
        </span>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {MOCK_ALERTS.map((alert, index) => (
          <div
            key={alert.id}
            className={`relative backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-accent-primary/5 animate-fadeInUp ${alert.isNew ? getColor(alert.type) : 'border-muted/30 bg-surface/40 opacity-90 hover:opacity-100'
              }`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* New Alert Indicator */}
            {alert.isNew && (
              <div className="absolute top-5 right-5 flex items-center gap-2">
                <span className="text-[9px] font-bold uppercase tracking-wider text-accent-primary">New</span>
                <div className="w-2 h-2 bg-accent-primary rounded-full shadow-lg shadow-accent-primary/40 animate-pulse" />
              </div>
            )}

            <div className="flex gap-5">
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 ${alert.isNew ? 'bg-white/10' : 'bg-surface-elevated/40'
                }`}>
                {getIcon(alert.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h4 className="text-base font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                    {alert.title}
                  </h4>
                  <span className="text-[10px] font-medium text-text-muted uppercase tracking-wide whitespace-nowrap">
                    {alert.timestamp}
                  </span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {alert.description}
                </p>
              </div>
            </div>

            {/* Dismiss Button */}
            <button className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 p-2 rounded-lg bg-surface-elevated/60 hover:bg-red-500/20 text-text-muted hover:text-red-400 transition-all duration-200">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Clear All Button */}
      <div className="pt-6 text-center animate-fadeInUp delay-200">
        <button className="px-6 py-3 text-xs font-bold text-text-muted hover:text-accent-primary transition-colors uppercase tracking-wider hover:bg-surface/40 rounded-xl">
          Clear all notifications
        </button>
      </div>
    </div>
  );
};

export default Alerts;
