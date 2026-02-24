import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface LiveChatProps {
    onBack: () => void;
}

const LiveChat: React.FC<LiveChatProps> = ({ onBack }) => {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Header with Back Button */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={onBack}
                    className="p-2 hover:bg-surface/50 rounded-lg transition-all duration-200 group"
                >
                    <ArrowLeft size={24} className="text-text-secondary group-hover:text-accent-primary transition-colors" />
                </button>
                <h1 className="text-2xl font-display font-bold text-text-primary">Live Chat</h1>
            </div>

            {/* Coming Soon Placeholder */}
            <div className="bg-surface/30 border border-muted/20 rounded-2xl p-12 text-center">
                <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-10 h-10 text-accent-primary"
                        >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-text-primary mb-3">Live Chat Coming Soon</h2>
                    <p className="text-text-secondary">
                        Connect with your peers in real-time anonymous chat rooms. This feature is currently under development.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LiveChat;
