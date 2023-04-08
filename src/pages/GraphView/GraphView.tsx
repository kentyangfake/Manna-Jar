import styled from 'styled-components/macro';
import Navigate from '../../components/Navigate';
import NetworkGraph from '../../components/NetworkGraph';

const Wrapper = styled.div`
  background-color: darkslategray;
`;
const GraphWrapper = styled.div`
  width: 1280px;
  height: 800px;
  border: 1px solid pink;
`;

const GraphView = () => {
  return (
    <>
      <Navigate />
      <Wrapper>
        <GraphWrapper>
          <NetworkGraph />
        </GraphWrapper>
      </Wrapper>
    </>
  );
};

export default GraphView;
