import React, { lazy, Suspense } from 'react';


const RemoteChat = lazy(() => 
  import('chatRemote/ChatWidget').catch((err) => {
    console.error("Self-Healing: Chat load failed!", err);
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