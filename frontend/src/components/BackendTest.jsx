import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const BackendTest = () => {
  const [status, setStatus] = useState('Testing...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const testBackend = async () => {
      try {
        // Test the root endpoint
        const response = await fetch('https://taskflow-2omu.onrender.com');
        const data = await response.json();
        setStatus(`Backend is working: ${data.message}`);
      } catch (err) {
        setError(`Backend error: ${err.message}`);
        setStatus('Backend connection failed');
      }
    };

    testBackend();
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Backend Connection Test</h2>
      <p><strong>Status:</strong> {status}</p>
      {error && <p style={{ color: 'red' }}><strong>Error:</strong> {error}</p>}
    </div>
  );
};

export default BackendTest; 