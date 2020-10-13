import React, {Component} from "react";
import LocationAutoComplete from "../LocationAutoComplete";
import "../../styles/form.css";
import API from "../../api/apiHandler";
import {withUser} from "../Auth/withUser";
import {withRouter} from "react-router-dom";

class ItemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            category: null,
            quantity: 1,
            contact: null,
            image: "",
            location: ""
        };
    }


    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        // const value = event.target.type === "radio"
        // ? event.target.checked
        // : event.target.type === "file"
        // ? event.target.files[0]
        // : event.target.value;
        console.log(name, value)
        this.setState({[name]: value});
    }

    handleSubmit = async (event) => {
      try{
        event.preventDefault();
        console.log(this.props);
        const {authContext} = this.props;
        console.log(authContext.user._id);

        // API.createOne("/api/items", this.state).then().catch(error => console.log(error))
        const newItem = {
          name: this.state.name,
          description: this.state.description,
          image: "",
          category: this.state.category,
          quantity: this.state.quantity,
          address: this.state.location.formattedAddress,
          location: {
              type: this.state.location.type,
              coordinates: this.state.location.coordinates,
              formattedAddress: this.state.location.formattedAddress
          },
          id_user: authContext.user._id,
          contacted_by: this.state.contact
        };

        console.log(newItem);

        const createNewItem = await API.createItem("/api/items", newItem);
        console.log('---------', createNewItem);
        this.props.history.push("/");
      }catch(errDb) {
        console.log(errDb);
      }
        // Nested object into formData by user Vladimir "Vladi vlad" Novopashin @stackoverflow : ) => https://stackoverflow.com/a/42483509
    };

    handlePlace = (place) => {
        // This handle is passed as a callback to the autocomplete component.
        // Take a look at the data and see what you can get from it.
        // Look at the item model to know what you should retrieve and set as state.
        console.log(place);
        this.setState({
            location: {
                coordinates: place.geometry.coordinates,
                type: place.geometry.type,
                formattedAddress: place.place_name
            }
        });
    };

    render() {
       
        console.log(this.state);
        return (<div className="ItemForm-container">
            
            <form className="form"
                onSubmit={
                    this.handleSubmit
            }>
                <h2 className="title">Add Item</h2>

                <div className="form-group">
                    <label className="label" htmlFor="name">
                        Name
                    </label>
                    <input id="name" className="input" type="text" name="name"
                        // defaultValue={this.state.name}
                        placeholder="What are you giving away ?"
                        onChange={
                            this.handleChange
                        }/>
                </div>

                <div className="form-group">
                    <label className="label" htmlFor="category">
                        Category
                    </label>

                    <select id="category" defaultValue="-1" name="category"
                        onChange={
                            this.handleChange
                    }>
                        <option value="-1" disabled>
                            Select a category
                        </option>
                        <option value="Plant">Plant</option>
                        <option value="Kombucha">Kombucha</option>
                        <option value="Vinegar">Vinegar</option>
                        <option value="Kefir">Kefir</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="label" htmlFor="quantity">
                        Quantity
                    </label>
                    <input className="input" id="quantity" type="number" name="quantity"
                        value={
                            this.state.quantity
                        }
                        onChange={
                            this.handleChange
                        }/>
                </div>

                <div className="form-group">
                    <label className="label" htmlFor="location">
                        Address
                    </label>
                    <LocationAutoComplete onSelect={
                            this.handlePlace
                        }
                        onChange={
                            this.handleChange
                        }/>
                </div>

                <div className="form-group">
                    <label className="label" htmlFor="description">
                        Description
                    </label>
                    <textarea id="description" className="text-area" name="description"
                        // value={this.state.description}
                        placeholder="Tell us something about this item"
                        onChange={
                            this.handleChange
                    }></textarea>
                </div>

                <div className="form-group">
                    <label className="custom-upload label" htmlFor="image">
                        Upload image
                    </label>
                    <input className="input" id="image" name="image" type="file"
                        onChange={
                            this.handleChange
                        }/>
                </div>

                <h2>Contact information</h2>

                <div className="form-group">
                    <label className="label" htmlFor="contact">
                        How do you want to be reached?
                    </label>
                    <div>
                        <input type="radio" name="contact" value="SMS"
                            onChange={
                                this.handleChange
                            }/>
                        user email
                    </div>
                    <input type="radio" name="contact" value="Email"
                        onChange={
                            this.handleChange
                        }/>
                    contact phone number
                </div>

                <p className="message">
                    <img src="/media/info.svg" alt="info"/>
                    Want to be contacted by phone? Add your phone number in your
                                                                                                              personal page.
                </p>

                <button className="btn-submit">Add Item</button>
            </form>
        </div>);
    }
}

export default withRouter(withUser(ItemForm));
