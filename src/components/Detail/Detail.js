import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { MoivesApi, tvApi } from "../../api";
import Loading from "../Loading/Loading";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
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

              {/* <VideoTitle>Trailer</VideoTitle> */}

              <Video>
                <Carousel autoPlay>
                  {results.data.videos.results.length > 0 ? (
                    results.data.videos.results.map((Video, index) => (
                      <div>
                        <iframe
                          key={index}
                          width="100%"
                          height="400px"
                          src={`https://www.youtube.com/embed/${Video.key}`}
                          allowFullScreen
                          frameborder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        />
                      </div>
                    ))
                  ) : (
                    <VideoError>No Trailer sorry :( </VideoError>
                  )}
                </Carousel>
              </Video>
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
  filter: blur(2px);
  opacity: 0.8;
  z-index: 0;
`;
const Content = styled.div`
  background: #111;
  opacity: 0.95;
  margin-top: 50px;
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
    padding: 10px;
  }
`;
const Cover = styled.div`
  width: 45%;
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
  width: 55%;
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
  @media only screen and (max-width: 600px) {
    font-size: 20px;
  }
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
const Item = styled.span`
  @media only screen and (max-width: 600px) {
    font-size: 10px;
  }
`;

const Divider = styled.span`
  margin: 0 5px;
`;
const Overview = styled.p`
  font-size: 13px;
  opacity: 0.9;
  line-height: 1.5;
  width: 80%;
  margin-bottom: 20px;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;
const VideoTitle = styled.h5`
  font-size: 20px;
`;
const Video = styled.div`
  margin-top: 20px;
  max-width: 600px;
`;
const VideoError = styled.h3`
  font-size: 30px;
`;
