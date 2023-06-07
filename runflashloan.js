import pkg from 'hardhat';
const { ethers } = pkg;
async function main() {
  const contractAddress = "0xf0cf0E2d60ff2f7f6B0a0C114578946777882B8b"; // Replace with the actual contract address
  const abi = [
	{
		"inputs": [
			{
				"internalType": "contract ISwapRouter",
				"name": "_swapRouter",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_factory",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_WETH9",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "WETH9",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "factory",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token0",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "token1",
				"type": "address"
			},
			{
				"internalType": "uint24",
				"name": "fee1",
				"type": "uint24"
			},
			{
				"internalType": "uint256",
				"name": "amount0",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount1",
				"type": "uint256"
			},
			{
				"internalType": "uint24",
				"name": "fee2",
				"type": "uint24"
			},
			{
				"internalType": "uint24",
				"name": "fee3",
				"type": "uint24"
			}
		],
		"name": "initFlash",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "refundETH",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "swapRouter",
		"outputs": [
			{
				"internalType": "contract ISwapRouter",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amountMinimum",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "sweepToken",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "fee0",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "fee1",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "uniswapV3FlashCallback",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountMinimum",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "unwrapWETH9",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]

  const provider = new ethers.providers.JsonRpcProvider(); // Add your provider URL if necessary
  const signer = provider.getSigner();

  const flashloanContract = new ethers.Contract(contractAddress, abi, signer);

  const token0 = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"; // 0.30% tier 
  const token1 = "0x77A6f2e9A9E44fd5D5C3F9bE9E52831fC1C3C0A0"; // 0.30% tier 
  const fee1 = 3000; // 0.30% tier 
  const amount0 = 100;
  const amount1 = 10;
  const fee2 = 2000; // 0.20% tier 
  const fee3 = 2500; // 0.30% tier 

  try {
    const overrides = {
      gasLimit: 30000000,
    };

    const result = await flashloanContract.initFlash(
      token0,
      token1,
      fee1,
      amount0,
      amount1,
      fee2,
      fee3,
      overrides
    );
    console.log("Transaction result:", result);

    // Access specific data from the result
    // For example, if the result is an object with a 'data' property
    const data = await result.data;
    console.log("Data from the result:", data);

    // Additional data processing and logging as needed
  } catch (error) {
    console.error("Error executing flashloan:", error);
    process.exitCode = 1;
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
