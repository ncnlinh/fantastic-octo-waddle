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
} from 'react-bootstrap'

import { browserHistory } from 'react-router'


const player1Name = 'Claire';
const player1Image = '/images/chinese-woman-player.png';
const player2Name = 'Hardy';
const player2Image = '/images/geek-guy-player.png';
const player3Name = 'Monty';
const player3Image = '/images/indian-girl-player.png';
const player4Name = 'Carlos';
const player4Image = '/images/rapper-guy-player.png';
const player5Name = 'You';
const player5Image = '/images/redhead-guy-player.png';
const basketballImage = '/images/basketball.jpg';
const milkBottleImage = '/images/milk-bottle.jpg';

const ThreeHalfShitHackIdontWannaTalkAbout = (props) => (
  <Col md={3}>
    <Row>
      <Col mdOffset={2} md={8}>
        {props.children}
      </Col>
    </Row>
  </Col>
)

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.nextScreen = this.nextScreen.bind(this);
    this.prevScreen = this.prevScreen.bind(this);
    this.updateGiftUrl = this.updateGiftUrl.bind(this);
    this.updateSelection = this.updateSelection.bind(this);
    this.setDonateAmount = this.setDonateAmount.bind(this);
  }

  updateSelection (i) {
    this.props.dispatch({type: 'UPDATE_SELECTION', payload: i})
  }

  setDonateAmount(e) {
    this.props.dispatch({type: 'SET_DONATION', payload: e.target.value})
  }

  updateGiftUrl(e) {
    this.props.dispatch({type: 'UPDATE_GIFT_URL', payload: e.target.value})
  }

  nextScreen () {
    this.props.dispatch({type: 'GAME_START', payload: true})
  }

  prevScreen () {
    this.props.dispatch({type: 'GAME_START', payload: false})
  }

  render7 () {
    return (
      <div className='container-fluid'>
      <Row>
      <Col mdOffset={2} md={3}>
        <Panel>
          <ListGroup fill>
            <ListGroupItem>
              <Image responsive src={basketballImage} />
            </ListGroupItem>
            <ListGroupItem className='face_name'>Basket Ball</ListGroupItem>
          </ListGroup>
        </Panel>
      </Col>
      
      <Panel>
        <FormGroup>
          <Col md={12}>
          <ControlLabel>Your Amazon gift card to redeem the above item</ControlLabel>
          </Col>
          <Col md={9}>
          <FormControl
            disabled
            type="text"
            value={this.props.amazon_card}
          />
          </Col>
          <Col md={2} onClick={this.nextScreen}>
            <Button bsStyle="primary" style={{width: '100%'}}>
              Keep it for yourself
            </Button>
          </Col>
          <Col md={1} onClick={this.nextScreen}>
            <Button bsStyle="info" style={{width: '100%'}}>
              Give 
            </Button>
          </Col>
        </FormGroup>
       </Panel>
       </Row>
      </div>
    )
  }

  render6 () {
    return (
      <div>
        <div className='container-fluid' onClick={this.nextScreen} >
          <Jumbotron className='face_name'>
            <h1>Mafia Won</h1>
          </Jumbotron>
          <Panel>
            <ListGroup fill className='face_name'>
              <h1>
                Mafias
              </h1>

              <Row>
                <Col mdOffset={2} md={3}>
                  <Panel>
                    <ListGroup fill>
                      <ListGroupItem>
                        <Image responsive src={player3Image} />
                      </ListGroupItem>
                      <ListGroupItem className='face_name'>{player3Name}</ListGroupItem>
                    </ListGroup>
                  </Panel>
                </Col>
                <Col mdOffset={2} md={3}>
                  <Panel>
                    <ListGroup fill>
                      <ListGroupItem>
                        <Image responsive src={player5Image} />
                      </ListGroupItem>
                      <ListGroupItem className='face_name'>{player5Name}</ListGroupItem>
                    </ListGroup>
                  </Panel>
                </Col>
              </Row>
            </ListGroup>
          </Panel>

          <Panel>
            <ListGroup fill className='face_name'>
              <h1>
                Villagers
              </h1>

              <Row>
                <Col mdOffset={2} md={2}>
                  <Panel>
                    <ListGroup fill>
                      <ListGroupItem>
                        <Image responsive src={player1Image} />
                      </ListGroupItem>
                      <ListGroupItem className='face_name'>{player1Name}</ListGroupItem>
                    </ListGroup>
                  </Panel>
                </Col>
                <Col mdOffset={1} md={2}>
                  <Panel>
                    <ListGroup fill>
                      <ListGroupItem>
                        <Image responsive src={player2Image} />
                      </ListGroupItem>
                      <ListGroupItem className='face_name'>{player2Name}</ListGroupItem>
                    </ListGroup>
                  </Panel>
                </Col>
                <Col mdOffset={1} md={2}>
                  <Panel>
                    <ListGroup fill>
                      <ListGroupItem>
                        <Image responsive src={player4Image} />
                      </ListGroupItem>
                      <ListGroupItem className='face_name'>{player4Name}</ListGroupItem>
                    </ListGroup>
                  </Panel>
                </Col>
              </Row>
            </ListGroup>
          </Panel>
        </div>
      </div>
    )
  }

  render5 () {
    return (
      <div>
        <div className='container-fluid'>
          <Jumbotron className='face_name'>
            <h1>Day 1</h1>
          </Jumbotron>
          <Panel>
            <ListGroup fill className='face_name'>
              <h1>
                Players
                <br />
                <small>
                Vote to lynch one
                </small>
              </h1>

              <Row>

                <ThreeHalfShitHackIdontWannaTalkAbout>
                  <Panel onClick={this.updateSelection.bind(this, 1)} className={this.props.selection == 1 ? 'glow' : ''}>
                    <ListGroup fill>
                      <ListGroupItem>
                        <Image responsive src={player1Image} />
                      </ListGroupItem>
                      <ListGroupItem className='face_name'>{player1Name}</ListGroupItem>
                    </ListGroup>
                  </Panel>
                </ThreeHalfShitHackIdontWannaTalkAbout>
                <ThreeHalfShitHackIdontWannaTalkAbout>
                  <Panel onClick={this.updateSelection.bind(this, 2)} className={this.props.selection == 2 ? 'glow' : ''}>
                    <ListGroup fill>
                      <ListGroupItem>
                        <Image responsive src={player2Image} />
                      </ListGroupItem>
                      <ListGroupItem className='face_name'>{player2Name}</ListGroupItem>
                    </ListGroup>
                  </Panel>
                </ThreeHalfShitHackIdontWannaTalkAbout>
                <ThreeHalfShitHackIdontWannaTalkAbout>
                  <Panel onClick={this.updateSelection.bind(this, 3)} className={this.props.selection == 3 ? 'glow' : ''}>
                    <ListGroup fill>
                      <ListGroupItem>
                        <Image responsive src={player3Image} />
                      </ListGroupItem>
                      <ListGroupItem className='face_name'>{player3Name}</ListGroupItem>
                    </ListGroup>
                  </Panel>
                </ThreeHalfShitHackIdontWannaTalkAbout>
                <ThreeHalfShitHackIdontWannaTalkAbout>
                  <Panel onClick={this.updateSelection.bind(this, 4)} className={this.props.selection == 4 ? 'glow' : ''}>
                    <ListGroup fill>
                      <ListGroupItem>
                        <Image responsive src={player4Image} />
                      </ListGroupItem>
                      <ListGroupItem className='face_name'>{player4Name}</ListGroupItem>
                    </ListGroup>
                  </Panel>
                </ThreeHalfShitHackIdontWannaTalkAbout>
              </Row>
            </ListGroup>

            <Col mdOffset={4} md={4} className='face_name'>
              <Button bsStyle='success' style={{width: '80%'}} onClick={this.nextScreen} >
              Vote to lynch
              </Button>
            </Col>
          </Panel>
        </div>
      </div>
    )
  }

  render4 () {
    return (
      <div>
        <div className='container-fluid'>
          <Jumbotron className='face_name'>
            <h1>Night 1</h1>
          </Jumbotron>
          <Panel>
            <ListGroup fill className='face_name'>
              <h1>
                Villagers
                <br />
                <small>
                Vote to kill one
                </small>
              </h1>

              <Row>
                <Col mdOffset={1} md={2}>
                  <Panel onClick={this.updateSelection.bind(this, 1)} className={this.props.selection == 1 ? 'glow' : ''}>
                    <ListGroup fill>
                      <ListGroupItem>
                        <Image responsive src={player1Image} />
                      </ListGroupItem>
                      <ListGroupItem className='face_name'>{player1Name}</ListGroupItem>
                    </ListGroup>
                  </Panel>
                </Col>
                <Col mdOffset={2} md={2}>
                  <Panel onClick={this.updateSelection.bind(this, 2)} className={this.props.selection == 2 ? 'glow' : ''}>
                    <ListGroup fill>
                      <ListGroupItem>
                        <Image responsive src={player2Image} />
                      </ListGroupItem>
                      <ListGroupItem className='face_name'>{player2Name}</ListGroupItem>
                    </ListGroup>
                  </Panel>
                </Col>
                <Col mdOffset={2} md={2}>
                  <Panel onClick={this.updateSelection.bind(this, 3)} className={this.props.selection == 3 ? 'glow' : ''}>
                    <ListGroup fill>
                      <ListGroupItem>
                        <Image responsive src={player4Image} />
                      </ListGroupItem>
                      <ListGroupItem className='face_name'>{player4Name}</ListGroupItem>
                    </ListGroup>
                  </Panel>
                </Col>
              </Row>
            </ListGroup>

            <Col mdOffset={4} md={4} className='face_name'>
              <Button bsStyle='success' style={{width: '80%'}} onClick={this.nextScreen} >
              Vote to assasinate
              </Button>
            </Col>
          </Panel>
        </div>
      </div>
    )
  }

  render3 () { // press anywhere to go next screens
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
                      <Image responsive src={basketballImage} />
                    </ListGroupItem>
                    <ListGroupItem className='face_name'>Basket Ball</ListGroupItem>
                  </ListGroup>
                </Panel>
              </Col>
              <Col mdOffset={4} md={2}>
                <Panel>
                  <ListGroup fill>
                    <ListGroupItem>
                      <Image responsive src={milkBottleImage} />
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
    )
  }

  render2 () {
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
              <Col md={2} className='face_name' />
            </Row>
            <Panel>
              <FormGroup>
                <Col md={12}>
                <ControlLabel>Put your Amazen item link here</ControlLabel>
                </Col>
                <Col md={9}>
                  <FormControl
                    type='text'
                    value={this.props.giftUrlLink}
                    placeholder='Enter text'
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
    )
  }

  render1 () {
    return (
      <div className='container-fluid'>
        <Row>
          <Col md={2} /> {/* HACKY FORMATING */}
          <Col md={2}>
            <Panel>
              <ListGroup fill>
                <ListGroupItem>
                  <Image responsive src={player1Image} />
                </ListGroupItem>
                <ListGroupItem className='face_name'>{player1Name}</ListGroupItem>
              </ListGroup>
            </Panel>
          </Col>
          <Col md={2}>
            <Panel>
              <ListGroup fill>
                <ListGroupItem>
                  <Image responsive src={player2Image} />
                </ListGroupItem>
                <ListGroupItem className='face_name'>{player2Name}</ListGroupItem>
              </ListGroup>
            </Panel>
          </Col>
          <Col md={2}>
            <Panel>
              <ListGroup fill>
                <ListGroupItem>
                  <Image responsive src={player3Image} />
                </ListGroupItem>
                <ListGroupItem className='face_name'>{player3Name}</ListGroupItem>
              </ListGroup>
            </Panel>
          </Col>
          <Col md={2}>
            <Panel>
              <ListGroup fill>
                <ListGroupItem>
                  <Image responsive src={player4Image} />
                </ListGroupItem>
                <ListGroupItem className='face_name'>{player4Name}</ListGroupItem>
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
                  <FormControl
                    type="text"
                    value={this.props.donateAmount}
                    placeholder="Donate amount"
                    onChange={this.setDonateAmount}
                  />
                  <Button bsStyle='success' style={{width: '65%'}} onClick={this.nextScreen} >
                Join
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Panel>
          </Col>
        </Row>
      </div>
    )
  }
  render () {
    const s = [this.render1, this.render2, this.render3, this.render4, this.render5, this.render6, this.render7]

    return s[this.props.gameStart].call(this)
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    gameStart: state.home.gameStart,
    totalPot: state.home.totalPot,
    playerPot: state.home.playerPot,
    giftUrlLink: state.home.giftUrlLink,
    selection: state.home.selection,
    amazon_card: state.home.amazon_card
  }
}

export default connect(mapStateToProps)(Home)
