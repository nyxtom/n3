### n3
-------------

n3.js is built on top of d3.js for creating super simple reusable
visualizations using the [reusable charts](http://bost.ocks.org/mike/chart/) concept. Inspired by
[nvd3](http://nvd3.org/) for workflow in adding graphs and re-rendering graphs.

![](http://i.imgur.com/3xEzA.png)

### Creating graphs
--------------------
First in order to use `n3.js` you will need to include the following:

```
<link rel="stylesheet" href="/css/n3.css" />
<script type="text/javascript" src="/javascripts/d3.v3.min.js" />
<script type="text/javascript" src="/javascripts/n3.min.js" />
```

### n3.addGraph(callback):
To add a new chart use the `addGraph` function:

```
var values = [];
var time = new Date().getTime() - 60000;
for (var i = 0; i < 60; i++) {
    values.push({ x: new Date((time + (i * 1000))), y: Math.ceil(Math.random() * 100)});
}
var data = [{"key":"Stream0",values:values}];

n3.addGraph(function () {
    var chart = new n3.graphing.linegraph();
    d3.select("#container svg").datum(data).call(chart);
    return chart;
});
```

### n3.windowResize
This will automatically call the `n3.dispatch.updateGraphs` function which is currently being 
subscribed to automatically update when the window resizes. For responsive layouts, this will 
ensure that the graph is displayed appropriately.

### License
-----------------
(The MIT License)

Copyright (c) 2012 <nyxtom@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the 'Software'),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
