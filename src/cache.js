import { InMemoryCache, makeVar } from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    Community: {
      keyFields: ["url"]
    },
    User: {
      keyFields: ["username"]
    },
    Query: {
      fields: {
        showSideNav: {
          read() {
            return showSideNavVar();
          }
        }
      }
    }
  }
});
console.log('cache is ', cache)

export const showSideNavVar = makeVar(true);