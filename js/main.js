function lineChart(config) {
  return function() {
    var myId = Math.random().toString(36).substring(2, 22);
    document.write("<div id='chart-"  + myId + "'>");
    var elementSelector = 'div#chart-' + myId;
    anchor = $(elementSelector)[0];

    // Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = anchor.clientWidth - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;

    // Parse the date / time
    //var parseDate = d3.time.format("%d-%b-%y").parse;
    var parseDate = d3.time.format.utc("%Y-%m-%d %H:%M:%S UTC").parse;

    // Set the ranges
    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    // Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(5);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);

    // Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.timestamp); })
        .y(function(d) { return y(d.bot_temp); });
        
    var ordinal = function(n) {
      var s=["th","st","nd","rd"],
          v=n%100;
      return n+(s[(v-20)%10]||s[v]||s[0]);
    }

    var ordclass = function(n) {
      return 'ord' + ordinal(n)
    }

    // Adds the svg canvas
    var svg = d3.select(elementSelector)
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", 
                  "translate(" + margin.left + "," + margin.top + ")");

    var columnsToChart = config.columnsToChart
                               .split(',')
                               .map(function(x) { return $.trim(x) })
    var groupsToChart = config.groupsToChart
                              .split(',')
                              .map(function(x) { return $.trim(x) })
    
    var scale = d3.scale.ordinal()
    // Get the data
    d3.csv(config.dataUrl, function(error, data) {
        dataNest = d3.nest()
          .key(function(d) { return d[config.groupColumn] })
          .entries(data)

        dataColumns = d3.keys(data[0]).filter(function(key) {
          return ($.inArray(key, columnsToChart) > -1)
        })

        nestedColumns = []
        dataNest.forEach(function(nest) {
          if ($.inArray(nest.key, groupsToChart) > -1) {
            dataColumns.forEach(function(column, columnIndex) {
              nestedColumns.push([nest.key, column]);
            })
          }
        })
        scale.domain(nestedColumns);

        var linesToPlot = scale.domain().map(function(key, index) {
          filteredData = data.filter(function(d) {
            return d[config.groupColumn] == key[0]
          });
          return {
            counter: index+1,
            name: key.join('_'),
            values: filteredData.map(function(d) {
              return { x: parseDate(d.timestamp), y: +d[key[1]] };
            })
          }
        });

        // Scale the range of the data
        x.domain([
          d3.min(linesToPlot, function(line) { return line.values[0].x }),
          d3.max(linesToPlot, function(line) { return line.values[line.values.length-1].x })
        ]);
        y.domain([
          d3.min(linesToPlot, function(line) { return line.values[0].y }),
          d3.max(linesToPlot, function(line) { return line.values[line.values.length-1].y })
        ]);

        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
      
        var lineSet = svg.selectAll(".line")
          .data(linesToPlot)
          .enter()
          .append('g')
          .attr('class', 'line');

        var  maxY = d3.max(linesToPlot, function (line) {
          return d3.max(line.values, function(d) { return d.y })
        })
        var  minY = d3.min(linesToPlot, function (line) {
          return d3.min(line.values, function(d) { return d.y })
        })
        var yPadding = (maxY-minY)*0.05
        var yScale = d3.scale.linear()
          .domain([minY-yPadding, maxY+yPadding])
          .range([height, 0]);
        
        var  minX = d3.min(linesToPlot, function(line) { return line.values[0].x });
        var  maxX = d3.max(linesToPlot, function(line) { return line.values[line.values.length-1].x });
        var xScale = d3.time.scale()
            .domain([minX, maxX])
            .range([0, width]);

        var dataLine = d3.svg.line()
            .x(function(d) { return xScale(d.x); })
            .y(function(d) { return yScale(d.y); })
            .interpolate('basis');

        lineSet.append('svg:path')
          .attr("class", function(d) {
            return ['line',  d.name, ordclass(d.counter)].join(' ');
          })
          .attr('d', function(d) { return dataLine(d.values); })
          .style('stroke', function(d) { return scale(d.name); });

    });
  }
}
