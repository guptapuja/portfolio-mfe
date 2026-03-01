import React, { useState } from 'react';
import SafeChatLoader from "./SafeChatLoader";

function App() {
  // Simulate a Feature Flag (In real life, this comes from an API)
  const [isChatEnabled, setIsChatEnabled] = useState(true);

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>MFE Dashboard Shell</h1>
      <p>Status: {isChatEnabled ? '✅ Features Active' : '❌ Features Disabled'}</p>
      
      <button onClick={() => setIsChatEnabled(!isChatEnabled)}>
        Toggle Chat Flag
      </button>

      <hr />

      {/* The Logic: Check Flag -> Load Component -> Handle Errors */}
      {isChatEnabled ? (
        <div style={{ marginTop: '20px' }}>
          <SafeChatLoader />
        </div>
      ) : (
        <p>Chat is disabled by the Administrator.</p>
      )}
    </div>
  );
}

export default App;