import { queryTransactionsGQL, ARWEAVE_GATEWAYS } from 'arweavekit/graphql';
import fs from 'fs';

// Define queryString with $cursor variable
const queryString = `
query($first: Int, $cursor: String) {
    transactions(first: $first, after: $cursor) {
        pageInfo {
            hasNextPage
        }
        edges {
            cursor
            node {
                id
                owner {
                    address
                }
                data {
                    size
                }
                block {
                    height,
                    timestamp
                }
                tags {
                    name,
                    value
                }
            }
        }
    }
}`;

// Initialize gateway index
let gatewayIndex = 0;

// Define options
const options = {
  gateway: ARWEAVE_GATEWAYS[gatewayIndex],
  filters: {
    first: 100,
    after: null 
  }
};


(async () => {
    let transactions = await fetchAllTransactions();
    console.log("Fetched a total of", transactions.length, "transactions");
})();