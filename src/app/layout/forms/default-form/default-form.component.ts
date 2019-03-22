import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { first } from 'rxjs/operators';

import { DataService } from '../../../_services/data.service';
import { defaultSurvey } from '../../../_helpers/default.survey';

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
    "c2": [ {key: "1", label:"Oui"}, {key:"2", label:"Non", jumpTo: "c9"}],
    "c3": [ {key:"1", label:"Primaire"}, {key:"2", label:"Secondaire"}, {key:"3", label:"Universite"},
            {key:"4", label:"Formation"}, {key:"99", label: "NSP"}, {key:"00", label:"Pas acheve une classe"}],
    "c4": [ {key:"1", label:"Oui"}, {key:"2", label:"Non"}],
    "c5": [ {key:"1", label:"Oui"}, {key:"2", label:"Non", jumpTo: "c9"}],
    "c6": [ {key:"41", label:"Formation professionelle/technique au secondaire"}, {key:"42", label:"Formation generale"},
            {key:"43", label:"Formation pour enseignant: ENIET, ENIEG"}, {key:"31", label: "Universite/Formation professionnelle universitaire"}],
    "c8": [ {key:"1", label:"Manque de performance scolaire"}, {key:"2", label:"Etat de sante"}],
    "d1": [ {key: "1", label:"Oui"}, {key:"2", label:"Non", jumpTo: "end_subsection"}],
    "d4": [ {key:'1', label:"Hôpital public"}, {key:'2', label:"Hôpital privé"}, {key:'3', label:"Automédicat ion"}, {key:'4', label:"Médecine traditionnelle"}, {key:'5', label:"Rien", jumpTo:"d7"}],
    "d5a": [ {key:"1", label:"Plus"}, {key:"2", label:"Moins"}, {key:"3", label:"Moyen"}],
    "d7": [ {key:"1", label:"Pas nécessaire"}, {key:"2", label:"Manque de moyen financier"}, {key:"3", label:"Distance longue"}, {key:"4", label:"Absence de soins appropriés"}, {key:"5", label:"Mauvais accueil"}, {key:"6", label:"Autres"}],
    "e1": [ {key: "1", label:"Oui", jumpTo: "e4"}, {key:"2", label:"Non"}],
    "e2": [ {key: "1", label:"Etait malade"}, {key:"2", label:"Etait en vacances"}, {key:"3", label:"Etait au repos"}, {key:"4", label:"Etait à la recherche du travail"}, {key:"5", label:"A eu un problème"}, {key:"6", label:"Autres"}],
    "e3": [ {key: "1", label:"Oui", jumpTo: "e12"}, {key:"2", label:"Non"}],
    "e5": [ {key: "1", label:"Electricien"}, {key:"2", label:"Commerçant"}, {key:"3", label:"Agriculteur/Eleveur"}, {key:"4", label:"Domestique/Ménagère"}, {key:"5", label:"Chasseur"}, {key:"6", label:"Bucheron"}, {key:"7", label:"Couturier"}, {key:"8", label:"Macon"}, {key:"9", label:"Secretaire"}, {key:"10", label:"Autres"}],
    "e6": [ {key: "1", label:"Salaire"}, {key:"2", label:"Paiementen nature"}, {key:"3", label:"Paiement jour/heure"}, {key:"4", label:"Aide familiale rémunéré"}, {key:"5", label:"A mon compte"}, {key:"6", label:"Autres"}],
    "e7": [ {key: "1", label:"Prive"}, {key:"2", label:"Public"}, {key:"3", label:"Para-publique"}, {key:"4", label:"Pour le compte d’un employeur"}],
    "e8": [ {key: "1", label:"Agropastorale"}, {key:"2", label:"Enseignement"}, {key:"3", label:"Administration"}, {key:"4", label:"Construction"}, {key:"5", label:"Action sociale"}, {key:"6", label:"Ingénierie"}, {key:"7", label:"Autres"}],
    "e9": [ {key: "1", label:"Oui"}, {key:"2", label:"Non", jumpTo: "e12"}],
    "e10": [ {key: "1", label:"En prenant un travail supplémentaire"}, {key:"2", label:"En augmentant les heures et les jours de travail"}, {key:"3", label:"En réduisant les dépenses"}, {key:"4", label:"Autres"}],
    "e11": [ {key: "1", label:"Oui"}, {key:"2", label:"Non", jumpTo: "e13"}],
    "e12": [ {key: "1", label:"Pas nécessaire"}, {key:"2", label:"Cas de maladie"}, {key:"3", label:"Absence de temps"}, {key:"4", label:"Autres"}],
    "e13": [ {key: "1", label:"Oui"}, {key:"2", label:"Non", jumpTo: "e22"}],
    "e14": [ {key: "1", label:"Emploi permanent"}, {key:"2", label:"Emploi saisonnier"}, {key:"3", label:"Emploi journalier"}, {key:"4", label:"Autres"}],
    "e15": [ {key: "1", label:"Agriculture,élevage,Pêche"}, {key:"2", label:"Administration(cadres supérieurs,moyens,subalternes,employé,ouvriers,manœuvres,professions libérales)"}, {key:"3", label:"Commerce"}, {key:"4", label:"Artisanat"}, {key:"5", label:"Services domestiques"}, {key:"6", label:"Forces armées et sécurités"}, {key:"7", label:"Autres"}],
    "e16": [ {key: "1", label:"Oui"}, {key:"2", label:"Non", jumpTo: "e18"}],
    "e17": [ {key: "1", label:"CNPS+Assurance"}, {key:"2", label:"CNPS"}, {key:"3", label:"Autres"}],
    "e18": [ {key: "1", label:"Oui"}, {key:"2", label:"Non"}],
    "e20": [ {key: "1", label:"1-3 mois"}, {key:"2", label:"3-6 mois"}, {key:"3", label:"6-9mois"}, {key:"4", label:"9-12mois"}],
    "e21": [ {key: "1", label:"Oui"}, {key:"2", label:"Non"}],
    "e22": [ {key: "1", label:"Electricien"}, {key:"2", label:"Commerçant"}, {key:"3", label:"Agriculteur/Eleveur"}, {key:"4", label:"Domestique/Ménagère"}, {key:"5", label:"Chasseur"}, {key:"6", label:"Bucheron"}, {key:"7", label:"Couturier"}, {key:"8", label:"Macon"}, {key:"9", label:"Secretaire"}, {key:"10", label:"Forces armée et sécurité"}, {key:"11", label:"Artisanat/Boulanger"}, {key:"12", label:"Cadres supérieurs,moyens,subalternes,employés,manœuvres,professions libérales"}, {key:"13", label:"Enseignant"}, {key:"14", label:"Autres"}],
    "e23": [ {key: "1", label:"Agropastorale"}, {key:"2", label:"Education"}, {key:"3", label:"Administration"}, {key:"4", label:"Construction"}, {key:"5", label:"Action sociale"}, {key:"6", label:"Ingénierie"}, {key:"7", label:"Fabrication"}, {key:"8", label:"Réparation"}, {key:"9", label:"Autres"}],
    "e25": [ {key: "1", label:"Oui"}, {key:"2", label:"Non"}],
    "e26": [ {key: "1", label:"Oui"}, {key:"2", label:"Non", jumpTo: "e32"}],
    "e27": [ {key: "1", label:"Electricien"}, {key:"2", label:"Commerçant"}, {key:"3", label:"Agriculteur/Eleveur"}, {key:"4", label:"Domestique/Ménagère"}, {key:"5", label:"Chasseur"}, {key:"6", label:"Bucheron"}, {key:"7", label:"Couturier"}, {key:"8", label:"Macon"}, {key:"9", label:"Secretaire"}, {key:"10", label:"Artisan"}, {key:"11", label:"Enseignant"}, {key:"12", label:"Autres"}],
    "e28": [ {key: "1", label:"Agropastorale"}, {key:"2", label:"Education"}, {key:"3", label:"Administration"}, {key:"4", label:"Construction"}, {key:"5", label:"Action sociale"}, {key:"7", label:"Ingénierie"}, {key:"8", label:"Autres"}],
    "e29": [ {key: "1", label:"Oui"}, {key:"2", label:"Non"}],
    "e32": [ {key: "1", label:"Oui"}, {key:"2", label:"Non", jumpTo: "e39"}],
    "e33": [ {key: "1", label:"Electricien"}, {key:"2", label:"Commerçant"}, {key:"3", label:"Agriculteur/Eleveur"}, {key:"4", label:"Domestique/Ménagère"}, {key:"5", label:"Chasseur"}, {key:"6", label:"Bucheron"}, {key:"7", label:"Couturier"}, {key:"8", label:"Macon"}, {key:"9", label:"Secretaire"}, {key:"10", label:"Forces armée et sécurité"}, {key:"11", label:"Artisanat/Boulanger"}, {key:"12", label:"Cadres supérieurs,moyens,subalternes,employés,manœuvres,professions libérales"}, {key:"13", label:"Enseignant"}, {key:"14", label:"Coiffure"}, {key:"15", label:"Transporteur"}, {key:"16", label:"Autres"}],
    "e35": [ {key: "1", label:"Agropastorale"}, {key:"2", label:"Education"}, {key:"3", label:"Administration"}, {key:"4", label:"Construction"}, {key:"5", label:"Action sociale"}, {key:"6", label:"Ingénierie"}, {key:"7", label:"Autres"}],
    "e36": [ {key: "1", label:"Oui"}, {key:"2", label:"Non"}],
    "e37": [ {key: "1", label:"Faible"}, {key:"2", label:"Moyen"}, {key:"3", label:"Passable"}, {key:"4", label:"Assez-bien"}, {key:"5", label:"Bien"}, {key:"6", label:"Tres-Bien"}],
    "e38": [ {key: "1", label:"Oui"}, {key:"2", label:"Non"}],
    'f1': [{key: '1', label: 'Locataire (Paye en argent ou en nature)'}, {key:'2', label:'Propriétaire avec titre foncier'}, {key:'3', label:'Propriétaire avec certificat de propriété'}, {key:'4', label:'Propriétaire avec droit coutumier'}, {key:'5', label:'Propriétaire avec abandon du droit coutumier'}, {key:'6', label:'Propriétaire avec certificat d’achat'}],
    'f2a': [{key: '1', label:'Chambres à coucher'}, {key:'2', label:'Cuisines'}, {key:'3', label:'Salle de bain'}, {key:'4', label:'Salle à manger/Salon'}],
    'f2b': [ {key: "1", label:"Oui"}, {key:"2", label:"Non"}],
    'f3': [{key:'1', label:'Supérieur à 1 Ha'}, {key:'2', label:'Inférieur à 1 Ha'}],
    'f4': [{key:'1', label:'Identique'}, {key:'2', label:'Pas eu de terre il y’a un an'}, {key:'3', label:'Plus d’un Ha'}, {key:'4', label:'Moins d’un Ha'}],
    'f5': [{key:'1', label:'Exploitez les terres louées'}, {key:'2', label:'Exploitez des terres empruntées'}, {key:'3', label:'Exploitez des terres offertes comme cadeau'}, {key:'4', label:'Exploitez des terres gagées'}, {key:'5', label:'Aucune de ces reponses', jumpTo:'f8'}],
    'f7': [{key:'5', label:'Identique'}, {key:'6', label:'Pas eu de terre il y’a un an'}, {key:'7', label:'Pas eu de terre il y’a un an', jumpTo:'f7_size'}, {key: '8', label:'Superficie inférieur à 1 hectare', jumpTo:'f7_size'}, {key:'9', label:'Superficie en mètre carré', jumpTo:'f7_size'}],
    'f12': [{key:'1', label:'Téléviseur'}, {key:'2', label:'Poste radio'}, {key:'3', label:'Cuisinière à gaz'}, {key:'4', label:'Réchaud à pétrole'}, {key:'5', label:'Mixeur'}, {key:'6', label:'Congélateur/frigo'}, {key:'7', label:'vélo'}, {key:'8', label:'Moto'}, {key:'9', label:'Voiture'}, {key:'10', label:'Pousse-pousse/brouette'}, {key:'11', label:'Antenne Canalsat'}, {key:'12', label:'Télephone fixe/ portable'}, {key:'13', label:'Micro-onde'}, {key:'14', label:'Pousse-pousse/brouette'}, {key:'15', label:'Autres'}],
    'f13': [{key:'1', label:'Enéo'}, {key:'2', label:'Energie solaire'}, {key:'3', label:'Groupe électrogène'}, {key:'4', label:'Lampe à pétrole'}, {key:'5', label:'Energie hydraulique'}, {key:'6', label:'Energie éolienne'}, {key:'7', label:'Lampes torches'}, {key:'8', label:'Autres'}],
    'f14': [{key:'1', label:'Rarement'}, {key:'2', label:'Quelques fois'}, {key:'3', label:'Souvent'}, {key:'4', label:'Toujours'}],
    'f15': [{key:'1', label:'Faible'}, {key:'2', label:'Moyen'}, {key:'3', label:'Passable'}, {key:'4', label:'Assez bien'},{key:'5', label:'Bien'}, {key:'6', label:'Tres bien'}, {key:'7', label:'Excellent'}],
    'f17': [{key:'1', label:'Exterieur du menage'}, {key:'2', label:'Chef de menage'}, {key:'3', label:'Epouse chef de menage'}, {key:'4', label:'Fils/Fille de menage'}, {key:'5', label:'Neuve/Niece chef de menage'}, {key:'6', label:'Autres'}],
    'f18': [{key: "1", label:"Oui", jumpTo:'section_g__g1'}, {key:"2", label:"Non"}],
    'g1': [{key: "1", label:"Toles"}, {key:"2", label:"Tuiles"}, {key:"3", label:"Pailles"}, {key:"4", label:"Feuilles tissees"}, {key:"5", label:"Autres"}],
    'g2': [{key:"1", label:"Parpaing"}, {key:"2", label:"Brique de terre"}, {key:"3", label:"Torchis (poto-poto)"}, {key:"4", label:"Planches"}, {key:"5", label:"Autres"}],
    'g3a': [{key:"1", label:"Robinet", group:"Sources d'eau salubre"},{key:"2", label:"Forage", group:"Sources d'eau salubre"},{key:"3", label:"Puits ferme", group:"Sources d'eau salubre"},{key:"4", label:"Puits ferme et amenage", group:"Sources d'eau salubre"},{key:"5", label:"Bonne fontaine", group:"Sources d'eau salubre"},{key:"6", label:"Source amenagees", group:"Sources d'eau salubre"},{key:"7", label:"Sources ouvertes/non amenagees", group:"Sources d'eau non salubre"},{key:"8", label:"Puits ouverts", group:"Sources d'eau non salubre"},{key:"9", label:"Lacs", group:"Sources d'eau non salubre"},{key:"10", label:"Riviere", group:"Sources d'eau non salubre"}],
    'g3b': [ {key: "1", label:"Oui"}, {key:"2", label:"Non"}],
    'g4': [{key:"1", label:"WC avec chasse d’eau et fosse septique"},{key:"2", label:"Latrines ordinaires"},{key:"3", label:"Latrines à fosse ventilée"},{key:"4", label:"Fosse artisanal/canon"}],
    'g5': [{key:"1", label:"Electricité"},{key:"2", label:"Energie solaire"},{key:"3", label:"Gaz"},{key:"4", label:"Pétrole"},{key:"5", label:"Bois"},{key:"6", label:"Charbon"}],
    'g6a': [{key:"1", label:"Marchés des produits alimentaires"},{key:"2", label:"Marchés des produits cosmétiques"},{key:"3", label:"Ecole primaire"},{key:"4", label:"Ecole secondaire"},{key:"5", label:"Ecole universitaire"},{key:"6", label:"Structures de formations"},{key:"7", label:"Structure sanitaires"},{key:"8", label:"Structures administratives"},{key:"9", label:"Points d’eau"}],
    'g6b': [{key:"1", label:"Moto"},{key:"2", label:"Marche"},{key:"3", label:"Taxi"},{key:"4", label:"Car"},{key:"5", label:"Vélo"},{key:"6", label:"Voiture personnelle"},{key:"7", label:"Voiture de transport"},{key:"8", label:"Train"},{key:"9", label:"Bus de ligne"},{key:"10", label:"Autres"}],
    'g8': [{key:"1", label:"Sable+ciment (non lissé)"},{key:"2", label:"Sable+ciment (lissé)"},{key:"3", label:"Carreaux"},{key:"4", label:"Terre nue"},{key:"5", label:"Autres"}],
    'g9': [{key:"1", label:"Immeuble à appartement"},{key:"2", label:"Villa"},{key:"3", label:"Maison individuel simple"},{key:"4", label:"Maison traditionnel ou case"},{key:"5", label:"Hutte"},{key:"6", label:"Autres"}],
    'g10': [{key:"1", label:"Poubelle"},{key:"2", label:"Existence d’un service de ramassage/collecte"},{key:"3", label:"Dans la rivière"},{key:"4", label:"Autres"}],
    'h3': [ {key: "1", label:"Oui"}, {key:"2", label:"Non"}],
    'h4': [{key:'1', label:'Malformations'}, {key:'2', label:'Malnutritions'}, {key:'3', label:'Déficients visuels'}, {key:'4', label:'Déficients auditifs'}, {key:'5', label:'Déficients de langage'}, {key:'6', label:'Hernies'}, {key:'7', label:'Kystes'}, {key:'8', label:'Pas de handicap'}, {key:'9', label:'Autres'}],
    'h7': [ {key: "1", label:"Oui"}, {key:"2", label:"Non"}],
  }
  displayedColumns: any = {
    'section_b': ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9'],
    'section_c': ['code', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'],
    'section_d': ['code','sexe','age', 'd1', 'd2', 'd3', 'd4', 'd5a', 'd5b', 'd6', 'd7']
  }

  subject = new BehaviorSubject([])
  data: any = {
    'section_a': {},
    'section_b_new': {
      'to_save': false
    },
    'section_b': [],
    'section_c_new': {
      'to_save': false
    },
    'section_c': []
  }
  dataSource: any = {
    'section_b': new BehaviorSubject<any>(this.data['section_b']),
    'section_c': new BehaviorSubject<any>(this.data['section_c']),
  }

  @ViewChild('stepper')
  stepper;
  selectedIndex = 0;
  constructor(
    private renderer: Renderer,
    private dataService: DataService
  ) { }

  ngOnInit() {

  }

  _resetData() {
    this.data = {
      'section_a': {},
      'section_b_new': {
        'to_save': false
      },
      'section_b': [],
      'section_c_new': {
        'to_save': false
      },
      'section_c': []
    }
  }

  goTo(idx) {
    let keys = Object.keys(this.data);

    // if (idx == 2) {
    //   this.data['section_c'] = this.data['section_b'].map(x => {
    //     return {
    //       code: x.b1
    //     }
    //   });
    //   this.dataSource['section_c'] = new BehaviorSubject<any>(this.data['section_c']);
    // }


    this.selectedIndex = idx;
  }

  addTo(idx) {
    let keys = Object.keys(this.data);

    this.data[keys[idx - 1]].to_save = undefined
    this.data[keys[idx]].push(this.data[keys[idx - 1]]);
    this.dataSource[keys[idx]] = new BehaviorSubject<any>(this.data[keys[idx]]);

    this.data[keys[idx - 1]] = { to_save: false }
  }

  onSave() {
    Object.keys(this.data).map(x => {
      if (x['to_save'] === undefined) {
        return x;
      }
    });
    this.data.__survey = 'default';

    console.log(this.data);
    this.dataService.save(this.data).pipe(first()).subscribe(
      (result:any) => {
        console.log(result);

        this._resetData();
      }
    )
  }

  selectionChange(event:MatSelectChange) {
    console.log(event);
    let ksplit = event.source.id.split("__")
    console.log(ksplit);
    console.log(defaultSurvey[ksplit[0]][ksplit[1]])
    if ('jumpTo' in defaultSurvey[ksplit[0]][ksplit[1]] &&
        event.value in defaultSurvey[ksplit[0]][ksplit[1]].jumpTo) {
      console.log("We jump to ", defaultSurvey[ksplit[0]][ksplit[1]].jumpTo[event.value]);

      let jumpToId = defaultSurvey[ksplit[0]][ksplit[1]].jumpTo[event.value];
      this._disableElement(event.source.id, jumpToId);
      const element = this.renderer.selectRootElement(`#${ksplit[0]}__${jumpToId}`)
      setTimeout(() => element.focus(), 0)
    }
  }

  _disableElement(from, to) {
    let fsplit = from.split('__');
    let tsplit = to.split('__');

    let fsection = fsplit[0], felt = fsplit[1];
    let tsection, telt;

    if (tsplit.length == 1) {
      tsection = fsection;
      telt = tsplit[0]
    } else {
      tsection = tsplit[0]
      telt = tsplit[1]
    }

    if (fsection == tsection) {
      let section = fsection;

      let idxs = Object.keys(defaultSurvey[section])
      let fidx = idxs.indexOf(felt);
      let tidx = idxs.indexOf(telt);
      for(let i = fidx + 1; i < tidx; i++) {
        const element = this.renderer.selectRootElement(`#${section}__${idxs[i]}`)
        setTimeout(() => element.disable(), 0)
      }
    }
  }
}

export class CustomListDatasource extends DataSource<any> {

    constructor(private _list$: Observable<any[]>) {
        super();
    }

    connect(): Observable<any[]> {
        return this._list$;
    }

    disconnect() {
    }

}
