
function animate(element, target) {
   
  if (element.timerId) {
    clearInterval(element.timerId);
    element.timerId = null;
  }

  element.timerId = setInterval(function () {

    var step = 10;

    var current = element.offsetLeft;

    if (current > target) {
      step = - Math.abs(step);
    }


    if (Math.abs(current - target)   <= Math.abs(step)) {
 
      clearInterval(element.timerId);

      element.style.left = target + 'px';
      return;
    }
  
    current += step;
    element.style.left = current + 'px';
  }, 8);
}
