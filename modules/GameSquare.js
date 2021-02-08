// Checking if the first square is clicked and what it was
let firstSquare = null;

class GameSquare {
  el;
  isOpen = false;
  isLocked = false;

  constructor(el, image) {
    this.el = el;
    this.image = image;
    this.el.addEventListener('click', this, false);
    this.setImage(image);
  }

  // Check if the square is locked or active and if not show it
  handleEvent(e) {
    if (e.type === 'click') {
      if (this.isOpen || this.isLocked) {
        return;
      } else {
        this.isOpen = true;
        this.el.classList.add('flip');
        GameSquare.#checkGame(this);
      }
    }
  }

  // reset the game
  reset() {
    this.isOpen = false;
    this.isLocked = false;
    this.el.classList.remove('flip');
  }

  // lock a square once the match is found
  lock() {
    this.isLocked = true;
    this.isOpen = true;
  }

  // Give the square an image
  setImage(newImage) {
    const drawer = this.el.children[0];
    drawer.children[1].classList.remove(this.image);
    this.image = newImage;
    drawer.children[1].classList.add(newImage);
  }

  static #checkGame(gameSquare) {
    if (firstSquare === null) {
      firstSquare = gameSquare;
      return;
    }

    if (firstSquare.image === gameSquare.image) {
      firstSquare.lock();
      gameSquare.lock();
    } else {
      const a = firstSquare;
      const b = gameSquare;

      setTimeout(() => {
        a.reset();
        b.reset();
        firstSquare = null;
      }, 400);
    }
    firstSquare = null;
  }
}

export default GameSquare;