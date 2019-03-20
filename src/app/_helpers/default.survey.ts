export const defaultSurvey:any = {
  'section_a': {
    'a1date':{type: 'date'},
    'a1time':{type: 'time'},
    'a2':{type:'string'},
    'a3':{type:'string'},
    'a4':{type:'string'},
    'a5':{type:'string'},
    'a6':{type:'string'},
    'a7':{type:'string'},
    'a8':{type:'string'},
    'a9':{type:'string'}
  },
  'section_b': {
    'b1': {type: 'string'},
    'b2': {type: 'single_choice', kv: { '1':'M', '2':'F'}},
    'b3': {type: 'number'},
    'b4': {type: 'string'},
    'b5': {type: 'single_choice', kv: {'1':'Oui','2':'Non'}}, //, labels: ['Oui', 'Non'], keys: ['1', '2']},
    'b6': {type: 'single_choice', kv: {'1':'Conjoint(e)','2':'Fils/Fille','3':'Frère/Sœur','4':'Neveu/Nièce','5':'Petits-fils/filles','6':'Père/Mère'}},
    'b7': {type: 'single_choice', kv: {'1':'Célibataire','2':'Marié mono','3':'Marié poly','4':'Veuf(ve)','5':'Divorcé','6':'Séparé','7':'Union libre'}},
    'b8': {type: 'single_choice', kv: {'1':'Oui','2':'Non'}},
    'b9': {type: 'string'}
  },
  'section_c': {
    'code': {type:'string'},
    'c1': {type: 'single_choice', kv: {'10':'Bassa','20':'Francais','30':'Anglais','40':'Autres'}},
    'c2': {type: 'single_choice', kv: {'1':'Oui','2':'Non'}, jumpTo: {'2':'c9'}},
    'c3': {type: 'single_choice', kv: {'1':'Primaire','2':'Secondaire','3':'Universite','4':'Formation','99':'NSP','00':'Pas fait de choix'}},
    'c4': {type: 'single_choice', kv: {'1':'Oui','2':'Non'}},
    'c5': {type: 'single_choice', kv: {'1':'Oui','2':'Non'}},
    'c6': {type: 'single_choice', kv: {'41': 'Formation professionnelle/technique au secondaire','42':'Formation generale','43':'Formation pour enseignant : ENIET, ENIEG','31':'Université/Formation professionnelle universitaire'}},
    'c7': {type: 'string'},
    'c8': {type: 'single_choice', kv: {'1':'Manque de performance scolaire', '2':'Etat de santé'}},
    'c9': {type: 'text'}
  }
};

// exports.defaultSurvey = defaultSurvey;
