import React from 'react';
import { ScatterMain } from './ScatterMain';
import { CascadingMain } from './CascadingMain';
import Card from 'react-bootstrap/Card';

class Visualizations extends React.Component{
    render(){
        return (
            <div className="Visualizations">
                <Card>
                    <Card.Header as="h5">Scatter Plot</Card.Header>
                    <Card.Body>
                        <ScatterMain />
                    </Card.Body>
                </Card>
                <Card style={{marginTop: "20px"}}>
                    <Card.Header as="h5">Cascading Timeline</Card.Header>
                    <Card.Body>
                        <CascadingMain />
                    </Card.Body>
                </Card>
            </div>
        );
    }
  
}

export default Visualizations;