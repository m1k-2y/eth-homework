# Week 6 Quiz: Beacon Chain/Finality + Final Project Integration

> **제출 방법:** 이 파일을 복사하여 답변을 작성한 후, PR로 제출하세요.
> **평가 기준:** 개념 이해도 중심 - 6주간 배운 내용을 **통합**하여 설명하세요.

---

## 문제 1: Beacon Chain 역할 (객관식)

Beacon Chain의 **주요 역할**은 무엇인가요?

**보기:**
A) 스마트 컨트랙트를 실행하고 상태를 관리한다
B) 검증자를 관리하고 합의를 조정하며 블록 최종성을 결정한다
C) 트랜잭션 수수료를 계산하고 분배한다
D) 사용자의 지갑을 생성하고 개인키를 관리한다

**답변:**
<!--
정답 알파벳과 Beacon Chain이 "합의 계층(Consensus Layer)"으로서 하는 역할을 설명하세요.
실행 계층(Execution Layer)과의 차이도 언급하면 더 좋습니다.
-->
B. Beacon Chain이란 합의 레이어로스마트 컨트랙트를 실행하는 실행 계층과 달리 누가 블록을 만들고 확정됐는지 결정하는
 합의 계층이다. 그러므로 정답은 B이다.

---

## 문제 2: Finality 개념 (객관식)

이더리움에서 **Finality(최종성)**가 달성되면 어떤 상태인가요?

**보기:**
A) 트랜잭션이 mempool에 들어간 상태
B) 블록이 체인에 추가되었지만 아직 재조직(reorg)될 수 있는 상태
C) 전체 검증자의 1/3 이상이 슬래싱되지 않는 한 절대 변경되지 않는 상태
D) 24시간이 지나서 트랜잭션이 만료된 상태

**답변:**
<!--
정답 알파벳과 왜 "1/3 이상 슬래싱"이 조건인지 설명하세요.
Finality가 왜 중요한지도 언급하세요.
-->
C. 블록 검증자들의 2/3 이상이 투표를 하여 블록이 확정된다. 그런데 또 다른 블록에 2/3 이상이 투표되어야 변경이 가능한데
이때 한 블록과 다른 블록에 동시에 부정 투표를 한 1/3 이상은 슬래싱이 되어야 한다. 그렇기에 정답은 C.이다.

---

## 문제 3: 왜 Finality가 중요한가 (단답형)

거래소나 dApp 개발자에게 **Finality**가 왜 중요한가요?
다음 시나리오를 예로 들어 설명하세요:

> 사용자가 거래소에 100 ETH를 입금하고, 거래소가 확인 후 내부 잔액에 반영했습니다.
> 그런데 나중에 블록 재조직(reorg)이 발생하여 입금 트랜잭션이 사라졌습니다.

**답변:**
<!--
1) 위 시나리오에서 거래소에 어떤 문제가 발생하나요?

2) Finality가 있으면 이 문제가 어떻게 해결되나요?

3) 이더리움에서 Finality까지 얼마나 기다려야 하나요?
-->
finality가 되기전에 reorg로 인하여 거래소는 이미 잔액 반영을 했지만 입금이 사라져 손실이 발생한다. finality가 된 후에
반영을 하면 1/3이상이 슬래싱을 하지 않는 이상 블록을 되돌릴 수 없기에 이러한 손실이 발생하지 않으며 이더리움에서
finality까지 12~15분정도 기다려야한다.

---

## 문제 4: 포크 선택 규칙 (단답형)

이더리움은 **Casper FFG**와 **LMD-GHOST** 두 가지 메커니즘을 결합합니다.
각각의 역할은 무엇이며, **왜** 둘 다 필요한가요?

**답변:**
<!--
1) Casper FFG의 역할:

2) LMD-GHOST의 역할:

3) 왜 둘 다 필요한가 (한쪽만 있으면 어떤 문제?):
-->
Casper FFG를 통하여 검증자들의 투표를 기반으로 합의를 형성하며 finality를 부여하는 역할을 한다.  LMD-GHOST는 포크가 
발생할 시 검증자들의 최신 투표를 기반으로 어느 체인을 선택하는지를 결정한다. 즉 LMD는 포크 상황에 대응하며 Casper는 
finality를 결정하기에 둘다 필요하다.

