// Scroll function courtesy of Scott Dowding; http://stackoverflow.com/questions/487073/check-if-element-is-visible-after-scrolling

$(document).ready(function() {
  // Check if element is scrolled into view
  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }
  // If element is scrolled into view, fade it in
  $(window).scroll(function() {
    $('.scroll-animations .animated').each(function() {
      if (isScrolledIntoView(this) === true) {
        $(this).addClass('fadeInLeft');
      }
    });
  });

  // Click Animations
  $('button').on('click', function() {
    /*
    If any input is empty make it's border red and shake it. After the animation is complete, remove the shake and animated classes so that the animation can repeat.
    */
    
    // Check name input
    if ($('#name').val() === '') {
      $('#name').addClass('form-error animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $(this).removeClass('animated shake');
      });
    } else {
      $('#name').removeClass('form-error');
    }
    
    // Check email input
    if ($('#email').val() === '') {
      $('#email').addClass('form-error animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $(this).removeClass('animated shake');
      });
    } else {
      $('#email').removeClass('form-error');
    }

    // Check message textarea
    if ($('#message').val() === '') {
      $('#message').addClass('form-error animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $(this).removeClass('animated shake');
      });
    } else {
      $('#message').removeClass('form-error');
    }

  });
  
  // Activate hinge effect when h4 is click in last section
  $('.funky-animations h4').on('click', function() {
    $(this).addClass('animated hinge').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $(this).removeClass('animated hinge');
      });
  });



  console.clear();

  const cardsContainer = document.querySelector(".cards");
  const cardsContainerInner = document.querySelector(".cards__inner");
  const cards = Array.from(document.querySelectorAll(".card"));
  const overlay = document.querySelector(".overlay");
  
  const applyOverlayMask = (e) => {
    const overlayEl = e.currentTarget;
    const x = e.pageX - cardsContainer.offsetLeft;
    const y = e.pageY - cardsContainer.offsetTop;
  
    overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
  };
  
  const createOverlayCta = (overlayCard, ctaEl) => {
    const overlayCta = document.createElement("div");
    overlayCta.classList.add("cta");
    overlayCta.textContent = ctaEl.textContent;
    overlayCta.setAttribute("aria-hidden", true);
    overlayCard.append(overlayCta);
  };
  
  const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const cardIndex = cards.indexOf(entry.target);
      let width = entry.borderBoxSize[0].inlineSize;
      let height = entry.borderBoxSize[0].blockSize;
  
      if (cardIndex >= 0) {
        overlay.children[cardIndex].style.width = `${width}px`;
        overlay.children[cardIndex].style.height = `${height}px`;
      }
    });
  });
  
  const initOverlayCard = (cardEl) => {
    const overlayCard = document.createElement("div");
    overlayCard.classList.add("card");
    createOverlayCta(overlayCard, cardEl.lastElementChild);
    overlay.append(overlayCard);
    observer.observe(cardEl);
  };
  
  cards.forEach(initOverlayCard);
  document.body.addEventListener("pointermove", applyOverlayMask);
  







});