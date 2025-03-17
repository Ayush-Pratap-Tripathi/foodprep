import React from 'react'
import './Footer.css'
import {assets} from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img className="footer-logo" src={assets.logo_bottom} alt="" />
                <p>Food Prep is a full-stack project designed for hands-on teaching, helping students learn full-stack development. It's used by FACEPrep, an ed-tech company focused on equipping students with the skills to achieve their career aspirations.</p>
                <div className="footer-social-icons">
                    <a href="https://www.facebook.com/faceprep/"><img src={assets.facebook_icon} alt="" /></a>
                    <a href="https://x.com/Faceprepcampus"><img src={assets.twitter_icon} alt="" /></a>
                    <a href="https://www.linkedin.com/company/faceprep"><img src={assets.linkedin_icon} alt="" /></a>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>Company</h2>
                <ul>
                    <a href="https://faceprep.edmingle.com/"><li>Home</li></a>
                    <a href="https://faceprep.edmingle.com/contact-us"><li>About us</li></a>
                    <a href="https://faceprep.edmingle.com/courses"><li>Courses</li></a>
                    <a href="https://faceprep.edmingle.com/reviews"><li>Reviews</li></a>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Get in touch</h2>
                <ul>
                    <li>+91 96297 45022</li>
                    <li>enquiry@faceprep.in</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2024 © 2021 FoodPrep. All rights reserved.</p>
    </div>
  )
}

export default Footer