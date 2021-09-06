import sigma from 'sigma'

function drawGraph() {
    // Initialise sigma:
    var s = new sigma({
        renderer: {
            container: document.getElementById('webgl'),
            type: 'webgl'
        },
        settings: {
            minArrowSize: 10
        }
    });

    // Generate a random graph:
    var nbNode = 5;
    var nbEdge = 20;
    var graph = {
        nodes: [],
        edges: []
    };



    for (i = 0; i < nbNode; i++)
        if (i == 2) {
            graph.nodes.push({
                id: i,
                label: 'Node ' + i,
                x: Math.random(),
                y: Math.random(),
                size: 4,
                color: '#EE651D'
            });
        } else {
            graph.nodes.push({
                id: i,
                label: 'Node ' + i,
                x: Math.random(),
                y: Math.random(),
                size: 1,
                color: '#EE651D'
            });
        }


    for (i = 0; i < nbEdge; i++)
        graph.edges.push({
            id: i,
            source: '' + (Math.random() * nbNode | 0),
            target: '' + (2 | 0),
            color: '#202020',
            type: 'curvedArrow'
        });


    s.graph.read(graph);
    s.refresh();

    window.setTimeout(function () {
        s.startForceAtlas2()
        console.log("FORCE ATLAS")
    }, 3000);

    window.setTimeout(function () { s.killForceAtlas2() }, 6000);

}

export { drawGraph }
