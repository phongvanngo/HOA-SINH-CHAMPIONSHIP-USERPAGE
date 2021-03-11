import React, { useEffect } from 'react'
// import './Homepage.scss';

export default function Homepage() {

    useEffect(() => {
        var menu = document.querySelector('.menu');
        var menuBtn = document.querySelector('.menu button');
        menuBtn.addEventListener('click', () => {
            menu.classList.toggle('opened')
        })
    })


    return (
        <section className="main">

            <section className="left">
                <p className="title">HÓA SINH CHAMPIONSHIP</p>
                <p className="msg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nihil rerum itaque quisquam!
                Natus repudiandae nesciunt tempora odio amet. Saepe?</p>
                <button className="cta">THI NGAY</button>
            </section>

            <section className="right">
                <img src="./images/img.svg" alt="Langing image" />
            </section>

        </section>
    )
}