---

## 문제 5: dApp 아키텍처 설계 (코드/아키텍처 문제)

당신은 "간단한 투표 dApp"을 만들려고 합니다.
다음 요구사항을 읽고 **컴포넌트 구조**와 **사용할 hook**들을 설계하세요.

**요구사항:**
- 사용자가 지갑을 연결할 수 있다
- 현재 투표 현황(찬성/반대 수)을 조회할 수 있다
- 사용자가 찬성 또는 반대 투표를 할 수 있다
- 투표 후 결과가 화면에 즉시 반영된다

**답변:**

```
1) 컴포넌트 구조 (어떤 컴포넌트가 필요한가):


2) 각 컴포넌트에서 사용할 wagmi/RainbowKit hook:
   - 지갑 연결:
   - 투표 현황 조회:
   - 투표 실행:
   - 트랜잭션 확인:


3) Provider 계층 구조:

```

**왜 이렇게 설계했나요:**
<!--
각 hook의 선택 이유와 데이터 흐름을 설명하세요.
-->
컴포넌트에서 App(최상위), WalletConnect 컴포넌트(지갑 연결 및 주소 표시), VoteStatus(현재 찬성/반대 조회), VoteAction
(찬성/반대 버튼), TransactionStatus(트랜잭션 진행표시)로 구성된다. 이때 지갑연결은 useAccount(현재 연결된 주소),
useConnect(지갑연결), useDisconnect(연결해제)훅을 사용하며 useReadContract를 투표현황조회, useWriteContract를 투표
실행, 트랜잭션확인은 useWaitForTransactionReceipt로 한다. 계층구조는
 <WagmiConfig config={config}>
  <RainbowKitProvider>
    <App />
  </RainbowKitProvider>
</WagmiConfig>
이다. 
---

## 문제 6: 컨트랙트-프론트엔드 연동 (빈칸 채우기)

다음 코드의 빈칸을 채워서 투표 컨트랙트와 프론트엔드를 연동하세요:

**Solidity 컨트랙트:**
```solidity
contract Voting {
    uint256 public yesVotes;
    uint256 public noVotes;

    function voteYes() external {
        yesVotes += 1;
    }

    function voteNo() external {
        noVotes += 1;
    }
}
```

**React 컴포넌트:**
```typescript
import { useReadContract, useWriteContract, _________________ } from 'wagmi';

const votingABI = [
  { name: 'yesVotes', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] },
  { name: 'noVotes', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] },
  { name: 'voteYes', type: 'function', stateMutability: 'nonpayable', inputs: [], outputs: [] },
  { name: 'voteNo', type: 'function', stateMutability: 'nonpayable', inputs: [], outputs: [] },
] as const;

function VotingApp() {
  // 찬성 투표 수 조회
  const { data: yesCount, refetch: refetchYes } = useReadContract({
    address: '0x1234...5678',
    abi: votingABI,
    functionName: '_________________',
  });

  // 반대 투표 수 조회
  const { data: noCount, refetch: refetchNo } = useReadContract({
    address: '0x1234...5678',
    abi: votingABI,
    functionName: '_________________',
  });

  // 투표 실행
  const { writeContract, data: hash, isPending } = useWriteContract();

  // 트랜잭션 확인 대기
  const { isLoading: isConfirming, isSuccess } = _________________({
    hash,
  });

  // 트랜잭션 성공 시 데이터 새로고침
  // TODO: isSuccess가 true가 되면 refetch를 호출해야 함

  const handleVoteYes = () => {
    writeContract({
      address: '0x1234...5678',
      abi: votingABI,
      functionName: '_________________',
    });
  };

  return (
    <div>
      <h2>현재 투표 현황</h2>
      <p>찬성: {_________________}</p>
      <p>반대: {noCount?.toString()}</p>

      <button onClick={handleVoteYes} disabled={isPending || isConfirming}>
        {isPending ? '서명 중...' : isConfirming ? '확인 중...' : '찬성 투표'}
      </button>

      {isSuccess && <p>투표 완료!</p>}
    </div>
  );
}
```

**답변:**
```typescript
// 완성된 코드를 여기에 작성하세요

```
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

