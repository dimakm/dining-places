
import React, { Component } from 'react'
import './App.css'

// Components
import Menu from './Components/Menu/Menu'
import Header from './Components/Header/Header'

import axios from 'axios'


class App extends Component {

    state = {
        venues: [],
        filteredVenues: [],
        markers: []    }

 //code to load the map script 
    renderMap = () => {
        var index  = window.document.getElementsByTagName("script")[0]
        var script = window.document.createElement("script")
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCElDPaTh_n-WGrsOONc-2eR6eleOkoI-U&callback=initMap"
        script.async = true
        script.defer = true
        script.onerror = function() {
          document.write("Google Maps can't be loaded");}
        index.parentNode.insertBefore(script, index)
          window.initMap = this.initMap
    }

    componentDidMount() {
            this.getVenues("restaurant", "Jacksonville")
        }

    getVenues = (query, area) => {
        const endPoint = "https://api.foursquare.com/v2/venues/explore?"
        const params = {
                        client_id: "TPY3XVOLGRYJPBQXQLDFP4XYNUT1SWHPXAYNE43TAN0AQIMI",
                        client_secret: "JLL03C4BYHQ2QNFKJE5H31WWDPWUPJPMMNGJOQBJBS5DKEZG",
                        query: query,
                        near: area,
                        v: "20183009"
        }

       

    /*----------- The Map-------------- */
    initMap = () => {
        // Show Map
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: 30.25260308144984, lng: -81.5254624105878},
            zoom: 12
        })
        let infowindow = new window.google.maps.InfoWindow()

        this.state.venues.map((site) => {
            // Create Markers
            let marker = new window.google.maps.Marker({
                position: {lat: site.venue.location.lat, lng: site.venue.location.lng},
                map: map,
                id: site.venue.id,
                animation: window.google.maps.Animation.DROP,
                title: site.venue.name
            })
            marker.setVisible(true);

            this.state.markers.push(marker)

            marker.addListener('click', function() {
                // Marker animation 
                marker.setAnimation(window.google.maps.Animation.BOUNCE);
                window.setTimeout(function(){marker.setAnimation(null);},1000);
                //infowindow add content 
                infowindow.setContent(`
                            <h2>${site.venue.name}</h2>
                            <h3>Type: ${site.venue.categories[0].shortName}</h3>
                            <p>Address:${site.venue.location.formattedAddress[0]} 
                                        ${site.venue.location.formattedAddress[1]} 
                                        ${site.venue.location.formattedAddress[2]}
                            </p>
                            <p>lat: ${site.venue.location.lat}, long: ${site.venue.location.lng}</p>
                            <p> ${'<a href="https://foursquare.com/v/' +
                             site.venue.id + '" target="_blank">Read More on <b>Foursquare</b></a>'} </p>
                            `)

                infowindow.open(map, marker)
               
            })
             //stop marker animaion and close infowindow when map is clicked
                map.addListener('click', function(){
                            marker.setAnimation(null);
                            infowindow.close(map, marker) 
                })
        })
    
    } //end initMap
//------------------------------------


/*get_set_options = () => {
  let ret_array = []
  filterArray.map((option)=> {
    if (filterArray.option) {
      ret_array.push(option)
    }
  } )
  return ret_array;
}*/
 
/*filter_markers = (filterArray) => {  
  
  // for each marker, check to see if all required options are set
  /*this.state.markers.map((marker) => {
     let  keep=true
     set_filters.map((ven)=> {
        if (marker.title != ven.name) {
        keep = false;
      }
    })
    marker.setVisible(keep)
  })
let keep =true;
  this.state.markers.filter((marker)=>{
    filterArray.map((ven)=> {
        if (marker.title = ven.name) {
        keep = true;
      }
      else {keep = false}
    })
    marker.setVisible(keep)

  })
}*/



//---------------------------------------------


    updatePlaces = (newPlaces) => {
    
        this.setState({filteredVenues: newPlaces})
                 //   this.filter_markers(this.state.filteredVenues )

    }

    
    
    render() {
        return (
            <div>
                <Header/>
                <main>
                    <Menu 
                        filteredVenues={this.state.venues} 
                        markers={this.state.markers} 
                        updatePlaces={this.updatePlaces}
                    />
                   
                <div id="map"></div> 
                </main>
            </div>
        )
    }
}




export default App
