
var n3 = window.n3 || {};
window.n3 = n3;
n3.__namespace = true;

(function ($self, undefined) {

    $self.version = "0.1.1";
    $self.debug = false;
    $self.dispatch = d3.dispatch('render_start', 'render_end', 'update_graphs');

    /**
     * Stores all log variables and stats.
     */

    $self.logs = {};
    
    /**
     * Stores all rendered graphs.
     */

    $self.graphs = [];

    /**
     * Logs the arguments to the console.log output.
     */

    $self.log = function () {
        if ($self.debug && console.log && console.log.apply) {
            console.log.apply(console, arguments);
        }
        else if ($self.debug && console.log && Function.prototype.bind) {
            var log = Function.prototype.bind.call(console.log, console);
            log.apply(console, arguments);
        }
        return arguments[arguments.length - 1];
    };

    /**
     * Performs the render steps so that all callbacks get executed within a 
     * dispatch render start/end before rendering the next callback function.
     *
     * @param {Number} step: The number of items to generate in each timeout loop
     */

    $self.render = function render(step) {
        step = step || 1; // number of items to generate in each timeout loop

        render.active = true;
        $self.dispatch.render_start();

        setTimeout(function () {
            var chart, graph;

            for (var i = 0; i < step && (graph = render.queue[i]); i++) {
                chart = graph.generate();
                $self.graphs.push(chart);
            }

            render.queue.splice(0, i);

            if (render.queue.length) setTimeout(arguments.callee, 0);
            else { $self.render.active = false; $self.dispatch.render_end(); }
        }, 0);
    };

    $self.render.active = false;
    $self.render.queue = [];

    /**
     * Queues a given object function for the callback render function.
     *
     * @param {Object} obj: A function queued in the render callback loop.
     */

    $self.addGraph = function (obj) {
        if (typeof arguments[0] == typeof(Function))
            obj = { generate: arguments[0] };

        $self.render.queue.push(obj);

        if (!$self.render.active) $self.render();
    };

    /**
     * Rebinds the window.onresize event to allow for extended callbacks.
     *
     * @param {Function} fun: The function to callback on window resize.
     */

    $self.windowResize = function (fun) {
        var _onresize = window.onresize;
        window.onresize = function (e) {
            if (typeof _onresize == 'function') _onresize(e);
            fun(e);
        };
    };

    /**
     * Initializes the dispatch render_start and render_end callback loops
     * used primarily by the render queue. This will only occur if in debug.
     */

    function init() {
        if ($self.debug) {
            $self.dispatch.on('render_start', function (e) {
                $self.logs.startTime = +new Date();
            });
            $self.dispatch.on('render_end', function (e) {
                $self.logs.endTime = +new Date();
                $self.logs.totalTime = $self.logs.endTime - $self.logs.startTime;
                $self.log('total', $self.logs.totalTime, 'ms');
            });
        }

        $self.dispatch.on('update_graphs', function (e) {
            for (var i = 0; i < $self.graphs.length; i++) {
                $self.graphs[i].container.call($self.graphs[i]);
            };
        });

        $self.windowResize(function () {
            $self.dispatch.update_graphs();
        });
    }

    init();

}(n3));
