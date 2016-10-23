import React from 'react'
import { connect } from 'react-redux'
import Messages from './Messages'
import {
  Button,
  Panel,
  ListGroup,
  Col,
  Image,
  Row,
  ListGroupItem,
  FormGroup,
  ControlLabel,
  FormControl,
  Jumbotron
} from 'react-bootstrap';

import { browserHistory } from 'react-router'


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.nextScreen = this.nextScreen.bind(this);
    this.prevScreen = this.prevScreen.bind(this);
    this.updateGiftUrl = this.updateGiftUrl.bind(this);
  }

  updateGiftUrl(e) {
    this.props.dispatch({type: 'UPDATE_GIFT_URL', payload: e.target.value})
  }

  nextScreen() {
    this.props.dispatch({type: 'GAME_START', payload: true})
  }

  prevScreen() {
    this.props.dispatch({type: 'GAME_START', payload: false})
  }

  render4() {
    return (
      <div>
        <div className='container-fluid' onClick={this.nextScreen}>
          SoMETHING
        </div>
      </div>
    );
  }

  render3() {
    return (
      <div>
        <div className='container-fluid' onClick={this.nextScreen}>
          <Jumbotron className='face_name'>
            <h1>Game Start</h1>
          </Jumbotron>
          <Panel>
            <ListGroup fill className='face_name'>
              <h1 style={{paddingBottom: '30px'}} >Mafia Purchases</h1>
              <Row>
              <Col mdOffset={2} md={2}>
                <Panel>
                  <ListGroup fill>
                    <ListGroupItem>
                      <Image responsive src={'/images/chinese-woman-player.png'} />
                    </ListGroupItem>
                    <ListGroupItem className='face_name'>Basket Ball</ListGroupItem>
                  </ListGroup>
                </Panel>
              </Col>
              <Col mdOffset={4} md={2}>
                <Panel>
                  <ListGroup fill>
                    <ListGroupItem>
                      <Image responsive src={'/images/chinese-woman-player.png'} />
                    </ListGroupItem>
                    <ListGroupItem className='face_name'>Milk Bottle</ListGroupItem>
                  </ListGroup>
                </Panel>
              </Col>
              </Row>
            </ListGroup>
          </Panel>
        </div>
      </div>
    );
  }

  render2() {
    return (
      <div className='container-fluid'>
        <Row>
          <Col mdOffset={1} md={2}>
            <h2>Total Pot: ${this.props.totalPot}</h2>
          </Col>
          <Col mdOffset={6} md={2}>
            <h2>Your Max: ${this.props.playerPot}</h2>
          </Col>
          <Col md={12}>
            <h2>Select your gift</h2>
            <Row>
              <Col md={4}>
                <Panel>
                  <ListGroup fill>
                    <ListGroupItem>
                      <Image responsive src={'/images/redhead-guy-player.png'} />
                    </ListGroupItem>
                  </ListGroup>
                </Panel>
              </Col>
              <Col md={2} className='face_name'>
               
              </Col>
            </Row>
             <Panel>
              <FormGroup>
                <Col md={12}>
                <ControlLabel>Put your Amazon item link here</ControlLabel>
                </Col>
                <Col md={9}>
                <FormControl
                  type="text"
                  value={this.props.giftUrlLink}
                  placeholder="Enter text"
                  onChange={this.updateGiftUrl}
                />
                </Col>
                <Col md={3}>
                <Button bsStyle='success' style={{width: '100%'}} onClick={this.nextScreen}>
                  Ok
                </Button>
                </Col>
              </FormGroup>
             </Panel>
          </Col>
        </Row>
      </div>
    );
  }

  render1() {
    return (
      <div className='container-fluid'>
        <Row>
          <Col md={2} /> {/* HACKY FORMATING */}
          <Col md={2}>
            <Panel>
              <ListGroup fill>
                <ListGroupItem>
                  <Image responsive src={'/images/chinese-woman-player.png'} />
                </ListGroupItem>
                <ListGroupItem className='face_name'>Ken Lee</ListGroupItem>
              </ListGroup>
            </Panel>
          </Col>
          <Col md={2}>
            <Panel>
              <ListGroup fill>
                <ListGroupItem>
                  <Image responsive src={'/images/geek-guy-player.png'} />
                </ListGroupItem>
                <ListGroupItem className='face_name'>Linh</ListGroupItem>
              </ListGroup>
            </Panel>
          </Col>
          <Col md={2}>
            <Panel>
              <ListGroup fill>
                <ListGroupItem>
                  <Image responsive src={'/images/indian-girl-player.png'} />
                </ListGroupItem>
                <ListGroupItem className='face_name'>Jing Yu</ListGroupItem>
              </ListGroup>
            </Panel>
          </Col>
          <Col md={2}>
            <Panel>
              <ListGroup fill>
                <ListGroupItem>
                  <Image responsive src={'/images/rapper-guy-player.png'} />
                </ListGroupItem>
                <ListGroupItem className='face_name'>Ken Hua</ListGroupItem>
              </ListGroup>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col mdOffset={4} md={4}>
            <Panel>
              <ListGroup fill>
                <ListGroupItem>
                  <Image responsive src={'/images/redhead-guy-player.png'} />
                </ListGroupItem>
                <ListGroupItem className='face_name'>You</ListGroupItem>
                <ListGroupItem className='face_name'>
                  <Button bsStyle='success' style={{width: '80%'}} onClick={this.nextScreen} >
                Join
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Panel>
          </Col>
        </Row>
      </div>
    ); 
  }
  render () {
    const s = [this.render1, this.render2, this.render3, this.render4];
    console.log(this.props.gameStart);
    return s[this.props.gameStart].call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    gameStart: state.home.gameStart,
    totalPot: state.home.totalPot,
    playerPot: state.home.playerPot,
    giftUrlLink: state.home.giftUrlLink,
  }
}

export default connect(mapStateToProps)(Home)
