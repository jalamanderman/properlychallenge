import React, { Component } from 'react';
import './App.css';
import * as scripts from './scripts/challengeQuestions.js';

class App extends Component {

    constructor (props) {
        super(props);
        this.state = {
            checked1: false,
            checked2: true
        };
    }

    handleCityInput = (e) => {
      let city = e.target.value;
      let cityArray = scripts.usersFromCity(city);
      this.setState({
          cityArray: cityArray
      });
    };

    printCities = () => {
        if (this.state.cityArray && this.state.cityArray[0] !== undefined) {
            return (this.state.cityArray.map((value) =>
                <tr>
                    <td>{value.name}</td>
                    <td>{value.id}</td>
                    <td>{value.city}</td>
                    <td>{value.country}</td>
                </tr>
            ));
        }
        else return null;
    };

    handleCompanyInput = (e) => {
        let company = e.target.value;
        let companyArray = scripts.usersFromCompany(company);
        this.setState({
            companyArray: companyArray
        });
    };

    printCompanyUsers = () => {
        if (this.state.companyArray && this.state.companyArray[0] !== undefined) {
            return (this.state.companyArray.map((value) =>
                <tr>
                    <td>{value.name}</td>
                    <td>{value.id}</td>
                    <td>{value.email}</td>
                </tr>
            ));
        }
        else return null;
    };


    handleUserTierAndNumOfProperties = (e) => {
        let stateName = e.target.placeholder;
        let state = e.target.value;

        this.setState({
            stateName: state
        })
    };

    printUserSubscriptionTierAndNumberOfProperties = () => {
        if (this.state.userTierAndNumberOfProperties && this.state.userTierAndNumberOfProperties[0] !== undefined) {
            return (this.state.userTierAndNumberOfProperties.map((value) =>
                <tr>
                    <td>{value.id}</td>
                    <td>{value.name}</td>
                    <td>{value.tier}</td>
                    <td>{value.properties}</td>
                </tr>
            ));
        }
        else return null;
    };

    handleFindUserTierClick = () => {
      const tier = document.getElementById("Tier").value;
      const greaterOrLess = document.getElementById("GreaterOrLess").value;
      const numOfProperties = parseInt(document.getElementById("NumberOfProperties").value);

      //const greaterThan = document.getElementById("Greater Than").value;
      //const lessThan = document.getElementById("Less Than").value;
       // let greaterOrLess = "Less Than";
       //
       // if (greaterThan === true) {
       //    greaterOrLess = "Greater Than";
       // }

      const userTierAndNumberOfProperties = scripts.subscriptionAndProperties(tier, greaterOrLess, numOfProperties);

      this.setState({
          userTierAndNumberOfProperties: userTierAndNumberOfProperties
        })
    };

    printUserDifferentToProperty = () => {

        const UserDifferentToPropertyArray = scripts.usersFromDifferentCity();

        if (UserDifferentToPropertyArray && UserDifferentToPropertyArray[0] !== undefined) {
            return (UserDifferentToPropertyArray.map((value) =>
                <tr>
                    <td>{value.name}</td>
                    <td>{value.id}</td>
                    <td>{value.city}</td>
                </tr>
            ));
        }
        else return null;
    };

    handleFindBookings = (e) => {
        let stateName = e.target.placeholder;
        let state = e.target.value;

        this.setState({
            stateName: state
        })
    };

    printBookingsOfPeriod = () => {
        if (this.state.bookingForPeriodArray && this.state.bookingForPeriodArray[0] !== undefined) {
            return (this.state.bookingForPeriodArray.map((value) =>
                <tr>
                    <td>{value.id}</td>
                    <td>{value.startDate}</td>
                    <td>{value.endDate}</td>
                    <td>{value.timeZone}</td>
                </tr>
            ));
        }
        else return null;
    };

    handleFindBookingsClick = () => {
        const startDate = document.getElementById("StartDate").value;
        const endDate = document.getElementById("EndDate").value;

        const bookingForPeriodArray = scripts.bookingsForPeriod(startDate, endDate);

        this.setState({
            bookingForPeriodArray: bookingForPeriodArray
        })
    };

    handleFindBookingsOfLength = (e) => {
        let stateName = e.target.placeholder;
        let state = e.target.value;

        this.setState({
            stateName: state
        })
    };

    printBookingsOfLength = () => {
        if (this.state.bookingForLength && this.state.bookingForLength[0] !== undefined) {
            return (this.state.bookingForLength.map((value) =>
                <tr>
                    <td>{value.id}</td>
                    <td>{value.duration}</td>
                </tr>
            ));
        }
        else return null;
    };

    handleFindBookingsOfLengthClick = () => {
        const moreOrLessThan = document.getElementById("moreOrLessThan").value;
        const length = document.getElementById("length").value;
        const bookingForLength = scripts.bookingsLength(moreOrLessThan, length);

        this.setState({
            bookingForLength: bookingForLength
        })
    };

    // radioOnChange = (e) => {
    //     console.log(e.target);
    //
    //     this.setState((prevState) => ({
    //         checked1: !prevState.checked1,
    //         checked2: !prevState.checked2
    //     }));
    // };

