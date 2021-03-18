import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRankTeamRequest } from '../RankSlice';
import { millisToMinutesAndSeconds } from './../../../app/utilities';
import { fetchUniversityRequest } from './../../universityManagement/UniversitySlice';
import Bronze from './Assets/bronze.svg';
import Gold from './Assets/gold.svg';
import Sliver from './Assets/sliver.svg';
import './TeamRank.scss';


const TeamRankItem = ({ detailedUser }) => {
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

export default function TeamRank() {
    const dispatch = useDispatch();
    let listUniversities = useSelector(state => state.university.listUniversitys);
    const teamRank = useSelector(state => state.rank.teamRank);
    const { count, rows } = teamRank;

    const universities = listUniversities.filter((university) => university.id !== 1);
    const [chosenUniversityId, setChosenUniversityId] = useState();

    useEffect(() => {
        //load bảng xếp hạng khi có danh sách các trường đại học
        if (universities.length > 1) {
            setChosenUniversityId(universities[0].id);
        }
    }, [listUniversities])

    useEffect(() => {
        //load danh sách các trường đại học
        dispatch(fetchUniversityRequest({}));
    }, [dispatch])

    useEffect(() => {
        //khi chọn 1 trường đại học khác
        dispatch(fetchRankTeamRequest(
            {
                searchValue: '',
                reloadAll: true,
                universityId: chosenUniversityId
            }));
    }, [chosenUniversityId])

    //search --------------------------------------------
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
                dispatch(fetchRankTeamRequest(
                    {
                        searchValue: e.target.value,
                        reloadAll: true,
                        universityId: chosenUniversityId
                    }));
            }, 1000)
        })
    }

    const handleChooseUniversity = (event) => {
        setChosenUniversityId(event.target.value);
    }

    const handleSeeMore = () => {
        dispatch(fetchRankTeamRequest({ reloadAll: false, searchValue: "", universityId: chosenUniversityId }));
    }

    return (
        <div className="team-leaderboard-wrapper">
            <div className="lboard_section">
                <div className="lboard_tabs">
                    <div className="tabs">
                        <div className="header">
                            <div className="title">Bảng đội</div>
                            <div className="filter-area">
                                <div className="school">
                                    <select name="cars" id="cars" placeholder="chọn trường" onChange={handleChooseUniversity}>
                                        {/* <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="opel">Opel</option>
                                        <option value="audi">Audi</option> */}
                                        {
                                            universities.map((university, index) => {
                                                return (
                                                    <option key={index} value={university.id}>{university.university_name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                {/* <li className="active" data-li="month">Month</li>
                                <li data-li="year">Year</li> */}
                                <div className="input-search">
                                    <input onChange={handleSearch} placeholder="Tìm kiếm" />
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
                            {/* <div className="school">
                                Trường
					</div> */}
                            <div className="points">
                                Điểm
					</div>
                            <div className="time">
                                Thời gian
					</div>
                        </div>
                        {
                            rows[0] ? <TeamRankItem detailedUser={{ ...rows[0], img: Gold, index: 1 }} /> : ''
                        }
                        {
                            rows[1] ? <TeamRankItem detailedUser={{ ...rows[1], img: Sliver, index: 2 }} /> : ''
                        }
                        {
                            rows[2] ? <TeamRankItem detailedUser={{ ...rows[2], img: Bronze, index: 3 }} /> : ''
                        }

                        {
                            rows.slice(3).map((element, index) => {
                                return (
                                    <TeamRankItem key={index} detailedUser={{ ...element, index: index + 4, img: null }} />
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
