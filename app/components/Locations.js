import _ from 'lodash'
import React, { Component } from 'react'
import {
  Container, Divider, Dropdown, Grid, Header, Icon, Image, List, Menu, Segment, Visibility,
} from 'semantic-ui-react';
import axios from "axios";


class Locations extends Component {
    constructor(props) {
        super(props);
        /*console.log(this.props.locations);*/
        this.state = {
            info:"",
            geocodeAPI:"a899163963564ab388866d8cd52f0dfb",
            googleAPI:"AIzaSyBP3Xb01OSpLPBryCTei3tja3b8pU90oIg",
            prevWindow: "",
            markersArr: [],
            lastMarkerPos: { lat: 34.048775, lng: -118.258615 },
            locations: [
                    ['Redondo Beach Station', 33.894577, -118.369161],
                    ['Douglas Station', 33.905288, -118.383232],
                    ['El Segundo Station', 33.916187, -118.386777],
                    ['Mariposa Station', 33.923288, -118.387579],
                    ['Aviation / LAX Station', 33.929612, -118.377150],
                    ['Hawthrone / Lennox Station', 33.933416, -118.351733],
                    ['Crenshaw Station', 33.925231, -118.326407],
                    ['Vermont / Athens Station', 33.928660, -118.291698],
                    ['Harbor Freeway Station', 33.928681, -118.281095],
                    ['Avalon Station', 33.927490, -118.265171],
                    ['Willowbrook / Rosa Parks Station', 33.928240, -118.238031],
                    ['Long Beach Boulevard Station', 33.925011, -118.210230],
                    ['Lakewood Boulevard Station', 33.913066, -118.140266],
                    ['Norwalk Station', 33.914116, -118.104085]
                ],
            latLongArr: props.locations
        };
    }

    // componentWillMount() {
    //     var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)userId\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    //     axios.get("/api/Users/" + cookieValue).then(res => {
    //         /*console.log(res);*/
    //         var posts = res.data.posts;
    //         console.log(posts);
    //         posts.forEach(function(post, i) {
    //             /*console.log(post.location);*/
    //             var location = post.location;
    //             this.runGeocode(location);
    //         }.bind(this));
    //     });
    // }

    componentDidMount() {
        console.log(this.props.locations);
        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 34.048775, lng: -118.258615 },
            zoom: 11,
            mapTypeControl: false,
            clickableIcons: false
        });
        /*console.log(this.state.latLongArr);*/
        this.populateMarkers(this.state.latLongArr,map);
    }

/*    addInfo(locationName) {
        this.setState({locationName});
    }*/

    // // This function serves our purpose of running the query to geolocate.
    // runGeocode(location) {

    //     /*console.log(location);*/

    //     // Figure out the geolocation
    //     //"http://api.opencagedata.com/geocode/v1/json?query=" + location + "&pretty=1&key=" + this.state.geocodeAPI
    //     var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=" + this.state.googleAPI;
    //     return axios.get(queryURL).then(function(response) {
    //         /*console.log(response);*/
    //         /*console.log(response.data.results[0].geometry.location,"/",response.data.results[0].formatted_address);*/
    //       // If get get a result, return that result's formatted address property
    //       if (response.data.results[0]) {
    //         var latLong = response.data.results[0].geometry.location;
    //         var unitLoc = [location,latLong.lat,latLong.lng];
    //         var newArray = this.state.latLongArr.slice();
    //         newArray.push(unitLoc)
    //         this.setState({latLongArr:newArray});
    //         /*console.log(this.state.latLongArr);*/
    //         // console.log(typeof latLong.lat)
    //         /*console.log(location,response.data.results[0].geometry.location);*/
    //         /*console.log(unitLoc);*/
    //        /* this.latLongArr.push()*/
    //       }
    //       else{
    //         // If we don't get any results, return an empty string
    //         console.log("Location not found.");
    //       }
    //     }.bind(this));
    // }

    populateMarkers(latLongArr,map) {
        console.log(latLongArr);
        var self = this;
        /*console.log(latLongArr);*/
        console.log(this.state.latLongArr);

            var infowindow = new google.maps.InfoWindow();
            var marker, i;
            //do not change from i, it is same i of station index!
            latLongArr.forEach(function(location, i) {
                console.log(location)
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(location[1], location[2]),
                    map: map

                });

                console.log(location[1],location[2]);

                //console.log(marker,i);

  /*              google.maps.event.addListener(infowindow, 'domready', function() {
                    $('.weather').parent().parent().css({ 'width': '350px', 'height': '350px' });
                });*/

                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {

                        if (self.prevWindow != null){
                            self.prevWindow.close();
                        }
                        /*self.addInfo(location[0]);*/
                        infowindow.setContent(location[0]);
                        infowindow.open(map, marker);
                        self.prevWindow = infowindow;
                        

                    }
                })(marker, i));

                marker.addListener('click', function() {
                    map.setZoom(16);
                    self.state.lastMarkerPos = this.getPosition();
                    map.setCenter(this.getPosition());
                    map.setOptions({
                        draggable: false,
                        disableDoubleClickZoom: true
                    });
                });

                self.state.markersArr.push(marker);

                google.maps.event.addListener(infowindow, 'closeclick', function() {

                    map.setOptions({
                        draggable: true,
                        disableDoubleClickZoom: false,
                        center: this.position,
                        zoom: 10,
                        mapTypeControl: false,
                        clickableIcons: false
                    });
                });

            });

    } //end populate_markers method

    render() {
        return (
            <Grid>
                <Grid.Column id="map" floated='right' style={{minHeight: 400, width:400}}>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Locations;