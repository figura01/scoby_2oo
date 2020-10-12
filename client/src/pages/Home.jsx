import React from "react";
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import API from "../api/apiHandler";

const Map = ReactMapboxGl({accessToken: 'pk.eyJ1IjoibWF4amdydWJlciIsImEiOiJja2c2a2x4Y3owMzFvMzJtbmd1cG9iMnNyIn0.LyK0wr5U6x5ad2FP5WlhnA'})

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state={
      map : null,
      items: []
    }

componentDidMount(){
  API.getItems("/api/items")
  .then(dbRes => {console.log(dbRes); this.setState({items : dbRes})})
    .catch(error => console.log(error))
}

  render() {
    return (
    
    <Map
  style="mapbox://styles/mapbox/streets-v9"
  containerStyle={{
    height: '100vh',
    width: '100vw'
  }}
>
{/* {this.state.items.map((item, index) => {
  console.log(item); return ( 
  <Layer key={index} type="symbol" id={`marker-${index}`} layout={{ 'icon-image': 'marker-15' }}>
    <Feature coordinates={item.location.coordinates} />
  </Layer>)})} */}



  <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
    <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
  </Layer>
</Map>
  
    );
}};

export default Home;
