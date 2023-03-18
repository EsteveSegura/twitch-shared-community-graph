import {getAllFollowers} from './application/getAllFollowers/';
import {adjacencyList} from './domain/services/adjacencyList';
import Graph from './domain/graph/graph';

async function drawGraph() {
  const streamers = [
    await getAllFollowers('48518400'),
    await getAllFollowers('208494227'),
    await getAllFollowers('63509391'),
    await getAllFollowers('63814301'),
  ];
  const createAdjacencyList = adjacencyList(streamers);
  const streamsGraph = new Graph({title: 'Streamers', htmlId: 'sigma-container'});
  streamsGraph.bulkAdjacencyList(createAdjacencyList);
  streamsGraph.render();
}

drawGraph();
