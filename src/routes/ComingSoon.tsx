import styled from "styled-components";
import { getComingSoon } from "../api";
import Loading from "../components/Loading";
import List from "../components/List";
import { useQuery } from "react-query";

const Title = styled.h1`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const ComingSoon = () => {
  const { data, isLoading } = useQuery(["coming-soon"], getComingSoon);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Title>Coming Soon Movies</Title>
          <List movies={data.results} path="/coming-soon" />
        </>
      )}
    </>
  );
};

export default ComingSoon;
