import Graph from 'react-graph-vis';
import React, { useState } from 'react';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  background-color: darkslategray;
`;
const GraphWrapper = styled.div`
  width: 800px;
  height: 800px;
  border: 1px solid pink;
`;

const options = {
  layout: {
    hierarchical: false,
  },
  nodes: {
    shape: 'dot',
    size: 10,
  },
  edges: {
    color: 'beige',
    arrows: { to: { enabled: false } },
  },
  interaction: {
    hover: true,
    zoomSpeed: 0.2,
  },
};

const GraphView = () => {
  const [state, setState] = useState({
    counter: 5,
    graph: {
      //一篇note一個node
      nodes: [
        {
          id: 1,
          label: '第一篇title',
          color: 'beige',
          font: { color: 'beige' },
        },
        {
          id: 2,
          label: '第二篇title',
          color: 'beige',
          font: { color: 'beige' },
        },
        {
          id: 3,
          label: '第三篇title',
          color: 'beige',
          font: { color: 'beige' },
        },
        {
          id: 4,
          label: '第四篇title',
          color: 'beige',
          font: { color: 'beige' },
          size: 17,
        },
        { id: 5, label: '第五篇title', color: 'pink', font: { color: 'pink' } },
      ],
      //用linked_notes生成
      edges: [
        { from: 1, to: 2 },
        { from: 2, to: 1 },
        { from: 2, to: 3 },
        { from: 2, to: 4 },
        { from: 3, to: 1 },
        { from: 3, to: 4 },
        { from: 3, to: 5 },
      ],
    },
    events: {
      select: ({ nodes }: { nodes: [] }) => {
        console.log('Selected nodes:');
        console.log(nodes);
        alert('Selected node: ' + nodes);
      },
      // hoverNode: ({ nodes }) => {
      //   console.log('hover!');
      // },
    },
  });
  const { graph, events } = state;
  return (
    <Wrapper>
      <GraphWrapper>
        <Graph graph={graph} options={options} events={events} />
      </GraphWrapper>
    </Wrapper>
  );
};

export default GraphView;
