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

      // Xử lí cd quay
      const cdThumbAnimate = cdThumb.animate([
         {transform: 'rotate(360deg'}
      ],{
         duration: 10000, // 10 seconds
         iterations: Infinity
      })
      cdThumbAnimate.pause()


      // Xử lí khi click play bài hát và pause
      togglePlay.onclick = function() {
        if(!_this.isPlaying) {    // khi bấm play
         audio.play()
        }
        else{  // khi bấm pause
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
      onTimeUpdate: là sự kiện khi thời gian chạy của bài hát thay đổi
      currentTime : là thuộc tính trả ra thời gian đang chạy của bài hát
      duration: là thuộc tính trả ra độ dài bài hát
       */
      // Xử lí để thanh timeline chạy theo bài hát
      audio.ontimeupdate = function() {
         if (audio.duration)
         progress.value = audio.currentTime / audio.duration * 100
         else
         progress.value = 0
      }

      // Xử lí khi tua  
      progress.oninput = function(e) {
         if(this.value == 100) {
            audio.currentTime = audio.duration - 0.1
         }
         if(this.value <  100) {
         audio.currentTime = this.value * audio.duration / 100
         }

      }

      // Xử lí khi click next bài hát
      nextBtn.onclick = function() {
         if(isRandom == false) {  // next tuần tự 
            _this.nextSong()
         }
         else { // next bài ngẫu nhiên
         _this.randomSong()
         }
         _this.renderSongList()

      }

      // Xử lí khi click lùi bài hát
      preBtn.onclick = function() {
         if(isRandom == false) {  // lùi tuần tự 
            _this.preSong()
         }
         else{ // lùi bài ngẫu nhiên
         _this.randomSong()
         }
         _this.renderSongList()

      }
      // Xử lí khi click random
      randomBtn.onclick = function() {
         isRepeat = false
         repeatBtn.classList.remove('active')
         isRandom = !isRandom
         randomBtn.classList.toggle('active',isRandom)
      }
      // Xử lí khi click repeat
      repeatBtn.onclick = function() {
         isRandom = false
         randomBtn.classList.remove('active')     
         isRepeat = !isRepeat
         repeatBtn.classList.toggle('active',isRepeat)
      }
      // Xử lí để bài hát kết thúc tự next và khi bật random, bật repeat
      audio.onended = function() {
         if(isRepeat == true) { // khi bật repeat
            audio.play()
         }
         else{
            if(isRandom == true) {  // khi bật random
               _this.randomSong()
            }
            else{ // tự next
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
   // hàm tiến bài hát
   nextSong() {
      if(this.currentIndex == this.songList.length - 1) {
         this.currentIndex = -1
      }
      this.currentIndex++      
      this.loadCurrentSong()
      audio.play()
   },
   // hàm lùi bài hát
   preSong() {
      if(this.currentIndex == 0) {
         this.currentIndex = this.songList.length
      }
      this.currentIndex-- 
      this.loadCurrentSong()
      audio.play()
   },
   // hàm random bài hát
   randomSong() {
      let oldIndex = this.currentIndex
      do{
         this.currentIndex = Math.floor(Math.random() * this.songList.length)
      } while(this.currentIndex === oldIndex)
      this.loadCurrentSong()
      audio.play()
   },
   // // Tải thông tin bài hát vào UI khi chạy ứng dụng
   loadCurrentSong: function() {
      heading.innerHTML = `${this.currentSong.name}`
      cdThumb.style.backgroundImage= `url(${this.currentSong.image})`
      audio.src = this.currentSong.path
   },
   start() {   
      // Định nghĩa thêm các thuộc tính cho object app
      this.defineProperties()

      // Lắng nghe / xử lý các sự kiện (DOM Events)
      this.handleEvents()

      // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
      this.loadCurrentSong()

      // Render ra playlist
      this.renderSongList()
   }
   
}
app.start()

// Test
