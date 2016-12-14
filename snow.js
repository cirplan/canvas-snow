/**
 * A canvas snow plugin for pc v0.1.1
 * created at: 2016-12-14
 */

;(function (win, id, factory) {
    "use strict";
    if (typeof (module) !== 'undefined' && module.exports) { // CommonJS
        module.exports = factory(id, win);
    } else if (typeof (define) === 'function' && define.amd ) { // AMD
        define(function () {
            return factory(id, win);
        });
    } else { // <script>
        win[id] = factory(id, win);
    }
})(window, 'Snow', function (id, window) {
    "use strict";

    window.requestAnimationFrame = window.requestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame ||
                                window.msRequestAnimationFrame || 
                                window.oRequestAnimationFrame ||
                                function(callback) { setTimeout(callback, 1000 / 60) }

    window.cancelAnimationFrame  =  window.cancelAnimationFrame ||
                                    window.mozCancelAnimationFrame ||
                                    window.webkitCancelAnimationFrame ||
                                    window.msCancelAnimationFrame || 
                                    window.oCancelAnimationFrame

    function Snow (option) {
        var _option = {
            el: null,
            w: window.innerWidth,
            h: window.innerHeight,
            mp: 100, 
            radius: 4,
            speed: 1,
            color: "rgba(255, 255, 255, 0.8)"
        }

        this.option = Object.assign(_option, option)
        if (!this.option.el) {
            throw TypeError('el can`t be null')
        }
        this.particles = []
        this.angle = 0
        this.canvas = document.getElementById(this.option.el)
        this.canvas.width = this.option.w
        this.canvas.height = this.option.h
        this.ctx = this.canvas.getContext('2d')
        this.init()
    }

    Snow.prototype = {
        constructor: Snow,

        init: function () {
            this.create()
            this.interval()
        },

        create: function() {
            var self = this,
                option = this.option

            for (var i = 0; i < option.mp; i++) {
                self.particles.push({
                    x: Math.random() * option.w,
                    y: Math.random() * option.h,
                    r: Math.random() * option.radius + 1,
                    d: Math.random() * option.mp
                })
            }
        },

        interval: function () {
            this.draw()
            this.update()
            requestAnimationFrame(this.interval.bind(this))
        },

        draw: function () {
            var self = this,
                option = this.option,
                ctx = this.ctx

            ctx.clearRect(0, 0, option.w, option.h)
            ctx.fillStyle = option.color
            ctx.beginPath()
            for (var i = 0; i < option.mp; i++) {
                var item = self.particles[i]
                ctx.moveTo(item.x, item.y)
                ctx.arc(item.x, item.y, item.r, 0, Math.PI * 2, true)
            }
            ctx.fill()
        },

        update: function () {
            var self = this,
                option = this.option,
                angle = this.angle += 0.01
            
            for (var i = 0; i < option.mp; i++) {
                var item = self.particles[i]

                item.x += Math.sin(angle) * 2;
                item.y += (Math.cos(angle + item.d) + 1 + item.r / 2) * option.speed
                
                if (item.x < -5 || item.x > option.w + 5 || item.y > option.h) {
                    if (i % 3 > 0) {
                        self.particles[i] = {
                            x: Math.random() * option.w,
                            y: -10,
                            r: item.r,
                            d: item.d
                        }
                    } else {
                        if (Math.sin(angle) > 0) {
                            self.particles[i] = {
                                x: -5,
                                y: Math.random() * option.h,
                                r: item.r,
                                d: item.d
                            }
                        } else {
                            self.particles[i] = {
                                x: option.w + 5,
                                y: Math.random() * option.h,
                                r: item.r,
                                d: item.d
                            }
                        }
                    }
                }
            }
        }
    }

    return Snow
});