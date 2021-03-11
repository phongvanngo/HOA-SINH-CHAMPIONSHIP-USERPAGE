import React, { useEffect } from 'react'

export default function UserSignIn() {
    useEffect(() => {
        var menuContainer = document.getElementById("MenuUserPage");
        var menuList = menuContainer.getElementsByClassName("menu-item");
        var currentItem = menuContainer.getElementsByClassName("signin");

        for (var i = 0; i < menuList.length; i++) {
            menuList[i].className = menuList[i].className.replace(" active", "");
        }

        currentItem[0].className += " active";

    }, [])
    return (
        <div>
            User sign in
        </div>
    )
}
