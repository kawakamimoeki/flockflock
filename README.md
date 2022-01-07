# Baitball

Boid in the browser

![Image](https://github.com/moekidev/baitball/blob/main/docs/image.gif)

## Installation

```
npm i -D baitball
```

```
yarn add -D baitball
```

## Usage

```html
<div class="world" style="width: 500px; height: 500px;"></div>
```

```js
import { Baitball } from 'baitball'

new Baitball('.world', {
  n: 200,
  fps: 60,
  bait: true,
  predator: true
})
```
