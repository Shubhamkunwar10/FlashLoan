"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var hardhat_1 = require("hardhat");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var contractAddress, abi, provider, signer, flashloanContract, token0, token1, fee1, amount0, amount1, fee2, fee3, overrides, result, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contractAddress = "0xf0cf0E2d60ff2f7f6B0a0C114578946777882B8b";
                    abi = [
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
                    ];
                    provider = new hardhat_1.ethers.providers.JsonRpcProvider();
                    signer = provider.getSigner();
                    flashloanContract = new hardhat_1.ethers.Contract(contractAddress, abi, signer);
                    token0 = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
                    token1 = "0x77A6f2e9A9E44fd5D5C3F9bE9E52831fC1C3C0A0";
                    fee1 = 3000;
                    amount0 = 100;
                    amount1 = 10;
                    fee2 = 2000;
                    fee3 = 2500;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    overrides = {
                        gasLimit: 30000000,
                    };
                    return [4 /*yield*/, flashloanContract.initFlash(token0, token1, fee1, amount0, amount1, fee2, fee3, overrides)];
                case 2:
                    result = _a.sent();
                    console.log("Transaction result:", result);
                    return [4 /*yield*/, result.data];
                case 3:
                    data = _a.sent();
                    console.log("Data from the result:", data);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error executing flashloan:", error_1);
                    process.exitCode = 1;
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(function (error) {
    console.error(error);
    process.exitCode = 1;
});
