import React, { useEffect } from 'react'
import './Contact.scss';

export default function Contact() {
    useEffect(() => {
        var menuContainer = document.getElementById("MenuUserPage");
        var menuList = menuContainer.getElementsByClassName("menu-item");
        var currentItem = menuContainer.getElementsByClassName("contact");
        for (var i = 0; i < menuList.length; i++) {
            menuList[i].className = menuList[i].className.replace(" active", "");
        }
        currentItem[0].className += " active";
    }, [])
    return (
        <div>
            <div className="contact-container">
                <div className="main-content">
                    <div style={{ height: '30px' }}></div>
                    <div className="card-container" style={{ marginBottom: '50px' }}>
                        <div className="card-body">
                            <h5 className="greeting">Fanpage</h5>
                            <p><a target='_blank' href="https://www.facebook.com/hoasinhcps/"><span style={{}}>Hóa Sinh Championship</span></a></p>
                            <h5 className="greeting">Email</h5>
                            <p><a href="mailto:hoasinhchampionship.ump@gmail.com"><span style={{ overflowWrap: 'break-word' }}>hoasinhchampionship.ump@gmail.com</span></a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