const votingABI = [
  { name: 'yesVotes', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] },
  { name: 'noVotes', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] },
  { name: 'voteYes', type: 'function', stateMutability: 'nonpayable', inputs: [], outputs: [] },
  { name: 'voteNo', type: 'function', stateMutability: 'nonpayable', inputs: [], outputs: [] },
] as const;

function VotingApp() {
  // 찬성 투표 수 조회
  const { data: yesCount, refetch: refetchYes } = useReadContract({
    address: '0x1234...5678',
    abi: votingABI,
    functionName: 'yesVotes',
  });

  // 반대 투표 수 조회
  const { data: noCount, refetch: refetchNo } = useReadContract({
    address: '0x1234...5678',
    abi: votingABI,
    functionName: 'noVotes',
  });

  // 투표 실행
  const { writeContract, data: hash, isPending } = useWriteContract();

  // 트랜잭션 확인 대기
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // 트랜잭션 성공 시 데이터 새로고침
  // TODO: isSuccess가 true가 되면 refetch를 호출해야 함

  const handleVoteYes = () => {
    writeContract({
      address: '0x1234...5678',
      abi: votingABI,
      functionName: 'voteYes',
    });
  };

  return (
    <div>
      <h2>현재 투표 현황</h2>
      <p>찬성: {yesCount?.toString()}</p>
      <p>반대: {noCount?.toString()}</p>

      <button onClick={handleVoteYes} disabled={isPending || isConfirming}>
        {isPending ? '서명 중...' : isConfirming ? '확인 중...' : '찬성 투표'}
      </button>

      {isSuccess && <p>투표 완료!</p>}
    </div>
  );
}
**데이터 흐름을 설명하세요:**
<!--
1) 사용자가 "찬성 투표" 버튼 클릭 -> ... -> 화면 업데이트까지의 과정을 설명하세요.
-->
사용자가 찬성투표를 할 시 handleVoteYes함수가 실행되고 useWriteContract를 통해 voteYes함수 호출이 된다. 그 후 사용자가
지갑에서 트랜잭션 서명을 하면 isPending이 되며 트랜잭션이 네트워크에 전파되면 hash가 만들어져 useWaitForReceipt로
블록에 포함 및 확정까지 대기한다. 이때 isConfirming이 true가 된다. 트랜잭션이 성공적으로 처리되어 isSuccess가 true가
되며 이를 감지해 refetchYes와 refetchNo를 통해 최신 투표 조회를 한다.

---

## 문제 7: 트랜잭션 흐름 디버깅 (취약점 찾기)

다음 코드에서 **문제점**을 찾고 수정하세요. 사용자가 투표를 해도 화면이 업데이트되지 않습니다.

```typescript
// BAD CODE - 왜 화면이 업데이트되지 않나요?
function BrokenVoting() {
  const { data: voteCount } = useReadContract({
    address: '0x...',
    abi: votingABI,
    functionName: 'yesVotes',
  });

  const { writeContract, data: hash } = useWriteContract();

  const { isSuccess } = useWaitForTransactionReceipt({ hash });

  const handleVote = () => {
    writeContract({
      address: '0x...',
      abi: votingABI,
      functionName: 'voteYes',
    });
  };

  // isSuccess가 true가 되어도 voteCount가 업데이트되지 않음!

  return (
    <div>
      <p>찬성: {voteCount?.toString()}</p>
      <button onClick={handleVote}>투표</button>
      {isSuccess && <p>투표 완료!</p>}
    </div>
  );
}
```

**1) 발견한 문제점:**
<!--
왜 화면이 업데이트되지 않는지 설명하세요.
-->
useReadContract로 조회한 voteCount는 처음 렌더링 시점의 값이고, voteYes 트랜잭션이 성공한 뒤에도 다시 조회(refetch) 하지 않기 때문에 화면이 업데이트되지 않는다.
즉, isSuccess는 트랜잭션 성공 여부만 알려줄 뿐, voteCount를 자동으로 갱신해주지 않는다

**2) 올바른 수정 방법:**
```typescript
// GOOD CODE - 수정된 버전을 작성하세요

```
import { useEffect } from 'react';
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';

