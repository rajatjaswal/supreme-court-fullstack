import React from 'react';
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap'

class Home extends React.Component{
    render(){
        return (
            <div className="Home">
                <Card style={{marginTop: "20px"}} className="text-center">
                    <Card.Body>
                        <Card.Title>Supreme Court Visualizations</Card.Title>
                        <Card.Text>
                        This exercise visualizes data about the United States Supreme Court in different ways
                        </Card.Text>
                        <Card.Text>
                        Below are the different types of technologies used for Implementing the exercise
                        </Card.Text>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>
                                <strong>Backend - </strong> Node.js
                            </ListGroupItem>
                            <ListGroupItem>
                                <strong>Frontend - </strong> ReactJS
                            </ListGroupItem>
                            <ListGroupItem>
                                <strong>Visualization - </strong> D3.js
                            </ListGroupItem>
                        </ListGroup>
                        <Card.Link href="/visualization">View Visualization</Card.Link>
                    </Card.Body>
                </Card>
            </div>
        );
    }
  
}

export default Home;