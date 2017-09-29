import _ from 'lodash'
import React, { Component } from 'react'
import {
  Container, Divider, Dropdown, Grid, Header, Icon, Image, List, Menu, Segment, Visibility,
} from 'semantic-ui-react';
import ReactLifeTimeline from "./ReactLifeTimeline";

class Timeline extends Component {
	constructor(props) {
		super(props);
    this.EVENTS = [
			{date_start: new Date('1992-01-01'), date_end: new Date('2004-01-01'), title: 'Practices civil rights law and teaches constitutional law at the University of Chicago Law School.', color: '#FC004C'},
			{date_start: new Date('1995-01-01'), title: 'Publishes his autobiography "Dreams from my Father"'},
			{date_start: new Date('1997-01-01'), date_end: new Date('2005-01-01'), title: 'Illinois State Senator, representing the 13th District.', color: '#95F268'},
			{date_start: new Date('2004-07-27'), title: 'Delivers the keynote address at the Democratic National Convention.'},
			{date_start: new Date('2004-11-02'), title: 'Wins the US Senate race in Illinois, defeating Alan Keyes. It is the first time in history a Senate race is between two African-American candidates.'},
			{date_start: new Date('2006-08-20'), date_end: new Date('2006-09-03'), title: 'Tours five African countries, including a visit to Nyangoma-Kogelo, Kenya, his late father\'s hometown.', color: '#F500F7'},
			{date_start: new Date('2007-02-10'), title: 'Announces his candidacy for president at an event in Springfield, Illinois.'},
			{date_start: new Date('2008-11-04'), title: 'Is elected president of the United States with an estimated 66.7 million popular votes and 365 electoral votes.'},
			{date_start: new Date('2008-12-17'), title: 'Is named Time Magazine\'s "Person of the Year."'},
			{date_start: new Date('2009-01-20'), title: 'Is sworn in as the 44th president of the United States, becoming the first African-American to hold the position.'},
			{date_start: new Date('2009-01-20'), date_end: new Date('2017-01-20'), title: 'POTUS'},
			{date_start: new Date('2017-01-20'), title: 'Leaves the Oval Office after two terms as president.'},
		];

    // this.EVENTS = this.props.posts.map(
    //     (post) => {
    //       return {
    //         date_start: post.date,
    //         date_end: post.date,
    //         title: post.title,
    //         location: post.location,
    //         body: post.body,
    //         tagged: post.tagged,
    //         img: post.img
    //       };
    //     }
    // )
  }

  generate_events(cb) {
    cb(this.EVENTS);
  }

	render() {
		return (
			<div>
        <h1>Timeline</h1>
        <ReactLifeTimeline subject_name="Barack" get_events={this.generate_events.bind(this)} birthday={new Date("1961-08-04")}/>
			</div>
		);
	}
}

export default Timeline;