function FixedVoting() {
  const { data: voteCount, refetch } = useReadContract({
    address: '0x...',
    abi: votingABI,
    functionName: 'yesVotes',
  });

  const { writeContract, data: hash, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleVote = () => {
    writeContract({
      address: '0x...',
      abi: votingABI,
      functionName: 'voteYes',
    });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);

  return (
    <div>
      <p>찬성: {voteCount?.toString()}</p>
      <button onClick={handleVote} disabled={isPending || isConfirming}>
        {isPending ? '서명 중...' : isConfirming ? '확인 중...' : '투표'}
      </button>
      {isSuccess && <p>투표 완료!</p>}
    </div>
  );
}
**3) refetch가 필요한 이유:**
<!--
블록체인 데이터와 React 상태의 관계를 설명하세요.
-->

스마트 컨트랙트 상태는 온체인에 저장되고, useReadContract는 그 상태를 읽어와 React 화면에 보여준다. 하지만 
useWriteContract로 트랜잭션을 보낸 뒤 상태가 바뀌어도, 기존에 읽어온 값은 자동으로 바뀌지 않는다. 따라서 트랜잭션이 
성공한 뒤 refetch()를 호출해 최신 온체인 상태를 다시 읽어와야 화면이 새 값으로 리렌더링된다.

---

## 문제 8: Beacon Chain 구조 (다이어그램 해석)

다음 다이어그램은 이더리움의 두 계층 구조를 보여줍니다:

```mermaid
graph TB
    subgraph CL["합의 계층 (Consensus Layer)"]
        BC["Beacon Chain"]
        VAL["검증자들"]
        BC --> VAL
    end

    subgraph EL["실행 계층 (Execution Layer)"]
        TX["트랜잭션"]
        EVM["EVM"]
        STATE["상태 (State)"]
        TX --> EVM --> STATE
    end

    CL <-->|"Engine API"| EL
```

**질문:**

1) **합의 계층(CL)**과 **실행 계층(EL)**의 역할 차이는 무엇인가요?
합의계층은 블록의 합의, finality에 관여하여 트랜잭션 실행과는 관련 없으며 실행계층은 트랜잭션 실행, 스마트컨트랙트
부문을 담당한다.

2) **Engine API**를 통해 두 계층이 주고받는 정보는 무엇인가요?
Engine API는 합의, 실행 계층 사이에서 블록 생성, 검증에 필요한 정보를 교환한다. 이때 합의 계층은 실행 계층으로부터
새로운 블록 실행을 요청하고 실행 계층은 EVM이 트랜잭션들을 실행해 나온 결과들인 execution payload를 반환한다.

3) 사용자가 트랜잭션을 전송하면 CL과 EL에서 각각 어떤 일이 일어나나요?
사용자가 트랜잭션을 실행하면 실행계층 안의 EVM이 트랜잭션을 계산 및 수행하여 그러한 상태 변화 결과를 묶어 합의 계층에
전달하면 이러한 결과를 합의 계층에서는 검증 및 투표를 통해 블록을 확정한다.

---

## 문제 9: Slot/Epoch 관계 (다이어그램 해석)

다음 다이어그램은 Slot과 Epoch의 관계를 보여줍니다:

```mermaid
gantt
    title Epoch 구조 (6.4분)
    dateFormat X
    axisFormat %s

    section Epoch N
    Slot 0     :a1, 0, 12
    Slot 1     :a2, 12, 24
    Slot 2     :a3, 24, 36
    ...        :a4, 36, 372
    Slot 31    :a5, 372, 384

    section Checkpoint
    Epoch N 끝 :milestone, 384, 0
```

**질문:**

1) 1 Slot은 몇 초이고, 1 Epoch은 몇 개의 Slot으로 구성되나요?
1slot은 12초, 1 ephoch는 32slot이다.

2) **Checkpoint**는 언제 발생하며 어떤 역할을 하나요?

체크포인트는 각 epoch의 시작지점으로 검증자들이 checkpoint를 단위로 투표하여 Casper FFG가 이를 이용해 finalized를 한다
3) **Finality**가 달성되려면 몇 Epoch이 필요하고, 시간으로는 약 몇 분인가요?
N이라는 checkpoint에서 justified되며 그다음 N+1 checkpoint에서 다음 블록이 justified되면 finalized되기에 최소 2
epoch가 필요하다.

---

## 문제 10: dApp 전체 아키텍처 (다이어그램 해석)

