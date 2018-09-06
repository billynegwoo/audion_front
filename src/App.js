import React, {Component} from 'react';
import './App.css';
import {Row, Col, Image} from 'react-bootstrap';


const DEFAULT_STATE = {albums: []};

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {...DEFAULT_STATE};
        this.httpGetAsync('https://jsonplaceholder.typicode.com/photos')
            .then(res => {
                this.setState({
                    albums: res.slice(0, 100),
                })
            })
            .catch(err => console.log(err))
    }

    httpGetAsync = (url) => {
        return new Promise(resolve => {
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                    resolve(JSON.parse(xmlHttp.responseText));
                }
            };
            xmlHttp.open("GET", url, true);
            xmlHttp.send(null);
        })
    };

    displayAlbums = () => {
        {
            return(<Row>
                        {this.state.albums.map((album) => {
                            return (<Col md={4} xs={4} sm={4}>
                                        <div className="text-center">
                                            <a href={album.url}>{album.url}</a>
                                            <br/>
                                            <Image src={album.thumbnailUrl} thumbnail responsive/>
                                        </div>
                                    </Col>)
                        })}
                    </Row>)
        }
    };

    render() {
        return (
            <div className="container">
                {this.displayAlbums()}
            </div>
        );
    }
}

export default App;
