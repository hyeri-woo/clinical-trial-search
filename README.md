# WANTED 프리온보딩 프론트엔드 3주차 과제

- WANTED 프리온보딩 프론트엔드 3주차 개인 과제입니다.
- 임상시험에 과해 검색어를 추천해주는 프로젝트입니다.

## 배포 링크

<a href="clinical-trial-search.netlify.app">Clinical Trial Search 배포 링크</a>

## 사용 라이브러리

- 언어: TypeScript
- 스타일 관리: styled-components, react-icons
- 라우팅 관련 라이브버리: react-router-dom
- 협업 설정 도구: eslint, prettier, husky, lint-staged

```js
  "dependencies": {
    "react-router-dom": "^6.15.0",
    "styled-components": "^6.0.7",
    "typescript": "^4.9.5",
  },
  "devDependencies": {
    "eslint": "^8.48.0",
    "eslint-config-prettier": "^9.0.0",
    "husky": "^8.0.3",
    "lint-staged": "^14.0.1",
    "prettier": "^3.0.3",
    "react-icons": "^4.10.1"
  },
```

## 프로젝트 실행 방법

1. 프로젝트 클론

```
git clone https://github.com/hyeri-woo/clinical-trial-search.git
```

2. 해당 폴더로 이동

```
cd clinical-trial-search
```

3. 프로젝트 패키지 설치

```
npm install
```

4. json-server 실행

```
npm run server
```

5. 프로젝트 실행

```
npm start
```

## 프로젝트 구조

```js
📦 src
├── 📂 api
│   ├── 📄 http.ts
│   └── 📄 search.ts
├── 📂 components
│   ├── 📄 SearchForm.tsx
│   ├── 📄 SearchItem.tsx
│   └── 📄 SelectList.tsx
├── 📂 data
├── 📂 hooks
│   │    ├── 📄 useArrowKeyDown.ts
│   │    └── 📄 useDebounce.ts
├── 📂 pages
│   ├── 📄 Home.tsx
│   └── 📄 NotFound.tsx
├── 📂 routes
│   │    └── 📄 Router.tsx
├── 📂 storage
│   │    └── 📄 sessionStorage.tsx
├── 📂 styles
└── 📂 types
```

## 기능 상세

### 1. 검색어 추천 기능

> - 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현
>   - 검색어가 없을 시 “검색어 없음” 표출

- api class에서 로컬 캐싱을 바로 사용할 수 있게 get 메서드를 정의 (api/http.ts)

```js
export default class Http {
  private baseURL: string;
  private cacheStorage: CacheStorage;

  constructor(baseURL: string, cacheStorageName: string) {
    this.baseURL = baseURL;
    this.cacheStorage = new CacheStorage(baseURL, cacheStorageName);
  }

  public async get<T>(endPoint: string, keyword: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endPoint}?q=${keyword}`);
      const cached = await this.cacheStorage.get(`${endPoint}?q=${keyword}`, response);
      return cached.json();
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  }
}
```

- getKeyword 함수에서 keyword를 매개변수로 받고 params로 넣어 res 받음 (api/search.ts)
- SearchProvider의 useEffect 안에서 keyword가 바뀔때마다 데이터를 받아와 (getSearchResult 함수 사용 defined in api/search.ts) setSuggestions에 저장
- SelectList에서 Context API를 사용해 suggestions를 받아옴
- Home 페이지에서 changeKeyword 함수 (defined in SearchProvider)를 정의해 SearchForm에 넘김

### 2. 로컬 캐싱 구현

> - API 호출별로 로컬 캐싱 구현
>   - 캐싱 기능을 제공하는 라이브러리 사용 금지(React-Query 등)
> - expire time을 구현할 경우 가산점 (extra)

- cacheStorage class에서 save, get, remove 메서드 정의 (storage/cacheStorage.ts)
- cacheStorage에서 가져온 item의 headers['Data']를 현재 시간과 비교해 만료시간을 넘으면 remove을 불러와 cacheStorage에서 삭제

### 3. API 호출 횟수 줄이기

> - 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
>   - API를 호출할 때 마다 console.info("calling api") 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정

- useDebounce에서 현재 value와 delay를 매개변수로 받고 useEffect 안에서 value가 바뀔때마다 setTimeout를 사용해 delay 만큼 기다린 후 debouncedValue를 반환 (hooks/useDebounce.ts)
- SearchProvider에서 debouncedKeyword 변수에 useDebounce를 불러 저장하고 debouncedKeyword가 바뀔때만 getSearchResult를 불러옴

```js
export default function useDebounce({ value, delay }: debounceProps) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const hanlder = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(hanlder);
    };
  }, [value, delay]);
  return debouncedValue;
}
```

### 4. 키보드 접근성

> - 키보드만으로 추천 검색어들로 이동 가능하도록 구현

- SearchProvider에서 keyboardEvent 정의

```js
  const keyboardEvent = (event: React.KeyboardEvent<HTMLInputElement | HTMLUListElement>) => {
    if(suggestions.length === 0) return;
    const suggestionBtn = document.querySelectorAll(".list-suggestion button");
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectIndex((prev) => {
        const idx = prev < suggestions.length - 1 ? prev + 1 : 0;
        (suggestionBtn[idx] as HTMLButtonElement).focus();
        return idx;
      });
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectIndex((prev) => {
        const idx = prev > 0 ? prev - 1 : suggestions.length - 1;
        (suggestionBtn[idx] as HTMLButtonElement).focus();
        return idx;
      });
    }
  };
```

- input에서 ArrowDown 누를시 첫번째 추천 검색어로 이동
- SelectList 안에서 화살표로 순회하면서 이동 가능
- SearchItem에서 따로 keydownEvent 정의
  - 포커스된 item에서 Enter 누를시 input 값이 바뀜

### 5. 최근 검색어

- input을 submit 하면 최근 검색어 sessionStorage에 저장
- 겹치지 않게 가장 최근 5개의 검색어만 보여줌
- 1시간의 만료시간이 있음

#### 사용법

검색한 후
