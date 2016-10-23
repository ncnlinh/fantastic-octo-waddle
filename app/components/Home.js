import React from 'react'
import { connect } from 'react-redux'
import Messages from './Messages'
import { Button, Panel, ListGroup, ListGroupItem, Col, Image, Row } from 'react-bootstrap'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.nextScreen = this.nextScreen(this)
  }

  nextScreen () {
    this.props.dispatch({type: 'GAME_START'})
  }

  render () {
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
          <Col mdOffset={5} md={2}>
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
    )
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
  gameStart: state.gameStart
})

export default connect(mapStateToProps)(Home)
