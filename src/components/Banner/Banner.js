import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import { MoivesApi, tvApi } from "../../api";
import Loading from "../Loading/Loading";

function Banner(props) {
  const [banner, setBanner] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(props);
  const getBanner = async () => {
    if (props.location.pathname === "/") {
      try {
        const netflixOriginals = await MoivesApi.netflixOriginals();
        setBanner(
          netflixOriginals.data.results[
            Math.floor(Math.random() * netflixOriginals.data.results.length - 1)
          ]
        );
      } catch (e) {
        alert(e.message);
      } finally {
        setLoading(false);
        console.log("movie");
      }
    } else {
      try {
        const netflixOriginals = await tvApi.netflixOriginals();
        setBanner(
          netflixOriginals.data.results[
            Math.floor(Math.random() * netflixOriginals.data.results.length - 1)
          ]
        );
      } catch (e) {
        alert(e.message);
      } finally {
        setLoading(false);
        console.log("tv");
      }
    }
  };
  useEffect(() => {
    getBanner();
  }, [props.location.pathname]);
  console.log(banner);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BannerContainer
          style={{
            backgroundImage: banner
              ? `url("https://image.tmdb.org/t/p/original/${banner?.backdrop_path}")`
              : `url("url("https://image.tmdb.org/t/p/original/srYya1ZlI97Au4jUYAktDe3avyA.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <BannerContent>
            <h1 className="banner__title">
              {" "}
              {banner?.title || banner?.name || banner?.original_name}
            </h1>
            <BannerBtn>
              <button>Play</button>
              <button>MyList</button>
            </BannerBtn>
            <h1 className="banner__description">
              {truncate(banner?.overview, 150)}
            </h1>
          </BannerContent>
          <BannerFadeBottom />
        </BannerContainer>
      )}
    </>
  );
}

export default withRouter(Banner);

const BannerContainer = styled.div`
  color: white;
  object-fit: contain;
  height: 448px;
  margin-top: 80px;
`;
const BannerContent = styled.div`
  margin-left: 30px;
  padding-top: 140px;
  height: 190px;
  .banner__title {
    font-size: 3rem;
    font-weight: 800;
    padding-bottom: 0.3rem;
  }
  .banner__description {
    width: 45rem;
    line-height: 1.3;
    padding-top: 1rem;
    font-size: 0.9rem;
    max-width: 360px;
    height: 80px;
  }
`;
const BannerBtn = styled.div`
  button {
    cursor: pointer;
    color: #fff;
    outline: none;
    border: none;
    font-weight: 700;
    border-radius: 0.2vw;
    padding-left: 2rem;
    padding-right: 2rem;
    margin-right: 1rem;
    padding-top: 0.5rem;
    background-color: rgba(51, 51, 51, 0.5);
    padding-bottom: 0.5rem;
    :hover {
      color: #000;
      background-color: #e6e6e6;
      transition: all 0.2s;
    }
  }
`;

const BannerFadeBottom = styled.div`
  height: 7.4rem;
  background-image: linear-gradient(
    180deg,
    transparent,
    rgba(37, 37, 37, 0.61),
    #111
  );
`;
