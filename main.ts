radio.onReceivedNumber(function (receivedNumber) {
    primljeno.push(receivedNumber)
})
let check = false
let yplus = 0
let xplus = 0
let steps = 0
let ysteps = 0
let xsteps = 0
let primljeno: number[] = []
radio.setGroup(50)
primljeno = []
let x: number[] = []
let y: number[] = []
let control2 = -1
basic.forever(function () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    if (primljeno[primljeno.length - 1] == control2) {
        for (let index = 0; index <= (primljeno.length - 1) / 2 - 1; index++) {
            x.push(primljeno[2 * index])
            y.push(primljeno[2 * index + 1])
        }
        for (let index = 0; index <= x.length - 1; index++) {
            led.plot(x[index], 4 - y[index])
        }
        basic.pause(2000)
        basic.showString("GO!")
        for (let index = 0; index <= x.length - 1; index++) {
            led.plot(x[index], 4 - y[index])
        }
        for (let index = 0; index <= x.length - 2; index++) {
            xsteps = x[index + 1] - x[index]
            ysteps = y[index + 1] - y[index]
            steps = xsteps + ysteps
            xplus = 0
            yplus = 0
            led.plot(x[index], 4 - y[index])
            basic.pause(2000)
            for (let path = 0; path <= steps - 1; path++) {
                if (xplus < xsteps && yplus < ysteps) {
                    check = Math.randomBoolean()
                    if (check == true) {
                        xplus += 1
                    } else {
                        yplus += 1
                    }
                } else {
                    if (xplus < xsteps) {
                        xplus += 1
                    } else {
                        yplus += 1
                    }
                }
                led.plot(x[index] + xplus, 4 - (y[index] + yplus))
                basic.pause(2000)
            }
        }
        primljeno[primljeno.length - 1] = control2 - 1
    }
    primljeno = []
})
