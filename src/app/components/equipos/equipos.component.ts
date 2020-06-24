import { Component, OnInit } from '@angular/core';
import { EquiposService } from '../../services/equipos.service'
import { Equipos } from "../../models/equipos";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDialogService } from "../../services/modal-dialog.service";

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {
  
  AccionABMC = "L";
  submitted = false;
  Lista: Equipos[] = [];
  FormReg: FormGroup;
  constructor(public formBuilder: FormBuilder, private equiposService: EquiposService,private modalDialogService: ModalDialogService) { }

  ngOnInit() {

    this.equiposService.get().subscribe((res: Equipos[]) => {
      this.Lista = res;
    });

    this.FormReg = this.formBuilder.group({
      EquipoNombre: ["",[Validators.required, Validators.minLength(4), Validators.maxLength(55)]],
      EquipoRanking: [null, [Validators.required, Validators.pattern("[0-9]{1,7}")]]
    });
  }

  Agregar() {
    
    window.scroll(0, 0);
    this.AccionABMC = "A";
    this.FormReg.reset(this.FormReg.value);

    this.submitted = false;
    //this.FormReg.markAsPristine();
    this.FormReg.markAsUntouched();
  }
 Volver() {
   this.FormReg.reset();
    this.AccionABMC = "L";
  }

  Grabar() {
    
    this.submitted = true;
    // verificar que los validadores esten OK
     if (this.FormReg.invalid) {
      return;
    }
  
  const itemCopy = { ...this.FormReg.value };
  console.log(itemCopy);
    // agregar post
      this.equiposService.post(itemCopy).subscribe((res: any) => {
        this.Buscar();
        this.Volver();
      });
    
  }

  Buscar() {
    this.equiposService.get().subscribe((res: Equipos[]) => {
      this.Lista = res;
    });
  }
}