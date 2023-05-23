// animate highlight on scroll

function highlightElementsOnScroll() {
    var elements = document.querySelectorAll('.highlight');
    
    elements.forEach(function(element) {
      var position = element.getBoundingClientRect();
      
      // Check if the element is in the viewport
      if (position.top >= 0 && position.bottom <= window.innerHeight) {
        element.classList.add('highlighted');
      } else {
        element.classList.remove('highlighted');
      }
    });
  }
  
  window.addEventListener('scroll', highlightElementsOnScroll);
  