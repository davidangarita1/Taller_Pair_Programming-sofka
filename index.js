// Esta funcion es la configuracion del juego
(function () {
	self.Board = function (width, height) {
		this.width = width;
		this.height = height;
		this.playing = false;
		this.game_over = false;
		this.bars = [];
		this.ball = null;
	}

	self.Board.prototype = {
		get elements() {
			var elements = this.bars;
			//elements.push(this.ball);
			return elements;
		}
	}
})();

// Esta funcion se encarga de definir las medidas del canvas
(function () {
	self.Bar = function (x, y, width, height, board) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.board = board;
		this.board.bars.push(this); // Se agrega la barra al tablero
		this.kind = 'rectangle'; // Se define el tipo de elemento
		this.speed = 10; // Se define la velocidad de la barra
	}

	self.Bar.prototype = {
		down: function () {
			this.y += this.speed;
		},
		up: function () {
			this.y -= this.speed;
		},
		toString: function () {
			return "x: " + this.x + " y: " + this.y;
		}
	}
})();

// Esta funcion se encarga de dibujar el tablero
(function () {
	self.BoardView = function (canvas, board) {
		this.canvas = canvas;
		this.canvas.width = board.width;
		this.canvas.height = board.height;
		this.board = board; // Se asigna el tablero
		this.ctx = this.canvas.getContext('2d'); // Obtiene el contexto del canvas
		this.canvas.style.background = '#955227';
	}

	self.BoardView.prototype = {
		
		clean: function () {
			this.ctx.clearRect(0, 0, this.board.width, this.board.height);
			this.ctx.fillStyle = "white";
		},
		draw: function () {
			for (var i = this.board.elements.length - 1; i >= 0; i--) { // Se recorre el elemento para dibujarlo
				var el = this.board.elements[i];

				draw(this.ctx, el);
			}
		},
		play: function () {
			this.clean(); // Se limpia el canvas
			this.draw(); // Se dibuja el tablero
		}
	}

	// Se encarga de dibujar el element elegido
	function draw(ctx, element) {
		switch (element.kind) {
			case 'rectangle':
				ctx.fillRect(element.x, element.y, element.width, element.height);
				break;
		}
	}
})();

var board = new Board(800, 400); // Se crea el tablero con las dimensiones del canvas
// x, y, width, height
var bar = new Bar(0, 150, 20, 100, board); // Se crea la barra1
var bar_2 = new Bar(780, 150, 20, 100, board); // Se crea la barra2
var bar_3 = new Bar(400, 0, 2, 800, board); // Se crea la barra2
var canvas = document.getElementById('canvas'); // Se obtiene el canvas desde el DOM
var board_view = new BoardView(canvas, board); // Se crea el tablero

document.addEventListener("keydown", function (ev) {
	ev.preventDefault();
	if (ev.keyCode == 38) {
		if(bar.y >= 10) {
			bar.up(); // Se mueve la barra hacia arriba
		}
	}
	else if (ev.keyCode == 40) {
		if(bar.y <= 290) {
			bar.down(); // Se mueve la barra hacia abajo
		}
	}
	else if (ev.keyCode == 87) {
		//W
		if(bar_2.y >= 10) {
			bar_2.up(); // Se mueve la segunda barra hacia arriba
		}
		
	}
	else if (ev.keyCode == 83) {
		//S
		if(bar_2.y <= 290) {
			bar_2.down(); // Se mueve la segunda barra hacia abajo
		}
		
	}
});

// self.addEventListener('load', main); // Esta funcion se encarga de escuchar la carga de la pagina

window.requestAnimationFrame(controller); // Se llama a la funcion main cada vez que se refresca la pantalla

// Esta funcion se encarga de inicializar el juego
function controller() {
	board_view.play();
	window.requestAnimationFrame(controller);
}