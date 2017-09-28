import React,{ Component } from 'react';
import _ from "lodash";
import { Grid, Image, Modal, Button, Card, Icon } from 'semantic-ui-react';
import ReactTooltip from 'react-tooltip';
var Carousel = require('react-responsive-carousel').Carousel;

export default class ReactLifeTimeline extends Component {

	constructor(props) {
		super(props);
		this.state = {
			events: [],
			lookup: {},
			loaded: false,
			today: new Date(),
			last_event_date: new Date(),
			open: false
		};
		this.show = this.show.bind(this);
		this.close = this.close.bind(this);
	}

	show(date, events) {
		this.setState({ open: true, week_date: date, cur_events: events });
	}

	close() {
		this.setState({ open: false });
	}

	componentDidMount() {
		if (this.props.events.length > 0) this.got_events(this.props.events);
		else if (this.props.get_events != null) this.props.get_events(this.got_events.bind(this));
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.get_events == null && nextProps.events.length != this.state.events.length) this.got_events(nextProps.events);
	}

	event_end_date(e) {
		if (e.date_end) return new Date(e.date_end)
		else return new Date(e.date_start);
	}

	got_events(events) {
		let last_event_date = new Date();
		if (events.length > 0) {
			let latest_event = events.sort((e1, e2) => {
		    	let e1ref = this.event_end_date(e1);
		    	let e2ref = this.event_end_date(e2);
		    	if (e2ref > e1ref) return 1;
		    	else if (e2ref < e1ref) return -1;
		    	else return 0;
			})[0];
			let latest_end = this.event_end_date(latest_event);
			if (latest_end > last_event_date) {
				last_event_date = latest_end;
			}
		}
		this.setState({events: events, loaded: true, last_event_date: last_event_date}, () => {
			this.generate_lookup();
		});
	}

	print_date(date) {
		var d = date.getDate();
		var month = date.getMonth() + 1;
		var day = d<10? '0'+d:''+d;
		if (month < 10) month = '0'+month;
		return date.getFullYear()+"-"+month+"-"+day;
	}

	generate_lookup() {
	    // Generate lookup (event list for each date, by ISO date)
	    let lookup = {};
	    this.all_weeks((week_start, week_end) => {
	    	lookup[this.print_date(week_start)] = this.get_events_in_week(week_start, week_end);
	    });
	    this.setState({lookup}, () => {
	    	ReactTooltip.rebuild();
	    });
	}

	single_event(e) {
		return (e.single || !e.date_end || e.date_start == e.date_end) && (!e.ongoing);
	}

	get_events_in_week(week_start, week_end) {
		let {events, today} = this.state;
		let {birthday, subject_name} = this.props;
		let this_week = today >= week_start && today <= week_end;
		let color = null;
	    let single = false; // Has single events
	    let _events = events.filter((e) => {
	    	let estart = new Date(e.date_start);
	    	let eend = new Date(e.date_end);
	    	if (e.ongoing) eend = new Date();
	    	let start_in_week = estart >= week_start && estart < week_end;
	    	let end_in_week = eend >= week_start && eend < week_end;
	    	let event_spans_week = estart <= week_start && eend >= week_end;
	    	let in_week = start_in_week || end_in_week || event_spans_week;
	    	// if (in_week) {
	    	// 	if (e.color)color = e.color;
	    	// 	if (this.single_event(e)) single = true;
	    	// }
	    	return in_week;
	    });
			switch(_events.length) {
				case 0:
					color = "#555";
					break;
				case 1:
					color = "#1c1792";
					break;
				case 2:
					color = "#0087f1";
					break;
				case 3:
					color = "#00a8bf";
					break;
				case 4:
					color = "#00bf73";
					break;
				case 5:
					color = "#08bf00";
					break;
				case 6:
					color = "#cad82a";
					break;
				case 7:
					color = "#ebff00";
					break;
				case 8:
					color = "#ffd346";
					break;
				case 9:
					color = "#e6a705";
					break;
				case 10:
					color = "#ff6007";
					break;
				default:
					color = "#ff0000";
					break;
			}
	    if (birthday) {
	    	let age = 0;
	    	let bd_in_week = false;
	    	let week_isos = [];
	    	while (week_start < week_end) {
	    		if (week_start.getMonth() == birthday.getMonth() && week_start.getDate() == birthday.getDate()) {
	    			bd_in_week = true;
	    			age = week_start.getFullYear() - birthday.getFullYear();
	    			break;
	    		}
	    		week_start.setDate(week_start.getDate() + 1);
	    	}
	    	if (bd_in_week) {
	    		color = this.props.birthday_color;
	    		let me = subject_name == null;
	    		let title;
	    		let subj = me ? 'I' : subject_name;
	    		if (age == 0) {
	    			let verb = me ? 'am' : 'is';
	    			title = `${subj} ${verb} born!`;
	    		} else {
	    			let verb = me ? 'turn' : 'turns';
					title = `${subj} ${verb} ${age} on ${birthday.getMonth()+1}/${birthday.getDate()}`;
	    		}
	    		_events.push({title: title, color: color});
	    	}
	    }
	    if (this_week) {
	    	color = 'white';
	    	_events.push({title: 'This week', color: color});
	    }
	    return {
	    	events: _events,
	    	color: color,
	    	single: single
	    };
	}

	get_end() {
		let {last_event_date} = this.state;
		let projected_end = new Date(last_event_date.getTime());
		projected_end.setDate(projected_end.getDate() + this.props.project_days);
		return projected_end;
	}

	all_weeks(fn) {
		let {birthday} = this.props;
		let {today} = this.state;
		let end = this.get_end();
		let cursor = new Date(birthday.getTime());
		let weeks = [];
		while (cursor <= end) {
			let d = new Date(cursor.getTime());
			cursor.setDate(cursor.getDate() + 7);
			fn(d, new Date(cursor.getTime()));
		}
	}

	render_week(date_start, date_end) {
		let date = this.print_date(date_start);
		let {today} = this.state;
		let res = this.state.lookup[date];
		let _single;
		let events = [];
		let color;
		let single = false;
		if (res != null) {
			({events, color, single} = res);
		}
		let future = date_start > today;
		let st = {};
		if (events.length > 0) st.backgroundColor = color || '#1AA9FF';
		// let tips = events.map((e) => {
		// 	return e.img;
		// });
		let cls = 'week';
		if (future) cls += ' future';
		// the dot
		if (single) _single = <span className="singleEvents"></span>;
		return (
				<div onClick={() => this.handleWeekClick(events, date)} className={cls} style={st} key={date} data-tip={`${events.length} post(s) for the week of ${date}`} data-event-off='click'>
					{_single}
				</div>
		);
	}

	// renderThumbs(tips, date) {
	// 	console.log('ran');
	// 	// create grid for thumbnails
	// 	var dim = Math.ceil(Math.sqrt(tips.length));
	// 	return (
	// 		<div>
	// 			<p><strong>{date}</strong></p>
	// 			<Grid>
	// 				{_.times(dim, i => (
	// 					<Grid.Row key={i}>
	// 						{_.times(dim,j => {
	// 							if(tips.length == 0) {
	// 								return;
	// 							}
	// 							return (
	// 								<Grid.Column key={j}>
	// 									<Image src={tips.splice(0,1)[0]} />;
	// 								</Grid.Column>
	// 							);
	// 						})}
	// 					</Grid.Row>
	// 				))}
	// 			</Grid>
	// 		</div>
	// 	);
	// }

	render_all_weeks() {
		let weeks = [];
		this.all_weeks((start, end) => {
			weeks.push(this.render_week(start, end));
		});
		return weeks;
	}

	handleWeekClick(events, date) {
		//show modal with all posts
		this.show(date, events);
	}

	render() {
		const { open, week_date } = this.state;
		var cur_events = [{img:['/public/assets/UserImages/9cqvE22HhRvd.png','/public/assets/UserImages/ujifPjtqRBMO.jpg'],title:'test',body:'testbody',date:'testDate',location:'testLoc',tagged:['testTag']},{img:['/public/assets/UserImages/ujifPjtqRBMO.jpg','/public/assets/UserImages/9cqvE22HhRvd.png'],title:'test',body:'testbody',date:'testDate',location:'testLoc',tagged:['testTag']}];
		return (
			<div>
				<ReactTooltip place="top" effect="solid"/>
				<div className="LifeTimeline">
					{ this.render_all_weeks() }
				</div>
				<Modal size='large' open={open} onClose={this.close}>
					<Modal.Header>
						Posts From The Week of {week_date}
					</Modal.Header>
					<Modal.Content>
						{/* Carousel with Post photo(s), desc, tags, time, loc, comment option, edit option */}
						<Carousel showArrows={true} showThumbs={false} infiniteLoop>
							{_.times(cur_events.length,i => (
								<div key={i}>
									<Card fluid>
										<Carousel showArrows={false} autoPlay infiniteLoop showThumbs={true}>
											{_.times(cur_events[i].img.length,k => (
												<div key={k}>
													<img src={cur_events[i].img[k]} />
												</div>
											))}
										</Carousel>
										<Card.Content>
											<Card.Header>{cur_events[i].title}</Card.Header>
											<Card.Meta>{`${cur_events[i].date}, ${cur_events[i].location}`}</Card.Meta>
											<Card.Description>{cur_events[i].body}</Card.Description>
										</Card.Content>
										<Card.Content extra>
											<a>
												<Icon name='user' />
											</a>
											{_.times(cur_events[i].tagged.length, j => (
												<a key={j}>{cur_events[i].tagged[j]}</a>
											))}
										</Card.Content>
									</Card>
									{/* comments */}
								</div>
							))}
						</Carousel>
					</Modal.Content>
					<Modal.Actions>
						<Button negative>
							No
						</Button>
						<Button positive icon='checkmark' labelPosition='right' content='Yes' />
					</Modal.Actions>
				</Modal>
			</div>
		);
	}
}

ReactLifeTimeline.defaultProps = {
    birthday: null, // Date object
    birthday_color: '#F89542',
    events: [],
    project_days: 200, // Days into future to project,
    subject_name: null, // Person's name (otherwise 'I')
    get_events: null // Function to get events (e.g. via API resource)
};
