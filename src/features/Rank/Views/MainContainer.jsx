import React from 'react'
import './RankMainStyle.scss';


import SingleRank from './SingleRank';
import TeamRank from './TeamRank';
import RunStationRank from './RunStationRank';

export default function MainContainer() {
    return (
        <div className="rank-fullpage">
            <div className="space-top"></div>
            <div className="leaderboard-area">

                <div className='runStation-leaderboard'>
                    <RunStationRank />
                </div>
                {/* <div className='single-leaderboard'>
                    <SingleRank />
                </div>
                <div className='team-leaderboard'>
                    <TeamRank />
                </div> */}
            </div>
        </div>
    )
}
