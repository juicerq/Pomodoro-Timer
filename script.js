// Theme Switcher

document.querySelector('.theme-switcher').addEventListener('click', () => {
  const r = document.querySelector(':root')
  const switched = document.querySelector('.theme-switcher').getAttribute('data-switched')
  if (switched == 'false'){
    r.style.setProperty('--bgColor', '#000000')
    r.style.setProperty('--textColor', '#fefefe')
    r.style.setProperty('--filter', 'invert(100%) sepia(100%) saturate(0%) hue-rotate(330deg) brightness(103%) contrast(102%)')
    document.querySelector('.switch').setAttribute('name', 'moon-outline')
    document.querySelector('.theme-switcher').setAttribute('data-switched', true)
  } else {
    r.style.setProperty('--bgColor', '#fefefe')
    r.style.setProperty('--textColor', '#000000')
    r.style.setProperty('--filter', '0')
    document.querySelector('.switch').setAttribute('name', 'sunny-outline')

    document.querySelector('.theme-switcher').setAttribute('data-switched', false)
  }
  document.querySelector('.theme-switcher').style.transform += "rotate(180deg)"
})

// Volume

document.querySelectorAll('.audio').forEach(audio => {
  audio.volume = 0
})

document.querySelectorAll('input').forEach(function (input){
  input.addEventListener('input', () => {
    const thisAudio = document.querySelector(`.${input.name}-audio`)
    thisAudio.play()
    thisAudio.volume = document.querySelector(`#${input.name}-control`).value / 100
  })
})

// Timer
const timer = document.querySelector('.timer')

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24
let timeSpan = 1500000
let counting = document.querySelector('.timer').classList.contains('counting')

function countDown(){
  timeSpan -= second
  if (timeSpan <= 0){
    clearInterval(loop)
    return
  }

  const minutes = Math.floor((timeSpan % hour) / minute)
  const zeroMinutes = minutes < 10? '0' + minutes : minutes
  const seconds = Math.floor((timeSpan % minute) / second)
  const zeroSeconds = seconds < 10? '0' + seconds : seconds

  timer.innerHTML = zeroMinutes + ':' + zeroSeconds
}

function RecurringTimer(callback, delay) {
  var timerId, start, remaining = delay;

  this.pause = function() {
      window.clearTimeout(timerId);
      remaining -= new Date() - start;
  };

  var resume = function() {
      start = new Date();
      timerId = window.setTimeout(function() {
          remaining = delay;
          resume();
          callback();
      }, remaining);
  };

  this.resume = resume;

  this.resume();
}

RecurringTimer(countDown, 1000)

function resetLoop(){
  timeSpan = 1500000
}

function stopInterval(){
  document.querySelector('.timer').classList.remove('counting')
  counting = !counting
  pause()
}

function playInterval(){
  if (counting != false){
    window.alert('O contador já está rodando!')
    return
  }
  document.querySelector('.timer').classList.add('counting')
  counting = !counting
  resume()
}

