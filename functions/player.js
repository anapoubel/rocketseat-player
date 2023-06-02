import musics from "./dataAudio.js";
import elements from "./playerElements.js";

export default {
   audioList: musics,
   currentAudio: {},
   currentPlaying: 0,
   start() {  /*Ou -> start: function()*/
      elements.get.call(this);

      this.updateData();
      
      this.btnPlay.onclick = ()=> {
         this.audio.play();
         this.renderPause();
      };
      
      this.btnPause.onclick = ()=> {
         this.audio.pause();
         this.renderPlay();
      };
      
      this.audio.onended = ()=> this.next();
      
      this.btnNext.onclick = ()=> {
         this.next();
         this.renderPause();
      };

      this.btnPrev.onclick = ()=> {
         this.previous();
         this.renderPause();
      };

   },

   previous() {
      this.currentPlaying--;
      this.restart();
      this.updateData();
      this.audio.play();
   },
   
   next() {
      this.currentPlaying++;
      this.restart();
      this.updateData();
      this.audio.play();
   },
   
   updateData() {
      this.currentAudio = this.audioList[this.currentPlaying];
      this.title.textContent = this.currentAudio.title;
      this.artist.textContent = this.currentAudio.artist;
      this.cover.setAttribute("src", this.currentAudio.cover);
      this.audio.src = this.currentAudio.file;
      this.audio.onloadeddata = ()=> {
         this.atualTimeField.textContent = "00:00";
         this.totalTimeField.textContent = this.secondsToMinutes(Math.floor(this.audio.duration));
         this.progressBar.value = 0;
      };
      this.updateTime();    
   },
   
   renderPlay() {
      this.btnPause.classList.replace("active", "inactive");
      this.btnPause.previousElementSibling.classList.replace("inactive", "active");
   },
   
   renderPause() {
      this.btnPlay.classList.replace("active", "inactive");
      this.btnPlay.nextElementSibling.classList.replace("inactive", "active");
   },
   
   updateTime() {
      this.audio.ontimeupdate = ()=> {
         this.atualTimeField.textContent = this.secondsToMinutes(Math.floor(this.audio.currentTime));
         this.totalTimeField.textContent = this.secondsToMinutes(Math.floor(this.audio.duration));
         console.log(this.progressBar.value)
         this.progressBar.value = Math.floor((this.audio.currentTime / this.audio.duration) * 100);
         console.log(this.progressBar.value)
      };
   },
   restart() {
      
      if (this.currentPlaying == this.audioList.length) {
         this.currentPlaying = 0;
      }
      if (this.currentPlaying < 0) {
         this.currentPlaying = this.audioList.length - 1;
      };
   },
   
   secondsToMinutes(seconds) {
      let minute = Math.floor(seconds / 60);
      let second = Math.floor(seconds % 60);
      
      if (second < 10 || minute < 60) {
         second = ("0" + second).slice(-2);
         minute = ("0" + minute).slice(-2);
      }
      return `${minute}:${second}`
   },
};