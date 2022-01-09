# FlockFlock

Boid (flock simulation) in the browser.

![Image](https://github.com/moekidev/flockflock/blob/main/docs/image.gif)

## Installation

```
npm i -D flockflock
```

```
yarn add -D flockflock
```

## Usage

```html
<div class="world" style="width: 500px; height: 500px;"></div>
```

```js
import { Flock } from 'flockflock'

new Flock('.world', {
  n: 200,
  fps: 60,
  bait: true,
  predator: true
})
```
