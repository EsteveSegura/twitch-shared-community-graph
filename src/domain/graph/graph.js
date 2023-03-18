export default class Graph {
  constructor({title, htmlId}) {
    this.title = title;
    this.nodes = [];
    this.edges = [];
    // eslint-disable-next-line new-cap
    this.renderer = new sigma({
      renderer: {
        container: document.getElementById(htmlId),
        type: 'canvas',
      },
      settings: {
        minArrowSize: 4,
      },
    });
  }

  addNode(node) {
    if (!node) {
      throw new Error('Node not especified');
    }

    this.nodes.push(node);
  }

  addEdge(edge) {
    if (!edge) {
      throw new Error('Edge not especified');
    }

    this.edges.push(edge);
  }

  render(ms) {
    this.renderer.graph.read({
      nodes: this.nodes,
      edges: this.edges,
    });
    this.renderer.refresh();
    this.renderer.startForceAtlas2();

    setTimeout(() => {
      this.renderer.killForceAtlas2();
    }, ms || 10000);
  }

  // ToDo: Beautify this part and split in functions/files
  bulkAdjacencyList(streamers) {
    for (const user of streamers) {
      this.addNode({
        id: parseInt(user.id),
        label: user.nickName,
        x: Math.random(),
        y: Math.random(),
        size: 1,
        color: '#EE651D',
      });

      for (const relation of user.relations) {
        if (relation) {
          this.addEdge({
            id: user.id + Date.now() + Math.floor(Math.random() * 9999),
            source: parseInt(user.id),
            target: parseInt(relation.id),
            color: '#202020',
            type: 'curvedArrow',
          });
        }
      }
    }
  }


  set title(title) {
    if (!title) {
      throw new InvalidGraphError('Field title cannot be empty');
    }

    this._title = title;
  }

  get title() {
    return this._title;
  }
}
