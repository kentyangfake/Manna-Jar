import Graph from 'react-graph-vis';
import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../app/hooks';
import { selectProfile } from '../app/loginSlice';
import { useNavigate, useParams } from 'react-router-dom';

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
  size?: number;
}

interface Edge {
  from: string;
  to: string;
}

const THEME_COLOR = 'gray';
const HOVER_COLOR = 'purple';
const BASE_SIZE = 5;

const options = {
  layout: {
    hierarchical: false,
  },
  nodes: {
    shape: 'dot',
    size: BASE_SIZE,
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

const calcNodeSize = (arr: Edge[]) => {
  let newArray = [];
  let toCounts: { [key: string]: number } = {};

  arr.forEach((obj) => {
    let to = obj.to;
    if (!toCounts.hasOwnProperty(to)) {
      toCounts[to] = 0;
    }
    toCounts[to]++;
  });

  for (let to in toCounts) {
    newArray.push({ to: to, size: toCounts[to] + BASE_SIZE });
  }

  return newArray;
};

const NetworkGraph = () => {
  const [isNoteGraph, setIsNoteGraph] = useState(false);
  const [state, setState] = useState<any>({
    counter: 5,
    graph: {
      nodes: [],
      edges: [],
    },
  });
  const navigate = useNavigate();
  const profile = useAppSelector(selectProfile);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setIsNoteGraph(true);
    }
  }, []);

  useEffect(() => {
    if (!profile.isLogin) {
      return;
    }

    let newNodes: Node[] = [];
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

    //calc node size base on referenced
    const sizeCollection = calcNodeSize(newEdges);
    newNodes.forEach((itemA) => {
      const matchedItemB = sizeCollection.find(
        (itemB) => itemB.to === itemA.id
      );
      if (matchedItemB) {
        itemA.size = matchedItemB.size;
      }
    });
    //filter unrelated nodes
    if (isNoteGraph) {
      const relatedNode: string[] = [id!];
      //get link to
      const currentNote = profile.notes.find((note) => note.id === id);
      currentNote?.link_notes.map((note) => relatedNode.push(note.id));
      //get referenced by
      profile.notes.map((note) =>
        note.link_notes?.map((link) => {
          if (link.id === id) {
            relatedNode.push(note.id);
          }
        })
      );
      newNodes = newNodes.filter((node) => relatedNode.indexOf(node.id) > -1);
    }

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
  }, [profile.isLogin, id, isNoteGraph]);

  const { graph, events } = state;
  return (
    <>
      <Graph graph={graph} options={options} events={events} />
    </>
  );
};

export default NetworkGraph;
