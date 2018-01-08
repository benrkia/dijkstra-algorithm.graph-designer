/**
 *
 * @author Benrkia ilyasse
 * url: fb.com/benilya
 * @author El Adssaoui Achraf
 */
export class drawGraph{

  constructor(_myLinks){
    this.draw(_myLinks);
  }

  draw(_myLinks){

    var links = _myLinks;

    var nodes = {};

    // Compute the distinct nodes from the links.
    links.forEach(function(link) {
      link.source = nodes[link.source] || (nodes[link.source] = {name: link.source,distance:link.distance});
      link.target = nodes[link.target] || (nodes[link.target] = {name: link.target,distance:link.distance});
    });

    var width = 960,
        height = 500;

    var force = d3.layout.force()
        .nodes(d3.values(nodes))
        .links(links)
        .size([width, height])
        .linkDistance(200)
        .charge(-300)
        .on("tick", tick)
        .start();

    document.getElementById('myGraph').innerHTML="";

    var svg = d3.select("#myGraph").append("svg")
        .attr("width", width)
        .attr("height", height);

    // Per-type markers, as they don't inherit styles.
    svg.append("defs").selectAll("marker")
        .data(["suit", "licensing", "resolved"])
      .enter().append("marker")
        .attr("id", function(d) { return d; })
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 27)
        .attr("refY", -1)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5");

    var k = svg.append("g").selectAll("g")
        .data(force.links())
        .enter().append("g")
        .call(force.drag);

    var path = k.append("path")
        .attr("class", function(d) { return "link " + d.type; })
        .attr("id", function(d) { return d.id; })
        .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });

    var text = k.append("text")
        .style("font-size", "16px")
        .append("textPath")
        .attr("xlink:href", function(d) { return "#"+d.id; })
        .attr("startOffset", "50%")
        .text(function(d) { return d.distance; });

    var g = svg.append("g").selectAll("g")
        .data(force.nodes())
        .enter().append("g")
        .call(force.drag);

    var circle = g.append("circle")
        .attr("r", 20);

    var text = g.append("text")
        .attr("x", -10)
        .attr("y", 3.5)
        .text(function(d) { return d.name; });

    // Use elliptical arc path segments to doubly-encode directionality.
    function tick() {
      path.attr("d", linkArc);
      circle.attr("transform", transform);
      text.attr("transform", transform);
    }

    function linkArc(d) {
      var dx = d.target.x - d.source.x,
          dy = d.target.y - d.source.y,
          dr = Math.sqrt(dx * dx + dy * dy);
      return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
    }

    function transform(d) {
      return "translate(" + d.x + "," + d.y + ")";
    }
  }

}