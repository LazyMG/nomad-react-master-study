import { getPopular } from "../api";
import styled from "styled-components";
import Loading from "../components/Loading";
import List from "../components/List";
import { useQuery } from "react-query";

const Title = styled.h1`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const Home = () => {
  const { data, isLoading } = useQuery(["home"], getPopular);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Title>Popular Movies</Title>
          <List movies={data.results} path="/" />
        </>
      )}
    </>
  );
};

export default Home;
