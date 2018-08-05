
// Convert JSON files to array variables

const users = require("../store/users.json");
const usersArray = Object.keys(users).map(function(k) { return users[k] });

const bookings = require("../store/bookings.json");
const bookingsArray = Object.keys(bookings).map(function(k) { return bookings[k] });

const subscriptions = require("../store/subscriptions.json");
const subscriptionsArray = Object.keys(subscriptions).map(function(k) { return subscriptions[k] });

const properties = require("../store/properties.json");
const propertiesArray = Object.keys(properties).map(function(k) { return properties[k] });

// Imports
const moment = require('moment');
const cityreversegeo = require('city-reverse-geocoder');
const _ = require('lodash');

//TASK GROUP 1
//All users from a particular city

function usersFromCity (city) {
     let lat;
     let long;
     let convertedCity;
     let filteredUsers = [];

     usersArray.filter((item) => {
        lat = item.location[0];
        long = item.location[1];
        convertedCity = cityreversegeo(lat,long);

        if (convertedCity[0].city === city) {
            filteredUsers.push(item);
          }
     });
     return filteredUsers;
}

//All users from a particular company (a user of a company is a user that has the same email domain. E.g for john@getproperly.com and company@getproperly.com "getproperly.com" is the email domain)

function usersFromCompany (companyDomain) {
    let filteredUsers = [];
    usersArray.filter((item) => {
        if (item.email.includes(companyDomain)){
        filteredUsers.push(item);}
    });
    return filteredUsers;
}

//All users from Free tier subscription which have more than 6 properties
//All users from Premium tier subscription which have less than 4 properties
//hash map

 function subscriptionAndProperties (tier, greaterOrless, num) {

     let usersMasterArray = [];
     let returnedUsers = [];

     usersArray.forEach((user) => {
        subscriptionsArray.forEach((sub) => {
            if(user.subscriptionId === sub.id) {
                let userInfo = {
                    id: user.id,
                    name: user.name,
                    tier: sub.name,
                    properties: 0
                };
                usersMasterArray.push(userInfo);
            }
         }) ;
     });

     usersMasterArray.forEach((user) => {
        propertiesArray.forEach((property) => {
           if (user.id === property.userId) {
                user.properties ++;
               }
           })
        });

     usersMasterArray.filter((user) => {
             if (greaterOrless === "Greater Than" && user.properties > num) {
                 if (user.tier === tier) {
                     returnedUsers.push(user);
                 }
             }
             else if (greaterOrless === "Less Than" && user.properties < num) {
                if (user.tier === tier) {
                    returnedUsers.push(user);
                 }
            }
         });
     return returnedUsers;
}

//All users that live in a different city than their properties

function usersFromDifferentCity () {
    let userLat;
    let userLong;
    let propertyLat;
    let propertyLong;
    let userConvertedCity;
    let propertyConvertedCity;
    let filteredUsers = [];

    usersArray.filter((user) => {
        propertiesArray.forEach((property) => {
            if(user.id === property.userId) {
                userLat = user.location[0];
                userLong = user.location[1];

                propertyLat = property.location[0];
                propertyLong = property.location[1];

                userConvertedCity = cityreversegeo(userLat,userLong);
                propertyConvertedCity = cityreversegeo(propertyLat,propertyLong);

                 if (userConvertedCity[0].city !== propertyConvertedCity[0].city) {
                     let userInfo = {
                         id: user.id,
                         name: user.name,
                         city: userConvertedCity[0].city
                     };
                      filteredUsers.push(userInfo);
                  }
            }
        });
    });
    return _.uniqBy(filteredUsers, 'id');
}

//console.log(usersFromDifferentCity());

//TASK GROUP 2
// - All bookings for a **given period** (start and end dates).
// - The bookings returned should have the startDate and endDate formated to dd/MM/YYYY HH:mm using the property timeZone.
// - The **given period** is also provided in the Property timeZone.
//

const bookingsForPeriod = (startD, endD) => {
    let startISO;
    let endISO;
    let bookings = [];

    bookingsArray.forEach((item) => {
        startISO = moment(item.startDate).format("YYYY-MM-DD HH:mm");
        endISO = moment(item.endDate).format("YYYY-MM-DD HH:mm");

        if (startISO >= startD && endISO <= endD) {
            bookings.push(item);
        }
    });
    return bookings;
};

//console.log(bookingsForPeriod("2018-02-15 01:00", "2018-02-25 01:00"));

// - All bookings longer or equal to 25 days.
// - All bookings shorter or equal to 3 days.
// - All Properties with Bookings with 1 day or less between bookings

const bookingsLength = (moreOrLessThan, days) => {
    days *= 24;
    let momentDiff;
    let dur;
    let hours;
    let bookings = [];

    bookingsArray.filter((item) => {
        momentDiff = moment(item.endDate,"YYYY-MM-DD HH:mm:ss").diff(moment(item.startDate,"YYYY-MM-DD HH:mm:ss"));
        dur = moment.duration(momentDiff);
        hours = parseInt(dur.asHours());

        if (moreOrLessThan === "More Than Or Equal") {
            if (hours >= days) {
                bookings.push(item);
            }
        }
        else if (moreOrLessThan === "Less Than Or Equal") {
            if (hours <= days) {
                bookings.push(item);
                console.log(hours);
            }
        }
    });
    return bookings;
};
//console.log(bookingsLength("Less Than Or Equal", 1));

// - With the functions created expose them in a restful application and create a dashboard (simple UI) to display the results

export {usersFromCity, usersFromCompany, subscriptionAndProperties, usersFromDifferentCity};