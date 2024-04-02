import { Component, ViewChild } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { cloneDeep } from 'lodash';

import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Store } from '@ngrx/store';
import { selectData, selectDataLoading } from 'src/app/store/employment-cost/employment-cost.selector';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { addemploymentCostList, deleteemploymentCostList, fetchemploymentCostList, updateemploymentCostList } from 'src/app/store/employment-cost/employment-cost.action';

@Component({
  selector: 'app-employment-cost',
  templateUrl: './employment-cost.component.html',
  styleUrl: './employment-cost.component.scss',
  providers: [DecimalPipe]
})
export class EmploymentCostComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  employmentCostForm!: UntypedFormGroup;
  submitted = false;
  employmentCost: any;
  masterSelected!: boolean;
  endItem: any

  // Table data
  allemploymentCost: any;

  files: File[] = [];
  @ViewChild('showModal', { static: false }) showModal?: ModalDirective;
  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;
  deleteId: any;
  content: any;

  constructor(private formBuilder: UntypedFormBuilder, public store: Store, private datePipe: DatePipe,) {
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Finance' },
      { label: 'Employment Costs', active: true }
    ];

    // Fetch Data
    this.store.dispatch(fetchemploymentCostList());
    this.store.select(selectDataLoading).subscribe((data) => {
      if (data == false) {
        document.getElementById('elmLoader')?.classList.add('d-none');
      }
    });
    this.store.select(selectData).subscribe((data) => {
      this.employmentCost = data;
      this.allemploymentCost = data;
      // setTimeout(() => {
        this.employmentCost = cloneDeep(this.allemploymentCost.slice(0, 10));
      // }, 100);
    })
    

    /**
     * Form Validation
     */
    this.employmentCostForm = this.formBuilder.group({
      id: [''],
      employeeName: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      benefits: ['', [Validators.required]],
      payrollTaxes: ['', [Validators.required]],
      overtime: ['', [Validators.required]],
      bonuses: ['', [Validators.required]],
      employeeExpenses: ['', [Validators.required]],
    });
  }

  
  // Sort Data
  direction: any = 'asc';
  onSort(column: any) {
    if (this.direction == 'asc') {
      this.direction = 'desc';
    } else {
      this.direction = 'asc';
    }
    const sortedArray = [...this.employmentCost]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.employmentCost = sortedArray;
  }
  compare(v1: string | number, v2: string | number) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  // dropzone
  public dropzoneConfig: DropzoneConfigInterface = {
    clickable: true,
    addRemoveLinks: true,
    previewsContainer: false,
  };

  uploadedFiles: any[] = [];

  // File Upload
  imageURL: any;
  onUploadSuccess(event: any) {
    setTimeout(() => {
      this.uploadedFiles.push(event[0]);
      this.employmentCostForm.controls['img'].setValue(event[0].dataURL);
    }, 0);
  }

  // File Remove
  removeFile(event: any) {
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
  }

  // Edit Data
  editList(id: any) {
    this.showModal?.show()
    var modaltitle = document.querySelector('.modal-title') as HTMLAreaElement
    modaltitle.innerHTML = 'Edit Employment Cost'
    var modalbtn = document.getElementById('add-btn') as HTMLAreaElement
    modalbtn.innerHTML = 'Update'

    var editData = this.employmentCost[id]
    this.uploadedFiles.push({ 'dataURL': editData.img, 'name': editData.img_alt, 'size': 1024, });
    this.employmentCostForm.patchValue(this.employmentCost[id]);
  }

  /**
  * Save product
  */
  saveEmploymentCost() {
    if (this.employmentCostForm.valid) {
      if (this.employmentCostForm.get('id')?.value) {
        const updatedData = this.employmentCostForm.value;
        this.store.dispatch(updateemploymentCostList({ updatedData }));
      }
      else {
        this.employmentCostForm.controls['id'].setValue(this.employmentCost.length + 1)
        const currentDate = new Date();
        const formattedDate = this.datePipe.transform(currentDate, 'dd MMM, yyyy');
        // this.employmentCostForm.controls['publish'].setValue(formattedDate);
        const newData = {
          orders: '0',
          ...this.employmentCostForm.value,
        }
        this.store.dispatch(addemploymentCostList({ newData }));
      }

      this.showModal?.hide()
      setTimeout(() => {
        this.employmentCostForm.reset();
      }, 2000);
      this.submitted = true
    }
  }
  // deleteddata
  deleteData(id: any) {
    this.deleteRecordModal?.hide();
    if (id) {
      this.store.dispatch(deleteemploymentCostList({ id: this.deleteId.toString() }));
    }
    this.store.dispatch(deleteemploymentCostList({ id: this.checkedValGet.toString() }));
    this.deleteRecordModal?.hide();
    this.masterSelected = false
  }

  checkedValGet: any[] = [];
  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.employmentCost = this.employmentCost.map((x: { states: any }) => ({ ...x, states: ev.target.checked }));

    var checkedVal: any[] = [];
    var result;
    for (var i = 0; i < this.employmentCost.length; i++) {
      if (this.employmentCost[i].states == true) {
        result = this.employmentCost[i].id;
        checkedVal.push(result);
      }
    }

    this.checkedValGet = checkedVal;
    checkedVal.length > 0 ? document.getElementById("remove-actions")?.classList.remove('d-none') : document.getElementById("remove-actions")?.classList.add('d-none');
  }

  // Select Checkbox value Get
  onCheckboxChange(e: any) {
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.employmentCost.length; i++) {
      if (this.employmentCost[i].states == true) {
        result = this.employmentCost[i].id;
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    checkedVal.length > 0 ? document.getElementById("remove-actions")?.classList.remove('d-none') : document.getElementById("remove-actions")?.classList.add('d-none');
  }


  // Delete Product
  removeItem(id: any) {
    this.deleteId = id
    this.deleteRecordModal?.show()
  }



  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.employmentCost = this.allemploymentCost.slice(startItem, this.endItem);
  }
  term: any

  // filterdata
  filterdata() {
    if (this.term) {
      this.employmentCost = this.allemploymentCost.filter((el: any) => el.title.toLowerCase().includes(this.term.toLowerCase()))
    } else {
      this.employmentCost = this.allemploymentCost
    }
    // noResultElement
    this.updateNoResultDisplay();
  }

  // no result 
  updateNoResultDisplay() {
    const noResultElement = document.querySelector('.noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement;
    if (this.term && this.employmentCost.length === 0) {
      noResultElement.style.display = 'block';
      paginationElement.classList.add('d-none')
    } else {
      noResultElement.style.display = 'none';
      paginationElement.classList.remove('d-none')
    }
  }

}
