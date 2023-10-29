import React from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import loginImage from '../../assets/login.svg'
import './Home.scss'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div>
         <section className='container hero'>
            <div className='hero-text'>
                <h2>Advanced MERN Stack Authentication Project</h2>
                <p>Learn and Master Authentication and Authorization using MERN Stack</p>
                <p>Implement User Registration, Login, Password Reset, Social Login, User Permission, Email Notifications etc.</p>
                <div className='hero-buttons --flex-start'>
                    <button className='--btn --btn-danger'>
                      <Link to='/register'>Register</Link>
                    </button>
                    <button className='--btn --btn-primary'>
                    <Link to='/login'>Login</Link>
                    </button>
                </div>
            </div>

            <div className='hero-image'>
                <img src={loginImage} alt='auth'/>
            </div>
         </section>
    </div>
  )
}

export default Home