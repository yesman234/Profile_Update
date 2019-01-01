/*!
 * Start Bootstrap - Vitality v3.0.0 (https://startbootstrap.com/template-overviews/grayscale)
 * Copyright 2013-2018 Start Bootstrap
 * Licensed under  (https://github.com/BlackrockDigital/startbootstrap-vitality/blob/master/LICENSE)
 */

(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 66)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Closes navbar dropdown menu when a scroll trigger link is clicked
  $('.dropdown-menu .js-scroll-trigger').click(function() {
    $("#portfolioDropdown").dropdown("toggle");
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#navbar-main',
    offset: 150
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#navbar-main").offset().top > 100) {
      $("#navbar-main").addClass("collapsed");
    } else {
      $("#navbar-main").removeClass("collapsed");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Slick Carousel Calls
  $('.carousel-team').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: '<div class="slick-prev"><i class="fa fa-angle-right fa-fw"></i></div>',
    prevArrow: '<div class="slick-next"><i class="fa fa-angle-left fa-fw"></i></div>',
    responsive: [{
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  $('.carousel-portfolio').slick({
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    nextArrow: '<div class="slick-prev"><i class="fa fa-angle-right fa-fw"></i></div>',
    prevArrow: '<div class="slick-next"><i class="fa fa-angle-left fa-fw"></i></div>',
  });

  $('.carousel-testimonials').slick({
    infinite: true,
    nextArrow: '<div class="slick-prev"><i class="fa fa-angle-right fa-fw"></i></div>',
    prevArrow: '<div class="slick-next"><i class="fa fa-angle-left fa-fw"></i></div>',
  });

  // Activates floating label headings for the contact form
  $("body").on("input propertychange", ".floating-label-form-group", function(e) {
    $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
  }).on("focus", ".floating-label-form-group", function() {
    $(this).addClass("floating-label-form-group-with-focus");
  }).on("blur", ".floating-label-form-group", function() {
    $(this).removeClass("floating-label-form-group-with-focus");
  });

})(jQuery); // End of use strict
//firebase
var config = {
  apiKey: "AIzaSyDilIyI87x61VxJckbJHHFjjaTaFBnEZIQ",
  authDomain: "train-scheduler-45039.firebaseapp.com",
  databaseURL: "https://train-scheduler-45039.firebaseio.com",
  projectId: "train-scheduler-45039",
  storageBucket: "train-scheduler-45039.appspot.com",
  messagingSenderId: "762376079160"
};
firebase.initializeApp(config);

//rootref is a refernec eto the whole firebase database
const rootRef = firebase.database().ref();
//page count ref \s is the node that tracks the hits
const pageCountsRef = rootRef.child("pageCounts");

//gets the key and current hit count
let getHistory = new Promise(function(resolve, reject){

let obj = {};
pageCountsRef.orderByChild("page").equalTo(location.pathname).once("value", function(snapshot){
snapshot.forEach(function (child){
  obj = {
    key: child.key,
    count: child.val().count
  }
});
  if(obj){
    resolve(obj);
  }else{
    reject(error);
  }
})
});
getHistory.then(function(fromResolve){
  var key = fromResolve.key;
  var pastcounts = fromResolve.count;
  // if key is undefined then create new key for database item.
  if(key == undefined){
    key = pageCountsRef.push().key;
    pastcounts = 0;
  }
//total hits to date
counts = pastcounts+1;
var postData = {
  page: location.pathname,
  count: counts,
  lastvisit: firebase.database.ServerValue.TIMESTAMP,
  lastreffer: document.referrer
}
var updates = {};
updates["/pageCounts/"+key]=postData;
rootRef.update(updates);
}).catch(function(fromReject){
console.log(error);
})




  





