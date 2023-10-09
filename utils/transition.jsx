import React, { useState, useEffect } from 'react';

export function SmoothOpacityTransition (duration )  {
  const [opacity, setOpacity] = useState(1.0);

  useEffect(() => {
    const interval = 10; // Update interval in milliseconds
    const decrement = (interval / duration).toFixed(2); // Calculate the decrement based on duration

    const transitionInterval = setInterval(() => {
      setOpacity((prevOpacity) => {
        const newOpacity = parseFloat((prevOpacity - decrement).toFixed(2));

        // Clamp the opacity to ensure it doesn't go below 0
        return newOpacity >= 0 ? newOpacity : 0;
      });
    }, interval);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(transitionInterval);
    };
  }, [duration]);

  return (
    <div style={{ opacity }}>
      <p>This content will smoothly fade out.</p>
    </div>
  );
};

export default SmoothOpacityTransition;
