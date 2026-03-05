'use client';

import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';

import { useEffect } from 'react';

const counterAbi = [
  {
    name: 'getCount',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'count', type: 'uint256' }],
  },
  {
    name: 'increment',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
  {
    name: 'decrement',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
  {
    name: 'reset',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  }
] as const;

const COUNTER_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3' as const;

export function Counter() {
  const { data: count, refetch : refetchCount } = useReadContract({
    address: COUNTER_ADDRESS,
    abi: counterAbi,
    functionName: 'getCount',
  });

  const {
    writeContract,
    data: hash,
    isPending,
    error: writeError,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess,
  } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
  if (isSuccess) refetchCount();
}, [isSuccess, refetchCount]);

  const onIncrement = () =>
    writeContract({
      address: COUNTER_ADDRESS,
      abi: counterAbi,
      functionName: 'increment',
    });

  const onDecrement = () =>
    writeContract({
      address: COUNTER_ADDRESS,
      abi: counterAbi,
      functionName: 'decrement',
    });

   const onReset = () =>
    writeContract({
        address: COUNTER_ADDRESS,
        abi: counterAbi,
        functionName: 'reset',
    });

  return (
    <div className="mt-6 border rounded space-y-3">
      <h2 className="text-xl font-bold">Counter</h2>

      <p>count: {count?.toString() ?? '0'}</p>

      <div className="flex gap-2">
        <button
          className="rounded bg-black text-white disabled:opacity-50"
          onClick={onIncrement}
          disabled={isPending || isConfirming}
        >
          increment
        </button>

        <button
          className="rounded bg-black text-white disabled:opacity-50"
          onClick={onDecrement}
          disabled={isPending || isConfirming}
        >
          decrement
        </button>

        <button
          className="rounded bg-black text-white disabled:opacity-50"
          onClick={onReset}
          disabled={isPending || isConfirming}
        >
            reset
        </button>
      </div>

      <div className="text-sm">
        {isPending && <p>pending: 서명 대기 중...</p>}
        {isConfirming && <p>confirming: 체인 반영 대기...</p>}
        {isSuccess && <p>success: 완료!</p>}
        {hash && <p>tx: {hash}</p>}
        {writeError && <p>error: {writeError.message}</p>}
      </div>
    </div>
  );
}