# Week 4 Quiz: Network/Block + wagmi

> **제출 방법:** 이 파일을 복사하여 답변을 작성한 후, PR로 제출하세요.
> **평가 기준:** 개념 이해도 중심 - 문법 오류보다 논리적 설명을 중시합니다.

---

## 문제 1: 블록 헤더 필드 (객관식)

다음 상황을 고려하세요:

```
블록 100의 해시: 0xabc123...
블록 101의 해시: 0xdef456...
```

블록 101의 `parentHash` 필드에는 어떤 값이 저장되어 있나요? 그리고 **왜** 이런 방식으로 연결하나요?

**보기:**
A) 0xdef456... - 자기 자신의 해시를 저장하여 무결성을 보장한다
B) 0xabc123... - 이전 블록의 해시를 저장하여 체인 연결과 불변성을 보장한다
C) 블록 번호 100 - 숫자로 순서를 추적한다
D) 빈 값 - 헤더에는 해시가 저장되지 않는다

**답변:**
<!--
정답 알파벳과 왜 이 답을 선택했는지 설명하세요.
다른 보기가 왜 틀린지도 간략히 설명해 주세요.
-->B. 이전 블록의 해쉬값을 저장함으로서 이전 블록의 데이터를 해킹하려면 뒤의 모든 블록을 다 바꿔야하기 때문에 불변성을 보장하며 블록을 연결한다.


---

## 문제 2: MPT 목적 (객관식)

이더리움에서 Merkle Patricia Trie(MPT)를 사용하는 **가장 중요한 이유**는 무엇인가요?

**보기:**
A) 데이터를 암호화하여 외부에서 읽을 수 없게 한다
B) 트랜잭션 처리 속도를 10배 이상 높인다
C) 전체 데이터 없이도 특정 데이터의 존재와 정확성을 효율적으로 증명한다
D) 블록 크기를 줄여서 저장 공간을 절약한다

**답변:**
<!--
정답 알파벳과 왜 이 기능이 중요한지 설명하세요.
Light Node와 연결지어 설명하면 더 좋습니다.
-->C. 머클트리구조를 통해 데이터조작을 바로 잡아낼수있으며 전체 데이터를 가지고 있지않더라도 특정 데이터가 존재하는지 알 수있다. 그리고 패트리샤 구조를 통해 경로 축소를 만들수있다.


---

## 문제 3: 체인 연결과 보안 (객관식)

공격자가 블록 50의 트랜잭션을 수정하려고 합니다. 현재 체인의 최신 블록은 100입니다. 이 공격이 **왜** 어려운가요?

**보기:**
A) 블록 50은 너무 오래되어서 시스템에서 접근할 수 없다
B) 블록 50을 수정하면 해시가 바뀌고, 블록 51부터 100까지 모든 블록의 parentHash가 불일치하게 된다
C) 블록 50은 이미 암호화되어 있어서 복호화 키가 필요하다
D) 네트워크 관리자만 과거 블록을 수정할 수 있다

**답변:**
<!--
정답 알파벳과 블록체인의 불변성이 어떻게 작동하는지 설명하세요.
-->B. 문제 1번을 통해보았듯이 이전블록의 해쉬값을 저장하고 이를 통해 다음 블록의 해쉬값에 영향을 주기에 50번을 해킹하고 체인에 문제가 없기 위해서는 51번부터 100번까지 모두 바꿔야한다.


---

## 문제 4: MPT 진화 과정 (단답형)

MPT(Merkle Patricia Trie)는 세 가지 자료구조의 장점을 결합한 것입니다:
1. **Trie** -> 2. **Patricia Trie** -> 3. **Merkle Patricia Trie**

**왜** 각 단계의 발전이 필요했나요? 각 단계가 해결하는 문제를 간단히 설명하세요.

**답변:**
<!--
1. Trie가 해결하는 문제:

2. Patricia Trie가 해결하는 문제 (Trie의 한계):

3. Merkle Patricia Trie가 해결하는 문제 (Patricia Trie의 한계):

-->트라이구조를 통해 데이터 저장, 검색 자료구조를 만들었지만 데이터크기만큼 메모리사용량이 늘어난다. 그렇기에 패트리샤 트라이를 통해 경로를 압축할 수 있다. 최종적으로 머클 패트리샤 트리는 패트리샤 트리에 구조에 머클 트리를 결합한 것으로 데이터 무결성을 보장할 수 있다.


---

## 문제 5: Eclipse Attack 방어 (단답형)

Eclipse Attack은 공격자가 피해자 노드의 **모든 피어 연결**을 자신이 통제하는 노드로 바꾸는 공격입니다.

