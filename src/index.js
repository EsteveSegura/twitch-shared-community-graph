import {getAllFollowers} from './application/getAllFollowers/';
import {adjacencyList} from './domain/services/adjacencyList';
import Graph from './domain/graph/graph';

async function drawGraph() {
  const streamers = [await getAllFollowers('95005780'), await getAllFollowers('143003858')];
  const createAdjacencyList = adjacencyList( streamers);
  const streamsGraph = new Graph({title: 'Streamers', htmlId: 'sigma-container'});
  streamsGraph.bulkAdjacencyList(createAdjacencyList);
  streamsGraph.render();
}

drawGraph();
