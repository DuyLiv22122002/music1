const  $ = document.querySelector.bind(document)
const  $$ = document.querySelectorAll.bind(document)
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
let playList = $('.playlist')
const cd = $('.cd')
const togglePlay = $('.btn.btn-toggle-play')
const player = $('.player')
const progress = $('.progress')
const nextBtn = $('.btn-next')
const preBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
let isRandom = false
let isRepeat = false
const app = {
   currentIndex : 0,
   isPlaying: false,
   songList: [
      {
         name: 'Let Me Down Slowly',
         singer: 'Alec Benjamin',
         path: './assets/music/LetMeDown.mp3',
         image: './assets/img/LetMeDown.jpg'
      },
      {
         name: 'Sad',
         singer: 'Alan Sheare',
         path: './assets/music/SAD!.mp3',
         image: './assets/img/Sad.jpg'
      },
      {
         name: 'Heart Wave',
         singer: 'Glass Animals',
         path: './assets/music/Heat Waves.mp3',
         image: './assets/img/heartWave.jpg'
      },
      {
         name: 'Outside',
         singer: 'Calvin Harris',
         path: './assets/music/Outside.mp3',
         image: './assets/img/outside.jfif'
      },
      {
         name: 'Rather Be',
         singer: 'Clean Bandit',
         path: './assets/music/Rather Be.mp3',
         image: './assets/img/cleanbandit.jpg'
      },
      {
         name: 'Unstoppable',
         singer: 'Sia',
         path: './assets/music/Unstoppable.mp3',
         image: './assets/img/unstoppable.jfif'
      },
      // 
      {
         name: 'Let Me Down Slowly',
         singer: 'Alec Benjamin',
         path: './assets/music/LetMeDown.mp3',
         image: './assets/img/LetMeDown.jpg'
      },
      {
         name: 'Sad',
         singer: 'Alan Sheare',
         path: './assets/music/SAD!.mp3',
         image: './assets/img/Sad.jpg'
      },
      {
         name: 'Heart Wave',
         singer: 'Glass Animals',
         path: './assets/music/Heat Waves.mp3',
         image: './assets/img/heartWave.jpg'
      },
      {
         name: 'Outside',
         singer: 'Calvin Harris',
         path: './assets/music/Outside.mp3',
         image: './assets/img/outside.jfif'
      },
      {
         name: 'Rather Be',
         singer: 'Clean Bandit',
         path: './assets/music/Rather Be.mp3',
         image: './assets/img/cleanbandit.jpg'
      },
      {
         name: 'Unstoppable',
         singer: 'Sia',
         path: './assets/music/Unstoppable.mp3',
         image: './assets/img/unstoppable.jfif'
      },
   ], 
   
   renderSongList() {
      
      let html = ''
       this.songList.forEach((song,index) => {
         html += `<div class="song ${index == this.currentIndex ?  'active' : ''}" data-index = "${index}">
         <div class="thumb" style="background-image: url(${song.image})">
         </div>
         <div class="body">
           <h3 class="title">${song.name}</h3>
           <p class="author">${song.singer}</p>
         </div>
         <div class="option">
           <i class="fas fa-ellipsis-h"></i>
         </div>
       </div>`
       }    
       )
      playList.innerHTML = html
      if(this.currentIndex < 3) {
         $('.song.active').scrollIntoView({
         behavior: 'smooth',
         block: 'end',  
      })
      }
      else{
      $('.song.active').scrollIntoView({
            behavior: 'smooth',
            block: 'center',  
      })
      }       
   },
   defineProperties: function() {
      Object.defineProperty(this,'currentSong', {
         get: function() {
            return this.songList[this.currentIndex]
         },
       
      })
   },
   handleEvents() {
      const _this =  this
      const cdWidth = cd.offsetWidth 
      document.onscroll = function() {
         const scrollTop = window.scrollY || document.documentElement.scrollTop
         const newCdWidth = cdWidth - (scrollTop)
         cd.style.width = newCdWidth > 20 ? newCdWidth + 'px' : 0
         // cd.style.opacity = newCdWidth / cdWidth
      }

      // X??? l?? cd quay
      const cdThumbAnimate = cdThumb.animate([
         {transform: 'rotate(360deg'}
      ],{
         duration: 10000, // 10 seconds
         iterations: Infinity
      })
      cdThumbAnimate.pause()


      // X??? l?? khi click play b??i h??t v?? pause
      togglePlay.onclick = function() {
        if(!_this.isPlaying) {    // khi b???m play
         audio.play()
        }
        else{  // khi b???m pause
         audio.pause()
        }
      }

      audio.onplay = function() {
         _this.isPlaying = true
         player.classList.add('playing')
         cdThumbAnimate.play()
      }
      audio.onpause = function() {
         _this.isPlaying = false
         player.classList.remove('playing')
         cdThumbAnimate.pause()
      }

      /*
      onTimeUpdate: l?? s??? ki???n khi th???i gian ch???y c???a b??i h??t thay ?????i
      currentTime : l?? thu???c t??nh tr??? ra th???i gian ??ang ch???y c???a b??i h??t
      duration: l?? thu???c t??nh tr??? ra ????? d??i b??i h??t
       */
      // X??? l?? ????? thanh timeline ch???y theo b??i h??t
      audio.ontimeupdate = function() {
         if (audio.duration)
         progress.value = audio.currentTime / audio.duration * 100
         else
         progress.value = 0
      }

      // X??? l?? khi tua  
      progress.oninput = function(e) {
         if(this.value == 100) {
            audio.currentTime = audio.duration - 0.1
         }
         if(this.value <  100) {
         audio.currentTime = this.value * audio.duration / 100
         }

      }

      // X??? l?? khi click next b??i h??t
      nextBtn.onclick = function() {
         if(isRandom == false) {  // next tu???n t??? 
            _this.nextSong()
         }
         else { // next b??i ng???u nhi??n
         _this.randomSong()
         }
         _this.renderSongList()

      }

      // X??? l?? khi click l??i b??i h??t
      preBtn.onclick = function() {
         if(isRandom == false) {  // l??i tu???n t??? 
            _this.preSong()
         }
         else{ // l??i b??i ng???u nhi??n
         _this.randomSong()
         }
         _this.renderSongList()

      }
      // X??? l?? khi click random
      randomBtn.onclick = function() {
         isRepeat = false
         repeatBtn.classList.remove('active')
         isRandom = !isRandom
         randomBtn.classList.toggle('active',isRandom)
      }
      // X??? l?? khi click repeat
      repeatBtn.onclick = function() {
         isRandom = false
         randomBtn.classList.remove('active')     
         isRepeat = !isRepeat
         repeatBtn.classList.toggle('active',isRepeat)
      }
      // X??? l?? ????? b??i h??t k???t th??c t??? next v?? khi b???t random, b???t repeat
      audio.onended = function() {
         if(isRepeat == true) { // khi b???t repeat
            audio.play()
         }
         else{
            if(isRandom == true) {  // khi b???t random
               _this.randomSong()
            }
            else{ // t??? next
               _this.nextSong()
            }
            _this.renderSongList()
         }                                 
      }
      playList.onclick = function(e) {
         var songNode = e.target.closest('.song:not(.active)')
         if(songNode) {
            _this.currentIndex= Number(songNode.getAttribute('data-index'))
            _this.loadCurrentSong()
            _this.renderSongList()
            audio.play()
         }
      
      }
   
   },
   // h??m ti???n b??i h??t
   nextSong() {
      if(this.currentIndex == this.songList.length - 1) {
         this.currentIndex = -1
      }
      this.currentIndex++      
      this.loadCurrentSong()
      audio.play()
   },
   // h??m l??i b??i h??t
   preSong() {
      if(this.currentIndex == 0) {
         this.currentIndex = this.songList.length
      }
      this.currentIndex-- 
      this.loadCurrentSong()
      audio.play()
   },
   // h??m random b??i h??t
   randomSong() {
      let oldIndex = this.currentIndex
      do{
         this.currentIndex = Math.floor(Math.random() * this.songList.length)
      } while(this.currentIndex === oldIndex)
      this.loadCurrentSong()
      audio.play()
   },
   // // T???i th??ng tin b??i h??t v??o UI khi ch???y ???ng d???ng
   loadCurrentSong: function() {
      heading.innerHTML = `${this.currentSong.name}`
      cdThumb.style.backgroundImage= `url(${this.currentSong.image})`
      audio.src = this.currentSong.path
   },
   start() {   
      // ?????nh ngh??a th??m c??c thu???c t??nh cho object app
      this.defineProperties()

      // L???ng nghe / x??? l?? c??c s??? ki???n (DOM Events)
      this.handleEvents()

      // T???i th??ng tin b??i h??t ?????u ti??n v??o UI khi ch???y ???ng d???ng
      this.loadCurrentSong()

      // Render ra playlist
      this.renderSongList()
   }
   
}
app.start()

// Test
