export default {
   get() {
      this.audio = document.querySelector("audio");
      this.title = document.querySelector(".info h1");
      this.artist = document.querySelector(".info p");
      this.cover = document.querySelector("img");
      this.btnPlay = document.querySelector(".play");
      this.btnPause = document.querySelector(".pause");
      this.btnNext = document.querySelector(".next");
      this.btnPrev = document.querySelector(".prev");
      this.progressBar = document.querySelector("progress");
      this.atualTimeField = document.querySelector(".current-time");
      this.totalTimeField = document.querySelector(".total-time");
   }
}