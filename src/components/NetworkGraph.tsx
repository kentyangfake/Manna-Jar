import { useEffect, useState } from 'react';
import Graph from 'react-graph-vis';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { NoteType } from '../redux/types';
import { selectIsToggleMenu } from '../redux/userSlice';
import { parseGraphFontSize } from '../utils/utils';

interface GraphType {
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
    border: string;
    background: string;
  };
  font: { size: number; color: string };
  size?: number;
}

interface Prop {
  filtBy: string;
  userNotes: NoteType[];
  fontSizeNum?: number;
  id?: string;
  noEvent?: boolean;
}

interface Edge {
  from: string;
  to: string;
}

const THEME_COLOR = 'white';
const BORDER_COLOR = '#57534e';
const SHARED_COLOR = '#fef3c7';
const HOVER_COLOR = '#ecfccb';
const BASE_SIZE = 5;

const options = {
  layout: {
    hierarchical: false,
  },
  nodes: {
    shape: 'dot',
    size: BASE_SIZE,
    color: {
      hover: { border: HOVER_COLOR, background: HOVER_COLOR },
      highlight: { border: HOVER_COLOR, background: HOVER_COLOR },
    },
  },
  edges: {
    color: { color: THEME_COLOR, hover: HOVER_COLOR },
    arrows: { to: { enabled: false } },
    hoverWidth: 0.2,
    selectionWidth: 0.2,
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

const NetworkGraph = ({
  filtBy,
  id,
  fontSizeNum,
  userNotes,
  noEvent,
}: Prop) => {
  const [state, setState] = useState<GraphType>({
    graph: {
      nodes: [],
      edges: [],
    },
  });
  const navigate = useNavigate();
  const isToggleMenu = useAppSelector(selectIsToggleMenu);

  useEffect(() => {
    let fontSize = parseGraphFontSize(fontSizeNum!);

    let newNodes: Node[] = [];
    let newEdges: Edge[] = [];

    userNotes.map((note) => {
      if (note.category === filtBy || filtBy === 'all') {
        newNodes.push({
          id: note.id,
          label: note.title,
          color: {
            border: BORDER_COLOR,
            background:
              note.category === 'shared' || note.category === 'admin'
                ? SHARED_COLOR
                : THEME_COLOR,
          },
          font: {
            size: fontSize,
            color: BORDER_COLOR,
          },
        });
      }

      note.link_notes?.map((link) => {
        newEdges.push({ from: note.id, to: link.id });
      });
    });

    const sizeCollection = calcNodeSize(newEdges);
    newNodes.forEach((itemA) => {
      const matchedItemB = sizeCollection.find(
        (itemB) => itemB.to === itemA.id
      );
      if (matchedItemB) {
        itemA.size = matchedItemB.size;
      }
    });

    if (id) {
      const relatedNode: string[] = [id!];
      const currentNote = userNotes.find((note) => note.id === id);
      currentNote?.link_notes.map((note) => relatedNode.push(note.id));
      userNotes.map((note) =>
        note.link_notes?.map((link) => {
          if (link.id === id) {
            relatedNode.push(note.id);
          }
        })
      );
      newNodes = newNodes.filter((node) => relatedNode.indexOf(node.id) > -1);
    }

    const newGraph: GraphType = {
      graph: { nodes: newNodes, edges: newEdges },
      events: {
        selectNode: ({ nodes }: { nodes: string[] }) => {
          if (noEvent) {
            return;
          }
          const noteId = nodes[0];
          document.body.style.cursor = 'default';
          navigate(`/note/${noteId}`);
        },
        hoverNode: () => {
          document.body.style.cursor = 'pointer';
        },
        blurNode: () => {
          document.body.style.cursor = 'default';
        },
        dragging: () => {
          document.body.style.cursor = 'grabbing';
        },
        dragEnd: () => {
          document.body.style.cursor = 'grab';
          setTimeout(() => {
            document.body.style.cursor = 'default';
          }, 500);
        },
        zoom: ({ direction }: { direction: string }) => {
          direction === '+'
            ? (document.body.style.cursor = 'zoom-in')
            : (document.body.style.cursor = 'zoom-out');
          setTimeout(() => {
            document.body.style.cursor = 'default';
          }, 500);
        },
      },
    };
    setState(newGraph);
  }, [id, filtBy, fontSizeNum, userNotes]);

  const { graph, events } = state;
  return (
    <Graph
      key={isToggleMenu ? 'toggled' : 'not-toggled'}
      graph={graph}
      options={options}
      events={events}
    />
  );
};

export default NetworkGraph;
