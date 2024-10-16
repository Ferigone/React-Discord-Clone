import { useEffect, useRef, useState } from "react";
import { socketService } from "@services/socketService"; // Adjust the import as necessary

// Define the possible user statuses
type UserStatus = "online" | "away" | "offline";

// Interface for hook options
interface UseUserStatusOptions {
  /**
   * Custom duration in milliseconds before setting the user status to 'away'.
   * Defaults to 5 minutes if not specified.
   */
  awayTimeoutDuration?: number;
}

// Default duration before the user is considered 'away' (5 minutes)
const DEFAULT_AWAY_TIMEOUT = 300000;

/**
 * Custom React hook to manage and emit user status based on window focus and activity.
 * It tracks when the user is online, away, or offline, and communicates
 * status changes via a socket service.
 *
 * @param options - Optional configuration object.
 * @returns The current user status.
 */
const useUserStatus = (options?: UseUserStatusOptions): UserStatus => {
  // Extract away timeout duration from options or use the default value
  const { awayTimeoutDuration = DEFAULT_AWAY_TIMEOUT } = options || {};

  // State variable to keep track of the user's current status
  const [status, setStatus] = useState<UserStatus>("online");

  // Ref to store the timeout ID for setting the user as 'away'
  const awayTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Emit 'online' status when the component mounts
    socketService.emit("changeStatus", "online");

    /**
     * Handler for window focus event.
     * Clears the 'away' timeout and sets the user status to 'online'.
     */
    const handleFocus = () => {
      // Clear the 'away' timeout if it exists
      if (awayTimeoutRef.current !== null) {
        clearTimeout(awayTimeoutRef.current);
        awayTimeoutRef.current = null;
      }
      // Update the status state and emit the 'online' status
      setStatus("online");
      socketService.emit("changeStatus", "online");
    };

    /**
     * Handler for window blur event.
     * Starts a timeout to set the user status to 'away' after a specified duration.
     */
    const handleBlur = () => {
      // Set a timeout to change the status to 'away' after the away timeout duration
      awayTimeoutRef.current = window.setTimeout(() => {
        setStatus("away");
        socketService.emit("changeStatus", "away");
      }, awayTimeoutDuration);
    };

    // Add event listeners for window focus and blur events
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    // Cleanup function to remove event listeners and clear timeouts when the component unmounts
    return () => {
      // Clear the 'away' timeout if it exists
      if (awayTimeoutRef.current !== null) {
        clearTimeout(awayTimeoutRef.current);
      }
      // Update the status state and emit the 'offline' status
      setStatus("offline");
      socketService.emit("changeStatus", "offline");
      // Remove event listeners
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, [awayTimeoutDuration]); // Re-run the effect if awayTimeoutDuration changes

  // Return the current user status
  return status;
};

export default useUserStatus;
