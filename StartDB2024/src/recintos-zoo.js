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
        for (const regra in recintos) {
            for (const element in regra) {
                console.log(element);
            }
        }
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