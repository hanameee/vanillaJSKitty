# vanillaJSKitty 🐱
Vanilla JS로 고양이 사진 검색하는 Application 만들기

---

### install

`npm install`

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

#### .eslintignore

```js
node_modules
```

gitignore과 비슷하게 lint 검사에 제외할 디렉토리를 명시할 수 있다.

---

## 2. 디렉토리 설정

디렉토리 설정은 아래와 같다. React와 상당히 유사하다.

<img src="README.assets/image-20200511184801972.png" alt="image-20200511184801972" style="zoom:50%;" />

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Vanilla JS Kittysearch</title>
        <script type="module" src="./src/main.js"></script>
    </head>
    <body></body>
</html>
```

`index.html` 파일 자체는 오직 script만을 불러오고, 다른 역할은 수행하지 않는다.



### 자바스크립트의 모듈 시스템

참고 링크1 : [의존성 관리](https://ui.toast.com/fe-guide/ko_DEPENDENCY-MANAGE/)
참고 링크2 : [You don't know JS module](https://ui.toast.com/weekly-pick/ko_20190418/)

모듈 스코프는 전역과 분리된 모듈만의 독립된 스코프이다. 모듈 스코프에 선언된 변수나 함수는 외부에서 접근할 수 없고, 별도로 `export`한 변수와 함수만 외부에서 접근할 수 있다. 위의 `index.html` 에 작성한 것처럼 모듈은 `script` 태그에 `module` 타입을 설정하여 로드할 수 있다.

```js
<script type="module" src="./src/main.js"></script>
```

외부에 노출시킬 함수와 변수를 지정할 수 있기 때문에, 모듈 스코프를 사용하면 전역 스코프가 여러 변수로 오염되는 것을 막을 수 있다. 또, 코드 상에서 명시적으로 모듈을 가져오기 때문에 코드로 모듈간 의존성을 파악할 수 있다.

#### 모듈 시스템 사용법

모듈 스코프를 사용하기 위해선 **ES6의 모듈**을 사용해야 한다. 모듈이 표준으로 정의된 ES6이 나오기 전에는 CommonJS와 AMD에서 제안하는 모듈 정의 방법이 있었다. 각각의 모듈 정의 방법은 아래와 같다. (현재 활발히 사용되고 있는 모듈은 ES6 모듈과 CommonJS 모듈 2가지이다)

#### AMD (Asynchronous Module Definition)

비동기 방식으로 `define` 함수를 사용하여 모듈의 API와 의존성 관계를 정의한다. CommonJS 보다는 문법이 덜 직관적이다.

```js
define(['jquery', 'lodash'], function($, _) {
  function privateFn() {};
  function publicFn() {};

  return {
    publicFn: publicFn
  };
});
```

AMD는 브라우저에서 바로 사용 가능하고, AMD를 지원하는 대표적인 라이브러리는 `RequireJS` 이다. 

#### CommonJS

동기 방식으로, **require** 함수로 의존성 모듈을 가져오고 **module.exports 객체**로 모듈의 API를 정의한다. 

CommonJS는 JS를 브라우저 이외의 환경에서 사용하고자 만들어졌기 때문에, 브라우저에서 바로 사용할 수 없다. 브라우저에서 CommonJS로 작성한 JS를 실행하려면 번들러로 변환과정을 거쳐야 한다. 하지만 Node에서는 CommonJS를 바로 사용할 수 있다.

**CommonJS 모듈의 내보내기**

`module.exports` 객체를 조작해서 모듈을 내보낼 수 있다.

1. module.exports 객체의 프로퍼티로 추가하여 내보내기

```js
module.exports.crop = function() {};
module.exports.rotate = function() {};
```

2. `module.export` 객체를 치환해서 내보내기

```js
module.exports = {
  crop: function() {},
  rotate: function() {}
}
```

**CommonJS 모듈의 가져오기**

`require()` 함수의 반환 값을 사용해 모듈을 가져올 수 있다. 이렇게 가져온 모듈은 앞서 내보낸 `module.export` 객체를 받은 것처럼 동작한다.

```js
let filter = require('filter')

