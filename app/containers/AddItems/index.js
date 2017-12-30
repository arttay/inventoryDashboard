/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import request from "superagent";
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import H1 from 'components/H1';
import moment from 'moment';

export default class FeaturePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

   constructor(props) {
    super(props);

    this.state = {
      items: [],
      value: "comic",
      name: undefined,
      price: undefined,
      date: undefined,
      isSold: false,
      sellPrice: null,
      isCgc: false,
      gradePrise: null
    };
  }

  handleChange = (event, index, value) => this.setState({value});
  handleNameChange = (event, value) => this.setState({name: value});
  handlePriceChange = (event, value) => this.setState({price: value});
  handleDateChange = (event, value) => this.setState({date: value});
  handleIsSold = (event, value) => this.setState({isSold: value});
  handleSellPrice = (event, value) => this.setState({sellPrice: value});
  handleIsCgc = (event, value) => this.setState({isCgc: value});
  handleGradeprice = (event, value) => this.setState({gradePrise: value});

  
  addItem = () => {
    let json = {
      item: this.state.name,
      price: this.state.price,
      type: this.state.value,
      isSold: (this.state.isSold === "true"),
      sellPrice: this.state.sellPrice,
      isCgc: this.state.isCgc,
      gradePrice: this.state.gradePrise,
      date: moment(this.state.date).format("MMMM Do YYYY, h:mm:ss a")
    }

     axios.post('/addItem', {
      data: json
     })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <TextField
              type="text"
              hintText="Item name"
              onChange={this.handleNameChange}
            />
            <br />
            <TextField
              type="number"
              hintText="Item price"
              onChange={this.handlePriceChange}
            />
            <br />
            <TextField
              type="text"
              hintText="Is Sold"
              onChange={this.handleIsSold}
            />
            <br />
            <TextField
              type="text"
              hintText="Sell Price"
              onChange={this.handleSellPrice}
            />
            <br />
            <TextField
              type="text"
              hintText="Is CGC"
              onChange={this.handleIsCgc}
            />
            <br />
            <TextField
              type="text"
              hintText="Grade price"
              onChange={this.handleGradeprice}
            />
            <br />
            <SelectField
              value={this.state.value}
              onChange={this.handleChange}
              floatingLabelText="Type"
            >
              <MenuItem value={"comic"} primaryText="Comic" />
              <MenuItem value={"game"} primaryText="Game" />
            </SelectField> <br />
            <DatePicker 
              hintText="Date bought"
              onChange={this.handleDateChange}
              value={this.state.date}
               />
            <br />
            <FlatButton
              label="Add"
              onClick={this.addItem}
            />
          </div>
           
        </MuiThemeProvider>
      </div>
    );
  }
}
