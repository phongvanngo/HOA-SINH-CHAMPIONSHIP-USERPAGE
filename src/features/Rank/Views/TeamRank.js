import React from 'react';
import './TeamRank.scss';

import Gold from './Assets/gold.svg';
import Sliver from './Assets/sliver.svg';
import Bronze from './Assets/bronze.svg';

export default function TeamRank() {
    return (
        <div className="team-leaderboard-wrapper">
            <div className="lboard_section">
                <div className="lboard_tabs">
                    <div className="tabs">
                        <div className="header">
                            <div className="title">Bảng đội</div>
                            <div className="filter-area">
                                <div className="school">
                                    <select name="cars" id="cars" placeholder="chọn trường">
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="opel">Opel</option>
                                        <option value="audi">Audi</option>
                                    </select>
                                </div>
                                {/* <li className="active" data-li="month">Month</li>
                                <li data-li="year">Year</li> */}
                                <div className="input-search">
                                    <input placeholder="Tìm kiếm" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lboard_wrap">
                    <div className="lboard_item today" style={{}}>
                        <div className="lboard_header">
                            <div className="img">
                            </div>
                            <div className="name_bar">
                                <p> Tên</p>

                            </div>
                            <div className="school">
                                Trường
					</div>
                            <div className="points">
                                Điểm
					</div>
                            <div className="time">
                                Thời gian
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                                <img src={Gold} />
                            </div>
                            <div className="name_bar">
                                <p><span>1.</span> Charles John</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="school">
                                Trường đại học Y Dược
					</div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
