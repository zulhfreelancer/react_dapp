import React, { Component } from "react";
import { drizzleConnect } from "drizzle-react";
import { ContractData, ContractForm } from "drizzle-react-components";
import "./App.css";

class App extends Component {
  render() {
    const { drizzleStatus, accounts } = this.props;

    if (drizzleStatus.initialized) {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Tutorial Token</h1>
            <p>
              <strong>Web3 Account:</strong>{" "}
              {accounts[0]}
            </p>
            <p>
              <strong>Total Supply</strong>:{" "}
              <ContractData
                contract="TutorialToken"
                method="totalSupply"
                methodArgs={[{ from: accounts[0] }]}
              />{" "}
              <ContractData
                contract="TutorialToken"
                method="symbol"
                hideIndicator
              />
            </p>
            <p>
              <strong>My Balance</strong>:{" "}
              <ContractData
                contract="TutorialToken"
                method="balanceOf"
                methodArgs={[accounts[0]]}
              />
            </p>
          </header>
          <h3>Send Tokens</h3>
          <div className="App-intro">
            <ContractForm
              contract="TutorialToken"
              method="transfer"
              labels={["To Address", "Amount to Send"]}
            />
          </div>
        </div>
      );
    }

    return <div>Loading Dapp</div>;
  }
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    TutorialToken: state.contracts.TutorialToken,
    web3: state.web3
  }
}

const AppContainer = drizzleConnect(App, mapStateToProps);
export default AppContainer;
