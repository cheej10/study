var Body = {
  setColor:function(color){
    $('body').css('color', color);
  },
  setBackgroundColor:function(color){
    $('body').css('backgroundColor', color);
  }
}
var Link = {
  setColor:function(color){
    $('a').css('color', color);
  }
}
function nightDayHandler(self){
  var target = document.querySelector('body');
  if(self.value === 'night'){
    Body.setColor('white');
    Body.setBackgroundColor('black');
    self.value='day';
    Link.setColor('white');
  }
  else {
    Body.setColor('black');
    Body.setBackgroundColor('white');
    self.value='night';
    Link.setColor('black');
  }
}
