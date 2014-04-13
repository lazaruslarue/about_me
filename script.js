// make ourselves a canvas in the empty index
var svg = d3.select('body').append('svg');
var svgx =  1600;
var svgy =  1000;
svg.attr({'width': svgx, 'height': svgy});

// constants
hexsize = 60;
polyradius = hexsize + 25;
insideRadius = 100;
outsideRadius = 100;
shaperadius = outsideRadius - 1;
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
  
  var color_assignment = function(d,i) {
    d.counter++;
    if (d.counter === 3) d.counter = 0;
    return "fill:"+d.color[d.counter%d.color.length];  
  };

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      data.push({
        name: ''+j+'_'+i,
        x: (hexwidth)*(i%2) + 2*hexwidth*j,
        y: vertical*i, 
        r: i,
        q: j,
        color: ['8E8E8E', '525252', '666666', '525252'],
        counter: 0,
        color_assignment: color_assignment
      });
    }
  }

  return data;
};

//define points for a <polygon> element that is a hexagon
var polyNpoints = function(nPoints, hx, hy, insideRad, outsideRad) {
  var points = '';
  if (nPoints%2) nPoints = nPoints-1;
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
var colors = ['red', 'white', 'blue'];

svg.selectAll('g').data(shapecount, function(d, i) {
  return i;
})
  .enter()
  .append('g')
  .attr({
    'transform': function(d){
      return "translate(" + d.x + "," + d.y + ")";
    },
    id: function(d,i){ return d.name;} // we can use this info... it's good stuff
  })
  .transition().duration(100) // this code makes the Hexagons shrink when they're first applied to the SVG
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
  });

// stick a shape on every <g>
svg.selectAll('g').append('polygon').attr('points', polyNpoints(points, 0,0,insideRadius, outsideRadius));


// do something when you click the thing
var changecolor = function(d,i) {
  console.log(d);
  d3.select(this).attr({
    'style': d.color_assignment(d,i)
  }).data()
  ;
};

d3.selectAll('polygon').on('mouseover',changecolor);

// here's a function that will flipover
var flipover = function(d,i) {
  d3.select(this)
  .transition().duration(500)
  .attr('transform', function(){return "scale(0, 1)";})

  .transition()
  .attr('style', changecolor(d,i))

  .transition().duration(200)
  .attr('transform', function(){return "scale(1, 1)";});
};

d3.selectAll('polygon').on('click', flipover);
