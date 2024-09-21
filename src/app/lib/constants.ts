export const ThirdwebClient = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;

export const flowChain = {
  // Required information for connecting to the network
  chainId: 545, // Chain ID of the network
  rpc: ["https://testnet.evm.nodes.onflow.org"], // Array of RPC URLs to use

  // Information for adding the network to your wallet (how it will appear for first time users) === \\
  // Information about the chain's native currency (i.e. the currency that is used to pay for gas)
  nativeCurrency: {
    decimals: 18,
    name: "FLOW",
    symbol: "FLOW",
  },
  shortName: "FLOW", // Display value shown in the wallet UI
  slug: "FLOW", // Display value shown in the wallet UI
  testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
  chain: "FLOW", // Name of the network
  name: "EVM on Flow Testnet", // Name of the network
};
