(function ($) {
 "use strict";
 
/*
  STICKY
================================== */
	$(window).on('scroll',function() { 
		var AcSticky = $('.active-sticky');   
		var scroll = $(window).scrollTop();
		var AESticky = AcSticky;
		if (scroll < 245) {
			AESticky.removeClass("is-sticky");
		}
		else{
			AESticky.addClass("is-sticky");
		}
        return false; 
	});
	
	//smooth scroll
	$('.smooth-scroll a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 750);
				return false;
			}
		}
	});
	
/*
  ONE PAGE NAVIGATE
================================== */
	var OnePNav = $('.onepage-nev');
	var top_offset = OnePNav.height() - -0;
	OnePNav.onePageNav({
		currentClass: 'active',
		scrollOffset: top_offset,
	});

/*
  EXPEND MENU 
================================== */
	var CloseMu = $('.close-menu');
	var ExMuOp = $('.expand-menu-open');
	var ExMu = $('.mainmenu-expand');
	ExMuOp.on("click", function(e) {
		ExMu.addClass("slide_right");
		e.stopPropagation()
	});
	CloseMu.on('click', function() {
		$(this).parent(ExMu).removeClass('slide_right');
	});
	$(document).on('click', function(e) {
		var $selectOtherSide = $('.mainmenu-expand,.expand-menu-open');
		if (!$selectOtherSide.is(e.target) && $selectOtherSide.has(e.target).length === 0) {
			ExMu.removeClass("slide_right");
		}
	});
	
/*
  PROGRESS WITH WAYPOINT ACTIVE
================================== */

	var ProWey = $('.skill-progress');
    if (ProWey.length > 0) {
        ProWey.waypoint(function () {
			// element 
			jQuery('.skill-bar').each(function() {
				jQuery(this).find('.progress-content').animate({
					width:jQuery(this).attr('data-percentage')
				},2000);
				
				jQuery(this).find('.progress-mark').animate(
				{left:jQuery(this).attr('data-percentage')},
			{
				duration: 2150,
				step: function(now, fx) {
					var data = Math.round(now);
					jQuery(this).find('.percent').html(data + '%');
				}
			});  
			
			});
		}, {offset: '90%'});
	}

/*
 ISOTOPE ACTIVE
================================ */	

	// isotope menu
	var ProjMli = $('.portfolio-menu li');
	var ProjGrid = $('.portfolio-grid');
	ProjMli.on('click', function(){
	ProjMli.removeClass("active");
	  $(this).addClass("active");        
		var selector = $(this).attr('data-filter'); 
		ProjGrid.isotope({ 
			filter: selector, 
			animationOptions: { 
				duration: 750, 
				easing: 'linear', 
				queue: false,
			}
		});
	});
	
/*
 fancybox Popup
================================ */
	var FancYB = $('.fancybox');
	FancYB.fancybox({
		openEffect: 'fade',
		closeEffect: 'fade',
        padding : 0,
		closeBtn: true,
		helpers: {
			title: {
				type: 'inside'
			},
			overlay: {
			  locked: false
			},
			buttons: {}
		}
    });
	FancYB.attr('rel','gallery');
	
	/* youtube video popup
	--------------------*/
	var FanVari = $('.various');
	FanVari.fancybox({
		'padding' : 0,
		maxWidth    : 800,
		maxHeight   : 600,
		fitToView   : false,
		width       : '70%',
		height      : '70%',
		autoSize    : false,
		closeClick  : false,
		openEffect  : 'fade',
		closeEffect : 'fade'
	});
	
/*
	SLICK CAROUSEL AS NAV
===================================*/

	$('#one-item').slick({
		dots: true,
		arrows: false
	});
	
/*
	CONTACT FORM VALIDATIONS SETTINGS
========================================*/
	var CTForm = $('#contact_form');
    CTForm.validate({
        onfocusout: false,
        onkeyup: false,
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            }
        },
        errorPlacement: function(error, element) {
            error.insertBefore(element);
        },
        messages: {
            name: "What's your name?",
            email: {
                required: "What's your email?",
                email: "Please, enter a valid email"
            }
        },
					
        highlight: function(element) {
            $(element)
            .text('').addClass('error')
        },                    
					
        success: function(element) {
            element
            .text('').addClass('valid')
        }
    });   


