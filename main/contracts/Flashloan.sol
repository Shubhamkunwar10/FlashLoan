// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;
import "./aave/FlashLoanSimpleReceiverBase.sol";
import "./interfaces/IPoolAddressesProvider.sol";
import "./interfaces/IERC20.sol";
import "./interfaces/IFlashLoanSimpleReceiver.sol";

contract Flashloan is FlashLoanSimpleReceiverBase {

    constructor(address _addressProvider) FlashLoanSimpleReceiverBase(IPoolAddressesProvider(_addressProvider)) {}

    /**
        This function is called after your contract has received the flash loaned amount
     */
    function flashLoan(
        address _loanToken,uint256 _amount
    )
        external
    {
            address receiverAddress =address(this);
            address asset=_loanToken;
            uint256 amount=_amount;
            bytes memory params= "";
            uint16 referralCode=0;

            POOL.flashLoanSimple(
                    receiverAddress, asset,amount, params, referralCode
            );

    }


    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) public returns (bool){

        uint256 amounttoSendBack= amount+premium;
        IERC20(asset).approve(address(POOL),amounttoSendBack);

        return true;

    }


}
