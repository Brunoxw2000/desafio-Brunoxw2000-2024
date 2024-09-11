import * as console from "node:console";

class Animal{
    constructor(dici) {
        // Inicialização das propriedades da instância
        this.nome = (dici['nome']);
        this.tamanho = parseInt(dici['tamanho']);
        this.carnivoro = dici['carnivoro'];

        let aux = dici['bioma'].split(" ")
        this.bioma = []

        if (aux.length === 1) {
            this.bioma.push(dici['bioma']);

        } else {
            this.bioma.push(aux[0]);
            this.bioma.push(aux[2]);
        }
    }

    printa_animal(){
        console.log('Nome: ' + this.nome)
        console.log('Tamanho: ' + this.tamanho)
        console.log('Carnivoro: ' + this.carnivoro)
        console.log('Bioma: ' + this.bioma.join(', '))
    }
}

export {Animal as Animal};