1) 이 공격이 성공하면 피해자에게 **어떤 피해**가 발생할 수 있나요?
2) 개인 노드 운영자가 이 공격을 **방어**하기 위해 할 수 있는 행동은 무엇인가요?

**답변:**
블록체인은 중앙서버가 없기에 나의 노드는 다른 동등한 peer노드들과 연결되어있다. 이때 나의 노드와 연결된 peer노드들을 공격자가 장악하면 노드가 네트워크에 고립되는데 이를 eclipse 어택이라한다. 이러한 공격이 발생할시 공격자는 네트워크 정보를 조작할 수 있게된다. 이에 대한 방지책으로는 랜덤 peer연결, 여러 네트워크의 다양한 peer연결, 신뢰노드와 연결 유지 등이 있다.

## 문제 6: 노드 종류 선택 (단답형)

친구가 이더리움 개발을 시작하려고 합니다. 다음 세 가지 상황에서 각각 어떤 노드 타입(Full, Light, Archive)을 추천하시겠습니까? **왜** 그 노드를 추천하는지도 설명하세요.

1) 모바일 지갑 앱 개발
2) 블록체인 데이터 분석 서비스 개발
3) 일반적인 dApp 백엔드 개발

**답변:**

1) 모바일 지갑 앱:
   Light node. 왜냐하면 모바일환경은 제약이 많기에 필요한 정보만 검증하는 노드가 필요하기 때문이다.

2) 블록체인 데이터 분석:
   Archive node. 왜냐하면 데이터분석을 위해서는 과거의 모든 데이터가 필요하기 때문이다.

3) dApp 백엔드:
   Full node. 왜냐하면 블록 상태를 검증하고 트랜잭션 처리가 가능하기때문이다. 


---

## 문제 7: useAccount Hook (빈칸 채우기)

다음 코드의 빈칸을 채워서 지갑 연결 상태를 표시하는 컴포넌트를 완성하세요:

```typescript
import { _________________ } from 'wagmi';

function WalletStatus() {
  // TODO: useAccount hook에서 필요한 값들을 가져오세요
  const { _________________, _________________ } = useAccount();

  if (!isConnected) {
    return <div>지갑이 연결되지 않았습니다</div>;
  }

  return (
    <div>
      <p>연결된 주소: {address}</p>
    </div>
  );
}
```

**답변:**
```typescript
// 완성된 코드를 여기에 작성하세요

import { useAccount } from 'wagmi';

function WalletStatus() {
   const { address, isConnected } = useAccount();

  if (!isConnected) {
    return <div>지갑이 연결되지 않았습니다</div>;
  }

  return (
    <div>
      <p>연결된 주소: {address}</p>
    </div>
  );
}```

**왜 이렇게 작성했나요:**
useAccount를 호출하여 현재 연결된 지갑 상태를 알 수 있다. useAccount 내의 훅인 status, account, isConnected 중 
isConect를 통해 지갑연결여부를 알 수 있으며 account를 통해 연결된 지갑 주소를 알 수 있다.


---

## 문제 8: useReadContract Hook (빈칸 채우기)

다음 코드의 빈칸을 채워서 컨트랙트의 `getCount` 함수 결과를 화면에 표시하세요:

```typescript
import { useReadContract } from 'wagmi';

const counterABI = [
  {
    name: 'getCount',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'count', type: 'uint256' }],
  },
] as const;

function CountDisplay() {
  const { data, isLoading, error } = useReadContract({
    // TODO: 필요한 설정을 채우세요
    address: '0x1234...5678',
    _________________,
    _________________,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;

  return <div>현재 카운트: {_________________}</div>;
}
```

**답변:**
```typescript
// 완성된 코드를 여기에 작성하세요

```
import { useReadContract } from 'wagmi';

const counterABI = [
  {
    name: 'getCount',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'count', type: 'uint256' }],
  },
] as const;

function CountDisplay() {
  const { data, isLoading, error } = useReadContract({
    address: '0x1234....5678',
    abi: counterABI,
    functionName: 'getCount',
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;

  return <div>현재 카운트: {data?.toString()}</div>;
}

**왜 이렇게 작성했나요:**
<!--
useReadContract의 필수 설정 항목과 data를 화면에 표시할 때 주의할 점을 설명하세요.
-->
useReadContract는 view, pure 함수를 익기 위한 훅으로 address, abi, functionName이 필수로 필요하다. 그렇기에 address와
functionName을 적어주고 abi는 const로 저장해준 constABI를 입력해준다.또한 data값이 반환되지 않을수있기에 data?로 오류를
방지한다.

---

## 문제 9: useWriteContract 버그 (취약점 찾기)

다음 코드에서 **문제점**을 찾고 수정하세요:

```typescript
// BAD CODE - 문제점 찾기
import { useWriteContract } from 'wagmi';

const counterAbi = [
  {
    name: 'increment',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
] as const;

function IncrementButton() {
  const { writeContract, isPending } = useWriteContract();

  const handleClick = () => {
    writeContract({
      address: '0x1234...5678',
      functionName: 'increment',
      abi: counterABI;
    });
  };

  return (
    <button onClick={handleClick} disabled={isPending}>
      증가하기
    </button>
  );
}
```

**1) 발견한 문제점:**
<!--
무엇이 빠졌거나 잘못되었는지 설명하세요.
-->abi가 없는 것이 문제였다. 


**2) 왜 이것이 문제인가:**
<!--
이 문제가 어떤 오류나 동작 이상을 일으키는지 설명하세요.
-->ABI를 기준으로 함수를 찾아내 calldata를 만드는데 ABI가 누락되어 있었기에 increment함수에 대한 정보가 없어 트랜잭션을
만들 수가 없다


