// make ourselves a canvas in the empty index
var svg = d3.select('body').append('svg')
var svgx =  1600;
var svgy =  1000;
svg.attr({'width': svgx, 'height': svgy});

// constants
hexsize = 50
 
// find the centers of all our hexagons, we'll return a 'data' element
// then we'll pass the 'data' to a d3.selectAll to create hexagons
var hexCenters = function(screenheight, screenwidth, size) {
  var hexheight = size * 2
  var hexwidth = Math.sqrt(3)/2 * size
  var vertical = 3/4 * hexheight
  var horizontal = 2 * size;

  var data = [];

  var rows = screenheight / vertical
  var columns = screenwidth / horizontal

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      data.push({x: horizontal*i, y: vertical*j })
    };
  };
  
  return data;
}

//define points for a <polygon> element that is a hexagon
var hexPoints = function(hx, hy, size) {
  var points = ''
  for (i = 0; i < 6; i++){
    angle = 2 * Math.PI / 6 * ( i +0.5)
    x_i = hx + size * Math.cos(angle);
    y_i = hy + size * Math.sin(angle);
    points += x_i + ',' + y_i + ' '
  }
  return points
}

// append a single polygon element to the svg :) 
svg.append('polygon').attr('points', hexPoints(100, 100 ,hexsize))

// so how do we append a few polygons? 

var hexcount = hexCenters(svgy, svgx, hexsize)

svg.selectAll('polygon').data(hexcount)
  .enter()
  .append('polygon')
  .attr('points', function(d){ return hexPoints(d.x, d.y, hexsize)})