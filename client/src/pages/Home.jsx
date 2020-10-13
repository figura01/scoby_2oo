import React from "react";
import ReactMapboxGl, {Layer, Feature, Marker, Image} from 'react-mapbox-gl';
import API from "../api/apiHandler";
const imgKambucha = "media/kombucha.svg";
const imgKefir = "media/kefir.svg";
const imgPlant = "media/plant.svg";
const imgVinegar = "media/vinegar.svg";

const Map = ReactMapboxGl({accessToken: process.env.REACT_APP_MAPBOX_TOKEN});

class Home extends React.Component {

    state = {
      map: null,
      items: []
    }

  

    componentDidMount() {
        API.getItems("/api/items").then(dbRes => {
            //console.log(dbRes);
            this.setState({items: dbRes})
        }).catch(error => console.log(error))
    }

    render() {
      console.log(this.props);
        return (
          <>
           
            <Map style="mapbox://styles/mapbox/streets-v9"
              containerStyle={
                {
                    height: '100vh',
                    width: '100vw'
                }
            }>
                {this.state.items.map((item, index) => {
                  console.log(item);
                  return (
                    <Marker
                      coordinates={item.location.coordinates}
                      anchor="bottom"
                        style={{width:"15px", height:"15px"}}
                    >
                      {item.category[0] === 'Kambucha' && (
                        <img src={imgKambucha} width="15px" height="15px" alt="" />
                      )}

                      {item.category[0] === 'Kefir' && (
                        <img src={imgKefir} width="15px" height="15px" alt="" />
                      )}

                      {item.category[0] === 'Vinegar' && (
                        <img src={imgVinegar} width="15px" height="15px" alt="" />
                      )}

                      {item.category[0] === 'Vinegar' && (
                        <img src={imgPlant} width="15px" height="15px" alt="" />
                      )}

                    </Marker>
                  )
                })}
            </Map>
        </>);
    }
};

export default Home;
