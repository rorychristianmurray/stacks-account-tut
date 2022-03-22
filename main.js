const { fetch } = require("cross-fetch");
const {
  makeRandomPrivKey,
  privateKeyToString,
  getAddressFromPrivateKey,
  TransactionVersion,
} = require("@stacks/transactions");
const {
  AccountsApi,
  FaucetsApi,
  Configuration,
} = require("@stacks/blockchain-api-client");

const testAddress = 'ST1CXEHKVG2QFP17X4P7NHX2MJZ53NNHRYBB6TNDS'

const apiConfig = new Configuration({
  fetchApi: fetch,
  // for mainnet, replace `testnet` with `mainnet`
  basePath: "https://stacks-node-api.testnet.stacks.co",
});

const privateKey = makeRandomPrivKey();

const stacksAddress = getAddressFromPrivateKey(
  privateKeyToString(privateKey),
  TransactionVersion.Testnet // remove for Mainnet addresses
);

const accounts = new AccountsApi(apiConfig);

async function getAccountInfo() {
  const accountInfo = await accounts.getAccountInfo({
    principal: stacksAddress,
    proof: 0
  });

  return accountInfo;
}

async function runFaucetStx() {
  const faucets = new FaucetsApi(apiConfig);

  const faucetTx = await faucets.runFaucetStx({
    address: stacksAddress,
  });

  console.log("faucetTx : ", faucetTx)
  return faucetTx;
}

// generate address
// log address
// run faucet tx
// check back later for address history

// console.log("Stacks Testnet address: ", stacksAddress)

// runFaucetStx()

// const checkAcct = getAccountInfo().then(res => console.log(res))

// const faucetTx = runFaucetStx().then(res => console.log(res))

// check history

async function getAccountTransactions() {
  const history = await accounts.getAccountTransactions({
    principal: testAddress,
  });

  console.log(history)
  return history;
}


// get account balances

async function getAccountBalance() {
  const balances = await accounts.getAccountBalance({
    principal: testAddress,
  });

  console.log(balances)
  return balances;
}

getAccountBalance()