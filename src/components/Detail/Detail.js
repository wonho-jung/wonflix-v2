import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { MoivesApi, tvApi } from "../../api";
import Loading from "../Loading/Loading";
function Detail(props) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState(null);
  const [isMovie, setIsMovie] = useState(
    props.location.pathname.includes("/movie/")
  );

  const parsedId = parseInt(props.match.params.id);
  console.log(isMovie);
  console.log(parsedId);
  // console.log(id);
  const getData = async () => {
    try {
      if (isMovie) {
        const results = await MoivesApi.movieDetail(parsedId);
        setResults(results);
      } else {
        const results = await tvApi.showDetail(parsedId);
        setResults(results);
      }
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(results?.data.backdrop_path);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <DetailContanier>
          <Backdrop
            bgImage={`https://image.tmdb.org/t/p/original${results.data.backdrop_path}`}
          />
          <Content>
            <Cover
              bgImage={
                results.data.poster_path
                  ? `https://image.tmdb.org/t/p/original${results.data.poster_path}`
                  : require("../../assets/noPosterSmall.png")
              }
            />
            <Data>
              <TitleContainer>
                <Title>
                  {results.data.original_title
                    ? results.data.original_title
                    : results.data.original_name}
                </Title>

                <a
                  href={
                    results.data.imdb_id
                      ? `//www.imdb.com/title/${results.data.imdb_id}/`
                      : `${results.data.homepage}`
                  }
                  target="blank"
                >
                  <Imdb>{results.data.imdb_id ? "IMDB" : "HomePage"}</Imdb>
                </a>
              </TitleContainer>
              <ItemContainer>
                <Item>
                  {results.data.release_date
                    ? results.data.release_date.substring(0, 4)
                    : results.data.first_air_date.substring(0, 4)}
                </Item>
                <Divider>•</Divider>
                <Item>
                  {results.data.runtime !== null
                    ? results.data.runtime
                    : results.data.episode_run_time[0]}{" "}
                  min
                </Item>
                <Divider>•</Divider>
                <Item>
                  {results.data.genres &&
                    results.data.genres.map((genre, index) =>
                      index === results.data.genres.length - 1
                        ? genre.name
                        : `${genre.name} /`
                    )}
                </Item>
                <Divider>•</Divider>
                <Item>
                  <span role="img" aria-label="rating">
                    ⭐️
                  </span>{" "}
                  {results.data.vote_average}/10
                </Item>
              </ItemContainer>
              <Overview> {results.data.overview} </Overview>
            </Data>
          </Content>
        </DetailContanier>
      )}
    </>
  );
}

export default withRouter(Detail);

const DetailContanier = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  padding: 80px;
  box-sizing: border-box;
`;
const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(1.5px);
  opacity: 0.5;
  z-index: 0;
`;
const Content = styled.div`
  margin-top: 50px;
  border: 5px solid red;
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
  }
`;
const Cover = styled.div`
  width: 40%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;
const Data = styled.div`
  width: 60%;
  margin-left: 20px;
  @media only screen and (max-width: 600px) {
    margin-top: 50px;
    width: 100%;
    margin-left: 0px;
  }
`;
const TitleContainer = styled.div`
  display: flex;
`;
const Title = styled.h3`
  font-size: 32px;
`;
const Imdb = styled.button`
  background-color: rgb(245, 197, 24);
  color: rgb(0, 0, 0);
  font-size: 15px;
  font-weight: 700;
  margin-top: 11px;
  margin-left: 10px;
  padding: 0 10px;
  border-radius: 25px;
  border: none;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;
const ItemContainer = styled.div`
  margin: 20px 0;
`;
const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;
const Overview = styled.p`
  font-size: 13px;
  opacity: 0.9;
  line-height: 1.5;
  width: 50%;
  margin-bottom: 20px;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;
