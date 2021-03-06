import { Component, OnInit, ViewChild, Renderer, Renderer2, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { first } from 'rxjs/operators';

import { DataService } from '../../../_services/data.service';
import { defaultSurvey } from '../../../_helpers/default.survey';
import * as ChoicesSurvey from '../../../_helpers/choices.survey';

@Component({
  selector: 'app-default-form',
  templateUrl: './default-form.component.html',
  styleUrls: ['./default-form.component.sass']
})
export class DefaultFormComponent implements OnInit {

  subject = new BehaviorSubject([])
  displayedColumns: any = {
    'section_b': ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9'],
    'section_c': ['code', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'],
    'section_d': ['code','sexe','age', 'd1', 'd2', 'd3', 'd4', 'd5a', 'd5b', 'd6', 'd7'],
    'section_h': ['h1','h2','h3', 'h4', 'h5_poids', 'h5_taille', 'h6', 'h7']
  }
  dataSource: any = {
    // 'section_b': new BehaviorSubject<any>(this.data['section_b']),
    // 'section_c': new BehaviorSubject<any>(this.data['section_c']),
  }

  @ViewChild('stepper')
  stepper;
  selectedIndex = 0;

  surveyForm:FormGroup;
  choices: any;

  id: any = undefined;
  data: any = {};
  saving: any = false;

  constructor(
    private el:ElementRef,
    private renderer: Renderer,
    private renderer2: Renderer2,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this._initForm();

    this.id = this.activatedRoute.snapshot.params['id']
    if (this.id) {
      this._loadData();
    }
    //  else {
    //   this._initForm();
    // }

    this.choices = ChoicesSurvey.choices;
  }

  _loadData() {
    this.dataService.fetch(this.id).pipe(first()).subscribe(
      (result:any) => {
        this.data = result.data;

        // this._initForm();
        this.surveyForm.patchValue(this.data);
      }
    )
  }

  _initForm() {
    this.surveyForm = this.formBuilder.group({});

    Object.keys(defaultSurvey).forEach(section => {
      let sectionFormGroup = this.formBuilder.group({});

      Object.keys(defaultSurvey[section]).forEach(question => {
        let questionFormControl: FormControl
        let type:string = defaultSurvey[section][question].type;

        sectionFormGroup.addControl(question, this.formBuilder.control(''));
      });

      if (defaultSurvey[section].hasOwnProperty('_params')) {
        if (defaultSurvey[section]._params._type === 'array') {
          let arr = this.formBuilder.array([]);
          arr.push(sectionFormGroup)

          this.surveyForm.addControl(section, arr);
        }
      } else {
        this.surveyForm.addControl(section, sectionFormGroup);
      }

    });
    console.log(this.surveyForm);

  }

  _sectionGroupForm(section) {
    return this.surveyForm.get(section) as FormArray;
  }

  _addGroup(section) {
    let sectionFormGroup = this.formBuilder.group({});

    Object.keys(defaultSurvey[section]).forEach(question => {
      let questionFormControl: FormControl
      let type:string = defaultSurvey[section][question].type;

      sectionFormGroup.addControl(question, this.formBuilder.control(''));
    });
    console.log(this._sectionGroupForm(section).value);
    this.dataSource[section] = new BehaviorSubject<any>(this._sectionGroupForm(section).value)
    this._sectionGroupForm(section).push(sectionFormGroup);
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
    console.log(this.surveyForm.value);
    let values = this.surveyForm.value;

    this.saving = true;
    if (this.id) {
      values['_id'] = this.id;

      this.dataService.update(values).pipe(first()).subscribe(
        (result:any) => {
          console.log(result);

          this.saving = false;
          this.router.navigate(['/forms/data/default']);
        }
      )
    } else {
      this.dataService.save(values).pipe(first()).subscribe(
        (result:any) => {
          console.log(result);

          this.saving = false;
          this.router.navigate(['/forms/data/default']);
        }
      )
    }
  }

  selectionChangeOnMuliple(oldEvent, event) {
    console.log(oldEvent, ' --- ', event);
    let ksplit = event.source.id.split("__");
    if(typeof(oldEvent) === 'undefined') {
      oldEvent = {value: []}
    }

    let value = undefined;
    if (oldEvent.value.length < event.value.length) {
      // if (Array.isArray(event.value)) {
      //
      // } else {
      //   value = event.value;
      // }
      console.log("INSIDE ARRAY")
      for(let i = 0; i < event.value.length; i++) {
        if (!oldEvent.value.includes(event.value[i])) {
          value = event.value[i]

          break;
        }
      }
    } else {
      console.log("INSIDE ARRAY BACK")
      for(let i = 0; i < oldEvent.value.length; i++) {
        if (!event.value.includes(oldEvent.value[i])) {
          value = oldEvent.value[i]

          break;
        }
      }
    }

    if ('post' in defaultSurvey[ksplit[0]][ksplit[1]]) {
      var quest = defaultSurvey[ksplit[0]][ksplit[1]];
      console.log("INSIDE .... POST..... ", quest);
      if (quest.post[value] != undefined) {
        console.log("NOT UNDEFINED... QPV ... ");
        if(Array.isArray(quest.post[value])) {
          console.log("ARRAY ISARRAY");
          for(let i=0; i < quest.post[value].length; i++) {
            let v = quest.post[value][i];

            let elemId = `${ksplit[0]}__${quest.post[value][i]}__container`;
            console.log(elemId)
            console.log(document.getElementById(elemId).classList);
            document.getElementById(elemId).classList.toggle('d-none');
          }
        } else {
          console.log("NOT NOT ARRAY....");
          let elemId = `${ksplit[0]}__${quest.post[value]}__container`;
          console.log(elemId)
          console.log(document.getElementById(elemId).classList);
          document.getElementById(elemId).classList.toggle('d-none');
        }

      }
    }

  }

  // selectionChange(event:MatSelectChange) {
  selectionChangeOnSingle(oldEvent, event:MatSelectChange) {
    console.log(oldEvent, ' --- ', event);
    let ksplit = event.source.id.split("__")


    // console.log(ksplit);
    // console.log(defaultSurvey[ksplit[0]][ksplit[1]])

    if ('post' in defaultSurvey[ksplit[0]][ksplit[1]]) {
      console.log("POST....", ksplit);
      var quest = defaultSurvey[ksplit[0]][ksplit[1]];
      // console.log(oldEvent.value, " --- ", typeof(oldEvent.value), " --- ", quest.post[oldEvent.value]);
      // if (event.value.includes(quest.post.value)) {
      if (oldEvent && quest.post[oldEvent.value] != undefined) {
        // console.log(this.renderer.selectRootElement(`#${ksplit[0]}__${quest.post.question}__container`));
        // var elt = this.renderer.selectRootElement(`#${ksplit[0]}__${quest.post.question}__container`);
        let elemId = `${ksplit[0]}__${quest.post[oldEvent.value]}__container`
        // let elt = document.getElementById(`#${ksplit[0]}__${quest.post.question}__container`)
        console.log(elemId)
        console.log(document.getElementById(elemId).classList);
        document.getElementById(elemId).classList.toggle('d-none'); // add();
        // console.log(elt);

        // this.renderer2.removeClass(elt, 'd-none')
      }

      if (quest.post[event.value] != undefined) {
        // console.log(this.renderer.selectRootElement(`#${ksplit[0]}__${quest.post.question}__container`));
        // var elt = this.renderer.selectRootElement(`#${ksplit[0]}__${quest.post.question}__container`);
        let elemId = `${ksplit[0]}__${quest.post[event.value]}__container`
        // let elt = document.getElementById(`#${ksplit[0]}__${quest.post.question}__container`)
        console.log(elemId)
        console.log(document.getElementById(elemId).classList);
        document.getElementById(elemId).classList.toggle('d-none'); // add();
        // console.log(elt);

        // this.renderer2.removeClass(elt, 'd-none')
      }
    }
    // JUMP TO


    if ('jumpTo' in defaultSurvey[ksplit[0]][ksplit[1]]) {
      // OLD value
      if (oldEvent && oldEvent.value in defaultSurvey[ksplit[0]][ksplit[1]].jumpTo) {
        console.log("OLD VALUE ---- We jump to ", defaultSurvey[ksplit[0]][ksplit[1]].jumpTo[oldEvent.value]);

        let jumpToId = defaultSurvey[ksplit[0]][ksplit[1]].jumpTo[oldEvent.value];
        this._enableElement(event.source.id, jumpToId);
      }

      // Actual value
      if (event.value in defaultSurvey[ksplit[0]][ksplit[1]].jumpTo) {
        console.log("ACTUAL VALUE --- We jump to ", defaultSurvey[ksplit[0]][ksplit[1]].jumpTo[event.value]);

        let jumpToId = defaultSurvey[ksplit[0]][ksplit[1]].jumpTo[event.value];
        this._disableElement(event.source.id, jumpToId);
      }
    }

    if ('jumpTo' in defaultSurvey[ksplit[0]][ksplit[1]] &&
            event.value in defaultSurvey[ksplit[0]][ksplit[1]].jumpTo) {
      console.log("We jump to ", defaultSurvey[ksplit[0]][ksplit[1]].jumpTo[event.value]);

      let jumpToId = defaultSurvey[ksplit[0]][ksplit[1]].jumpTo[event.value];
      // console.log(ksplit, ' --- ', jumpToId);
      this._disableElement(event.source.id, jumpToId);
    }
  }

  _disableElement(from, to) {
    let fsplit = from.split('__');
    let tsplit = to.split('__');

    let fsection = fsplit[0], felt = fsplit[1];
    let tsection, telt; // = tsplit[0], felt = tsplit[1];

    if (tsplit.length == 1) {
      tsection = fsection;
      telt = tsplit[0] == 'end_subsection' ? 'end_subsection' : tsplit[0];
    } else {
      tsection = tsplit[0]
      telt = tsplit[1]
    }


    if (fsection == tsection) {
      let section = fsection;
      console.log("STEP 0");
      let keys = Object.keys(defaultSurvey[section])
      let fidx = keys.indexOf(felt);
      let tidx = keys.indexOf(telt) == -1 ? keys.length : keys.indexOf(telt);

      console.log(this.surveyForm.get(section))
      console.log(this.surveyForm.get(section) instanceof FormArray)
      console.log(this.surveyForm.get(section) instanceof FormGroup)
      for(let i = fidx + 1; i < tidx; i++) {
        if (this.surveyForm.get(section) instanceof FormArray) {
          var l = (<FormArray>this.surveyForm.get(section)).controls.length;
          // (<FormControl>(<FormArray>this.surveyForm.get(section)).controls[l - 1].get(keys[i])).setValue('')
          (<FormArray>this.surveyForm.get(section)).controls[l - 1].get(keys[i]).disable()
        } else if (this.surveyForm.get(section) instanceof FormGroup) {
          this.surveyForm.get(section).get(keys[i]).reset(); // setValue('')
          this.surveyForm.get(section).get(keys[i]).disable();
        }
      }

      return;
    }

    console.log("STEP 1")
    // STEP 1
    let fKeys = Object.keys(defaultSurvey[tsection])
    let fidx = fKeys.indexOf(felt);
    for(let i = fidx + 1; i < fKeys.length; i++) {
      this._sectionGroupForm(tsection).get(fKeys[i]).disable()
    }

    console.log("STEP 2")
    // STEP 2
    let sectionKeys = Object.keys(defaultSurvey);
    let idxFrom = sectionKeys.indexOf(fsection)
    let idxTo = sectionKeys.indexOf(tsection)

    for(let i = idxFrom + 1; i < idxTo; i++) {
      this.surveyForm.get(sectionKeys[i]).disable()
    }

    console.log("STEP 3")
    // STEP 3
    let tKeys = Object.keys(defaultSurvey[tsection]);
    let endIdx = tKeys.indexOf(telt)
    for (let i = 0; i < endIdx; i++) {
      this.surveyForm.get(tsection).get(tKeys[i])
    }

  }

  _enableElement(from, to) {
    let fsplit = from.split('__');
    let tsplit = to.split('__');

    let fsection = fsplit[0], felt = fsplit[1];
    let tsection, telt; // = tsplit[0], felt = tsplit[1];

    if (tsplit.length == 1) {
      tsection = fsection;
      telt = tsplit[0] == 'end_subsection' ? 'end_subsection' : tsplit[0];
    } else {
      tsection = tsplit[0]
      telt = tsplit[1]
    }


    if (fsection == tsection) {
      let section = fsection;
      console.log("STEP 0");
      let keys = Object.keys(defaultSurvey[section])
      let fidx = keys.indexOf(felt);
      let tidx = keys.indexOf(telt) == -1 ? keys.length : keys.indexOf(telt);

      console.log(this.surveyForm.get(section))
      console.log(this.surveyForm.get(section) instanceof FormArray)
      console.log(this.surveyForm.get(section) instanceof FormGroup)
      for(let i = fidx + 1; i < tidx; i++) {
        if (this.surveyForm.get(section) instanceof FormArray) {
          var l = (<FormArray>this.surveyForm.get(section)).controls.length;
          // (<FormControl>(<FormArray>this.surveyForm.get(section)).controls[l - 1].get(keys[i])).setValue('')
          (<FormArray>this.surveyForm.get(section)).controls[l - 1].get(keys[i]).disable()
        } else if (this.surveyForm.get(section) instanceof FormGroup) {
          this.surveyForm.get(section).get(keys[i]).reset(); // setValue('')
          this.surveyForm.get(section).get(keys[i]).enable();
        }
      }

      return;
    }

    console.log("STEP 1")
    // STEP 1
    let fKeys = Object.keys(defaultSurvey[tsection])
    let fidx = fKeys.indexOf(felt);
    for(let i = fidx + 1; i < fKeys.length; i++) {
      this._sectionGroupForm(tsection).get(fKeys[i]).disable()
    }

    console.log("STEP 2")
    // STEP 2
    let sectionKeys = Object.keys(defaultSurvey);
    let idxFrom = sectionKeys.indexOf(fsection)
    let idxTo = sectionKeys.indexOf(tsection)

    for(let i = idxFrom + 1; i < idxTo; i++) {
      this.surveyForm.get(sectionKeys[i]).disable()
    }

    console.log("STEP 3")
    // STEP 3
    let tKeys = Object.keys(defaultSurvey[tsection]);
    let endIdx = tKeys.indexOf(telt)
    for (let i = 0; i < endIdx; i++) {
      this.surveyForm.get(tsection).get(tKeys[i])
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


    // let keys = Object.keys(defaultSurvey[section])
    // let fidx = keys.indexOf(felt);
    // let tidx = keys.indexOf(telt);
    // if (tidx != -1) {
    //   for(let i = fidx + 1; i < tidx; i++) {
    //     // const element = this.renderer.selectRootElement(`#${section}__${idxs[i]}`)
    //     // setTimeout(() => element.disable(), 0)
    //     this._sectionGroupForm(section).get(keys[i]).disable()
    //   }
    // } else {
    //   let currentSection = fsection;
    //   while (tidx == -1) {
    //     let keys = Object.keys(defaultSurvey[currentSection])
    //     for(let i = fidx + 1; i < keys.length - 1; i++) {
    //       this._sectionGroupForm(section).get(keys[i]).disable()
    //     }
    //
    //     // currentSection
    //   }
    // }
