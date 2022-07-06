// export const decryptImage = () => {

// }

import 

class CommonSearcher {

  constructor() {
    this.imagesList = [];
    this.checkedImages = 0;
    this.init();
  }

  init() {
    setInterval(() => {
      this.imagesList = document.getElementsByTagName('img');

      for(; this.checkedImages < this.imagesList.length - 1; this.checkedImages++) {
        console.log(this.imagesList[this.checkedImages]);
      }
    }, 5000)
  }
}