

var expmod = function (a, b, n) {
  /* https://gist.github.com/krzkaczor/0bdba0ee9555659ae5fe */
  a = a % n
  var result = 1
  var x = a

  while (b > 0) {
    var leastSignificantBit = b % 2
    b = Math.floor(b / 2)

    if (leastSignificantBit == 1) {
      result = result * x
      result = result % n
    }

    x = x * x
    x = x % n
  }
  return result
}

var tangle = new Tangle(document.getElementById('dh'), {
    initialize: function () {
      this.g = 1523
      this.p = 1549
      this.a = Math.floor(Math.random() * 100000)
      this.b = Math.floor(Math.random() * 100000)
    },
    update: function () {
      this.A = expmod(this.g, this.a, this.p)
      this.B = expmod(this.g, this.b, this.p)
      this.K_A = expmod(this.B, this.a, this.p)
      this.K_B = expmod(this.A, this.b, this.p)
    }
})

