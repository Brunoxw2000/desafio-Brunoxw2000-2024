import {Recinto} from "./recinto.js";
import {Animal} from "./animal.js";

const recintos = {
    1: {
        numero: '1',
        bioma: 'savana',
        tamanho_total: '10',
        animais_existentes: '3 MACACO'
    },
    2: {
        numero: '2',
        bioma: 'floresta',
        tamanho_total: '5',
        animais_existentes: 'vazio'
    },
    3: {
        numero: '3',
        bioma: 'savana e rio',
        tamanho_total: '7',
        animais_existentes: '1 GAZELA'
    },
    4: {
        numero: '4',
        bioma: 'rio',
        tamanho_total: '8',
        animais_existentes: 'vazio'
    },
    5: {
        numero: '5',
        bioma: 'savana',
        tamanho_total: '9',
        animais_existentes: '1 LEAO'
    }
}

const animais = {
    1: {
        nome: 'LEAO',
        tamanho: '3',
        bioma: 'savana',
        carnivoro: 'sim',

    },
    2: {
        nome: 'LEOPARDO',
        tamanho: '2',
        bioma: 'savana',
        carnivoro: 'sim',
    },
    3: {
        nome: 'CROCODILO',
        tamanho: '3',
        bioma: 'rio',
        carnivoro: 'sim',

    },
    4: {
        nome: 'MACACO',
        tamanho: '1',
        bioma: 'savana ou floresta',
        carnivoro: 'nao',
    },
    5: {
        nome: 'GAZELA',
        tamanho: '2',
        bioma: 'savana',
        carnivoro: 'nao',
    },
    6: {
        nome: 'HIPOPOTAMO',
        tamanho: '4',
        bioma: 'savana ou rio',
        carnivoro: 'nao',
    }
}

class RecintosZoo {

    constructor() {
        this.recintos_list = []
        this.animais_list = []

        for (const recinto in recintos) {
            this.recintos_list.push(new Recinto(recintos[recinto]))
        }

        for (const animal in animais) {
            this.animais_list.push(new Animal(animais[animal]))
        }

    }

    analisaRecintos(animal, quantidade) {
        let resposta = []
        let esp_final = []

        let animal_obj = this.get_animal(animal)
        if (animal_obj === null) {
            return {erro: "Animal inválido"}
        }
        if(quantidade < 1 ){
            return {erro: "Quantidade inválida"}
        }

        this.recintos_list.forEach(recinto => {
            let recinto_invalido = 0
            if(this.checa_bioma(animal_obj,recinto) === false){
                return
            }

            if ((animal_obj.nome === "MACACO") && (recinto.animais_existentes_tipo.length === 0 ) && (quantidade === 1)) {
                console.log("MACACO ERRADO")
                return;
            }

            let multiplas_especies = 0
            recinto.animais_existentes_tipo.forEach(animal_acomodado => {

                if ((animal_obj.nome === "HIPOPOTAMO") && (animal_acomodado !== "HIPOPOTAMO")) {
                    if ((recinto.get_bioma() !== "savana rio")) {
                        recinto_invalido = 1
                        return ;
                    }
                }

                if ((animal_obj.nome !== animal_acomodado) && (this.get_carnivoro_no_recinto(recinto) === 'sim')) {
                    recinto_invalido = 1
                    return;
                }

                if ((animal_obj.carnivoro === 'sim') && (animal_acomodado !== animal_obj.nome)) {
                    recinto_invalido = 1
                    return;
                }

                if (animal_obj.nome !== animal_acomodado) {
                    multiplas_especies = 1
                }
            })

            if(recinto_invalido === 1){
                return
            }

            let tamanho_lote = animal_obj.tamanho * quantidade
            if(multiplas_especies === 1){
                tamanho_lote++
            }

            let esp_livre_recinto = this.calcula_esp_livre_recinto(recinto)
            if (tamanho_lote > esp_livre_recinto)
                return;

            resposta.push(recinto)
            esp_final.push(esp_livre_recinto - tamanho_lote)
        })

      return this.monta_resposta(resposta, esp_final)
    }

    get_carnivoro_no_recinto(recinto){
        if(recinto.animais_existentes_tipo.length === 1){
            for (let animal of this.animais_list){
                if (animal.nome === recinto.animais_existentes_tipo[0] && animal.carnivoro === 'sim') {
                    return 'sim'
                }
            }
        }
        return 'não'
    }

    get_animal(nome) {
        for (let element of this.animais_list) {
            if (nome === element.nome) {
                return element;
            }
        }
        return null;
    }

    monta_resposta(recintos_livres, esp_final){
        if(recintos_livres.length === 0){
            return { erro: 'Não há recinto viável'}
        }

        let saida = []
        for (let i = 0; i < recintos_livres.length; i++) {
            saida.push(`Recinto ${recintos_livres[i].numero} (espaço livre: ${esp_final[i]} total: ${recintos_livres[i].tamanho_total})`)
        }
        return { recintosViaveis: saida}
    }

    calcula_esp_livre_recinto(recinto){
        if (recinto.animais_existentes_tipo.length === 0) {
            return recinto.tamanho_total
        } else {
            return recinto.tamanho_total - this.calcula_tamanho_animal(recinto.animais_existentes_tipo[0],
                recinto.animais_existentes_numero[0])
        }
    }

    calcula_tamanho_animal(animal, quantidade){
        for (let x of this.animais_list){
            if (x.nome === animal){
                return x.tamanho * quantidade
            }
        }
    }

    checa_bioma(animal,recinto){
       for(let bioma of animal.bioma)  {
            for(let element of recinto.bioma){
                if (element === bioma) {
                    return true;
                }
            }

        }
        return false
    }
}

export { RecintosZoo as RecintosZoo };
export { recintos as recintos };