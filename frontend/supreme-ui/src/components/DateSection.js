import React from 'react';
import DatePicker from "react-datepicker";
import {Button} from 'react-bootstrap';
export class DateSection extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            startDate: '8/2/1791',
            endDate: '8/2/1810',
        }
    }
    render() {

        return(
            <div>
                <Button
                variant="primary"
                onClick={() => this.props.onClick(this.state)}
                >Change Dates</Button>
                <DatePicker selected={new Date(this.state.startDate)} onChange={this.handleStartChange}/>
                <DatePicker selected={new Date(this.state.endDate)} onChange={this.handleEndChange}/>
            </div>
        )
    }

    handleStartChange = date => {
        this.setState({
            startDate: new Date(date).toLocaleDateString()
        });
    };

    handleEndChange = date => {
        this.setState({
            endDate: new Date(date).toLocaleDateString()
        });
    }
}