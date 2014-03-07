// make ourselves a canvas in the empty index
var svg = d3.select('body').append('svg');
var svgx =  1600;
var svgy =  1000;
svg.attr({'width': svgx, 'height': svgy});

// constants
hexsize = 50;
polyradius = hexsize + 25;
insideRadius = 50;
outsideRadius = 50;
shaperadius = outsideRadius + 10;
points = 6;

// find the centers of all our hexagons, we'll return a 'data' element
// then we'll pass the 'data' to a d3.selectAll to create hexagons
var centers = function(screenheight, screenwidth, size) {
  var hexheight = size * 2;
  var hexwidth = Math.sqrt(3)/2 * size;
  var vertical = 3/4 * hexheight;
  var horizontal = hexwidth;

  var data = [];

  var rows = screenheight / vertical;
  var columns = screenwidth / horizontal;

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      data.push({x: (hexwidth)*(i%2) + 2*hexwidth*j , y: vertical*i });
    }
  }

  return data;
};

//define points for a <polygon> element that is a hexagon
var polyNpoints = function(nPoints, hx, hy, insideRad, outsideRad) {
  var points = '';
  if (nPoints%2) nPoints = nPoints-1
  for (i = 0; i < nPoints; i++){
    angle = 2 * Math.PI / nPoints * ( i +0.5);
    radius = i%2 ? insideRad :outsideRad;
    x_i = hx + radius  * Math.cos(angle);
    y_i = hy + radius  * Math.sin(angle);

    points += x_i + ',' + y_i + ' ';
  }
  return points;
};

// append a single polygon element to the svg :)
// svg.append('polygon').attr('points',polyNpoints(10, 0,0,hexsize-10, hexsize+100));

// so how do we append a few polygons?

var shapecount = centers(svgy, svgx, shaperadius);

var all = svg.selectAll('g').data(shapecount, function(d, i) {
  return i;
})
  .enter()
  .append('g')
  .attr({
    'transform': function(d){
      return "translate(" + d.x + "," + d.y + ")";
    },
    id: function(d,i){ return 'g'+i;}
  })
  .transition().duration(100)
  .attr({
    'transform': function(d){
      return "translate(" + d.x + "," + d.y + ") scale(0.01, 0.01)";
    }
  })
  .transition().duration(1000)
  .attr({
    'transform': function(d, i ){
      return " scale(1, 1) "+ "translate(" + d.x + "," + d.y + ")";
    }
  })
  // .transition().duration(1000)
  // .attr({
  //   'transform': function(d, i ){
  //     return " scale(1, 1) "+ "translate(" + d.x + "," + d.y + ") rotate("+i*19+")";
  //   }
  // })
  ;
svg.selectAll('g').append('polygon').attr('points', polyNpoints(points, 0,0,insideRadius, outsideRadius));
$('polygon').click('on',function(){$(this).css('fill','white')})

// rotate the thing
$('polygon').click('on',function(){
  d3.select(this)
  .transition().duration(500)
  .attr('transform', function(){return "scale(0, 1)"})

  .transition()
  .attr('style', 'fill:yellow')


  .transition().duration(200)
  .attr('transform', function(){return "scale(1, 1)"})
})


// $('#g2').children().attr('style','fill:green')
// svg.select('#g4').attr('transform',function(){return "rotate(10)"})

// d3.select('g:nth-child(1)').node();
var squish = function(gnumber) {
  // body...
  d3.select('g:nth-child('+gnumber+')').node()

  .attr({
    'transform': function(d){
      return "translate(" + d.x + "," + d.y + ") scale(0.01, 0.01)";
    }
  })
  .transition().duration(1000)
  .attr({
    'transform': function(d){
      return "translate(" + d.x + "," + d.y + ") scale(1, 1)";
    }
  });
};

// squish(3)
