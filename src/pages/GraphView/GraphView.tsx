import styled from 'styled-components/macro';
import NetworkGraph from '../../components/NetworkGraph';
import { openAI } from '../../utils/openAI';

const GraphWrapper = styled.div`
  width: 1280px;
  height: 800px;
  border: 1px solid pink;
`;

const GraphView = () => {
  return (
    <>
      <button onClick={() => openAI.summerize()}>ai測試</button>
      <GraphWrapper>
        <NetworkGraph />
      </GraphWrapper>
    </>
  );
};

export default GraphView;
