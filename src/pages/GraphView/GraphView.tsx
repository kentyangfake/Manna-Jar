import styled from 'styled-components/macro';
import NetworkGraph from '../../components/NetworkGraph';

const GraphWrapper = styled.div`
  width: 1280px;
  height: 800px;
  border: 1px solid pink;
`;

const GraphView = () => {
  return (
    <>
      <GraphWrapper>
        <NetworkGraph />
      </GraphWrapper>
    </>
  );
};

export default GraphView;
