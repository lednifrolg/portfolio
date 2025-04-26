import './App.css';
import Terminal from './components/terminal/Terminal';
import Bootup from './components/bootup/Bootup';

import { useAppState } from './context/useAppState';

function App() {
  const { isTerminalVisible, isBootupComplete, handleBootupStart, handleBootupComplete } =
    useAppState();

  return (
    <div className="app-wrapper">
      {/* Show bootup animation in the background */}
      <div className="bootup-wrapper">
        <Bootup onBootupStart={handleBootupStart} onBootupComplete={handleBootupComplete} />
      </div>

      {/* Show terminal */}
      <div
        className={`app-container ${!isTerminalVisible ? 'bootup-hidden' : isBootupComplete ? 'bootup-appearing' : ''}`}
      >
        {isTerminalVisible && (
          <Terminal shouldStartTyping={isBootupComplete} isBootupInProgress={!isBootupComplete} />
        )}
      </div>
    </div>
  );
}

export default App;
