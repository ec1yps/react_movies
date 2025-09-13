import React from 'react';
import Preloader from '../components/Preloader.js';
import MovieList from '../components/MovieList.js';
import Search from '../components/Search.js';
import './Main.css';

class Main extends React.Component {
    state = { movies: [], loading: false, type: "all", count: 0 }
    constructor(props) {
        super(props);
        this.setState({ loading: true })
        fetch(`https://omdbapi.com/?apikey=94dbc433&s=Matrix`)
            .then(response => response.json())
            .then
            (
                data => {
                    if (data.Response === "True") this.setState({ movies: data.Search, loading: false, count: data.totalResults });
                    else this.setState({ movies: [], loading: false, count: data.totalResults });
                }
            )
        console.log("\n----- Constructor -----\n");
        console.log(this.state);
    }
    componentDidMount() {
        this.setState({ loading: true })
        fetch(`https://omdbapi.com/?apikey=94dbc433&s=Matrix`)
            .then(response => response.json())
            .then
            (
                data => {
                    if (data.Response === "True") this.setState({ movies: data.Search, loading: false, count: data.totalResults });
                    else this.setState({ movies: [], loading: false, count: data.totalResults });
                }
            )
        console.log("\n----- componentDidMount -----\n");
        console.log(this.state);
    }
    searchMovie = (str, type = 'all', page) => {
        this.setState({ loading: true })
        fetch(`https://omdbapi.com/?apikey=94dbc433&s=${str.trim()}${type !== 'all' ? `&type=${type}` : ''}${`&page=${page}`}`)
            .then(response => response.json())
            .then
            (
                data => {
                    if (data.Response === "True") this.setState({ movies: data.Search, loading: false, count: data.totalResults });
                    else this.setState({ movies: [], loading: false, count: data.totalResults });
                }
            )
    }
    render() {
        console.log("\n----- Main render -----\n");
        console.log(this.state);
        return (
            <div className='main'>
                <div className='wrap'>
                    <Search searchMovie={this.searchMovie} totalCount={this.state.count} />
                    {
                        !this.state.loading && this.state.movies.length ? <MovieList movies={this.state.movies} /> : <Preloader />
                    }
                </div>
            </div>
        )
    }
}
export default Main;