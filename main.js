import './style.css'

/*

First: get the initial dimensions

Last: get dimensions after change

Invert: calculate deltas to move element to its original position

Play: animate from original position to final position

*/


document.addEventListener("DOMContentLoaded", function() {
  

  let cards = Array.from(document.querySelectorAll('.card'))

  console.log(cards)

  cards.forEach((card) => {
    card.addEventListener('click', function() {



      // useTransition(() => {
      //   if(card.classList.contains('expanded')) {
      //     card.classList.remove('expanded');
      //   } else {
      //     card.classList.add('expanded');
      //   }
      // });

      

      let flip = new Flip();
      
      //flip.read([card])
      flip.read(cards)
      // modification
      if(card.classList.contains('expanded')) {
        card.classList.remove('expanded');
      } else {
        card.classList.add('expanded');
      }
      
      //card.parentNode.removeChild(card);
      //flip.play([card])
      flip.play(cards)

      
    });
    
  })
});


class Flip {
  
  constructor() {
    this.duration = 500
    this.positions = {}
  }

  /**
   * Memorize la position de nos elements 
   * @param { HTMLElements[] } elements 
   */
  read(elements) {
    elements.forEach(element => {
      const id= element.getAttribute('id');
      this.positions[id] = element.getBoundingClientRect();
      console.log(this.positions[id])
    })
  }

  /**
   * Anime les elements vers leur nouvelle position
   * @param { HTMLElements[] } elements 
   */
   play(elements) {
    elements.forEach(element => {
      const id= element.getAttribute('id');

      // first
      const firstPosition = this.positions[id]
      // last
      const lastPosition = element.getBoundingClientRect();
      
      // invert 
      const deltaX = firstPosition.x - lastPosition.x;
      const deltaY = firstPosition.y - lastPosition.y;
      const deltaW = firstPosition.width / lastPosition.width;
      const deltaH = firstPosition.height / lastPosition.height;

      // play
      element.animate([{
        transformOrigin: 'top left',
        transform: `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`
      }, {
        transform: 'none'
      }],{
        duration: this.duration,
        easing: 'ease-in-out',
        fill: 'both'
      })
      
      console.log(element, id)

      //element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`

    })
  }
}
