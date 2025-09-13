import React from "react";
import { ClipLoader } from "react-spinners";

/**
 * Loading component
 * - Displays a spinner centered on the screen.
 * - Accepts optional `color` and `size` props for customization.
 */
const Loading = ({ color = "gold", size = 50 }) => {
  return (
    // Flex container to center the loader both vertically and horizontally
    <div
      className="flex justify-center items-center h-full"
      role="status"
      aria-label="Loading"
    >
      {/* ClipLoader from react-spinners */}
      <ClipLoader color={color} size={size} />
    </div>
  );
};

export default Loading;
