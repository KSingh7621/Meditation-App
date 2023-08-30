const app = () => {
  const song = document.querySelector('.song')
  const video = document.querySelector('.vid-container video')
  const play = document.querySelector('.play')
  const outline = document.querySelector('.moving-outline circle')

  //Sounds
  const sounds = document.querySelectorAll('.sound-picker button')
  const timeSelect = document.querySelectorAll('.time-select button')
  //time display
  const timeDisplay = document.querySelector('.time-display')

  const outlineLength = outline.getTotalLength()
  // Durations
  let fakeDuration = 300
  outline.style.strokeDasharray = outlineLength
  outline.style.strokeDashoffset = outlineLength

  //pick different sound
  sounds.forEach((sound) => {
    sound.addEventListener('click', function () {
      song.src = this.getAttribute('data-sound')
      video.src = this.getAttribute('data-video')
      checkPlaying(song)
    })
  })

  //play sound
  play.addEventListener('click', () => {
    checkPlaying(song)
  })

  //select time duration
  timeSelect.forEach((option) => {
    option.addEventListener('click', function () {
      fakeDuration = this.getAttribute('data-time')
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`
      //   checkPlaying(song)
      song.currentTime = 0
    })
  })

  //function to stop and play sound
  const checkPlaying = (song) => {
    if (song.paused) {
      song.play()
      video.play()
      play.src = './svg/pause.svg'
    } else {
      song.pause()
      video.pause()
      play.src = './svg/play.svg'
    }
  }

  //Animating circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime
    let elapsed = fakeDuration - currentTime
    let seconds = Math.floor(elapsed % 60)
    let minutes = Math.floor(elapsed / 60)

    //animation
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength
    outline.style.strokeDashoffset = progress
    //time display
    timeDisplay.textContent = `${minutes}:${seconds}`

    if (currentTime >= fakeDuration) {
      song.pause()
      song.currentTime = 0
      play.src = './svg/play.svg'
      video.pause()
    }
  }
}

app()
