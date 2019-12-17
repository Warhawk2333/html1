var sgypGame = {
	start: function() {
		this.data = new Array();
		for (var i = 0; i < this.Heng; i++) {
			this.data[i] = [];
			for (var j = 0; j < this.Shu; this.data[i][j] = 0, j++);
		} 
		this.someNextNum();
		this.someNextNum();
		this.resetFlex();
		document.addEventListener('keydown', (e) => {
			switch (e.keyCode) { 
				case 37:
					this.goLeft();
					break;
				case 38:
					this.goTop();
					break;
				case 39:
					this.goRight();
					break;
				case 40:
					this.goBottom();
					break;
			}
		});
		document.addEventListener('mousedown', this.Logic, false); 
		document.getElementById('container').addEventListener('touchstart', function(event) {　
			event.preventDefault();
			　　　
			startX = event.touches[0].pageX;　　　
			startY = event.touches[0].pageY;

		});
		document.getElementById('container').addEventListener('touchend', function(event) {
			event.preventDefault();　　　　
			moveEndX = event.changedTouches[0].pageX;　　　　
			moveEndY = event.changedTouches[0].pageY;　　　　
			X = moveEndX - startX;　　　　
			Y = moveEndY - startY;

			　
			if (Math.abs(X) > Math.abs(Y) && X > 0) {
				sgypGame.goRight();　　　　
			}　　　　
			else if (Math.abs(X) > Math.abs(Y) && X < 0) {　　　　　　
				sgypGame.goLeft();　　　　
			}　　　　
			else if (Math.abs(Y) > Math.abs(X) && Y > 0) {　　　　　　
				sgypGame.goBottom();　　　　
			}　　　　
			else if (Math.abs(Y) > Math.abs(X) && Y < 0) {　　　　　　
				sgypGame.goTop();　　　　
			}　　　　
			else {　　　　
				alert('暂停游戏')
				document.getElementById('container').style.display = "none";
				document.getElementById('peace').style.display = "block";
				document.getElementById('peace').addEventListener('click', function() {
					document.getElementById('container').style.display = "flex";
					document.getElementById('peace').style.display = "none";
				})　　　　
			}
		});


	},
	move: function(callback) {
		var move1 = String(this.data); 
		callback();
		var move2 = String(this.data);
		if (move1 != move2) {
			this.someNextNum(); 

			if (!this.gameOver()) { 
				this.state = 0;
			}
			this.resetFlex();
		}
	},

	resetFlex: function() {

		for (var i = 0; i < this.Heng; i++) {
			for (var j = 0; j < this.Shu; j++) {

				var oDiv = document.getElementById("item" + i + j);

				if (this.data[i][j] != 0) {
					oDiv.innerHTML = this.data[i][j];
					oDiv.className = "item n" + this.data[i][j]

				} else { 
					oDiv.innerHTML = "";
					oDiv.className = "item n0";
				}
			}
		}
		
		document.getElementById("score").innerHTML = "分数：" + this.score;
		
		if (this.state == 0) {
			document.getElementById("gameover").style.display = "block";
			document.getElementById("final").innerHTML = '最终得分：' + this.score;
			document.getElementById('container').style.display = "none";
		} else {
			document.getElementById("gameover").style.display = "none";

		}
	},
	
	Logic: function(event) {
		var e = event || window.event;
		var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
		var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
		var x = e.pageX || e.clientX + scrollX;
		var y = e.pageY || e.clientY + scrollY;
		document.onmouseup = function(event) {
			var e = event || window.event;
			var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			var x1 = e.pageX || e.clientX + scrollX;
			var y1 = e.pageY || e.clientY + scrollY;
			if (Math.abs(x - x1) > Math.abs(y - y1) && (x - x1) < 0) {
				sgypGame.goRight();
				
			} else if (Math.abs(x - x1) > Math.abs(y - y1) && (x - x1) > 0) {
				sgypGame.goLeft();
			} else if (Math.abs(x - x1) < Math.abs(y - y1) && (y - y1) < 0) {
				sgypGame.goBottom();
			} else if (Math.abs(x - x1) < Math.abs(y - y1) && (y - y1) > 0) {
				sgypGame.goTop();
			}
		};
	},

	gameOver: function() {
		for (var h = 0; h < this.Heng; h++) {
			for (var s = 0; s < this.Shu; s++) { 
				if (this.data[h][s] == 0) {
					return true;
					
				} else if (s < this.Shu - 1 && this.data[h][s] == this.data[h][s + 1]) {
					return true;
					
				} else if (h < this.Heng - 1 && this.data[h][s] == this.data[h + 1][s]) {
					return true;
					
				}
			}
		}
		
		return false;
	},
	someNextNum: function() {
		var h = Math.floor(Math.random() * (this.Heng));
		var s = Math.floor(Math.random() * (this.Shu));
		if (this.data[h][s] == 0) {
			if (Math.round(Math.random())) {
				this.data[h][s] = 2;
			} else {
				this.data[h][s] = 4;
			}
		} else if (this.data[h][s] !== 0) {
			this.someNextNum();
		}
	},
	
	goLeft: function() {
		this.move(() => {
			for (var i = 0; i < this.Heng; i++) {
				this.goLeftNext(i);
			}
		});
	},
	goLeftNext: function(h) {
		for (var s = 0; s < this.Shu - 1; s++) {
			var nextShu = this.getLeftNext(h, s);
			if (nextShu == -1) {
				break;
			} 
			else {
				if (this.data[h][s] == 0) {
					this.data[h][s] = this.data[h][nextShu]; 
					this.data[h][nextShu] = 0; 
					s--; 
				} else if (this.data[h][s] ==
					this.data[h][nextShu]) { 
					this.data[h][s] = this.data[h][s] * 2;
					this.score += this.data[h][s]; 
					this.data[h][nextShu] = 0; 
				}
			}
		}
	},
	
	getLeftNext: function(h, s) {
		s++;
		for (; s < this.Shu; s++) {
			if (this.data[h][s] != 0) { 
				return s;
			}
		}
		return -1;
	},
	goRight: function() {
		this.move(() => {
			for (let h = 0; h < this.Heng; h++) {
				this.goRightNext(h);
			}
		});
	},
	goRightNext: function(h) { 
		for (var s = this.Shu - 1; s > 0; s--) { 
			var prevShu = this.getRightNext(h, s);
			if (prevShu == -1) {
				break;
			} 
			else {
				if (this.data[h][s] == 0) {
					this.data[h][s] = this.data[h][prevShu];
					this.data[h][prevShu] = 0;
					s++;
				} else if (this.data[h][s] == this.data[h][prevShu]) {
					this.data[h][s] *= 2;
					this.score += this.data[h][s];
					this.data[h][prevShu] = 0;
				}
			}
		}
	},
	getRightNext: function(h, s) {
		s--;
		for (; s >= 0; s--) {
			if (this.data[h][s] != 0) {
				return s;
			}
		}
		return -1;
	},
	goTop: function() {
		this.move(() => {
			for (var s = 0; s < this.Shu; s++) {
				this.goTopNext(s);
			}
		});
	},
	goTopNext: function(s) {
		for (var h = 0; h < this.Heng - 1; h++) {
			var nextHeng = this.getTopNext(h, s);
			if (nextHeng == -1) {
				break;
			} else {
				if (this.data[h][s] == 0) {
					this.data[h][s] = this.data[nextHeng][s];
					this.data[nextHeng][s] = 0;
					h--;
				} else if (this.data[h][s] ==
					this.data[nextHeng][s]) {
					this.data[h][s] *= 2;
					this.score += this.data[h][s];
					this.data[nextHeng][s] = 0;
				}
			}
		}
	},
	getTopNext: function(h, s) {
		h++;
		for (; h < this.Heng; h++) {
			if (this.data[h][s] != 0) {
				return h;
			}
		}
		return -1;
	},
	goBottom: function() {
		this.move(() => {
			for (var s = 0; s < this.Shu; s++) {
				this.goBottomNext(s);
			}
		});
	},
	goBottomNext: function(s) {
		for (var h = this.Heng - 1; h > 0; h--) {
			var prevHeng = this.getBottomNext(h, s);
			if (prevHeng == -1) {
				break;
			} else {
				if (this.data[h][s] == 0) {
					this.data[h][s] = this.data[prevHeng][s];
					this.data[prevHeng][s] = 0;
					h++;
				} else if (this.data[h][s] ==
					this.data[prevHeng][s]) {
					this.data[h][s] *= 2;
					this.score += this.data[h][s];
					this.data[prevHeng][s] = 0;
				}
			}
		}
	},
	getBottomNext: function(h, s) {
		h--
		for (; h >= 0; h--) {
			if (this.data[h][s] != 0)
				return h;
		}
		return -1;
	},

	Heng: 4, 
	Shu: 4, 
	data: null,
	score: 0, 
	state: 1, 
	switchGame: true 
}
sgypGame.start();
document.getElementById('btn').addEventListener('click', function() {
	sgypGame.Heng=4;
	sgypGame.Shu=4;
	sgypGame.score=0;
	sgypGame.state=1;
	sgypGame.data=null;
	document.getElementById("gameover").style.display = "none";
	document.getElementById("final").style.display='none'
	document.getElementById('container').style.display = "flex";
	sgypGame.start();
});