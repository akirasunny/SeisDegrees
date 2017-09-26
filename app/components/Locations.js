import _ from 'lodash'
import React, { Component } from 'react'
import {
  Container, Divider, Dropdown, Grid, Header, Icon, Image, List, Menu, Segment, Visibility,
} from 'semantic-ui-react';


class Locations extends Component {
    constructor() {
        super();
        this.state = {
            prevWindow: "",
            markersArr: [],
            lastMarkerPos: { lat: 34.048775, lng: -118.258615 },
            latLongArr: [
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
                ]
        };
    }

    componentDidMount() {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 34.048775, lng: -118.258615 },
            zoom: 11,
            mapTypeControl: false,
            clickableIcons: false
        });
        this.populateMarkers(this.state.latLongArr,map);
    }

    populateMarkers(latLongArr,map) {
        var self = this;
        console.log(latLongArr);

            var infowindow = new google.maps.InfoWindow();
            var marker, i;
            //do not change from i, it is same i of station index!
            latLongArr.forEach(function(stations, i) {
                console.log(stations)
                marker = new google.maps.Marker({

                    position: new google.maps.LatLng(stations[1], stations[2]),
                    map: map

                });

                /*google.maps.event.addListener(infowindow, 'domready', function() {
                    $('.weather').parent().parent().css({ 'width': '350px', 'height': '350px' });
                });*/

                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        if (self.prevWindow != null)
                            self.prevWindow.close();
                        /*functions.addInfo(stations, line[0]).then(function() {*/
                            infowindow.setContent("Amazing Super Kittens!");
                            infowindow.open(map, marker);
                            self.prevWindow = infowindow;
                        /*});*/

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