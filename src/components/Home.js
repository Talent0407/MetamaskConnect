import { Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import { StyledButton } from "./StyledButton";

let address;
export default function Home() {
  const [currentChain, setCurrentChain] = useState(0);

  const chainIds = {
    1: "Ethereum Mainnet",
    5: "GoerliETH",
    11155111: "SepoliaETH",
    80001: "Polygon Testnet",
    137: "Polygon Mainnet",
    56: "Binance Mainnet",
  };

  const [connectedWallet, setConnectedWallet] = useState(null);
  const targetNetworkId = "0x1";

  const connectMetamask = async () => {
    const ethereum = await window.ethereum;
    if (!ethereum) {
      return;
    }
    // connect metamask to platform
    const connected_wallet = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (connected_wallet) {
      // generate the string of connected address
      address =
        connected_wallet[0].substr(0, 7) +
        "..." +
        connected_wallet[0].substr(
          connected_wallet[0].length - 7,
          connected_wallet[0].length
        );
      setConnectedWallet("Your Account : " + address);
      setCurrentChain(parseInt(window.ethereum.chainId, 16));
    }
  };

  const switchNetwork = async () => {
    // call to change the chain to the ethereum mainnet
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: targetNetworkId }],
    });
  };

  window.addEventListener("load", function () {
    if (window.ethereum) {
      // detect Metamask account change
      window.ethereum.on("accountsChanged", function (accounts) {
        console.log("accountsChanges", accounts);
      });

      // detect Network account change
      window.ethereum.on("networkChanged", function (networkId) {
        console.log("networkChanged", networkId);
        setCurrentChain(networkId);
      });
    } else {
      console.warn("No web3 detected.");
    }
  });

  return (
    <div>
      <div className="p-10">
        <Divider />
        <div className="flex justify-center pt-4">
          <StyledButton
            variant="outlined"
            className="h-12"
            onClick={connectMetamask}
          >
            {connectedWallet ? connectedWallet : "Connect Wallet"}
          </StyledButton>
        </div>
        <Typography
          variant="h7"
          component="h2"
          className="flex justify-center py-4"
        >
          <label className="mx-4">
            {currentChain === 0
              ? "Not Connected"
              : "Current Chain is " + chainIds[currentChain]}
            {"."}
          </label>
          {currentChain === "1" ? (
            ""
          ) : (
            <>
              <button className="mx-2 border-b-2 text-red-400" onClick={switchNetwork}>
                Click here
              </button> to change the chain to the Ethereum Mainnet.
            </>
          )}
        </Typography>
        <Divider />
        <Typography
          variant="h6"
          component="h2"
          className="flex justify-center py-4"
        >
          Maybe add other sections and functions go on...
        </Typography>
      </div>
    </div>
  );
}
