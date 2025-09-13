import React from 'react';
import './Search.css';

class Search extends React.Component {
    state =
        {
            search: "",
            type: "all",
            page: 1
        }
    prevPage = () => {
        this.setState
            (
                () => (this.state.page > 1 ? { page: this.state.page - 1 } : { page: 1 }),
                () => { this.props.searchMovie(this.state.search, this.state.type, this.state.page) }
            )
    }
    nextPage = () => {
        this.setState
            (
                () => ({ page: this.state.page + 1 }),
                () => { this.props.searchMovie(this.state.search, this.state.type, this.state.page) }
            )
    }
    handleKey = (event) => {
        if (event.key === 'Enter') this.props.searchMovie(this.state.search, this.state.type);
    }
    handlerFilter = (event) => {
        this.setState
            (
                () => ({ type: event.target.dataset.type }),
                () => { this.props.searchMovie(this.state.search, this.state.type); }
            );
    }
    setPage = (num) => {
        this.setState
            (
                () => ({ page: num }),
                () => { this.props.searchMovie(this.state.search, this.state.type, this.state.page); }
            );
        console.log(`setPage num:${num}`);
        console.log(`setPage page:${this.state.page}`);
    }

    render() {
        console.log("\n----- Search render -----\n")
        let limit = 10;
        let totalPages = Math.ceil(this.props.totalCount / limit);
        const lastIndex = totalPages <= 10 ? totalPages + 1 : this.state.page + limit;
        const firstIndex = totalPages <= 10 ? lastIndex - limit + lastIndex + 1 : lastIndex - limit;
        console.log(`limit:${limit}`);
        console.log(`totalCount:${this.props.totalCount}`);
        console.log(`totalPages:${totalPages}`);
        console.log(`lastIndex::${lastIndex}`);
        console.log(`firstIndex::${firstIndex}`);
        let num = [];
        for (let i = 0; i < totalPages + 1; i++)num.push(i);
        console.log(num);
        return (
            <>
                <div className='search'>
                    <input
                        type="search"
                        placeholder='Введите название фильма'
                        value={this.state.search}
                        onChange={(e) => this.setState({ search: e.target.value })}
                        onKeyDown={this.handleKey}
                    />
                    <button className='btn' onClick={() => this.props.searchMovie(this.state.search, this.state.type)}>
                        Поиск
                    </button>
                </div>
                <div className='radio'>
                    <div><input type="radio" name="type" data-type="all" checked={this.state.type === 'all'} onChange={this.handlerFilter} /><span>All</span></div>
                    <div><input type="radio" name="type" data-type="movie" checked={this.state.type === 'movie'} onChange={this.handlerFilter} /><span>Movies</span></div>
                    <div><input type="radio" name="type" data-type="series" checked={this.state.type === 'series'} onChange={this.handlerFilter} /><span>Series</span></div>
                    <div><input type="radio" name="type" data-type="game" checked={this.state.type === 'game'} onChange={this.handlerFilter} /><span>Games</span></div>
                </div>
                <div className='navigation'>
                    <button className='btn' onClick={this.prevPage}>Previous</button>
                    <div>
                        {
                            num
                                .slice(firstIndex, lastIndex)
                                .map
                                (
                                    (el, index) =>
                                    (
                                        <button className='btn'
                                            key={index}
                                            onClick={() => (this.setPage(el))}
                                            style={{ background: this.state.page !== el ? "grey" : "" }}>
                                            {el}
                                        </button>
                                    )
                                )
                        }
                    </div>
                    <button className='btn' onClick={this.nextPage}>Next</button>
                </div>
            </>
        )
    }
}
export default Search;