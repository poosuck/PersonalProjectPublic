# Fit Sense Prototype

체형 기반 의류 사이즈·핏 추천 웹 프로토타입입니다.  
같은 상품이라도 선택된 사용자에 따라 추천 사이즈, 전체 핏, 주의사항이 다르게 보이도록 구성했습니다.

## 실행 방법

1. `C:\Users\brand\Documents\Codex\2026-04-26\new-chat\index.html` 파일을 브라우저에서 엽니다.
2. 사용자 카드를 고릅니다.
3. 상품을 누르면 사용자 기준 사이즈 결과가 보입니다.
4. 결과 카드를 누르면 상세 리포트를 볼 수 있습니다.

## 파일 구조

- `index.html`: 앱 진입 파일
- `styles.css`: 전체 UI 스타일
- `src/app.js`: 화면 전환과 상태 관리
- `src/data/users.js`: 사용자 mock data
- `src/data/products.js`: 상품 mock data
- `src/data/sizeResults.js`: 사용자별 사이즈 결과 mock data

## 데이터 설명

- `Users`: 사용자 체형 정보
- `Products`: 상품 정보
- `SizeResults`: `userId + productId + sizeName` 기준 추천 결과

## 쉽게 설명하면

이 앱은 "옷 하나를 모든 사람에게 똑같이 추천하지 않는다"를 보여주는 데모입니다.

- 서현이 보면 `M`이 가장 좋게 나올 수 있습니다.
- 민지가 같은 셔츠를 보면 `S`가 더 좋게 나올 수 있습니다.
- 서준이 보면 `L`이 가장 안정적으로 나올 수 있습니다.

즉, 사람마다 몸이 다르니까 같은 옷도 다른 결과가 보입니다.
