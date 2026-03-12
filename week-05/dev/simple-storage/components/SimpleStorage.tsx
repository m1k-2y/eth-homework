'use client'

import {parseEther} from "viem";

import {formatEther} from 'viem';

import {useEffect, useState} from 'react';

import { 
    useAccount,
    useReadContract,
    useWriteContract,
    useWaitForTransactionReceipt } from "wagmi";

const SimpleStorageAbi = [
    {
        name : 'getBalance',
        type : 'function',
        stateMutability : 'view',
        inputs : [{name : 'user', type : 'address'}],
        outputs : [{name : '', type : 'uint256'}],
    },
    {
        name : 'deposit',
        type : 'function',
        stateMutability : 'payable',
        inputs : [],
        outputs : [],
    },
    {
        name : 'withdraw',
        type : 'function',
        stateMutability : 'nonpayable',
        inputs : [{name : 'amount', type : 'uint256'}],
        outputs : [],
    }
] as const;

const STORAGE_ADDRESS = '0xFC304F029A2E15766b3f48F93d67EdF4C6Fa3933' as const;

export function Storage() {

    const [amount, setAmount] = useState('');

    const {address} = useAccount();

    const {data : balance, refetch} = useReadContract({
        address : STORAGE_ADDRESS,
        abi :  SimpleStorageAbi,
        functionName : 'getBalance',
        args : address? [address] : undefined,
    });

    const {
        writeContract,
        data : hash,
        isPending,
        error,
    } = useWriteContract();

    const {
        isLoading,
        isSuccess,
    } = useWaitForTransactionReceipt({hash});

    useEffect (() => {
        if (isSuccess) refetch();
    }, [isSuccess, refetch]);

    const onDeposit = () => {

        if (!amount) return; 

        writeContract({
            address : STORAGE_ADDRESS,
            abi : SimpleStorageAbi,
            functionName : 'deposit',
           value : parseEther(amount),
        });
    };
    const onWithdraw = () => {

        if (!amount) return;

        writeContract({
            address : STORAGE_ADDRESS,
            abi : SimpleStorageAbi,
            functionName : 'withdraw',
            args : [parseEther(amount)],
        });
    };
    return (
        <div className="mt-6 border rounded space-y-3">
            <h2 className="text-xl font-bold">SimpleStorage</h2>
            <p>balance : {balance? formatEther(balance) : '0'} ETH </p>

            <input
            type = 'text'
            placeholder = 'ETH amount'
            value = {amount}
            onChange = {(e) => setAmount(e.target.value)}/>

            <div className="flex gap-2">
                <button
                className="rounded bg-black text-white disabled:opacity-50"
                onClick = {onDeposit}
                disabled = {isPending || isLoading}
                >
                    deposit
                </button>

                <button
                className="rounded bg-black text-white disabled:opacity-50"
                onClick = {onWithdraw}
                disabled = {isPending || isLoading}
                >
                    withdraw
                </button>
            </div>

            <div className="text-sm">
                {isPending&& <p>pending : 서명 대기 중...</p>}
                {isLoading&& <p>loading : 체인 반영 대기 중...</p>}
                {isSuccess&& <p>success : 성공!</p>}
                {hash&& <p>tx: {hash}</p>}
                {error&& <p>error : {error.message}</p>}
            </div>
        </div>
    );
};