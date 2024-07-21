import { getNowPlaying } from "../api";
import styled from "styled-components";
import Loading from "../components/Loading";
import List from "../components/List";
import { useQuery } from "react-query";

const Title = styled.h1`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 15px;
  color: ${(props) => props.theme.textColor};
`;

const NowPlaying = () => {
  const { data, isLoading } = useQuery(["now-playing"], getNowPlaying);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Title>Now Playing Movies</Title>
          <List movies={data.results} path="/now-playing" />
        </>
      )}
    </>
  );
};

export default NowPlaying;
