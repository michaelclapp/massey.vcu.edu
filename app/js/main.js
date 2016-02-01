
$('.searchWrap').hide();
$(".searchLink").click(function(){
  if ($('.searchbox').is(':visible')){
     $('.searchWrap').slideUp('fast');
  }else if ($('.searchbox').is(':hidden')){
    $('.searchWrap').slideDown('fast');
  }
});


/*----------------------------------------------------------*
* MENU SCRIPTS
/*----------------------------------------------------------*/

$(document).on('click', '.yamm .dropdown-menu', function(e) {
  e.stopPropagation()
});


$(document).ready(function() {
  $('li.yamm').hover(
     function () {
      $('.dropdown-menu', this).css({"display":"block"}).fadeTo("slow", 1)
      $('.nav-bg').css({"height":"400px"})
     }, 

     function () {
      $('.dropdown-menu', this).fadeTo("slow", 0).css({"display":"none"})
      $('.nav-bg').css({"height":"0px"});
     }
  );
});