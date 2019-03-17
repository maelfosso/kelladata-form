import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-default-form',
  templateUrl: './default-form.component.html',
  styleUrls: ['./default-form.component.sass']
})
export class DefaultFormComponent implements OnInit {

  choices: any = {
    "mf" : [
      { key: "1", label: "M" },
      { key: "2", label: "F" },
    ],
    "yes-no" : [
      { key: "1", label: "Oui" },
      { key: "2", label: "Non" },
    ],
    "handicap": [
      { key: "1", label: "Kyste" },
      { key: "2", label: "Lipome" },
      { key: "3", label: "Hernie" },
      { key: "4", label: "Pas de handicap" },
      { key: "5", label: "Autres" }
    ],
    "etat-matrimonial": [
      { key: "1", label: "Celibataire" },
      { key: "2", label: "Marie mono" },
      { key: "3", label: "Marie poly" },
      { key: "4", label: "Veuf (ve)" },
      { key: "5", label: "Divorce" },
      { key: "6", label: "Separe" },
      { key: "7", label: "Union libre" },
    ],
    "liens-parente": [
      { key: "1", label: "Conjoint(e)" },
      { key: "2", label: "Fils/Fille" },
      { key: "3", label: "Frere/Soeur" },
      { key: "4", label: "Neveu/Niece" },
      { key: "5", label: "Petits-fils/filles" },
      { key: "6", label: "Pere/Mere" },
      { key: "7", label: "Autres" },
    ],
    "c1": [ { key:"1", label:"Bassa"}, { key:"2", label:"Francais"}, { key:"3", label:"Anglais"}, { key:"4", label:"Autres"}],
    "c2": [ {key: "1", label:"Oui"}, {key:"1", label:"Non"}],
    "c3": [ {key:"1", label:"Primaire"}, {key:"2", label:"Secondaire"}, {key:"3", label:"Universite"},
            {key:"4", label:"Formation"}, {key:"99", label: "NSP"}, {key:"00", label:"Pas acheve une classe"}],
    "c4": [ {key:"1", label:"Oui"}, {key:"1", label:"Non"}],
    "c5": [ {key:"1", label:"Oui"}, {key:"1", label:"Non"}],
    "c6": [ {key:"41", label:"Formation professionelle/technique au secondaire"}, {key:"42", label:"Formation generale"},
            {key:"43", label:"Formation pour enseignant: ENIET, ENIEG"}, {key:"31", label: "Universite/Formation professionnelle universitaire"}],
    "c8": [ {key:"1", label:"Manque de performance scolaire"}, {key:"2", label:"Etat de sante"}]
  }
  displayedColumns: any = {
    'section_b': ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9'],
    'section_c': ['code', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9']
  }

  data: any = {
    'section_a': {},
    'section_b': [],
    'section_c': []
  }

  @ViewChild('stepper')
  stepper;

  constructor() { }

  ngOnInit() {

  }

  toCapitalLetter(arr) {
    return arr.map(x => x.toUpperCase());
  }

}
