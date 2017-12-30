/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import DataTables from 'material-ui-datatables';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import H1 from 'components/H1';

const TABLE_COLUMNS = [
  {
    key: 'name',
    label: 'Dessert (100g serving)',
  }, {
    key: 'calories',
    label: 'Calories',
  },
  {
    key: 'fat',
    label: 'Fat',
  }
];
 
const TABLE_DATA = [
  {
    name: 'Frozen yogurt',
    calories: '159',
    fat: '6.0',
    carbs: '24'
  }, {
    name: 'Ice cream sandwich',
    calories: '159',
    fat: '6.0',
    carbs: '24'
  }
];


export default class FeaturePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

   constructor(props) {
    super(props);

    this.totalProfitMargin = 0;

    this.state = {
      items: []
    };
  }

  handleFilterValueChange = (value) => {
    // your filter logic
  }
 
  handleSortOrderChange = (key, order) => {
    // your sort logic
  }

  componentDidMount() {
    fetch('http://localhost:3000/readData').then(function(data) {
      return data.json();
    }).then((data) => {
      data.map((item) => {
        if (item.isSold) {
          let ebayFee = item.sellPrice * 0.1;
          let paypalFee = (item.sellPrice * 0.029) + 0.3;
          let cgcFee = item.isCgc ? item.gradePrice : 0;
          let feeAmount = ebayFee + paypalFee + cgcFee + item.sellShipping + Number(item.price);
          item.finalAmount = feeAmount;
          item.margin = item.sellPrice - feeAmount;

          this.totalProfitMargin = this.totalProfitMargin + item.margin;
        } else {
          item.finalAmount = null;
          item.margin = null;
        }
        return item;
      })
      this.setState({items: data})
    }) 
  }
  
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Card style={{
              marginBottom: '50px'              
             }}>
              <CardText>
                <div className="totalProfitMargin">
                  Total Profit: ${ this.totalProfitMargin }
                </div>
              </CardText>
            </Card>
            <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderColumn>Item</TableHeaderColumn>
                    <TableHeaderColumn>Is sold</TableHeaderColumn>
                    <TableHeaderColumn>Sold price</TableHeaderColumn>
                    <TableHeaderColumn>Final amount</TableHeaderColumn>
                    <TableHeaderColumn>Margin</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
              <TableBody>
                
                {this.state.items.map(item =>
                
                  <TableRow key={item._id}>
                    <TableRowColumn>{ item.item }</TableRowColumn>
                    <TableRowColumn>{ String(item.isSold) }</TableRowColumn>
                    <TableRowColumn>{ Number(item.sellPrice) }</TableRowColumn>
                    <TableRowColumn>{ item.finalAmount }</TableRowColumn>
                    <TableRowColumn>{ item.margin }</TableRowColumn>
                  </TableRow>
                
                )}
              </TableBody>
            </Table>


          </div>

        </MuiThemeProvider>
      </div>
    );
  }
}


/*
            <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderColumn>Item</TableHeaderColumn>
                    <TableHeaderColumn>Is sold</TableHeaderColumn>
                    <TableHeaderColumn>Sold price</TableHeaderColumn>
                    <TableHeaderColumn>Final amount</TableHeaderColumn>
                    <TableHeaderColumn>Margin</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
              <TableBody>
                
                {this.state.items.map(item =>
                
                  <TableRow key={item._id}>
                    <TableRowColumn>{ item.item }</TableRowColumn>
                    <TableRowColumn>{ String(item.isSold) }</TableRowColumn>
                    <TableRowColumn>{ Number(item.sellPrice) }</TableRowColumn>
                    <TableRowColumn>{ item.finalAmount }</TableRowColumn>
                    <TableRowColumn>{ item.margin }</TableRowColumn>
                  </TableRow>
                
                )}
              </TableBody>
            </Table>

            */