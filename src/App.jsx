import { useState, useRef } from 'react'
import './App.css'
import totoroImg from './assets/totoro.jpg'
import httydImg from './assets/httyd.jpg'

function App() {
  const [accepted, setAccepted] = useState(false)
  const [noButtonStyle, setNoButtonStyle] = useState({})
  const [noButtonScale, setNoButtonScale] = useState(1)
  const cardRef = useRef(null)

  const handleNoClick = () => {
    const card = cardRef.current
    if (!card) return

    const cardRect = card.getBoundingClientRect()
    const newScale = Math.max(0.3, noButtonScale - 0.15)
    const buttonWidth = 80 * newScale
    const buttonHeight = 50 * newScale

    const maxX = cardRect.width - buttonWidth - 20
    const maxY = cardRect.height - buttonHeight - 20

    const randomX = Math.floor(Math.random() * maxX) + 10
    const randomY = Math.floor(Math.random() * maxY) + 10

    setNoButtonScale(newScale)
    setNoButtonStyle({
      position: 'absolute',
      left: `${randomX}px`,
      top: `${randomY}px`,
      transform: `scale(${newScale})`,
      transition: 'all 0.3s ease'
    })
  }

  const createHearts = () => {
    const hearts = []
    for (let i = 0; i < 20; i++) {
      const style = {
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${3 + Math.random() * 4}s`
      }
      hearts.push(
        <div key={i} className="floating-heart" style={style}>
          &#10084;
        </div>
      )
    }
    return hearts
  }

  if (accepted) {
    return (
      <div className="celebration">
        {/* Floating hearts background */}
        <div className="celebration-hearts">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="floating-celebration-heart" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              fontSize: `${20 + Math.random() * 30}px`
            }}>&#10084;</div>
          ))}
        </div>

        {/* Confetti */}
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="confetti" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              backgroundColor: ['#ff4757', '#ff6b81', '#fff', '#ffb8c6', '#ff9eb5'][Math.floor(Math.random() * 5)]
            }} />
          ))}
        </div>

        {/* Main content */}
        <div className="celebration-content">
          <h1 className="celebration-title">Yay!</h1>
          <img src={httydImg} alt="How to Train Your Dragon" className="celebration-image" />
          <div className="names-heart">
            <span className="name">Tony</span>
            <span className="heart-icon">&#10084;</span>
            <span className="name">Millly</span>
          </div>
          <p className="celebration-subtitle">Happy Valentine's Day Babe!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="hearts-bg">{createHearts()}</div>
      <div className="card" ref={cardRef}>
        <div className="character">
          <img
            src={totoroImg}
            alt="Totoro"
            className="totoro-img"
          />
        </div>
        <h1 className="title">Hi Millly!</h1>
        <p className="question">Will you be my Valentine?</p>
        <p className="from">- Tony</p>
        <div className="buttons">
          <button
            className="btn yes-btn"
            onClick={() => setAccepted(true)}
          >
            Yes!
          </button>
          <button
            className="btn no-btn"
            style={noButtonStyle}
            onClick={handleNoClick}
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
