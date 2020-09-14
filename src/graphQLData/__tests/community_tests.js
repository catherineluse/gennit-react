// add community

// mutation {
//   addCommunity(input: [
//     {
//       description: "all about cats",
//       name: "cats"
//       url: "cats",
//       Organizer: {
//         username: "catherine.luse@gmail.com"
//       }
//     }
//   ]) {
//     community {
//       description
//       name
//       url
//       Organizer {
//         username
//       }
//     }
//   }
// }

// get community by URL

// query {
//   getCommunity(url: "cats") {
//     name
//     url
//     description
//     Organizer {
//         username
//     }
//   }
// }

// get communities

// query {
//   queryCommunity {
//     name
//     url
//     description
//     Organizer {
//         username
//     }
//   }
// }

// delete community

// mutation {
//   deleteCommunity( filter: {
//     url: {
//       eq: "dogs"
//     }
//   }) {
//     community {
//       url
//     }
//   }
// }

// update community

// mutation {
//   updateCommunity( input: {
//     filter: {
//       url: {
//         eq: "dogs"
//       }
//     },
//     set: {
//       description: "We are dog people"
//     }
//   }) {
//     community {
//       url
//       name
//       description
//       Organizer {
//         username
//       }
//     }
//   }
// }