filter.crop()
filter.rotate()
```

#### UMD (Universial Module Definition)

다양한 모듈 방식을 모두 지원하는 일종의 코드 패턴으로, 조건문으로 AMD나 CommonJS를 지원하는지 확인하여 지원하는 모듈 방식의 코드를 사용할 수 있다. 직접 UMD를 작성하는 일은 드물며 대부분 번들러에 의해 생성되는 코드를 사용한다.

#### ES6 모듈 ⭐️

ES6에서 표준으로 정의된 모듈에서는 모듈 정의를 위해 **export** 와 **import** 키워드를 사용한다.

**ES6 모듈의 내보내기**

CommonJS 모듈과 다르게 2가지 방법으로 내보낼 수 있다.

1. 이름 붙인 내보내기 (named export)
2. 기본값 내보내기

- **이름 붙인 내보내기 (named export)** - 함수, 변수, 클래스를 개별로 여러개 export 할 수 있다.

  ```js
  // filter.js
  // export 키워드를 사용해 개별로 export
  export function crop() {};
  export const rotate = function() {};
  ```
  
named export 한 모듈을 import 할 때는 `import` 키워드와 중괄호 `{}` 를 사용하고, 반드시 `export` 문에서 정의한 모듈 이름으로 가져와야 한다.
  
```js
  // graphics.js
  import {crop, rotate} from './filter';
  crop();
  rotate();
  ```

  named export의 경우 모듈을 import 할 때 **as 키워드로 별칭**을 붙일 수 있다.

  ```js
  // index.js
  import {sayHello as hi} from './lib';
  hi(); // Hello
  ```

- **기본값 내보내기** 

  내보내는 객체에 이름을 정의하지 않고, 한 모듈 파일 당 한 번만 사용할 수 있다. 모듈을 `default export` 로 지정할 경우, import 할 때 중괄호 `{}` 를 사용하지 않아도 된다.

  ```js
  // lib.js
  export default function sayHello(){
    console.log("Hello");
  }
  ```

  ```js
  // index.js
  import sayHello from './lib';
  sayHello(); // Hello
  ```

**ES6 모듈의 가져오기**

`import` 와 `from` 으로 모듈을 가져온다.

-  모듈 전체를 import 할 때는 `*` 을 사용한다.

  ```js
  // index.js
  import * as lib from './lib';
  lib.sayHello(); // Hello
  ```


- named export 한 모듈을 가져올 때는 `{}` 를 사용한다. default export 한 모듈을 가져올 때는 중괄호 없이 그냥 이름을 사용한다.

  ```js
  import {add, average} from 'mathmatics'
  import TextBox from 'textBox'
  ```



#### 근데... 대체 왜 모듈 시스템이 여러개인거야? 😒

ES6이 배포되기 전에는 ECMAScript에 **모듈이라는 개념**이 존재하지 않았고, 규모가 큰 프로젝트에서 의존성을 관리하기가 매우 불편했다. 따라서 모듈 간 의존성을 관리하기 위해 표준은 아니지만, **AMD나 CommonJS 같은 여러 모듈 방식**이 만들어졌다. 이 방식들을 토대로 여러 파일들을 한 개 또는 몇 개의 파일로 합쳐주는 requireJS, Browserify, Webpack등의 **번들러**가 개발되었다.

한동안 사람들은 이런 번들러들을 통해 모듈 개발을 계속했고, 이런 모듈 개발이 방식이 널리 퍼졌다. 하지만 2015년에 ES6가 등장하며 모듈 개념이 정식으로 ECMAScript 명세에 수록되었다. ES6을 지원하는 환경이 많지 않을 당시, **Babel**이 등장해 ES6 을 ES5 코드로, ES6 모듈을 CommonJS로 트랜스파일 해주면서 표준인 ES 모듈 개발 환경이 기존의 모듈 방식들을 대체할 수 있었다. 그 당시 **Webpack1** 은 풍부한 plugin을 통해 번들러 기능 외에 Task Runner 등의 다양한 기능들도 수행할 수 있어서 많이 사용되고 있었는데, ES6 문법을 처리하지 못하고 Babel을 이용해 CommonJS 모듈 형태로 변환된 코드만 번들링 할 수 있었으므로 Babel loader + Webpack을 쓰는 패턴이 많이 사용되었다.

지금까지 Webpack1로 개발된 라이브러리들이 잘 동작하고 있고, 최근의 프로젝트들 역시 ES6 모듈을 사용하더라도 필요에 따라 CommonJS 모듈 방식으로 내보내진 모듈을 사용하기도 하므로 여러 모듈 방식의 코드들이 웹 프론트엔드 생태계에 공존하게 되었다.

---

## 3. API 설정

API는 [The CAT API](https://thecatapi.com/) 를 사용할 것입니다. 🐱

### 비동기 처리 - Callback, Promise, Async/Await

참고 링크1 : [[자바스크립트] 비동기 처리 1부 - Callback](https://www.daleseo.com/js-async-callback/)
참고 링크2: [[자바스크립트] 비동기 처리 2부 - Promise](https://www.daleseo.com/js-async-promise/)
참고 링크3: [[자바스크립트] 비동기 처리 3부 - async/await](https://www.daleseo.com/js-async-async-await/)

#### Callback vs Promise

Promise는 현재에는 당장 얻을 수는 없지만 가까운 미래에는 얻을 수 있는 어떤 데이터에 접근하기 위한 방법을 제공한다. 당장 얻을 수 없다는 의미는 데이터를 얻기 위해 지연이 발생하는 경우를 말하는데, 이는 I/O 나 network를 통해서 데이터를 얻는 경우에 해당한다.

이런 지연이 발생하는 경우는 CPU 입장에서 엄청나게 긴 시간이기 때문에, Non-blocking 코드를 지향하는 JS에서는 비동기 처리가 필수적이다.

`콜백 함수 비동기 처리 방식`

```js
// getUser은 두번째 인자로 결과값을 이용해 실행될 로직을 넘겼고, 비동기 함수인 setTimeout 함수는 1초 후에 이 콜백함수를 호출했다.
function getUser(id, callback) {
  setTimeout(function () {
    console.log("Getting ID...")
    const user = {
      id: id,
      name: "User" + id,
      email: id +"@test.com",
    }
    callback(user)
  }, 1000)
}

