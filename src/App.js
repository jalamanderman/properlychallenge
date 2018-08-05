import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as scripts from './scripts/challengeQuestions.js';

class App extends Component {

    constructor (props) {
        super(props);
        this.state = {};
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


  render() {
    return (
      <div className="App">
          <div>
              <h4>All users from particular city</h4>
            <input value={this.state.value} placeholder={"City"} onChange={this.handleCityInput}/>
            <table>
                <thead>
                <tr>
                    <th>
                        Name:
                    </th>
                    <th>
                        Id:
                    </th>
                </tr>
                </thead>
                <tbody>
                {this.printCities()}
                </tbody>
            </table>
          </div>
          <div>
              <h4>All users from particular company e.g. @future.com</h4>
              <input value={this.state.value} placeholder={"@mail.com"} onChange={this.handleCompanyInput}/>
              <table>
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
          <div>
              <h4>All users from tier and number of properties</h4>
              <input onChange={this.handleUserTierAndNumOfProperties} value={this.state.Tier} placeholder={"Tier"} id={"Tier"}/>
              <input onChange={this.handleUserTierAndNumOfProperties} value={this.state.GreaterOrLess} placeholder={"GreaterOrLess"} id={"GreaterOrLess"}/>
              <input onChange={this.handleUserTierAndNumOfProperties} value={this.state.NumberOfProperties} placeholder={"NumberOfProperties"} id={"NumberOfProperties"}/>
              <button onClick={this.handleFindUserTierClick}>Find</button>
              <table>
                  <thead>
                  <tr>
                      <th>
                          Name:
                      </th>
                      <th>
                          Id:
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
          <div>
              <h4>All users that live in a different city than their properties</h4>
              <table>
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
      </div>

    );
  }
}

export default App;
