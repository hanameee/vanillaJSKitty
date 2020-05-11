# vanillaJSKitty 🐱
Vanilla JS로 고양이 사진 검색하는 Application 만들기 [참고 링크]([https://velog.io/@hyeon930/%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%A6%AC%EC%8A%A4%EB%84%88-%EC%A4%84%EC%9D%B4%EA%B8%B0-Event-delegation](https://velog.io/@hyeon930/이벤트-리스너-줄이기-Event-delegation))

---

## 1. 프로젝트 설정

### 바벨(BabelJS) 설정

프로그래머스 과제에서 기본적으로 주어진 babel 설정을 그대로 설치함.

`npm i -D @babel/cli @babel/core @babel/preset-env @babel/polyfill`

#### 바벨이란? [참고 링크](https://www.zerocho.com/category/ECMAScript/post/57a830cfa1d6971500059d5a)

ES2015+ 문법을 사용한 코드를 예전 ES5 자바스크립트 코드로 바꿔주는 도구들. 바벨 7부턴 모든 바벨 패키지들이 `@babel` 이라는 네임스페이스 안에 속하게 되었음.

#### 바벨 설정파일 .babelrc

바벨 설정파일 `.babelrc` 을 통해 preset이나 plugin을 연결할 수 있다. preset은 여러 플러그인의 모음집니다. 다양한 preset 들이 있는데, 그 중 **env** 프리셋은 타겟 브라우저를 입력하면 알아서 사용자가 환경에 맞춰 최신 EcmaScript를 사용할 수 있게 해준다.

`.babelrc`

```js
{
  "presets": [
    ["@babel/preset-env", { "targets": { "browsers": ["last 2 versions", ">= 5% in KR"] } }]
  ]
}
```

#### package.json 스크립트 설정

```js
"scripts": {
  "build": "babel src -d dist -w",
}
```

위와 같이 설정하면, `npm run build` 명령을 수행할 때 babel을 실행하고, src 폴더에 있는 JS 코드를 컴파일하여 그 결과를 dist 폴더에 저장하라는 것.

`-d` : dist라는 디렉토리를 생성하고 그 안에 js를 컴파일해서 같은 이름으로 넣어준다.
`-w` : watch의 줄임말로 코드가 바뀔때마다 알아서 컴파일해서 즉각적으로 실행을 가능하게 해줌.

### ESLint 설정 [참고 링크](https://www.daleseo.com/js-eslint/)

`node_modules/.bin/eslint --init`  명령어로 자동으로 `.eslintrc.js` 파일을 만들 수 있다.

#### package.json 스크립트 설정

```js
"scripts": {
  "lint": "eslint src/**/*.js",
}
```

src 경로에 있는 모든 js 파일을 ESLint의 대상으로 간주하는 스크립트다.

