import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./Detail.module.css";

function Detail() {
  const {id} = useParams(); //id 찾기
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  
  const getMovie = async () => {
    const json = await 
    ( await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
    console.log(json.data.movie);
    setMovie(json.data.movie);
    setLoading(false);
  }
  useEffect(() => {
    getMovie();
    
  }, []);

  return (
    <div>
    {loading ? (
      <div className={styles.loader}>
        <span>Loading...</span>
      </div>
    ) : (
      <div className={styles.box}>
      <img alt={movie.title} className={styles.backimg} src={movie.medium_cover_image} />
      <div className={styles.ctn}>
        <img alt={movie.title} className={styles.movieimg} src={movie.medium_cover_image} />

        <div className={styles.sub}>
        <h1>{movie.title} ({movie.year})</h1><ul>
        <li>Rating: ★ {movie.rating}</li>
        <li>Runtime: {movie.runtime}</li>
        <li>LikeCount: ♥{movie.like_count}</li>
        <li>Genres:
          <ul>{movie.genres}</ul></li>
        </ul>
        </div>
      </div>
    </div>

        )}
    </div>
        
        
  );
    
}

export default Detail;