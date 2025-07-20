import { useState, useEffect } from 'react';
import ResourcesPanel from './components/ResourcesPanel';
import Building from './components/Building';
import ErrorMessage from './components/ErrorMessage';

// This special variable is replaced by Vite during the build process
// with the value we will set in Render's environment variables.
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [village, setVillage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch the latest village data from our backend
  const fetchVillageData = async () => {
    // Don't show subsequent loading indicators on background refreshes
    if (!village) setIsLoading(true);
    setError('');

    try {
      // We assume authentication will be handled by cookies, so no token is needed here.
      const response = await fetch(`${API_URL}/api/v1/village`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch village data. Is the backend running?');
      }
      
      const data = await response.json();
      setVillage(data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle the upgrade button click
  const handleUpgrade = async (building) => {
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/v1/village/upgrade/${building}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json', // Important for receiving JSON error responses
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Use the error message from the backend if available
        throw new Error(data.error |

| 'Upgrade failed.');
      }
      
      setVillage(data); // Update village state with new data from backend
    } catch (err) {
      setError(err.message);
      alert(err.message); // Simple alert for immediate feedback
    } finally {
      setIsLoading(false);
    }
  };

  // This useEffect hook runs once when the component first loads.
  useEffect(() => {
    fetchVillageData();

    // And then, it re-fetches the data every 15 seconds to update resources.
    const interval = setInterval(fetchVillageData, 15000);
    
    // This is a cleanup function that runs when the component is unmounted.
    return () => clearInterval(interval);
  },); // The empty dependency array means this effect runs only once on mount.


  // --- Render Logic ---
  if (isLoading &&!village) {
    return <div className="bg-gray-900 text-white min-h-screen p-4">Loading your village...</div>;
  }

  if (error &&!village) {
    return <ErrorMessage message={error} />;
  }

  if (!village) {
    // This case handles when there's no error but also no village data.
    return <div className="bg-gray-900 text-white min-h-screen p-4">Could not load village.</div>;
  }

  // Calculate costs for display based on the service logic
  const getUpgradeCost = (level) => {
      const baseCost = 50;
      const scalingFactor = 1.5;
      const cost = Math.floor(baseCost * Math.pow(scalingFactor, level));
      return { wood: cost, clay: cost, iron: Math.floor(cost / 2) };
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 font-sans">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-yellow-400">My Village</h1>

        {error && <ErrorMessage message={error} onClear={() => setError('')} />}

        <ResourcesPanel village={village} />

        {/* Buildings Panel */}
        <div className="bg-gray-800 p-4 rounded-lg mt-6">
          <h2 className="text-xl font-semibold mb-4">Buildings</h2>
          <div className="space-y-4">
            <Building
              name="Woodcutter"
              level={village.woodcutter_level}
              cost={getUpgradeCost(village.woodcutter_level)}
              onUpgrade={() => handleUpgrade('woodcutter')}
              isLoading={isLoading}
              color="green"
            />
            <Building
              name="Clay Pit"
              level={village.clay_pit_level}
              cost={getUpgradeCost(village.clay_pit_level)}
              onUpgrade={() => handleUpgrade('clay_pit')}
              isLoading={isLoading}
              color="orange"
            />
            <Building
              name="Iron Mine"
              level={village.iron_mine_level}
              cost={getUpgradeCost(village.iron_mine_level)}
              onUpgrade={() => handleUpgrade('iron_mine')}
              isLoading={isLoading}
              color="gray"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;