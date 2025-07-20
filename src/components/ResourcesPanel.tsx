import React from 'react';

const ResourcesPanel = ({ village }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Resources</h2>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-lg">
        <p>🌲 Wood: {Math.floor(village.wood)}</p>
        <p>🧱 Clay: {Math.floor(village.clay)}</p>
        <p>⛏️ Iron: {Math.floor(village.iron)}</p>
      </div>
    </div>
  );
};

export default ResourcesPanel;