getUser(1, function(user) {
  // 결과값을 이용해 실행될 로직
  console.log("user:", user)
})
```

이와 같이 콜백 함수를 이용해 비동기 처리를 해줄 때는, 비동기 함수로부터 결과값을 바로 리턴 받으려고 하지말고, 결과값을 통해 처리할 로직을 콜백 함수로 넘기는 스타일로 코딩을 해줘야 예상된 결과를 얻을 수 있다.

`Promise 이용한 비동기 처리 방식`

```js
function getUser(id) {
  // Promise 객체를 생성해 리턴한다
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log("Getting ID...")
      const user = {
        id: id,
        name: "User" + id,
        email: id +"@test.com",
      }
      resolve(user)
    }, 1000)
  })
}

getUser(1).then(function (user) {
  console.log("user:", user)
})
```

콜백함수를 인자로 넘기는 대신, Promise 객체를 생성해 리턴했고, 호출할 때는 리턴받은 Promise 객체에 `then()` 메서드를 호출하여 결과값을 가지고 실행할 로직을 넘겨준다.

콜백 함수와의 가장 큰 차이점은, 함수를 호출하면 `Promise` 타입의 결과값이 리턴되고 이 결과값을 가지고 다음 로직을 수행한다는 것!

비동기 처리 코드임에도 불구하고 마치 동기처럼 코드가 읽히기에 조금 더 직관적이다.

#### Promise 사용 방법

실제 코딩을 할 때는 Promise를 직접 생성해서 리턴해주는 코드를 작성하기보다는, 어떤 라이브러리의 함수를 호출해서 리턴 받은 Promise 객체를 사용하는 경우가 더 많다.

대표적으로 REST API를 호출할 때 사용되는 브라우저 내장 함수 `fetch()` 가 있다. `fetch()` 함수는 API의 URL을 인자로 받아, 미래 시점에 얻게 될 API 호출 결과를 Promise 객체로 리턴한다.

Promise 객체의 **then()** 메소드는 결과값을 가지고 수행할 로직을 담을 콜백 함수를 인자로 받고, **catch()** 메서드는 예외 처리 로직을 담은 콜백 함수를 인자로 받는다.

```js
fetch("https://api.thecatapi.com/v1/breeds/search?limit=50").then((response) => {
  if(response.status === 200) {
    return response.json()
  } else {
    console.log(response.statusText);
  }
}).then(returnedData => {
  console.log(returnedData)
}).catch(err => {
  console.log(err)
})
```

#### 참고 - XMLHttpRequest vs Fetch [참고 링크](https://junhobaik.github.io/ajax-xhr-fetch/)

기존 AJAX의 대표적인 API는 XMLHttpRequest 였다. ES2015 표준으로 Fetch API가 등장하면서 이제는 일반적으로 Fetch API를 통해 AJAX를 구현하게 되었다.

#### Async/Await

기존 Fetch API를 사용해 작성한 코드는 아래와 같다.
Method Chaining 기법을 통해 `then()` 메서드를 호출한다.

```js
const API_ENDPOINT = "https://api.thecatapi.com/v1";

const api = {
    fetchAllImage: () => {
        return fetch(`${API_ENDPOINT}/images/search?limit=10`).then(res => res.json());
    },
};

export default api;
```

Promise는 디버깅, 예외 처리 (try/catch 대신 catch메서드 사용), 들여쓰기로 인한 가독성 하락 등의 문제가 있다. 이를 해결하기 위해 ES7에 나온 키워드가 바로 `async/await`.

이를 async await 을 사용해 코드를 변경하면 아래와 같다.

```js
const api = {
    fetchAllImage: async () => {
      	const res = await fetch(`${API_ENDPOINT}/images/search?limit=10`)
        return res.json());
    },
};
```

**await** 키워드는 **async** 키워드가 붙어있는 함수 내부에서만 사용할 수 있으며, 비동기 함수가 리턴하는 Promise 로부터 결과값을 추출해준다. 

await 키워드를 사용하면 비동기 코드의 결과 값을 얻을 수 있을 때까지 기다리기 때문에, 일반적인 동기코드와 동일한 흐름으로 (함수 호출 후 결과값을 변수에 할당하는 식으로) 코드를 작성할 수 있어서 편리하다.

또한 동기/비동기 구분 없이 try/catch로 일관되게 예외 처리를 할 수 있다.

#### async await 사용 시 주의해야 할 점

**async** 키워드가 붙어있는 함수를 호출하면 명시적으로 Promise 객체를 생성하여 리턴하지 않아도 **Promise 객체가 리턴**된다. 이 객체가 최종적으로 반환하는 결과값을 사용할 땐 `then()` 메서드를 이용해야하는것!

하지만 만약 async 함수를 호출하는 함수 역시 async 함수 내부에 있다면, 동일한 방식으로 await 키워드를 통해 Promise가 제공하는 값에 바로 접근할 수 있다.

---