**3) 올바른 수정 방법:**
```typescript
// GOOD CODE - 수정된 버전을 작성하세요

```

---

## 문제 10: 블록 연결 구조 (다이어그램 해석)

다음 다이어그램은 블록체인의 연결 구조를 보여줍니다:

```mermaid
graph LR
    subgraph B0["제네시스 블록"]
        H0["hash: 0xabc..."]
    end
    subgraph B1["블록 1"]
        PH1["parent: 0xabc..."]
        H1["hash: 0xdef..."]
    end
    subgraph B2["블록 2"]
        PH2["parent: 0xdef..."]
        H2["hash: 0x123..."]
    end
    subgraph B3["블록 3"]
        PH3["parent: ???"]
        H3["hash: 0x789..."]
    end

    B0 --> B1 --> B2 --> B3
```

**질문:**

1) 블록 3의 `parent: ???` 에 들어갈 값은 무엇인가요?

0x123...

2) 만약 블록 1의 내용이 수정되면, 블록 2와 블록 3에 **어떤 영향**이 있나요? 왜 그런가요?

1번블록의 내용수정이 일어날시 블록2의 parenthash값이 변하고 이때문에 블록2의 전체 해쉬값이 변경되고 반복해서 블록3의 parenthash값이 변한다. 그렇기에 블록2,3가 무효가 되버린다
제네시스블록은 이전블록이 없어 보통 0또는 null로 표기된다

3) 제네시스 블록(블록 0)의 parentHash는 어떤 특별한 값을 가지나요? 왜 그런가요?

제네시스블록은 이전블록이 없어 보통 0또는 null로 표기된다

---

## 문제 11: MPT 트리 구조 (다이어그램 해석)

다음 다이어그램은 MPT의 노드 구조를 보여줍니다:

```mermaid
graph TD
    ROOT["Root Hash: 0xfff..."] --> EXT1["Extension Node<br/>path: 0a"]
    ROOT --> EXT2["Extension Node<br/>path: 0b"]

    EXT1 --> BRANCH["Branch Node<br/>(16개 슬롯)"]
    BRANCH --> LEAF1["Leaf: 계정 A<br/>주소: 0a1234..."]
    BRANCH --> LEAF2["Leaf: 계정 B<br/>주소: 0a5678..."]

    EXT2 --> LEAF3["Leaf: 계정 C<br/>주소: 0b9999..."]
```

**질문:**

1) 계정 A와 계정 B가 같은 Branch Node 아래에 있는 이유는 무엇인가요? (주소 패턴을 힌트로 사용하세요)

두 계정 모두 동일 접두사인 0a를 공유하기에 같은 Branch node아래에 있다.

2) Extension Node가 하는 역할은 무엇인가요? 없다면 어떤 문제가 생기나요?

Extension node를 통해 여러 경로를 압축할 수 있고 이를 통해 경로탐색을 줄일 수 있다.

3) Root Hash만 알면 어떻게 특정 계정의 데이터 존재를 **증명**할 수 있나요? (Light Client 관점에서)

예를 들어 내가 계정 A,B의 leaf와 Extension node:0b의 해쉬값을 안다면 밑에서부터 해쉬값을 합쳐 다시 해쉬하는 과정을 통해 Root hash값을 알게된다면 기존에 알던 Root hash값과 ㅂ교해 데이터존재를 증명할수있다


---

## 제출 전 체크리스트

- [ ] 모든 문제에 답변을 작성했는가?
- [ ] 객관식 문제: 정답 선택 **이유**를 설명했는가?
- [ ] 단답형 문제: 2-3문장 이상으로 충분히 설명했는가?
- [ ] 코드 문제: 완성된 코드와 **왜 그렇게 작성했는지** 설명했는가?
- [ ] 다이어그램 문제: 각 질문에 논리적으로 답변했는가?
