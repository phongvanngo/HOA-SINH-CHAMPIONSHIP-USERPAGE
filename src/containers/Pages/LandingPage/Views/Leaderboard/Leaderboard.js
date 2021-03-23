import React, { useEffect } from 'react'
import Rank from './../../../../../features/Rank/Rank';
import Footer from './../../../../User/Footer';
export default function Leaderboard() {
    useEffect(() => {
        var menuContainer = document.getElementById("MenuUserPage");
        var menuList = menuContainer.getElementsByClassName("menu-item");
        var currentItem = menuContainer.getElementsByClassName("leaderboard");
        for (var i = 0; i < menuList.length; i++) {
            menuList[i].className = menuList[i].className.replace(" active", "");
        }
        currentItem[0].className += " active";
    }, [])
    return (
        <div>
            <Rank />
        </div>
    )
}
