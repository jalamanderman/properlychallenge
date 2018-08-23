
// Convert JSON files to array variables

const usersArray = require("../store/users.json");
const bookingsArray = require("../store/bookings.json");
const subscriptionsArray = require("../store/subscriptions.json");
const propertiesArray = require("../store/properties.json");

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

    usersArray.forEach((item) => {
        lat = item.location[0];
        long = item.location[1];
        convertedCity = cityreversegeo(lat,long);

        if (convertedCity[0].city === city) {
            let userInfo = {
                id: item.id,
                name: item.name,
                city: convertedCity[0].city,
                country: convertedCity[0].country
            };
            filteredUsers.push(userInfo);
          }
     });
     return filteredUsers;
}

//All users from a particular company (a user of a company is a user that has the same email domain. E.g for john@getproperly.com and company@getproperly.com "getproperly.com" is the email domain)

function usersFromCompany (companyDomain) {
    return usersArray.filter((item) =>
        item.email.includes(companyDomain));
}


//All users from Free tier subscription which have more than 6 properties
//All users from Premium tier subscription which have less than 4 properties
//hash map

 function subscriptionAndProperties (tier, greaterOrless, num) {
     //Master array to concat the array data
     let usersMasterArray = [];
     let returnedUsers = [];

     //Change Free to Free Tier for database call
     if (tier === "Free") {
         tier = "Free Tier";
     }

     usersArray.filter((user) => {
         subscriptionsArray.filter((sub) => {
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

     usersMasterArray.filter((user) => {
         propertiesArray.filter((property) => {
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
        propertiesArray.filter((property) => {
            if(user.id === property.userId) {
                userLat = user.location[0];
                userLong = user.location[1];

                propertyLat = property.location[0];
                propertyLong = property.location[1];

                //Convert coordinates to City
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
    //Remove duplicate values
    return _.uniqBy(filteredUsers, 'id');
}

//TASK GROUP 2
// - All bookings for a **given period** (start and end dates).
// - The bookings returned should have the startDate and endDate formated to dd/MM/YYYY HH:mm using the property timeZone.
// - The **given period** is also provided in the Property timeZone.
//

function bookingsForPeriod (startD, endD) {
    let startISO;
    let endISO;
    let bookings = [];

    bookingsArray.filter((item) => {
        //Convert to readable time stamp
        startISO = moment(item.startDate).format("YYYY-MM-DD HH:mm");
        endISO = moment(item.endDate).format("YYYY-MM-DD HH:mm");

        if (startISO >= startD && endISO <= endD) {
            let booking = {
                id: item.id,
                startDate: startISO,
                endDate: endISO
            };
            bookings.push(booking);
        }


    });
    return bookings;
}

// - All bookings longer or equal to 25 days.
// - All bookings shorter or equal to 3 days.
// - All Properties with Bookings with 1 day or less between bookings

function bookingsLength (moreOrLessThan, days) {
    days *= 24;
    let momentDiff;
    let dur;
    let hours;
    let bookings = [];

    bookingsArray.filter((item) => {
        momentDiff = moment(item.endDate,"YYYY-MM-DD HH:mm:ss").diff(moment(item.startDate,"YYYY-MM-DD HH:mm:ss"));
        dur = moment.duration(momentDiff);
        hours = parseInt(dur.asHours());

        let hoursBackToDays = Math.floor(hours/24);

        if (moreOrLessThan === "Greater Than") {
            if (hours >= days) {
                let booking = {
                    id: item.id,
                    duration: hoursBackToDays,
                };
                bookings.push(booking);
            }
        }
        else if (moreOrLessThan === "Less Than") {
            if (hours <= days) {
                let booking = {
                    id: item.id,
                    duration: hoursBackToDays,
                };
                bookings.push(booking);
            }
        }
    });
    return bookings;
}

export {usersFromCity, usersFromCompany, subscriptionAndProperties, usersFromDifferentCity, bookingsForPeriod, bookingsLength};