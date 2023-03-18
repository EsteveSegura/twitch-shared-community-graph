
<h1 align=center>Twitch Shared Community Graph</h1>
<p align=center>
  <br>
  <span><strong>Twitch Shared Community Graph</strong> It is a tool that teaches you to visualise the shared communities that exist between streamers on twitch, through the use of graphs.<br />
<img src="https://img.shields.io/badge/NodeJS-10.13.0-green">
<img src="https://img.shields.io/badge/License-MIT-blue">

</p>

![Graph gif](./docs/graph.gif)

## Installation

**NOTE**: NodeJS 10.13.0 or higher is required.

```bash
# clone the repo
$ git clone https://github.com/EsteveSegura/twitch-shared-community-graph.git

# change the working directory to insta-growth
$ cd twitch-shared-community-graph

# install NodeJS if is not installed
$ cd src && npm i && npm run serve
```

## Usage
To add streamers and see how their communities are related, just edit the **/src/index.js** file and modify it as follows.

```js
import {getAllFollowers} from './application/getAllFollowers/';
import {adjacencyList} from './domain/services/adjacencyList';
import Graph from './domain/graph/graph';

async function drawGraph() {
  const streamers = [
    await getAllFollowers('<STREAMER USER ID>'), // Add streamer user id
    await getAllFollowers('<STREAMER USER ID>'), // Add streamer user id
  ];

  const createAdjacencyList = adjacencyList(streamers);
  const streamsGraph = new Graph({title: 'Streamers', htmlId: 'sigma-container'});

  streamsGraph.bulkAdjacencyList(createAdjacencyList);
  streamsGraph.render();
}

drawGraph();
```

## License

MIT © twitch-shared-community-graph
