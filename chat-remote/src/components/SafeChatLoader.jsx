import React, { lazy, Suspense } from 'react';

// We use React.lazy to import the remote ONLY when needed
const RemoteChat = lazy(() => 
  import('chatRemote/ChatWidget').catch((err) => {
    console.error("Self-Healing: Chat load failed!", err);
    // Return a fallback component if the remote server is down
    return { default: () => (
      <div style={{ color: 'red', border: '1px solid red', padding: '10px' }}>
        ⚠️ Chat is currently offline. Please try again later.
      </div>
    )};
  })
);

const SafeChatLoader = () => (
  <Suspense fallback={<div>Connecting to Chat...</div>}>
    <RemoteChat />
  </Suspense>
);

export default SafeChatLoader;