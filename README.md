# WANTED 프리온보딩 프론트엔드 3주차 과제
- WANTED 프리온보딩 프론트엔드 3주차 개인 과제입니다. 
- 임상시험에 과해 검색어를 추천해주는 프로젝트입니다. 

## 배포 링크
<a href="clinical-trial-search.netlify.app">Clinical Trial Search 배포 링크</a>
- local에서는 json-server를 사용해서 api를 호출합니다. (main branch)
- 배포 사이트에서는 db.json에서 바로 데이터를 가져옵니다. (deploy branch)
- api/search.ts 파일의 getKeyword 함수를 제외하고 모든 파일이 같습니다. 

## 사용 라이브러리
- 언어: TypeScript
- 스타일 관리: styled-components, react-icons
- 라우팅 관련 라이브버리: react-router-dom
- HTTP Client: axios
- 협업 설정 도구: eslint, prettier, husky, lint-staged
```js
  "dependencies": {
    "axios": "^1.2.2",
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
- api class에서 generic하게 사용할 수 있게 get 메서드를 정의 (api/http.ts)
```js
export default class http {
  private axiosInstance: AxiosInstance;
  constructor(BASE_URL: string) {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
    });
  }

  public async get<T>(endPoint: string, params: object): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(endPoint, params);
      return response.data;
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  }
}
```
- getKeyword 함수에서 keyword를 매개변수로 받고 params로 넣어 res 받음 (api/search.ts)
- Home 페이지에서 useEffect 안에서 keyword가 바뀔때마다 데이터를 받아와 (getSearchResult 함수 사용 defined in api/search.ts) setsuggestions에 저장
- SelectList에서 isKeywordTyped (검색어가 있는지 없는지 확인하기 위해서), suggestions를 넘겨줌
- Home 페이지에서 changeKeyword 함수 (검색어 변경)를 정의해 SearchForm에 넘김


### 2. 로컬 캐싱 구현
> - API 호출별로 로컬 캐싱 구현
>   - 캐싱 기능을 제공하는 라이브러리 사용 금지(React-Query 등)
> - expire time을 구현할 경우 가산점 (extra)

- SessionStorage class에서 save, get, remove 메서드 정의 (storage/sessionStorage.ts)
```js
export default class SessionStorage {
  private EXP = 10; // MIN

  save(keyword: string, suggestions: suggestion[]) {
    const now = new Date();
    const item = {
      value: suggestions,
      expiry: now.getTime() + this.EXP * 60 * 1000,
    };
    sessionStorage.setItem(keyword, JSON.stringify(item));
  }

  get(keyword: string) {
    const item = JSON.parse(sessionStorage.getItem(keyword) || '{}');
    const now = new Date();
    if (Object.keys(item).length === 0) {
      return null;
    }
    if (now.getTime() > item.expiry) {
      this.remove(keyword);
      return null;
    }
    return item.value;
  }

  remove(keyword: string) {
    sessionStorage.removeItem(keyword);
  }
}
```
- save에서 keyword와, suggestion 배열을 받아, 정의해준 만료시간을 sessionStorage에 저장
- 아닐시 item.value를 반환
- get에서 keyword를 받아 현재시간이 만료시간보다 크면 remove를 불러와 sessionStorage에서 삭제
- getSearchResult에서 SessionStorage 클래스에서 keyword에 해당한 값을 가져와 있으면 그 값을 없으면 getKeyword 함수를 사용해 api 호출한 다음 sessionStorage에 최대 10개의 값만 저장 (api/search.ts)

#### sessionStorage 사용 이유


### 3. API 호출 횟수 줄이기
> - 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
>   - API를 호출할 때 마다 console.info("calling api") 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정

- useDebounce에서 현재 value와 delay를 매개변수로 받고 useEffect 안에서 value가 바뀔때마다 setTimeout를 사용해 delay 만큼 기다린 후 debouncedValue를 반환 (hooks/useDebounce.ts)
- Home 페이지에서 debouncedKeyword 변수에 useDebounce를 불러 저장하고 debouncedKeyword가 바뀔때만 getSearchResult를 불러옴
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

- useArrowKeyDown에서 ArrowKeyDown 함수를 정의
```js
export default function useArrowKeyDown({ suggestions }: arrowKeyDownProps) {
  const [current, setCurrent] = useState<number>(0);
  const ArrowKeyDown = (e: React.KeyboardEvent) => {
    const length = suggestions.length < 10 ? suggestions.length : 10;
    if (e.key === 'ArrowUp' && current > 0) {
      setCurrent((prev) => prev - 1);
    }
    if (e.key === 'ArrowDown' && current < length - 1) {
      setCurrent((prev) => prev + 1);
    }
    const buttons = (e.target as HTMLElement).closest('ul')?.querySelectorAll('button');
    if (buttons) {
      buttons[current].focus();
    }
  };
  return ArrowKeyDown;
}
```
- e.key가 ArrowUp이고 current 값이 0보다 클때 current - -
- e.key가 ArrowDown이고 current 값이 length-1보다 작을때 current ++
- SelectList 안에 있는 모든 button을 찾아 저장해주고 buttons[current]에 focus 시켜줌
- SelectList에서 ArrowKeyDown에 해당 함수를 저장하고 ul 태그에 onKeyDown에 함수 넣음
- ul 태그에 tabIndex=0 적용해야함

#### 사용법
검색한 후 