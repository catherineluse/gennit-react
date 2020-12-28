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

export const showSideNavVar = makeVar(true);