import { ethers } from "hardhat";

async function main() {
  const _swapRouter = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
  const _factory = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

  const USDC_ADDRESS = "0x65aFADD39029741B3b8f0756952C74678c9cEC93";
  const PooladdressProvider="0xC911B590248d127aD18546B186cC6B324e99F02c"
    
  
  const Flashloan = await ethers.getContractFactory("Flashloan");
  const flashloan = await Flashloan.deploy(
    PooladdressProvider
  );
  
  await flashloan.deployed();
   console.log("Flashloan contract deployed to:", flashloan.address);
  
  

  
  // // Deploy Flashloan contract
  //   const Flashloan = await ethers.getContractFactory("Flashloan");
  //   const flashloan = await Flashloan.deploy(
  //     _swapRouter,
  //     _factory,
  //     WETH_ADDRESS
  //   );
    

    // await flashloan.deployed();
    
    // console.log("Flashloan contract deployed to:", flashloan.address);
        // Fee: 1 ETH * 0.3% = 0.003 ETH
    // const token0 = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"; // 0.30% tier 
    // const token1 = "0x77A6f2e9A9E44fd5D5C3F9bE9E52831fC1C3C0A0"; // 0.30% tier 
    // const fee1 = 4000; // 0.30% tier 
    // const amount0 = 1;
    // const amount1 = 1;
    // const fee2 = 2000; // 0.20% tier 
    // const fee3 = 2000; // 0.30% tier 


// Execute flashloan to borrow 1 ETH.
try {

  const gasPrice = ethers.utils.parseUnits("50000", "gwei"); // Custom gas price in Gwei
  const gasLimit = 50000000; // Custom gas limit

  const overrides = {

    gasLimit: gasLimit,
  };

  const result = await flashloan.flashLoan(USDC_ADDRESS,100000000 ,overrides);
  console.log("Transaction result:", result);

  // Access specific data from the result
  // For example, if the result is an object with a 'data' property
  const data =await result.data;
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
