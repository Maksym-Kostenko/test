var TicTacToe = /** @class */ (function () {
    function TicTacToe() {
        var _this = this;
        this.blockWinner = document.getElementById('blockWinner');
        this.step = '';
        this.spanWho = document.getElementById('spanWho');
        this.winner = '';
        this.win = [
            [0, 1, 2],
            [0, 4, 8],
            [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ];
        this.blockItem = document.querySelectorAll('.blockItem');
        this.counter = 0;
        this.spanWin = document.getElementById('spanWin');
        this.btnNewGame = document.getElementById('btnNewGame');
        if (this.btnNewGame) {
            this.btnNewGame.addEventListener('click', function () {
                _this.resetGame();
            });
        }
        this.who();
        this.addClickHandlers();
    }
    TicTacToe.prototype.who = function () {
        if (this.step === 'circle') {
            this.step = 'krest';
            if (this.spanWho) {
                this.spanWho.innerText = 'Хрестики';
            }
        }
        else {
            this.step = 'circle';
            if (this.spanWho) {
                this.spanWho.innerText = 'Нулики';
            }
        }
    };
    TicTacToe.prototype.addClickHandlers = function () {
        var _this = this;
        this.blockItem.forEach(function (item) {
            item.addEventListener('click', function () {
                _this.handleItemClick(item);
            });
        });
    };
    TicTacToe.prototype.handleItemClick = function (item) {
        if (!item.classList.contains('circle') && !item.classList.contains('krest')) {
            item.classList.add(this.step);
            item.innerText = this.step === 'krest' ? 'X' : '0';
            this.counter++;
            this.who();
            if (this.circleWin() || this.krestWin() || this.noWin()) {
                this.endGame(this.winner);
            }
        }
    };
    TicTacToe.prototype.circleWin = function () {
        for (var i = 0; i < this.win.length; i++) {
            if (this.blockItem[this.win[i][0]].classList.contains('circle') &&
                this.blockItem[this.win[i][1]].classList.contains('circle') &&
                this.blockItem[this.win[i][2]].classList.contains('circle')) {
                this.setWinnerAndEndGame('Нулики');
                return true;
            }
        }
        return false;
    };
    TicTacToe.prototype.krestWin = function () {
        for (var i = 0; i < this.win.length; i++) {
            if (this.blockItem[this.win[i][0]].classList.contains('krest') &&
                this.blockItem[this.win[i][1]].classList.contains('krest') &&
                this.blockItem[this.win[i][2]].classList.contains('krest')) {
                this.setWinnerAndEndGame('Хрестики');
                return true;
            }
        }
        return false;
    };
    TicTacToe.prototype.noWin = function () {
        if (!this.krestWin() && !this.circleWin() && this.counter >= 9) {
            this.setWinnerAndEndGame('Нічия');
            return true;
        }
        return false;
    };
    TicTacToe.prototype.setWinnerAndEndGame = function (winner) {
        this.blockItem.forEach(function (item) {
            item.classList.add('winColor');
        });
        this.winner = winner;
        this.endGame(this.winner);
    };
    TicTacToe.prototype.endGame = function (winner) {
        if (this.blockWinner) {
            this.blockWinner.style.pointerEvents = 'none';
            this.blockWinner.style.display = 'flex';
        }
        if (this.spanWin) {
            this.spanWin.innerText = winner;
        }
    };
    TicTacToe.prototype.resetGame = function () {
        document.location.reload();
    };
    return TicTacToe;
}());
var game = new TicTacToe();
