"use client";

import { formatEther } from "viem";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { chainSoundAbi } from "../abi/chainSoundAbi";
import { CHAIN_SOUND_ADDRESS } from "../constants/address";

type Props = {
  trackId: bigint;
};

type TrackTuple = readonly [
  bigint,   // id
  string,   // title
  string,   // artist
  string,   // previewURL
  string,   // URL
  bigint,   // price
  string,   // creator
  boolean   // exists
];

export default function TrackCard({ trackId }: Props) {
  const { address, isConnected } = useAccount();

  const { data } = useReadContract({
    address: CHAIN_SOUND_ADDRESS,
    abi: chainSoundAbi,
    functionName: "tracks",
    args: [trackId],
  });

  const track = data as TrackTuple | undefined;

  const { data: purchased } = useReadContract({
    address: CHAIN_SOUND_ADDRESS,
    abi: chainSoundAbi,
    functionName: "hasPurchased",
    args: address ? [address, trackId] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const {
    writeContract,
    data: buyHash,
    error: buyError,
    isPending: isBuyPending,
  } = useWriteContract();

  const { isLoading: isBuyConfirming, isSuccess: isBuySuccess } =
    useWaitForTransactionReceipt({
      hash: buyHash,
    });

  if (!track) {
    return null;
  }

  const id = track[0];
  const title = track[1];
  const artist = track[2];
  const previewURL = track[3];
  const fullURL = track[4];
  const price = track[5];
  const creator = track[6];
  const exists = track[7];

  if (!exists) {
    return null;
  }

  const handleBuy = () => {
    writeContract({
      address: CHAIN_SOUND_ADDRESS,
      abi: chainSoundAbi,
      functionName: "BuyTrack",
      args: [trackId],
      value: price,
    });
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "12px",
        padding: "16px",
        marginTop: "16px",
      }}
    >
      <h4>
        #{id.toString()} {title}
      </h4>

      <p>artist: {artist}</p>
      <p>price: {formatEther(price)} ETH</p>
      <p>creator: {creator}</p>

      <div style={{ marginTop: "8px" }}>
        <p>preview</p>
        <audio controls src={previewURL} />
      </div>

      <div style={{ marginTop: "8px" }}>
        {purchased ? (
          <>
            <p>full track</p>
            <audio controls src={fullURL} />
          </>
        ) : (
          <p>구매 후 전체 재생 가능</p>
        )}
      </div>

      <div style={{ marginTop: "12px" }}>
        {!isConnected ? (
          <p>지갑을 연결하세요.</p>
        ) : purchased ? (
          <p>이미 구매한 트랙입니다.</p>
        ) : (
          <button onClick={handleBuy}>Buy Track</button>
        )}
      </div>

      <div style={{ marginTop: "12px" }}>
        {isBuyPending && <p>구매 서명 대기 중...</p>}
        {isBuyConfirming && <p>구매 트랜잭션 확인 중...</p>}
        {isBuySuccess && <p>구매 완료</p>}
        {buyError && <p>Error: {buyError.message}</p>}
      </div>
    </div>
  );
}