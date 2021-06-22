import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MoivesApi } from "../../api";
import Loading from "../Loading/Loading";
import Section from "../Section/Section";
import Poster from "../Poster/Poster";

function Home() {
  const [netFlix, setNetFlix] = useState([]);
  const [nowPlaying, setNowplaying] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const netflixOriginals = await MoivesApi.netflixOriginals();
      const nowPlaying = await MoivesApi.nowPlaying();
      const upComing = await MoivesApi.upComing();
      const popular = await MoivesApi.popular();
      setNetFlix(netflixOriginals);
      setNowplaying(nowPlaying);
      setUpComing(upComing);
      setPopular(popular);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <HomeContainer>
          {netFlix && netFlix.data.results.length > 0 && (
            <Section title="NETFLEX ORIGINALS">
              {netFlix.data.results.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  // year={movie?.release_date.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {nowPlaying && nowPlaying.data.results.length > 0 && (
            <Section title="Now Playing">
              {nowPlaying.data.results.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie?.release_date?.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {upComing && upComing.data.results.length > 0 && (
            <Section title="Upcoming Movies">
              {upComing.data.results.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie?.release_date?.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {popular && popular.data.results.length > 0 && (
            <Section title="Popular Movies">
              {popular.data.results.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date?.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
        </HomeContainer>
      )}
    </>
  );
}

export default Home;
const HomeContainer = styled.div`
  padding: 20px;
  background-color: rgb(20, 20, 20);
`;
