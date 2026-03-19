"use client";

import { useEffect, useState } from "react";
import { parseEther } from "viem";
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { chainSoundAbi } from "../abi/chainSoundAbi";
import { CHAIN_SOUND_ADDRESS } from "../constants/address";
import TrackCard from "./TrackCard";

export default function ChainSound() {
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [previewURL, setPreviewURL] = useState("");
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState("");

  const {
    data: nextTrackId,
    refetch: refetchNextTrackId,
    error: countError,
  } = useReadContract({
    address: CHAIN_SOUND_ADDRESS,
    abi: chainSoundAbi,
    functionName: "nextTrackId",
  });

  const {
    writeContract,
    data: addHash,
    error: addError,
    isPending: isAddPending,
  } = useWriteContract();

  const { isLoading: isAddConfirming, isSuccess: isAddSuccess } =
    useWaitForTransactionReceipt({
      hash: addHash,
    });

  useEffect(() => {
    if (isAddSuccess) {
      setTitle("");
      setArtist("");
      setPreviewURL("");
      setUrl("");
      setPrice("");
      setShowForm(false);
      refetchNextTrackId();
    }
  }, [isAddSuccess, refetchNextTrackId]);

  const handleAddTrack = () => {
    if (!CHAIN_SOUND_ADDRESS) {
      alert("먼저 constants/address.ts에 컨트랙트 주소를 넣으세요.");
      return;
    }

    if (!title || !artist || !previewURL || !url || !price) {
      alert("모든 값을 입력하세요.");
      return;
    }

    writeContract({
      address: CHAIN_SOUND_ADDRESS,
      abi: chainSoundAbi,
      functionName: "AddTrack",
      args: [title, artist, previewURL, url, parseEther(price)],
    });
  };

  const trackCount = Number(nextTrackId ?? BigInt(0));

  return (
    <section style={{ marginTop: "24px" }}>
      <h2>ChainSound</h2>
      <p>아티스트는 트랙을 등록하고, 유저는 등록된 트랙을 구매합니다.</p>

      <div style={{ marginTop: "16px" }}>
        {!showForm ? (
          <button onClick={() => setShowForm(true)}>Add Track</button>
        ) : (
          <div style={{ display: "grid", gap: "8px", maxWidth: "560px" }}>
            <input
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              placeholder="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
            <input
              placeholder="preview URL"
              value={previewURL}
              onChange={(e) => setPreviewURL(e.target.value)}
            />
            <input
              placeholder="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <input
              placeholder="price (ex: 0.001)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={handleAddTrack}>Submit Track</button>
              <button onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: "16px" }}>
        {isAddPending && <p>등록 서명 대기 중...</p>}
        {isAddConfirming && <p>등록 트랜잭션 확인 중...</p>}
        {isAddSuccess && <p>트랙 등록 완료</p>}
        {addError && <p>Error: {addError.message}</p>}
        {countError && <p>Error: {countError.message}</p>}
      </div>

      <div style={{ marginTop: "32px" }}>
        <h3>Track List</h3>

        {trackCount === 0 ? (
          <p>아직 등록된 트랙이 없습니다.</p>
        ) : (
          Array.from({ length: trackCount }).map((_, i) => (
            <TrackCard key={i} trackId={BigInt(i)} />
          ))
        )}
      </div>
    </section>
  );
}