/*
	CONTACT FORM SCRIPT
========================================*/
 	var CTSubmit = $('#contact_submit');
    CTForm.submit(function() {
        // submit the form
        if($(this).valid()){
           CTSubmit.button('loading'); 
            var action = $(this).attr('action');
            $.ajax({
                url: action,
                type: 'POST',
                data: {
                    contactname: $('#contact_name').val(),
                    contactemail: $('#contact_email').val(),
                    contactmessage: $('#contact_message').val()
                },
                success: function() {
                   CTSubmit.button('reset');
                   CTSubmit.button('complete');
                },
                error: function() {
					CTSubmit.button('reset');
					CTSubmit.button('error');
                }
            });
        // return false to prevent normal browser submit and page navigation 
        } else {
            CTSubmit.button('reset')
        }
        return false; 
    });	

/*
	SCROLLUP
================================ */	

	$.scrollUp({
        scrollText: '<i class="zmdi zmdi-chevron-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });
	
})(jQuery);

/*
	LODING BAR
================================ */	

var WinD = $(window);
WinD.on('load', function(){
	//Preloader
	var preeLoad = $('#loading');
	preeLoad.fadeOut(1000);
	
	// isotope grid
	var IsoGriddoload = $('.portfolio-grid');
	IsoGriddoload.isotope({
		itemSelector: '.grid-item',
		masonryHorizontal: {
			rowHeight: 100
		}
	});
});

function r(from, to) {
	return ~~(Math.random() * (to - from + 1) + from);
  }
  function pick() {
	return arguments[r(0, arguments.length - 1)];
  }
  function getChar() {
	return String.fromCharCode(pick(
	  r(0x3041, 0x30ff),
	  r(0x2000, 0x206f),
	  r(0x0020, 0x003f)
	));
  }
  function loop(fn, delay) {
	let stamp = Date.now();
	function _loop() {
	  if (Date.now() - stamp >= delay) {
		fn(); stamp = Date.now();
	  }
	  requestAnimationFrame(_loop);
	}
	requestAnimationFrame(_loop);
  }
  class Char {
	constructor() {
	  this.element = document.createElement('span');
	  this.mutate();
	}
	mutate() {
	  this.element.textContent = getChar();
	}
  }
  class Trail {
	constructor(list = [], options) {
	  this.list = list;
	  this.options = Object.assign(
		{ size: 10, offset: 0 }, options
	  );
	  this.body = [];
	  this.move();
	}
	traverse(fn) {
	  this.body.forEach((n, i) => {
		let last = (i == this.body.length - 1);
		if (n) fn(n, i, last);
	  });
	}
	move() {
	  this.body = [];
	  let { offset, size } = this.options;
	  for (let i = 0; i < size; ++i) {
		let item = this.list[offset + i - size + 1];
		this.body.push(item);
	  }
	  this.options.offset = 
		(offset + 1) % (this.list.length + size - 1);
	}
  }
  class Rain {
	constructor({ target, row }) {
	  this.element = document.createElement('p');
	  this.build(row);
	  if (target) {
		target.appendChild(this.element);
	  }
	  this.drop();
	}
	build(row = 20) {
	  let root = document.createDocumentFragment();
	  let chars = [];
	  for (let i = 0; i < row; ++i) {
		let c = new Char();
		root.appendChild(c.element);
		chars.push(c);
		if (Math.random() < .5) {
		  loop(() => c.mutate(), r(1e3, 5e3));
		}
	  }
	  this.trail = new Trail(chars, { 
		size: r(10, 30), offset: r(0, 100) 
	  });
	  this.element.appendChild(root); 
	}
	drop() {
	  let trail = this.trail;
	  let len = trail.body.length;
	  let delay = r(10, 100);
	  loop(() => {
		trail.move();
		trail.traverse((c, i, last) => {
		  c.element.style = `
			color: hsl(136, 100%, ${85 / len * (i + 1)}%)
		  `;
		  if (last) {
			c.mutate();
			c.element.style = `
			  color: hsl(136, 100%, 85%);
			  text-shadow:
				0 0 .5em #fff,
				0 0 .5em currentColor;
			`;
		  }
		});
	  }, delay);
	}
  }
  
  const main = document.querySelector('main');
  for (let i = 0; i < 50; ++i) {
	new Rain({ target: main, row: 50 });
  }