다음 다이어그램은 dApp의 전체 아키텍처를 보여줍니다:

```mermaid
graph LR
    subgraph Frontend["프론트엔드"]
        UI["React UI"]
        WAGMI["wagmi hooks"]
        RK["RainbowKit"]
    end

    subgraph Provider["Provider/RPC"]
        RPC["Alchemy/Infura RPC"]
    end

    subgraph Network["이더리움 네트워크"]
        NODE["Full Node"]
        BC2["Beacon Chain"]
        CONTRACT["스마트 컨트랙트"]
    end

    UI --> WAGMI
    WAGMI --> RPC
    RPC --> NODE
    NODE --> CONTRACT
    NODE <--> BC2

    RK --> WAGMI
```

**질문:**

1) 사용자가 **"투표하기" 버튼**을 클릭하면, UI에서 스마트 컨트랙트까지 데이터가 어떤 경로로 전달되나요?
사용자가 “투표하기” 버튼을 클릭하면 React UI에서 이벤트가 발생하고, wagmi hook(useWriteContract)을 통해 트랜잭션이
이  생성된다. 사용자는 RainbowKit을 통해 지갑에서 트랜잭션에 서명하며, 서명된 트랜잭션은 RPC Provider(Alchemy/Infura)
를 통해 이더리움 Full Node로 전송된다. 이후 해당 트랜잭션은 네트워크에 전파되어 블록 생성자에 의해 블록에 포함되고,
 스마트 컨트랙트의 함수(voteYes)가 실행된다.

2) **RPC Provider**(Alchemy/Infura)의 역할은 무엇인가요? 없다면 어떤 문제가 생기나요?
RPC Provider는 프론트엔드와 블록체인 노드 사이의 중개 역할을 수행하며, 트랜잭션 전송 및 온체인 데이터 조회를 가능하게
 한다. 이때 RPC Provider가 없다면 프론트엔드는 블록체인 네트워크에 직접 접근할 수 없기 때문에 트랜잭션을 전송하거나
 컨트랙트 상태를 조회할 수 없다. 

3) 6주간 배운 내용을 종합하여, 트랜잭션이 **전송 -> 실행 -> 블록 포함 -> Finality**까지 거치는 전체 흐름을 설명하세요.
사용자가 트랜잭션을 생성하고 지갑에서 서명하면, 해당 트랜잭션은 RPC Provider를 통해 Full Node로 전달되고 mempool에 
저장된다. 이후 Beacon Chain에서 선정된 proposer가 해당 트랜잭션을 포함한 블록을 생성하고, 다른 validator들이 
attestation을 통해 이를 검증한다. 블록은 체인에 포함되며, LMD-GHOST에 의해 올바른 체인이 선택된다. 
이후 Casper FFG를 통해 checkpoint 단위로 validator의 2/3 이상이 투표하면 블록이 justified되고, 다음 epoch에서 추가적인
 합의를 통해 finalized된다. Finality가 달성되면 해당 트랜잭션은 최소 1/3 이상의 validator가 슬래싱되지 않는 한 되돌릴
 수 없는 상태가 된다.
---

## 제출 전 체크리스트

- [ ] 모든 문제에 답변을 작성했는가?
- [ ] 객관식 문제: 정답 선택 **이유**를 설명했는가?
- [ ] 단답형 문제: 2-3문장 이상으로 충분히 설명했는가?
- [ ] 코드 문제: 완성된 코드와 **왜 그렇게 작성했는지** 설명했는가?
- [ ] 다이어그램 문제: 6주간 배운 내용을 **연결**지어 설명했는가?

---

## 6주 과정 축하합니다!

이 퀴즈를 완료하면 6주 이더리움 온보딩 이론 과정이 마무리됩니다.

**배운 것들:**
- Week 1: State, Account, EOA vs CA
- Week 2: Transaction, Signature, Security (Private Key)
- Week 3: EVM, Gas, Security (Reentrancy, CEI)
- Week 4: Block, Network, MPT, Security (Eclipse, 51%)
- Week 5: PoS, Validator, Consensus, RainbowKit
- Week 6: Beacon Chain, Finality, Full-stack Integration

**다음 단계:** 나만의 dApp 프로젝트를 시작하세요!
