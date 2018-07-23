var memory_array = ['&#x2601','&#x2601','&#x2604','&#x2604','&#x2622','&#x2622','&#x2665','&#x2665','&#x26F2','&#x26F2','&#x26BD',
'&#x26BD','&#x2699','&#x2699','&#x2693','&#x2693','&#x265B','&#x265B']
var memory_values = []
var memory_tile_ids = []
var tiles_flipped = 0
var turns = document.querySelector("#turns")

var lives = 15

Array.prototype.memory_tile_shuffle = function() {
	var i = this.length, j, temp
	while(--i > 0) {
		j = Math.floor(Math.random() * (i + 1))
		temp = this[j]
		this[j] = this[i]
		this[i] = temp
	}
}

function newBoard() {
	tiles_flipped = 0
	var output = ''
  memory_array.memory_tile_shuffle()
	for(var i = 0; i < memory_array.length; i++) {
		output += '<div id="tile_'+i+'" onclick=" memoryFlipTile(this,\'' + memory_array[i] + '\')"></div>'
	}
	document.querySelector('#container').innerHTML = output
}

newBoard()

function memoryFlipTile(tile,val) {
	if(tile.innerHTML == "" && memory_values.length < 2) {
		tile.innerHTML = val
		if(memory_values.length == 0) {
			memory_values.push(val)
			memory_tile_ids.push(tile.id)
		} else if(memory_values.length == 1) {
			memory_values.push(val)
			memory_tile_ids.push(tile.id)
			if(memory_values[0] == memory_values[1]) {
				tiles_flipped += 2
				memory_values = []
        memory_tile_ids = []
				if(tiles_flipped == memory_array.length) {
					alert("YOU WIN CONGRATZ!!! PLAY AGAIN")
					newBoard()
				}
			} else {
				function flip2Back() {
					var tile_1 = document.getElementById(memory_tile_ids[0])
					var tile_2 = document.getElementById(memory_tile_ids[1])
				  tile_1.innerHTML = ""
				  tile_2.innerHTML = ""
					memory_values = []
				  memory_tile_ids = []
					
				}
				var life = lives -= 1
				setTimeout(flip2Back, 500)
				turns.innerHTML = life
			}
			if (lives == 0) {
				alert("YOU LOSE! TRY AGAIN")
				newBoard()
				lives = 15
			}
		}
	}
}
