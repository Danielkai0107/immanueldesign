import React, { useState, useEffect } from 'react'

function Home() {
  const [current, setCurrent] = useState('p1');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => {
        switch (prev) {
          case 'p1': return 'p2';
          case 'p2': return 'p3';
          default: return 'p1';
        }
      });
    }, 5000); // Change slide every 3 seconds

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <ul className='home'>
      <li className={current === 'p1' ? 'p1 active' : 'p1'}></li>
      <li className={current === 'p2' ? 'p2 active' : 'p2'}></li>
      <li className={current === 'p3' ? 'p3 active' : 'p3'}></li>
    </ul>
  )
}

export default Home
