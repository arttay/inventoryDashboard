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
    fetch('http://localhost:4000/getNotes').then(function(data) {
      return data.json();
    }).then((data) => {

      data.reduce((prev, item) => {
        let current = Object.keys(prev);
        console.log(item.LoanId)

        return prev;
      }, {"72782994": 1})


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
            <Table fixedHeader={true}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn>Loan Id</TableHeaderColumn>
                    <TableHeaderColumn>Type</TableHeaderColumn>
                    <TableHeaderColumn>Ask price</TableHeaderColumn>
                    <TableHeaderColumn>FICO Range</TableHeaderColumn>
                    <TableHeaderColumn>Interest rate</TableHeaderColumn>
                    <TableHeaderColumn>Loan length</TableHeaderColumn>
                    <TableHeaderColumn>Markup</TableHeaderColumn>
                    <TableHeaderColumn>Never Late</TableHeaderColumn>
                    <TableHeaderColumn>Outstanding Princp</TableHeaderColumn>
                    <TableHeaderColumn>Remaining payments</TableHeaderColumn>
                    <TableHeaderColumn>Count</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
              <TableBody displayRowCheckbox={false} adjustForCheckbox={false}>
                
                {this.state.items.map(item =>
                
                  <TableRow key={item._id} >
                    <TableRowColumn>{ item.LoanId }</TableRowColumn>
                    <TableRowColumn>{ item.Application_Type }</TableRowColumn>
                    <TableRowColumn>{ item.AskPrice }</TableRowColumn>
                    <TableRowColumn>{ item.FICO_End_Range }</TableRowColumn>
                    <TableRowColumn>{ item.Interest_Rate }</TableRowColumn>
                    <TableRowColumn>{ item.Loan_Maturity }</TableRowColumn>
                    <TableRowColumn>{ item.Markup_Discount }</TableRowColumn>
                    <TableRowColumn>{ item.NeverLate }</TableRowColumn>
                    <TableRowColumn>{ item.OutstandingPrincipal }</TableRowColumn>
                    <TableRowColumn>{ item.Remaining_Payments }</TableRowColumn>
                    <TableRowColumn>{ item.count }</TableRowColumn>

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

