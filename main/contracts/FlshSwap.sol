// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;
import "./aave/FlashLoanSimpleReceiverBase.sol";
import "./interfaces/IPoolAddressesProvider.sol";
import "./interfaces/IERC20.sol";
import "./interfaces/IFlashLoanSimpleReceiver.sol";
import "./interfaces/IUniswap.sol";

contract Flashloan is FlashLoanSimpleReceiverBase {
    IUniswap public uniswap;

    constructor(address _addressProvider, address _uniswapAddress) FlashLoanSimpleReceiverBase(IPoolAddressesProvider(_addressProvider)) {
        uniswap = IUniswap(_uniswapAddress);
    }

    /**
        This function is called after your contract has received the flash loaned amount
     */
    function flashLoan(
        address _loanToken,
        uint256 _amount,
        address _swapToken,
        uint256 _swapAmount
    )
        external
    {
        address receiverAddress = address(this);
        address asset = _loanToken;
        uint256 amount = _amount;
        bytes memory params = abi.encode(_swapToken, _swapAmount);
        uint16 referralCode = 0;

        POOL.flashLoanSimple(
            receiverAddress, asset, amount, params, referralCode
        );
    }

    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
        (address swapToken, uint256 swapAmount) = abi.decode(params, (address, uint256));
        
        // Perform the flash swap
        IERC20(asset).approve(address(uniswap), amount);
        uniswap.swap(amount, swapAmount, asset, swapToken, address(this), block.timestamp);

        // Repay the flash loan
        uint256 amounttoSendBack = amount + premium;
        IERC20(asset).approve(address(POOL), amounttoSendBack);

        return true;
    }
}
