import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
class BerryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined,
            loading: false,
            allBerry: 0,
            currentPage: 0

        }
    };
    componentWillReceiveProps(nextProps) {
        const oldParams = this.props.match.params;
        const newParams = nextProps.match.params;

        const oldPage = oldParams.page;
        const newPage = newParams.page;

        if (oldPage !== newPage) {
            this.getBerry(newPage);
        }
    }
    async getBerry(page) {
        try {
            this.setState(() => {
                return {
                   loading: true
                }
             })

        
            var response = {};

            if (page === 0)
                response = await axios.get("https://pokeapi.co/api/v2/berry/?limit=20");
            else {

                this.setState({ currentPage: parseInt(page) });

                response = await axios.get('https://pokeapi.co/api/v2/berry/?limit=20&offset=' + parseInt(page) * 20);
            console.log(response.data);
            }

            this.setState({
                data: response.data,
                // loading: false
            });
        } catch (e) {
            console.log(e)
            this.setState({ loading: false });
        }
    }
    async componentDidMount() {
        var response = await axios.get("https://pokeapi.co/api/v2/berry/");
        await this.setState({ allBerry: response.data.count });
        this.getBerry(this.props.match.params.page);
    }
    onSubmit(e) {
        e.preventDefault()
    }
    render() {
        let body = null;
        let li = null;
        let prevPage = null;
        let nextPage = null;
        let limit = Math.ceil(this.state.allBerry / 20);
        if (this.state.data) {
            console.log(this.state.data.results);
            li = this.state.data && this.state.data.results.map(berry => (
                <li key={berry.url}>
                    <Link to={`/berries/${berry.url.split('/')[6]}`}>{berry.name}</Link>
                </li>

            ));
            if (this.state.currentPage !== 0 && (this.state.currentPage - 2) >= 0) {
                prevPage = <div><button className ="btn">
                    <Link to={`/berries/page/${this.state.currentPage - 1}`}>Previous</Link>
                </button>
                </div>
            }
            else if (this.state.currentPage !== 0 && (this.state.currentPage - 1) >= 0) {
                prevPage = <div><button className ="btn">
                    <Link to={`/berries/page/${this.state.currentPage - 1}`}>Previous</Link>
                </button>
                </div>
            }
            else prevPage = null;

    
             if (this.state.currentPage !== 0 && (this.state.currentPage + 2) <= limit) {
                nextPage = <div>
                    <button className ="btn">
                        <Link to={`/berries/page/${this.state.currentPage + 1}`}>Next</Link>
                    </button>
                </div>
            }
            else if (this.state.currentPage !== 0 && (this.state.currentPage + 1) <= limit) {
                nextPage = <div>
                    <button className ="btn">
                        <Link to={`/berries/page/${this.state.currentPage + 1}`}>Next</Link>
                    </button>
                </div>
            }
            else nextPage = <button className ="btn">
                <Link to={`/berries/page/${this.state.currentPage + 1}`}>Next</Link>
            </button>;
            console.log(limit);
            body = (
                <div>
                    <ul className="list-unstyled">{li}</ul>
                    <div className="pagination">
                        {prevPage}
                        
                        {nextPage}
                    </div>
                </div>
            );
            if(this.state.currentPage < 0 || this.state.currentPage >= limit ){
                body = (<div>
                    <h1> 404 - Berry List not found</h1>
                 </div>
                 )
            }
        }
        else {
            li = null;
            body = null;
        }
        return body;
    }
}
export default BerryList;