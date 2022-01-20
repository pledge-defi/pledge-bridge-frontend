const { exec } = require('child_process');

// exec(
//   `abi-types-generator './src/abis/Erc20.json' --output='./src/contracts' --name=Erc20 --provider=web3`,
// );
// exec(
//   `abi-types-generator './src/abis/NewERC20.json' --output='./src/contracts' --name=NewERC20 --provider=web3`,
// );
// exec(
//   `abi-types-generator './src/abis/PledgerBridgeBSC.json' --output='./src/contracts' --name=PledgerBridgeBSC --provider=web3`,
// );
exec(
  `abi-types-generator './src/abis/PledgerBridgeETH.json' --output='./src/contracts' --name=PledgerBridgeETH --provider=web3`,
);
