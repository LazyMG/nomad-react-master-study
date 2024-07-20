import styled from "styled-components";
import Spinner from "../assets/loading-spinner.svg";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  //font-size: 30px;
`;

const Loading = ({ size = "10%" }: { size?: string }) => {
  return (
    <Wrapper>
      <img src={Spinner} alt="로딩중" width={size} />
    </Wrapper>
  );
};

export default Loading;
