import { InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    Community: {
      keyFields: ["url"]
    },
    User: {
      keyFields: ["username"]
    }
  }
});