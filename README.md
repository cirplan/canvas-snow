# canvas-snow
A canvas snow plugin for pc.

Copy from: [html5-canvas-snow-effect](http://thecodeplayer.com/walkthrough/html5-canvas-snow-effect)

## Demo

[demo](http://jeffdeng.me/canvas-snow/)

## How to use 

```
<canvas id="canvas"></canvas>
<script src="snow.js"></script>
<script>
    window.onload = function () {
        new Snow({
            el: 'canvas'
        })
    }
</script>
```

## Syntax

    new Snow(option)

## Params

```
    option = {
        el: null,                           // canvas element id 
        w: window.innerWidth,               // canvas width, default widow.innerWidth
        h: window.innerHeight,              // canvas height, default window.innerHeight
        mp: 100,                            // snow particles, default 100
        radius: 4,                          // snow radius level, default 4
        speed: 1,                           // snow drop speed rate, default 1
        color: "rgba(255, 255, 255, 0.8)"   // snow color, default rgba(255, 255, 255, 0.8)
    }
```