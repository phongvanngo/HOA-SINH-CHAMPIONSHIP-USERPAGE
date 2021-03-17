import React, { useEffect } from 'react';
import './SingleRank.scss';
import Gold from './Assets/gold.svg';
import Sliver from './Assets/sliver.svg';
import Bronze from './Assets/bronze.svg';

export default function SingleRank() {

    return (
        <div className="single-leaderboard-wrapper">
            <div className="lboard_section">
                <div className="lboard_tabs">
                    <div className="tabs">
                        <div className="header">
                            <div className="title">Bảng cá nhân</div>
                            {/* <li className="active" data-li="month">Month</li>
                                <li data-li="year">Year</li> */}
                            <div className="input-search">
                                <input placeholder="Tìm kiếm" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lboard_wrap" id="single-board-list">
                    <div className="lboard_item today" style={{}}>
                        <div className="lboard_header">
                            <div className="img">
                            </div>
                            <div className="name_bar">
                                <p> Tên</p>

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
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                                <img src={Sliver} />
                            </div>
                            <div className="name_bar">
                                <p><span>1.</span> Charles John</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                                <img src={Bronze} />
                            </div>
                            <div className="name_bar">
                                <p><span>1.</span> Charles John</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                            </div>
                            <div className="name_bar">
                                <p><span>1. </span> Ngo Phong</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                            </div>
                            <div className="name_bar">
                                <p><span>1.</span> Charles John</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                                <img src={Bronze} />
                            </div>
                            <div className="name_bar">
                                <p><span>1.</span> Charles John</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                            </div>
                            <div className="name_bar">
                                <p><span>1. </span> Ngo Phong</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                            </div>
                            <div className="name_bar">
                                <p><span>1.</span> Charles John</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                                <img src={Bronze} />
                            </div>
                            <div className="name_bar">
                                <p><span>1.</span> Charles John</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                            </div>
                            <div className="name_bar">
                                <p><span>1. </span> Ngo Phong</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                            </div>
                            <div className="name_bar">
                                <p><span>1.</span> Charles John</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                                <img src={Bronze} />
                            </div>
                            <div className="name_bar">
                                <p><span>1.</span> Charles John</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                            </div>
                            <div className="name_bar">
                                <p><span>1. </span> Ngo Phong</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                            </div>
                            <div className="name_bar">
                                <p><span>1.</span> Charles John</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                                <img src={Bronze} />
                            </div>
                            <div className="name_bar">
                                <p><span>1.</span> Charles John</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                            </div>
                            <div className="name_bar">
                                <p><span>1. </span> Ngo Phong</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                            </div>
                            <div className="name_bar">
                                <p><span>1.</span> Charles John</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                                <img src={Bronze} />
                            </div>
                            <div className="name_bar">
                                <p><span>1.</span> Charles John</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                            </div>
                            <div className="name_bar">
                                <p><span>1. </span> Ngo Phong</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                            </div>
                            <div className="name_bar">
                                <p><span>1.</span> Charles John</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                                <img src={Bronze} />
                            </div>
                            <div className="name_bar">
                                <p><span>1.</span> Charles John</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                            </div>
                            <div className="name_bar">
                                <p><span>1. </span> Ngo Phong</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                            </div>
                            <div className="name_bar">
                                <p><span>1.</span> Charles John</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                                <img src={Bronze} />
                            </div>
                            <div className="name_bar">
                                <p><span>1.</span> Charles John</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                            </div>
                            <div className="name_bar">
                                <p><span>1. </span> Ngo Phong</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                            </div>
                            <div className="name_bar">
                                <p><span>1.</span> Charles John</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                                <img src={Bronze} />
                            </div>
                            <div className="name_bar">
                                <p><span>1.</span> Charles John</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                            </div>
                            <div className="name_bar">
                                <p><span>1. </span> Ngo Phong</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="lboard_mem">
                            <div className="img">
                            </div>
                            <div className="name_bar">
                                <p><span>1.</span> Charles John</p>
                                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
                            </div>
                            <div className="points">
                                195
					</div>
                            <div className="time">
                                12:39
					</div>
                        </div>
                        <div className="see-more">Xem thêm ... </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
