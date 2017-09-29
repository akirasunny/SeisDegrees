import React, { Component } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
} from 'semantic-ui-react';
import { Link } from 'react-router';
import { Carousel } from 'react-responsive-carousel';

class Home extends Component {
  render() {
    return(
      <div>
      <Segment
        inverted
        textAlign='center'
        style={{ padding: '1em 0em' }}
        vertical
      >
          <Header
            as='h1'
            content='SeisDegrees'
            inverted
            style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em' }}
          />
          <Header
            as='h2'
            content='Record your footprints.'
            inverted
            style={{ fontSize: '1.7em', fontWeight: 'normal', marginBottom: '3em'}}
          />
          <Carousel showArrows={true} autoPlay interval={2000}>
            <div>
                <img src="../../public/assets/Carousel/01.jpg" />
                <p className="legend">Pike Market @ Seattle</p>
            </div>
            <div>
                <img src="../../public/assets/Carousel/02.jpg" />
                <p className="legend">Avenue @ Seattle</p>
            </div>
            <div>
                <img src="../../public/assets/Carousel/03.jpg" />
                <p className="legend">Bleeding Heart @ Central Park, NYC</p>
            </div>
            <div>
                <img src="../../public/assets/Carousel/04.jpg" />
                <p className="legend">Malus Spectabilis @ Ithaca, NY</p>
            </div>
            <div>
                <img src="../../public/assets/Carousel/05.jpg" />
                <p className="legend">Infinite Mirror - Yayoi Kusama</p>
            </div>
            <div>
                <img src="../../public/assets/Carousel/06.jpg" />
                <p className="legend">Cat's gem-like eye</p>
            </div>
        </Carousel>
      </Segment>

        <Segment
          inverted
          style={{ margin: '5em 0em 0em', padding: '5em 0em' }}
          vertical
        >
          <Container textAlign='center'>
            <Grid columns={4} divided stackable inverted>
              <Grid.Row>
                <Grid.Column>
                  <Header inverted as='h4' content='Javier Avitia' />
                  <List link inverted>
                    <List.Item>Full-Stack Developer</List.Item>
                    <List.Item><Image size="small" shape="circular" src="../../public/assets/ProfileImages/javier.png"/></List.Item>
                    <List.Item>GitHub: <a href="https://github.com/Gr8ChairmanMeow">Gr8ChairmanMeow</a></List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <Header inverted as='h4' content='Hao Su' />
                  <List link inverted>
                    <List.Item>Full-Stack Developer</List.Item>
                    <List.Item><Image size="small" shape="circular" src="../../public/assets/ProfileImages/hao.jpg"/></List.Item>
                    <List.Item>GitHub: <a href="https://github.com/akirasunny">akirasunny</a></List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <Header inverted as='h4' content='Stephen Woo' />
                  <List link inverted>
                    <List.Item>Full-Stack Developer</List.Item>
                    <List.Item><Image size="small" shape="circular" src="../../public/assets/ProfileImages/stephen.png"/></List.Item>
                    <List.Item>GitHub: <a href="https://github.com/stephenwoo95">stephenwoo95</a></List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <Header inverted as='h4' content='Acknowledgements' />
                  <p>Clark Nielsen</p>
                  <p>Paige Pittman</p>
                  <p>Josh Apstein</p>
                  <p>UCLA Extension Coding Bootcamp (Full-Time) - July, 2017</p>
                  <p>Semantic UI</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider inverted section />
            <List horizontal inverted divided link>
              <List.Item as='a' href='https://github.com/akirasunny/diary'>GitHub Repository</List.Item>
              <List.Item as='a' href='#'>Terms and Conditions</List.Item>
              <List.Item as='a' href='#'>Privacy Policy</List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    )
  }
}

export default Home;