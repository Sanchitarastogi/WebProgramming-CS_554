import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
class MachineList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined,
            loading: false,
            allMachine: 0,
            currentPage: 0

        }
    };
    componentWillReceiveProps(nextProps) {
        const oldParams = this.props.match.params;
        const newParams = nextProps.match.params;

        const oldPage = oldParams.page;
        const newPage = newParams.page;

        if (oldPage !== newPage) {
            this.getMachine(newPage);
        }
    }
    async getMachine(page) {
        try {
            this.setState(() => {
                return {
                   loading: true
                }
             })

        
            var response = {};

            if (page === 0)
                response = await axios.get("https://pokeapi.co/api/v2/machine/?limit=20");
            else {

                this.setState({ currentPage: parseInt(page) });

                response = await axios.get('https://pokeapi.co/api/v2/machine/?limit=20&offset=' + parseInt(page) * 20);
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
        var response = await axios.get("https://pokeapi.co/api/v2/machine/");
        await this.setState({ allMachine: response.data.count });
        this.getMachine(this.props.match.params.page);
    }
    onSubmit(e) {
        e.preventDefault()
    }
    render() {
        let body = null;
        let li = null;
        let prevPage = null;
        let nextPage = null;
        let limit = Math.ceil(this.state.allMachine / 20);
        if (this.state.data) {
            console.log(this.state.data.results);
            li = this.state.data && this.state.data.results.map(machine => (
                <li key={machine.url}>
                    <Link to={`/machines/${machine.url.split('/')[6]}`}>{machine.url.split('/')[6]}</Link>
                </li>

            ));
            if (this.state.currentPage !== 0 && (this.state.currentPage - 2) >= 0) {
                prevPage = <div><button className ="btn">
                    <Link to={`/machines/page/${this.state.currentPage - 1}`}>Previous</Link>
                </button>
                </div>
            }
            else if (this.state.currentPage !== 0 && (this.state.currentPage - 1) >= 0) {
                prevPage = <div><button className ="btn">
                    <Link to={`/machines/page/${this.state.currentPage - 1}`}>Previous</Link>
                </button>
                </div>
            }
            else prevPage = null;

    
             if (this.state.currentPage !== 0 && (this.state.currentPage + 2) <= limit) {
                nextPage = <div>
                    <button className ="btn">
                        <Link to={`/machines/page/${this.state.currentPage + 1}`}>Next</Link>
                    </button>
                </div>
            }
            else if (this.state.currentPage !== 0 && (this.state.currentPage + 1) <= limit) {
                nextPage = <div>
                    <button className ="btn">
                        <Link to={`/machines/page/${this.state.currentPage + 1}`}>Next</Link>
                    </button>
                </div>
            }
            else nextPage = <button className ="btn">
                <Link to={`/machines/page/${this.state.currentPage + 1}`}>Next</Link>
            </button>;
            console.log(limit);
            body = (
                <div>
                    <ul className="list-unstyled">{li}</ul>
                    <div class="pagination">
                        {prevPage}
                        
                        {nextPage}
                    </div>
                </div>
            );
            if(this.state.currentPage < 0 || this.state.currentPage >= limit ){
                body = (<div>
                    <h1> 404 - Machine List not found</h1>
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
export default MachineList;