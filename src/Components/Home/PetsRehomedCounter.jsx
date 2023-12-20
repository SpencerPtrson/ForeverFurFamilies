import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import './PetsRehomedCounter.css';

export default function PetsRehomedCounter() {
  const [counterVisible, setCounterVisible] = useState(false);
  const [counterValue, setCounterValue] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });

  const fetchAdoptedPetCount = async () => {
    try {
      const response = await fetch('/api/pets/count/adopted');
      const data = await response.json();
      return data.count || 0;
    } catch (error) {
      console.error('Error fetching adopted pet count:', error);
      return 0;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (inView) {
        setCounterVisible(true);
        const count = await fetchAdoptedPetCount();
        setCounterValue(0); // Start the counter from 0
        const interval = setInterval(() => {
          setCounterValue((prevValue) => {
            const nextValue = prevValue + 1;
            if (nextValue >= count) {
              clearInterval(interval);
              return count;
            }
            return nextValue;
          });
        }, 1000);
      }
    };

    fetchData();
  }, [inView]);

  return (
    <div ref={ref} className="d-flex justify-content-center counter-section">
  
          <p><span>{counterValue}</span></p>

    </div>
  );
};


