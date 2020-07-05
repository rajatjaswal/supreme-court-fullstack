import React from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap'

class SummaryStats extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            numJustices: 0,
            numCases: 0,
            averageDuration: 0,
            mostParty:"",
            mostLawSchool:""
        };
    }

    componentDidMount(){
        fetch("http://localhost:3500/cases/len").then(res => res.json()).then(res => this.setState({numCases: res.length}))
        fetch("http://localhost:3500/justice").then(res => res.json()).then(res => {
            const justices = Object.keys(res);
            let avg = 0;
            const party={};
            const lawSchool = {};
            justices.forEach(j => {
                avg+=res[j].duration === undefined ? 0: parseInt(res[j].duration);
                if(res[j].justice_info !==undefined){
                    if(party[res[j].justice_info.nominating_party] === undefined){
                        party[res[j].justice_info.nominating_party] = 0;
                    }
                    party[res[j].justice_info.nominating_party]++;
                }

                if(res[j].justice_info !==undefined){
                    if(lawSchool[res[j].justice_info.law_school] === undefined){
                        lawSchool[res[j].justice_info.law_school] = 0;
                    }
                    lawSchool[res[j].justice_info.law_school]++;
                }

            });

            const maxParty = [...Object.entries(party)].reduce((a, e ) => e[1] > a[1] ? e : a);
            const maxLaw = [...Object.entries(lawSchool)].reduce((a, e ) => e[1] > a[1] ? e : a);
            this.setState(
                {
                    numJustices: justices.length, 
                    averageDuration: parseInt(avg/justices.length),
                    mostParty: maxParty[0],
                    mostLawSchool: maxLaw[0]
                }
            );
        })
    }

    render(){
        return (
            <div className="SummaryStats">
                <Container>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <h2><strong>{this.state.numJustices}</strong></h2>
                                    <p>Number of Justices</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <h2><strong>{this.state.numCases}</strong></h2>
                                    <p>Number of Cases</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <h2><strong>{this.state.averageDuration}</strong></h2>
                                    <p>Average Duration of Justice Term</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <h4><strong>{this.state.mostParty}</strong></h4>
                                    <p>Most Represented Nominated Party</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <h4><strong>{this.state.mostLawSchool}</strong></h4>
                                    <p>Most Represented Law School</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
  
}

export default SummaryStats;