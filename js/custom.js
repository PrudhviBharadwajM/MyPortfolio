(function ($) {

  "use strict";

    // COLOR MODE
    $('.color-mode').click(function(){
        $('.color-mode-icon').toggleClass('active')
        $('body').toggleClass('dark-mode')
    })

    // HEADER
    $(".navbar").headroom();

    // SMOOTHSCROLL
    $(function() {
      $('.nav-link, .custom-btn-link, .navbar-brand').on('click', function(event) {
        var $anchor = $(this);
        var offset = $anchor.is('navbar-brand') ? 0: -49;
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top + offset
        }, 1000);
        event.preventDefault();
      });
    });  

    // TOOLTIP
    $('.social-links a').tooltip();

    // ============================================
    // ADVANCED ANIMATIONS & INTERACTIONS
    // ============================================

    // Particle Effect on Hero Section
    function createParticles() {
      const particleCount = 30;
      const heroSection = $('.about');
      
      if (heroSection.length === 0) return;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = $('<div class="particle"></div>');
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 15 + Math.random() * 10;
        
        particle.css({
          left: left + '%',
          top: '100%',
          '--delay': delay + 's',
          '--duration': duration + 's'
        });
        
        $('body').append(particle);
        
        setTimeout(() => particle.remove(), duration * 1000);
      }
    }

    // Create particles periodically
    if (window.innerWidth > 768) {
      setInterval(createParticles, 5000);
      createParticles();
    }

    // Scroll-Triggered Animations
    function triggerScrollAnimations() {
      const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-up');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show-animation');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.05,
        rootMargin: '50px'
      });

      elements.forEach(el => observer.observe(el));
    }

    // Initialize scroll animations on load
    $(document).ready(function() {
      triggerScrollAnimations();
      
      // Add ripple effect to buttons
      addRippleEffect();
      
      // Add mouse follow effect
      addMouseFollowEffect();
      
      // Animate timeline
      animateTimeline();
      
      // Add staggered card animations
      addCardStagger();
    });
    
    // Ripple effect on buttons
    function addRippleEffect() {
      $(document).on('click', '.custom-btn, .submit-btn', function(e) {
        const $btn = $(this);
        
        if ($btn.find('.ripple-container').length === 0) {
          $btn.addClass('ripple');
        }
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        const ripple = $('<span class="ripple-span"></span>')
          .css({
            width: size,
            height: size,
            left: x,
            top: y
          });
        
        $btn.append(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    }

    // Mouse follow effect
    function addMouseFollowEffect() {
      const follower = $('<div class="mouse-follow"></div>');
      $('body').append(follower);

      $(document).mousemove(function(e) {
        follower.css({
          left: e.clientX - 10 + 'px',
          top: e.clientY - 10 + 'px'
        });
      });
    }

    // Animate timeline items on scroll
    function animateTimeline() {
      const timelineItems = document.querySelectorAll('.timeline-wrapper');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
          }
        });
      }, {
        threshold: 0.3
      });

      timelineItems.forEach(item => {
        item.style.animationPlayState = 'paused';
        observer.observe(item);
      });
    }

    // Add staggered animation to cards
    function addCardStagger() {
      $('.card').each(function(index) {
        $(this).addClass('stagger-' + ((index % 5) + 1));
      });
    }

    // Smooth scroll snap effect
    $(window).on('scroll', function() {
      const scrollPos = $(window).scrollTop();
      const sections = $('section');
      
      sections.each(function() {
        const sectionTop = $(this).offset().top - 100;
        const sectionHeight = $(this).outerHeight();
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          const navLink = $('.nav-link[href="#' + $(this).attr('id') + '"]');
          $('.nav-link').removeClass('active');
          navLink.addClass('active');
        }
      });
    });

    // Add active states with smooth transitions
    $(document).on('click', '.nav-link', function() {
      $('.nav-link').removeClass('active');
      $(this).addClass('active');
    });

    // Image lazy load animation - DISABLED to prevent hiding images
    // $('img').on('load', function() {
    //   $(this).fadeIn();
    // }).css('opacity', 0);

    // Add focus animation to form inputs
    $('.contact-form .form-control').on('focus', function() {
      $(this).parent().css('position', 'relative');
    });

    // Animate counters for skills (if added to HTML)
    function animateCounters() {
      const counters = document.querySelectorAll('[data-count]');
      
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50;
        
        const updateCount = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current) + '%';
            requestAnimationFrame(updateCount);
          } else {
            counter.textContent = target + '%';
          }
        };
        
        updateCount();
      });
    }

    // Initialize counters when in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.querySelector('[data-count]')) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    });

    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

})(jQuery);

