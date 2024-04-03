import { Component, ViewChild } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { cloneDeep } from 'lodash';

import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Store } from '@ngrx/store';
import { selectData, selectDataLoading } from 'src/app/store/Taxation/taxation.selector';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { addtaxationList, deletetaxationList, fetchtaxationList, updatetaxationList } from 'src/app/store/Taxation/taxation.action';

@Component({
  selector: 'app-taxation',
  templateUrl: './taxation.component.html',
  styleUrl: './taxation.component.scss',
  providers: [DecimalPipe]
})
export class TaxationComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  taxationForm!: UntypedFormGroup;
  submitted = false;
  taxation: any;
  masterSelected!: boolean;
  endItem: any

  // Table data
  alltaxation: any;

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
      { label: 'Taxation', active: true }
    ];

    // Fetch Data
    this.store.dispatch(fetchtaxationList());
    this.store.select(selectDataLoading).subscribe((data) => {
      if (data == false) {
        document.getElementById('elmLoader')?.classList.add('d-none');
      }
    });
    this.store.select(selectData).subscribe((data) => {
      this.taxation = data;
      this.alltaxation = data;
      // setTimeout(() => {
        this.taxation = cloneDeep(this.alltaxation.slice(0, 10));
      // }, 100);
    })
    

    /**
     * Form Validation
     */
    this.taxationForm = this.formBuilder.group({
      id: [''],
      tax_type: ['', [Validators.required]],
      date: ['', [Validators.required]],
      narrative: ['', [Validators.required]],
      tax_rate: ['', [Validators.required]],
      taxable_income: ['', [Validators.required]],
      tax_deductions: ['', [Validators.required]],
      tax_payments: ['', [Validators.required]]
      
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
    const sortedArray = [...this.taxation]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.taxation = sortedArray;
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
      this.taxationForm.controls['img'].setValue(event[0].dataURL);
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
    modaltitle.innerHTML = 'Edit Tax'
    var modalbtn = document.getElementById('add-btn') as HTMLAreaElement
    modalbtn.innerHTML = 'Update'

    var editData = this.taxation[id]
    this.uploadedFiles.push({ 'dataURL': editData.img, 'name': editData.img_alt, 'size': 1024, });
    this.taxationForm.patchValue(this.taxation[id]);
  }

  /**
  * Save product
  */
  saveTaxation() {
    if (this.taxationForm.valid) {
      if (this.taxationForm.get('id')?.value) {
        const updatedData = this.taxationForm.value;
        this.store.dispatch(updatetaxationList({ updatedData }));
      }
      else {
        this.taxationForm.controls['id'].setValue(this.taxation.length + 1)
        const currentDate = new Date();
        const formattedDate = this.datePipe.transform(currentDate, 'dd MMM, yyyy');
        // this.taxationForm.controls['publish'].setValue(formattedDate);
        const newData = {
          orders: '0',
          ...this.taxationForm.value,
        }
        this.store.dispatch(addtaxationList({ newData }));
      }

      this.showModal?.hide()
      setTimeout(() => {
        this.taxationForm.reset();
      }, 2000);
      this.submitted = true
    }
  }
  // deleteddata
  deleteData(id: any) {
    this.deleteRecordModal?.hide();
    if (id) {
      this.store.dispatch(deletetaxationList({ id: this.deleteId.toString() }));
    }
    this.store.dispatch(deletetaxationList({ id: this.checkedValGet.toString() }));
    this.deleteRecordModal?.hide();
    this.masterSelected = false
  }

  checkedValGet: any[] = [];
  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.taxation = this.taxation.map((x: { states: any }) => ({ ...x, states: ev.target.checked }));

    var checkedVal: any[] = [];
    var result;
    for (var i = 0; i < this.taxation.length; i++) {
      if (this.taxation[i].states == true) {
        result = this.taxation[i].id;
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
    for (var i = 0; i < this.taxation.length; i++) {
      if (this.taxation[i].states == true) {
        result = this.taxation[i].id;
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
    this.taxation = this.alltaxation.slice(startItem, this.endItem);
  }
  term: any

  // filterdata
  filterdata() {
    if (this.term) {
      this.taxation = this.alltaxation.filter((el: any) => el.title.toLowerCase().includes(this.term.toLowerCase()))
    } else {
      this.taxation = this.alltaxation
    }
    // noResultElement
    this.updateNoResultDisplay();
  }

  // no result 
  updateNoResultDisplay() {
    const noResultElement = document.querySelector('.noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement;
    if (this.term && this.taxation.length === 0) {
      noResultElement.style.display = 'block';
      paginationElement.classList.add('d-none')
    } else {
      noResultElement.style.display = 'none';
      paginationElement.classList.remove('d-none')
    }
  }

}
