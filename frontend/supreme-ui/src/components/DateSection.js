import React from 'react';
import DatePicker from "react-datepicker";
import {Button, Container, Row, Col} from 'react-bootstrap';
export class DateSection extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            startDate: '8/2/1791',
            endDate: '8/2/1800',
        }
    }
    render() {

        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            Start Date: <DatePicker selected={new Date(this.state.startDate)} onChange={this.handleStartChange}/>
                        </Col>
                        <Col>
                            End Date: <DatePicker selected={new Date(this.state.endDate)} onChange={this.handleEndChange}/>
                        </Col>
                        <Col>
                            <Button variant="primary" onClick={() => this.props.onClick(this.state)}>Change Dates</Button>
                        </Col>
                    </Row>
                </Container>
                
                
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