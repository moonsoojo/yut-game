import React from 'react';

// set width
// set size

export default function JoinTeamModal({ position }) {
  return <group position={position}>
    <Html>
      <form
        onSubmit={e => handleJoinTeam1Submit(e)}>
        <input
        style={{
          background: 'none',
          border: 'none',
          fontFamily: 'Luckiest Guy',
          fontSize: `${zoom * 0.3}px`,
          color: 'yellow',
          padding: '0px',
          width: `${zoom * 1.1}px`
        }}
        onChange={e => setJoinTeam1Name(e.target.value)}
        placeholder="name..."/>
        <button 
        id='join-team-1-submit-button'
        style={{
          fontFamily: 'Luckiest Guy',
          fontSize: `${zoom * 0.3}px`,
          background: 'none',
          border: 'none',
          color: `${joinTeam1SubmitHover ? 'white' : 'yellow'}`,
          padding: '0px'}}
        onMouseOver={handleJoinTeam1SubmitMouseEnter}
        onMouseOut={handleJoinTeam1SubmitMouseLeave}
        type="submit">&#x2713;</button>
        {/* highlight on hover */}
        <button 
        id='join-team-1-cancel-button'
        style={{
          fontFamily: 'Luckiest Guy',
          fontSize: `${zoom * 0.3}px`,
          background: 'none',
          border: 'none',
          color: `${joinTeam1CancelHover ? 'white' : 'yellow'}`,}}
        onMouseOver={handleJoinTeam1CancelMouseEnter}
        onMouseOut={handleJoinTeam1CancelMouseLeave}
        onMouseDown={handleJoinTeam1Cancel}>
          &#10008;
        </button>
      </form>
    </Html>
  </group>
}