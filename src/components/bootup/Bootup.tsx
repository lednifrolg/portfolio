import { memo, useEffect, useState } from 'react';

interface BootupProps {
  onBootupStart: () => void;
  onBootupComplete: () => void;
}

function Bootup({ onBootupStart, onBootupComplete }: BootupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showMacLogo, setShowMacLogo] = useState(false);
  const [showBootupText, setShowBootupText] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowMacLogo(true);
    }, 100);

    const bootupTextTimer = setTimeout(() => {
      setShowBootupText(true);
      setIsVisible(true);
      onBootupStart();

      const bootupCompleteTimer = setTimeout(() => {
        setShowMacLogo(false);
        onBootupComplete();
      }, 1800);

      return () => clearTimeout(bootupCompleteTimer);
    }, 1100); // 1100ms = 100ms initial delay + 1000ms for fade-in

    return () => clearTimeout(bootupTextTimer);
  }, [onBootupStart, onBootupComplete]);

  if (!isVisible && !showMacLogo) return null;

  return (
    <div className="bootup-container">
      {showMacLogo && (
        <div className="mac-logo-container">
          <img src="/macitnosh-96.gif" alt="Macintosh" className="mac-logo" />
        </div>
      )}

      {showBootupText && (
        <div className="bootup-content">
          <div className="bootup-text">
            <span className="bootup-line bootup-line-1">Initializing terminal...</span>
            <span className="bootup-line bootup-line-2">Loading system components...</span>
            <span className="bootup-line bootup-line-3">System ready.</span>
            <span className="bootup-line bootup-line-4">Welcome to filiptomasovych.dev</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(Bootup);
