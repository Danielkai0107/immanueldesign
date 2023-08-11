import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

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
    }, 8000); // Change slide every 3 seconds

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <section className='home'>
      <ul className={current === 'p1' ? 'p1 active' : 'p1'}>
        <figure></figure>
        <li className='context-home'>
          <p className='logo-zh'>植在設計</p>
          <p className='main'>自己生活<span>｜</span>自己佈置</p>
          <p className='second'>與我們一起，讓佈置變得更簡單，更有趣</p>
          <p className='second-sm'>開始打造你的佈置</p>
          <Link to='/Main'>開始佈置</Link>
        </li>
      </ul>
      <ul className={current === 'p2' ? 'p2 active' : 'p2'}>
        <figure></figure>
        <li className='context-home'>
          <p className='logo-zh'>植在設計</p>
          <p className='main'>一鍵佈置<span>｜</span>即時預覽</p>
          <p className='second'>與我們一同創作，將質感化為現實</p>
          <p className='second-sm'>一站式解決佈置困擾</p>
          <Link to='/Main'>開始佈置</Link>
        </li>
      </ul>
      <ul className={current === 'p3' ? 'p3 active' : 'p3'}>
        <figure></figure>
        <li className='context-home'>
          <p className='logo-zh'>植在設計</p>
          <p className='main'>創造你的植感生活</p>
          <p className='second'>讓我們為你編織一個絕美的夢想</p>
          <p className='second-sm'>編織夢想生活</p>
          <Link to='/Main'>開始佈置</Link>
        </li>
      </ul>
    </section>
  )
}

export default Home
