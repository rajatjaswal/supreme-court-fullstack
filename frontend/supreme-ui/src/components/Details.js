import React from 'react';
import {Table} from 'react-bootstrap';
export class Details extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
    }
    componentDidMount(){
        fetch("http://localhost:3500/justice").then(res => res.json()).then((res) => {

            const justices = Object.entries(res);
            const filtered = justices.filter((j) => Object.keys(j[1]).length >0);
            this.setState({data: filtered})
        })
    }
    render() {
        return(
            <Table striped bordered hover size="sm" variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Name2</th>
                        <th>Cases</th>
                        <th>Duration</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Nominating Party</th>
                        <th>Military Service</th>
                        <th>Law School</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map((j, idx) => {
                        return (<tr key={j[0]}>
                            <td>{idx+1}</td>
                            <td>{j[1].justice_info.name}</td>
                            <td>{j[0]}</td>
                            <td>{j[1].cases}</td>
                            <td>{j[1].duration}</td>
                            <td>{new Date(j[1].justice_info.start_date).toLocaleDateString()}</td>
                            <td>{new Date(j[1].justice_info.finish_date).toLocaleDateString()}</td>
                            <td>{j[1].justice_info.nominating_party}</td>
                            <td>{j[1].justice_info.military_service}</td>
                            <td>{j[1].justice_info.law_school}</td>
                        </tr>)
                    })}
                </tbody>
            </Table>
        )
    }
}