import React, { useEffect, useState } from 'react';
import './SingleRank.scss';
import Gold from './Assets/gold.svg';
import Sliver from './Assets/sliver.svg';
import Bronze from './Assets/bronze.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRankSingleRequest } from './../RankSlice';
import { millisToMinutesAndSeconds } from './../../../app/utilities';

const SingleRankItem = ({ detailedUser }) => {
    const { fullName, img, score, time, index } = detailedUser;
    return (
        <div className="lboard_mem">
            <div className="img">
                {img ? <img src={img} alt="medal" /> : ''}
            </div>
            <div className="name_bar">
                <p><span>{index}. </span>{fullName}</p>
                {/* <div className="bar_wrap">
                                        <div className="inner_bar" style={{ width: "95%" }}></div>
                                    </div> */}
            </div>
            <div className="points">{score}</div>
            <div className="time">{millisToMinutesAndSeconds(time)}</div>
        </div>
    )
}

export default function SingleRank() {

    const dispatch = useDispatch();
    const singleRank = useSelector(state => state.rank.singleRank);
    const { count, rows } = singleRank;

    const [searchUserRank, setSearchUserRank] = useState({
        code: '',
        typing: false,
        typingTimeout: 0,
    })

    const handleSearch = (e) => {

        if (searchUserRank.typingTimeout) {
            clearTimeout(searchUserRank.typingTimeout);
        };

        setSearchUserRank({
            code: e.target.value,
            typing: false,
            typingTimeout: setTimeout(() => {
                dispatch(fetchRankSingleRequest({ reloadAll: true, searchValue: e.target.value }));
            }, 500)
        })
    }

    useEffect(() => {
        dispatch(fetchRankSingleRequest({ reloadAll: true, searchValue: "" }));
    }, [dispatch])

    const handleSeeMore = () => {
        dispatch(fetchRankSingleRequest({ reloadAll: false, searchValue: "" }));
    }

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
                                <input
                                    onChange={(e) => {
                                        handleSearch(e)
                                    }}
                                    placeholder="Tìm kiếm theo mã dự thi" />
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
                        {
                            rows[0] ? <SingleRankItem detailedUser={{ ...rows[0], img: Gold, index: 1 }} /> : ''
                        }
                        {
                            rows[1] ? <SingleRankItem detailedUser={{ ...rows[1], img: Sliver, index: 2 }} /> : ''
                        }
                        {
                            rows[2] ? <SingleRankItem detailedUser={{ ...rows[2], img: Bronze, index: 3 }} /> : ''
                        }

                        {
                            rows.slice(3).map((element, index) => {
                                return (
                                    <SingleRankItem key={index} detailedUser={{ ...element, index: index + 4, img: null }} />
                                )
                            })
                        }

                        {
                            rows.length < count ? (<div onClick={handleSeeMore} className="see-more">Xem thêm ... </div>) : ''
                        }


                    </div>
                </div>
            </div>
        </div>

    )
}