  render() {
    return (
      <div className="App">
          <h1>Properly Coding Challenge</h1>
          <hr></hr>
          <div className="Answer">
              <h4>All users from a particular city</h4>
              <label>Search City: </label>
              <input value={this.state.value} placeholder={"City"} onChange={this.handleCityInput}/>
            <table className={"Results"}>
                <thead>
                <tr>
                    <th>
                        Name:
                    </th>
                    <th>
                        Id:
                    </th>
                    <th>
                        City:
                    </th>
                    <th>
                        Country:
                    </th>
                </tr>
                </thead>
                <tbody>
                {this.printCities()}
                </tbody>
            </table>
          </div>
          <hr></hr>
          <div className="Answer">
              <h4>All users from particular company e.g. @future.com</h4>
              <label>Search Company: </label>
              <input value={this.state.value} placeholder={"@mail.com"} onChange={this.handleCompanyInput}/>
              <table className={"Results"}>
                  <thead>
                  <tr>
                      <th>
                          Name:
                      </th>
                      <th>
                          Id:
                      </th>
                      <th>
                          Email:
                      </th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.printCompanyUsers()}
                  </tbody>
              </table>
          </div>
          <hr></hr>
          <div className="Answer">
              <h4>All users from tier and number of properties</h4>
              <label>Tier: </label>
              <input onChange={this.handleUserTierAndNumOfProperties} value={this.state.Tier} placeholder={"Free Tier"} id={"Tier"}/>
              {/*<div className="radio">*/}
                  {/*<label>*/}
                      {/*<input id={"Greater Than"} type="radio" value={this.state.checked1} checked={this.state.checked1} onChange={this.radioOnChange} />*/}
                      {/*Greater Than*/}
                  {/*</label>*/}
              {/*</div>*/}
              {/*<div className="radio">*/}
                  {/*<label>*/}
                      {/*<input id={"Less Than"} type="radio" value={this.state.checked2} checked={this.state.checked2} onChange={this.radioOnChange} />*/}
                      {/*Less Than*/}
                  {/*</label>*/}
              {/*</div>*/}
              <label>Greater or Less: </label>
              <input onChange={this.handleUserTierAndNumOfProperties} value={this.state.GreaterOrLess} placeholder={"Greater Than"} id={"GreaterOrLess"}/>
              <label># Propeties: </label>
              <input onChange={this.handleUserTierAndNumOfProperties} value={this.state.NumberOfProperties} placeholder={"NumberOfProperties"} id={"NumberOfProperties"}/>
              <button onClick={this.handleFindUserTierClick}>Find</button>
              <table className={"Results"}>
                  <thead>
                  <tr>
                      <th>
                          Id:
                      </th>
                      <th>
                          Name:
                      </th>
                      <th>
                          Tier:
                      </th>
                      <th>
                          Properties:
                      </th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.printUserSubscriptionTierAndNumberOfProperties()}
                  </tbody>
              </table>
          </div>
          <hr></hr>
          <div className="Answer">
              <h4>All users that live in a different city than their properties</h4>
              <table className={"Results"}>
                  <thead>
                  <tr>
                      <th>
                          Name:
                      </th>
                      <th>
                          Id:
                      </th>
                      <th>
                          City:
                      </th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.printUserDifferentToProperty()}
                  </tbody>
              </table>
          </div>
          <hr></hr>
          <div className="Answer">
              <h4>Print bookings for dates: </h4>
              <label>Start Date: </label>
              <input onChange={this.handleFindBookings} value={this.state.StartDate} placeholder={"YYYY-MM-DD HH:mm"} id={"StartDate"}/>
              <label>End Date: </label>
              <input onChange={this.handleFindBookings} value={this.state.EndDate} placeholder={"YYYY-MM-DD HH:mm"} id={"EndDate"}/>
              <button onClick={this.handleFindBookingsClick}>Find</button>
              <table className={"Results"}>
                  <thead>
                  <tr>
                      <th>
                          Id:
                      </th>
                      <th>
                          Start Date:
                      </th>
                      <th>
                          End Date:
                      </th>
                      {/*<th>*/}
                          {/*Time Zone:*/}
                      {/*</th>*/}
                  </tr>
                  </thead>
                  <tbody>
                  {this.printBookingsOfPeriod()}
                  </tbody>
              </table>
          </div>
          <hr></hr>
          <div className="Answer">
              <h4>Bookings of length: </h4>
              <label>Greater Than/ Less Than: </label>
              <input onChange={this.handleFindBookingsOfLength} value={this.state.moreOrLessThan} placeholder={"Greater Than"} id={"moreOrLessThan"}/>
              <label>Length: </label>
              <input onChange={this.handleFindBookingsOfLength} value={this.state.length} placeholder={"Days"} id={"length"}/>
              <button onClick={this.handleFindBookingsOfLengthClick}>Find</button>
              <table className={"Results"}>
                  <thead>
                  <tr>
                      <th>
                          Id:
                      </th>
                      <th>
                          Length of stay (days):
                      </th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.printBookingsOfLength()}
                  </tbody>
              </table>
          </div>
      </div>

    );
  }
}

export default App;
