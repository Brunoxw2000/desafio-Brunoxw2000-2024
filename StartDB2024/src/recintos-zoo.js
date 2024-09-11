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
    },

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
    },

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

        let animal_obj = this.get_animal(animal)
        if (animal_obj === null) {
            return {erro: "Animal inválido"}
        }
        if(quantidade < 1 ){
            return {erro: "Quantidade invalida"}
        }
        this.recintos_list.forEach(recinto => {

            let multiplas_especies = 0
            recinto.animais_existentes_tipo.forEach(animal_acomodado =>
            {

                if (animal_obj.nome === "HIPPOPOTAMO" && animal_acomodado !== "HIPPOPOTAMO" && recinto.bioma !== "savana e rio")
                    return;

                if (animal_obj.nome === "MACACO" && animal_acomodado === null)
                    return;

                if ((animal_obj.carnivoro === 'sim') && (animal_acomodado !== animal_obj.nome))
                    return;

                if (animal_obj.nome !== animal_acomodado)
                    multiplas_especies = 1
            })

            let tamanho_lote = (parseInt(animal_obj.tamanho) * quantidade)+1

            if (parseInt(recinto.tamanho) > tamanho_lote)
                return;


            // Criar metodo depois para printar resultado
            resposta.push(recinto)
        })

    }

    get_carnivoro_no_recinto(recinto){
        if(recinto.animais_existentes_tipo.length === 1){
            this.animais_list.forEach(animal => {
                if (animal.nome === recinto.animais_existentes_tipo[0] && animal.carnivoro === 'sim') {
                    return animal.nome
                }
            })
        }
        return null
    }

    get_animal(nome){
        this.animais_list.forEach(element => {
            if (nome === element.nome ){
                return element;
            }
        })
        return null;
    }

    printa_todos(){
        this.recintos_list.forEach(recinto => {
            recinto.printa_recinto()
            console.log("---------------------")
        })
        this.animais_list.forEach(animal => {
            animal.printa_animal()
            console.log("----------------------")
        })
    }


}

export { RecintosZoo as RecintosZoo };
export { recintos as recintos };