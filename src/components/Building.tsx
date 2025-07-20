import React from 'react';

const Building = ({ name, level, cost, onUpgrade, isLoading, color }) => {
  const colorClasses = {
    green: 'bg-green-600 hover:bg-green-700',
    orange: 'bg-orange-600 hover:bg-orange-700',
    gray: 'bg-slate-600 hover:bg-slate-700',
  };

  return (
    <div className="bg-gray-700 p-3 rounded-lg flex justify-between items-center">
      <div>
        <p className="font-bold text-lg">{name} (Level {level})</p>
        <p className="text-sm text-gray-400">
          Upgrade Cost: {cost.wood}W, {cost.clay}C, {cost.iron}I
        </p>
      </div>
      <button
        onClick={onUpgrade}
        disabled={isLoading}
        className={`px-4 py-2 rounded disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors ${colorClasses[color]}`}
      >
        {isLoading? '...' : 'Upgrade'}
      </button>
    </div>
  );
};

export default Building;