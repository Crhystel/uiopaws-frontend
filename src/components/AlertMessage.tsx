import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AlertMessage: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<'success' | 'error'>('success');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      setType(location.state.type || 'success');
      
      // Clear the state from location
      const state = { ...location.state };
      delete state.message;
      delete state.type;
      navigate(location.pathname, { replace: true, state });
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setMessage('');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  if (!message) return null;

  return (
    <div className={`alert alert-${type}`} style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      padding: '12px 20px',
      borderRadius: '8px',
      backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
      color: 'white',
      fontSize: '14px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px'
    }}>
      {message}
      <button 
        onClick={() => setMessage('')}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          marginLeft: '10px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        ×
      </button>
    </div>
  );
};

export default AlertMessage;
