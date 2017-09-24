import React from 'react'
import { Link } from 'react-router';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

const Signup = () => (
  <div className='login-form'>
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
    <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          {' '}Sign-up
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='Username'
            />
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Confirm password'
              type='password'
            />
            <Button color='teal' fluid size='large'>Sign up</Button>
          </Segment>
        </Form>
        <Message>
          Have an account already? <Link to='/login'>Log in</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
)

export default Signup;