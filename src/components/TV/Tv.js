import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { tvApi } from "../../api";
import Loading from "../Loading/Loading";
import Section from "../Section/Section";
import Poster from "../Poster/Poster";

function Tv() {
  const [netFlix, setNetFlix] = useState([]);
  const [nowPlaying, setNowplaying] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    try {
      const netflixOriginals = await tvApi.netflixOriginals();
      const nowPlaying = await tvApi.topRated();
      const upComing = await tvApi.popular();
      const popular = await tvApi.airingToday();

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
  console.log(nowPlaying.data?.results);
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
              {netFlix.data.results.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={show.first_air_date.substring(0, 4)}
                />
              ))}
            </Section>
          )}
          {nowPlaying && nowPlaying.data.results.length > 0 && (
            <Section title="Top Rated Shows">
              {nowPlaying.data.results.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={show.first_air_date.substring(0, 4)}
                />
              ))}
            </Section>
          )}
          {upComing && upComing.data.results.length > 0 && (
            <Section title="Popular Shows">
              {upComing.data.results.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={show.first_air_date.substring(0, 4)}
                />
              ))}
            </Section>
          )}
          {popular && popular.data.results.length > 0 && (
            <Section title="Airing Today">
              {popular.data.results.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={show.first_air_date.substring(0, 4)}
                />
              ))}
            </Section>
          )}
        </HomeContainer>
      )}
    </>
  );
}

export default Tv;
const HomeContainer = styled.div`
  padding: 20px;
  background-color: rgb(20, 20, 20);
`;
