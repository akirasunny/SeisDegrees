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

class Home extends Component {
  render() {
    return(
      <div>
      <Segment
        inverted
        textAlign='center'
        style={{ minHeight: 500, padding: '1em 0em' }}
        vertical
      >
        <Container text>
          <Header
            as='h1'
            content='6 Degrees'
            inverted
            style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em' }}
          />
          <Header
            as='h2'
            content='Record your footprints.'
            inverted
            style={{ fontSize: '1.7em', fontWeight: 'normal' }}
          />
          <Button primary size='huge'>
            Get Started
            <Icon name='right arrow' />
          </Button>
        </Container>
      </Segment>

      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h3' style={{ fontSize: '2em' }}>A Header</Header>
              <p style={{ fontSize: '1.33em' }}>
                Some texts
              </p>
              <Header as='h3' style={{ fontSize: '2em' }}>Another Header</Header>
              <p style={{ fontSize: '1.33em' }}>
                More texts
              </p>
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
              <Image
                bordered
                shape="circular"
                size='large'
                src='#'
                alt="An image"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Button size='huge'>Check Them Out</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment style={{ padding: '0em' }} vertical>
        <Grid celled='internally' columns='equal' stackable>
          <Grid.Row textAlign='center'>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>"What a Company"</Header>
              <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>"I shouldn't have gone with their competitor."</Header>
              <p style={{ fontSize: '1.33em' }}>
                <Image avatar src='#' alt="Avatar" />
                <b>Nan</b> Chief Fun Officer Acme Toys
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Header as='h3' style={{ fontSize: '2em' }}>Breaking The Grid, Grabs Your Attention</Header>
          <p style={{ fontSize: '1.33em' }}>
            Instead of focusing on content creation and hard work, we have learned how to master the art of doing
            nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic
            and worth your attention.
          </p>
          <Button as='a' size='large'>Read More</Button>
          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
          >
            <a href='#'>Case Studies</a>
          </Divider>
          <Header as='h3' style={{ fontSize: '2em' }}>Did We Tell You About Our Bananas?</Header>
          <p style={{ fontSize: '1.33em' }}>
            Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but its really
            true.
            It took years of gene splicing and combinatory DNA research, but our bananas can really dance.
          </p>
          <Button as='a' size='large'>I'm Still Quite Interested</Button>
        </Container>
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
            <Image src='/logo.png' centered size='mini' />
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