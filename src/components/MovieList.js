import Movie from './Movie.js';
import './MovieList.css';

function MovieList(props) {
    const { movies = [] } = props;
    console.log(movies);

    return (
        <div className='movies'>
            {
                movies.map
                    (
                        movie => {
                            return <Movie key={movie.imdbID} {...movie} />
                        }
                    )
            }
        </div>
    )
}
export default MovieList;