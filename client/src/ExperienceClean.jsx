import React from 'react';
import Yoots from './Yoots';
import Teams from './Teams';

export default function ExperienceClean() {
  console.log(`[ExperienceClean]`)
  return <group name='experience-clean'>
    <Teams/>
    {/* <GamePhase/>
    <Yoots/> */}
  </group>
}