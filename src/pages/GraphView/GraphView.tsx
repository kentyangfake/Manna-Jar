import Graph from 'react-graph-vis';
import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectProfile } from '../../app/loginSlice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import Navigate from '../../components/Navigate';

const Wrapper = styled.div`
  background-color: darkslategray;
`;
const GraphWrapper = styled.div`
  width: 800px;
  height: 800px;
  border: 1px solid pink;
`;

interface GraphType {
  counter: number;
  graph: {
    nodes: Node[];
    edges: Edge[];
  };
  events?: {};
}
interface Node {
  id: string;
  label: string;
  color: {
    background: string;
    hover: string;
    border: string;
  };
  font: { color: string };
}

interface Edge {
  from: string;
  to: string;
}

const THEME_COLOR = 'beige';
const HOVER_COLOR = 'pink';

const options = {
  layout: {
    hierarchical: false,
  },
  nodes: {
    shape: 'dot',
    size: 10,
  },
  edges: {
    color: { color: THEME_COLOR, hover: HOVER_COLOR },
    arrows: { to: { enabled: false } },
  },
  interaction: {
    hover: true,
    zoomSpeed: 0.2,
    navigationButtons: true,
    tooltipDelay: 1000000,
  },
};

const GraphView = () => {
  const [state, setState] = useState<any>({
    counter: 5,
    graph: {
      nodes: [],
      edges: [],
    },
  });
  const navigate = useNavigate();
  const profile = useAppSelector(selectProfile);

  useEffect(() => {
    if (!profile.isLogin) {
      return;
    }

    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];

    profile.notes.map((note) => {
      newNodes.push({
        id: note.id,
        label: note.title,
        color: {
          background: THEME_COLOR,
          hover: HOVER_COLOR,
          border: 'none',
        },
        font: { color: THEME_COLOR },
      });
      note.link_notes?.map((link) => {
        newEdges.push({ from: note.id, to: link.id });
      });
    });

    const newGraph: GraphType = {
      counter: 5,
      graph: { nodes: newNodes, edges: newEdges },
      events: {
        selectNode: ({ nodes }: { nodes: string[] }) => {
          const noteId = nodes[0];
          navigate(`/note/${noteId}`);
        },
      },
    };
    setState(newGraph);
  }, [profile.notes]);

  const { graph, events } = state;
  return (
    <Wrapper>
      <Navigate />
      <GraphWrapper>
        <Graph graph={graph} options={options} events={events} />
      </GraphWrapper>
    </Wrapper>
  );
};

export default GraphView;
