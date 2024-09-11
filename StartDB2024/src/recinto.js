import * as console from "node:console";


class Recinto {

    constructor(dici) {
        // Inicialização das propriedades da instância
        this.numero = parseInt(dici['numero']);
        this.bioma = dici['bioma'];
        this.tamanho_total = parseInt(dici['tamanho_total']);

        let aux = dici['animais_existentes'].split(" ")
        if (aux.length === 1) {
            this.animais_existentes_numero = [];
            this.animais_existentes_tipo = [];
        } else {
            this.animais_existentes_numero = [parseInt(aux[0])];
            this.animais_existentes_tipo = [aux[1]];
        }

    }

    print_animais_existentes() {
        for (let i = 0; i < this.animais_existentes_numero.length; i++) {
            console.log('Animal: ' + this.animais_existentes_tipo[i] + ' Numero: ' + this.animais_existentes_numero[i]);
        }
    }

    printa_recinto(){
        console.log('Numero: ' + this.numero)
        console.log('Bioma: ' + this.bioma)
        console.log('Tamanho Total: ' + this.tamanho_total)
        this.print_animais_existentes()

    }

}

export { Recinto as Recinto };
