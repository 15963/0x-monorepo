import { SignedOrder, TransactionReceiptWithDecodedLogs } from '0x.js';
import { BigNumber } from '@0xproject/utils';
import { Dispatch } from 'redux';

import { ActionTypes, AssetToken } from '../types';

import { State } from './reducer';

export class Dispatcher {
    private _dispatch: Dispatch<State>;
    constructor(dispatch: Dispatch<State>) {
        this._dispatch = dispatch;
    }
    public updateNetworkId(networkId: number) {
        this._dispatch({
            data: networkId,
            type: ActionTypes.UpdateNetworkId,
        });
    }
    public updateUserAddress(address: string) {
        this._dispatch({
            data: address,
            type: ActionTypes.UpdateUserAddress,
        });
    }
    public updateUserWeiBalance(address: string, balance: BigNumber) {
        this._dispatch({
            data: { address, balance },
            type: ActionTypes.UpdateUserWeiBalance,
        });
    }
    public updateUserTokenBalance(address: string, balance: BigNumber, token: AssetToken) {
        this._dispatch({
            data: { address, balance, token },
            type: ActionTypes.UpdateUserTokenBalance,
        });
    }
    public updateSelectedToken(token: AssetToken) {
        this._dispatch({
            data: token,
            type: ActionTypes.UpdateSelectedToken,
        });
    }
    public transactionSubmitted(txHash: string) {
        this._dispatch({
            data: txHash,
            type: ActionTypes.TransactionSubmitted,
        });
    }
    public transactionMined(receipt: TransactionReceiptWithDecodedLogs) {
        this._dispatch({
            data: receipt,
            type: ActionTypes.TransactionMined,
        });
    }
}