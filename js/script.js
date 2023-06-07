let grid;
let proximaGeraçao;
let cols;
let rows;
let space;
let rodando = true;
let xSelecionado = 10;
let ySelecionado = 10;
const resoluçao = 10;

function fazArrVazio(cols, rows) {
    return Array(cols).fill(null).map(() => Array(rows));
}

function façaGrid(cols, rows, vazio = false) {
    const arr2D = fazArrVazio(cols, rows);

    if (vazio === false) {
        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                arr2D[col][row] = floor(random(2));
            }
        }
    } else {
        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                arr2D[col][row] = 0;
            }
        }
    }
    return arr2D
}

function calculeVizinhos(grid, x, y) {

    let vizinhosSoma = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            vizinhosSoma += grid[col][row];
        }
    }

    vizinhosSoma -= grid[x][y];

    return vizinhosSoma
}

function desenheGrid() {
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            const x = col * resoluçao;
            const y = row * resoluçao;

            (grid[col][row] === 1) ? rect(x, y, resoluçao, resoluçao) : null

        }
    }
}


function façaGeraçao() {
    proximaGeraçao = façaGrid(cols, rows);

    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {

            const celulaAtual = grid[col][row];

            const vizinhos = calculeVizinhos(grid, col, row);


            // Se tiver menos que dois vizinhos morre
            if ((celulaAtual === 1) && (vizinhos < 2)) proximaGeraçao[col][row] = 0;
            // Se tiver mais que 3 vizinhos morre
            else if ((celulaAtual === 1) && (vizinhos > 3)) proximaGeraçao[col][row] = 0;
            // Se não existir e houver 3 vizinhos, reproduzem
            else if ((celulaAtual === 0) && (vizinhos === 3)) proximaGeraçao[col][row] = 1;
            // Ou então permanece
            else proximaGeraçao[col][row] = celulaAtual;


        }
    }

    grid = proximaGeraçao;
}

function setup() {
    createCanvas(600, 600);

    cols = width / resoluçao;
    rows = height / resoluçao;
    grid = façaGrid(cols, rows);

    space = min(width, height) / max(rows, cols);

}

function draw() {

    background(0);
    frameRate(10);
    if (rodando === true) {
        façaGeraçao();
    }

    document.getElementById('limpar-grid').addEventListener('click', () => {
        grid = façaGrid(cols, rows, vazio = true);
        rodando = false;
    })

    document.getElementById('rodar-jogo').addEventListener('click', () => {
        rodando = true;
    })

    document.getElementById('gerar-grid').addEventListener('click', () => {
        grid = façaGrid(cols, rows);
    })

    desenheGrid();
}

function mousePressed() {

    xSelecionado = floor(mouseX / space);
    ySelecionado = floor(mouseY / space);
    if (xSelecionado < cols && ySelecionado < rows) {
        (grid[xSelecionado][ySelecionado] == 0) ? grid[xSelecionado][ySelecionado] = 1 : grid[xSelecionado][ySelecionado] = 0
    }
}