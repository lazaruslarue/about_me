// make ourselves a canvas in the empty index
var svg = d3.select('body').append('svg')
var height = y = 500;
var width = x = 500;
svg.attr({'width': x, 'height': y});


//define points for a <polygon> element
var hexPoints = function(hxlocation, size) {
  var el = '<polygon></polygon>'
  var points = ''
  for (i = 0; i < 6; i++){
    angle = 2 * Math.PI / 6 * ( i +0.5)
    x_i = hxlocation.x + size * Math.cos(angle);
    y_i = hxlocation.y + size * Math.sin(angle);
    points += x_i + ',' + y_i + ' '
  }
  return points
}

svg.append('polygon').attr('points', hexPoints({x:100,y:100},100))

