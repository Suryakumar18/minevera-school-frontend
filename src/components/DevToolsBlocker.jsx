import { useEffect } from 'react';

/**
 * DevTools Blocker Component
 * Attempts to detect and discourage DevTools usage
 * NOTE: This is NOT foolproof - determined users can bypass this
 */
export const DevToolsBlocker = () => {
  useEffect(() => {
    // Disable right-click context menu
    const disableRightClick = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable common keyboard shortcuts
    const disableShortcuts = (e) => {
      // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
        (e.ctrlKey && e.shiftKey && e.keyCode === 67) || // Ctrl+Shift+C
        (e.ctrlKey && e.keyCode === 85) // Ctrl+U
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Detect if DevTools is open (basic detection)
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if (widthThreshold || heightThreshold) {
        // DevTools detected - you could redirect or show a warning
        document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:Arial;font-size:24px;text-align:center;">⚠️ Unauthorized Access Detected</div>';
      }
    };

    // Disable text selection (optional - makes copying harder)
    const disableSelection = (e) => {
      e.preventDefault();
      return false;
    };

    // Add event listeners (only in production)
    if (import.meta.env.PROD) {
      document.addEventListener('contextmenu', disableRightClick);
      document.addEventListener('keydown', disableShortcuts);
      document.addEventListener('selectstart', disableSelection);
      
      // Check for DevTools every 1 second
      const devToolsInterval = setInterval(detectDevTools, 1000);

      // Cleanup
      return () => {
        document.removeEventListener('contextmenu', disableRightClick);
        document.removeEventListener('keydown', disableShortcuts);
        document.removeEventListener('selectstart', disableSelection);
        clearInterval(devToolsInterval);
      };
    }
  }, []);

  return null; // This component doesn't render anything
};
