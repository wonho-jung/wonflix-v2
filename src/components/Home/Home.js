import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MoivesApi } from "../../api";
import Loading from "../Loading/Loading";
import HomeRow from "./HomeRow";

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
          <HomeRow title="NETFLEX ORIGINALS" netflixOriginals={netFlix} />
          <HomeRow title="Now Playing" nowPlaying={nowPlaying} />
          <HomeRow title="Upcoming Movies" upComing={upComing} />
          <HomeRow title="Popular Movies" popular={popular} />
        </HomeContainer>
      )}
    </>
  );
}

export default Home;
const HomeContainer = styled.div``;
