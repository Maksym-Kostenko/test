
class TicTacToe {
    private blockWinner: HTMLElement | null;
    private step: string;
    private spanWho: HTMLElement | null;
    private winner: string;
    private win: number[][];
    private blockItem: NodeListOf<HTMLDivElement>;
    private counter: number;
    private spanWin: HTMLElement | null;
    private btnNewGame: HTMLElement | null;

    constructor() {
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
        this.blockItem = document.querySelectorAll('.blockItem') as NodeListOf<HTMLDivElement>;
        this.counter = 0;
        this.spanWin = document.getElementById('spanWin');
        this.btnNewGame = document.getElementById('btnNewGame');

        if (this.btnNewGame) {
            this.btnNewGame.addEventListener('click', () => {
                this.resetGame();
            });
        }

        this.who();
        this.addClickHandlers();
    }

    private who(): void {
        if (this.step === 'circle') {
            this.step = 'krest';
            if (this.spanWho) {
                this.spanWho.innerText = 'Хрестики';
            }
        } else {
            this.step = 'circle';
            if (this.spanWho) {
                this.spanWho.innerText = 'Нулики';
            }
        }
    }

    private addClickHandlers(): void {
        this.blockItem.forEach((item) => {
            item.addEventListener('click', () => {
                this.handleItemClick(item);
            });
        });
    }

    private handleItemClick(item: HTMLDivElement): void {
        if (!item.classList.contains('circle') && !item.classList.contains('krest')) {
            item.classList.add(this.step);
            item.innerText = this.step === 'krest' ? 'X' : '0';
            this.counter++;
            this.who();
            if (this.circleWin() || this.krestWin() || this.noWin()) {
                this.endGame(this.winner);
            }
        }
    }

    private circleWin(): boolean {
        for (let i = 0; i < this.win.length; i++) {
            if (
                this.blockItem[this.win[i][0]].classList.contains('circle') &&
                this.blockItem[this.win[i][1]].classList.contains('circle') &&
                this.blockItem[this.win[i][2]].classList.contains('circle')
            ) {
                this.setWinnerAndEndGame('Нулики');
                return true;
            }
        }
        return false;
    }

    private krestWin(): boolean {
        for (let i = 0; i < this.win.length; i++) {
            if (
                this.blockItem[this.win[i][0]].classList.contains('krest') &&
                this.blockItem[this.win[i][1]].classList.contains('krest') &&
                this.blockItem[this.win[i][2]].classList.contains('krest')
            ) {
                this.setWinnerAndEndGame('Хрестики');
                return true;
            }
        }
        return false;
    }

    private noWin(): boolean {
        if (!this.krestWin() && !this.circleWin() && this.counter >= 9) {
            this.setWinnerAndEndGame('Нічия');
            return true;
        }
        return false;
    }

    private setWinnerAndEndGame(winner: string): void {
        this.blockItem.forEach((item) => {
            item.classList.add('winColor');
        });
        this.winner = winner;
        this.endGame(this.winner);
    }

    private endGame(winner: string): void {
        if (this.blockWinner) {
            this.blockWinner.style.pointerEvents = 'none';
            this.blockWinner.style.display = 'flex';
        }
        if (this.spanWin) {
            this.spanWin.innerText = winner;
        }
    }

    private resetGame(): void {
        document.location.reload();
    }
}

const game = new TicTacToe();

