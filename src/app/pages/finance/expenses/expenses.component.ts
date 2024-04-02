import { Component, ViewChild } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { cloneDeep } from 'lodash';

import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Store } from '@ngrx/store';
import { selectData, selectDataLoading } from 'src/app/store/Expenses/expenses.selector';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { addexpensesList, deleteexpensesList, fetchexpensesList, updateexpensesList } from 'src/app/store/Expenses/expenses.action';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
  providers: [DecimalPipe]
})
export class ExpensesComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  expensesForm!: UntypedFormGroup;
  submitted = false;
  expenses: any;
  masterSelected!: boolean;
  endItem: any

  // Table data
  allexpenses: any;

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
      { label: 'Expenses', active: true }
    ];

    // Fetch Data
    this.store.dispatch(fetchexpensesList());
    this.store.select(selectDataLoading).subscribe((data) => {
      if (data == false) {
        document.getElementById('elmLoader')?.classList.add('d-none');
      }
    });
    this.store.select(selectData).subscribe((data) => {
      this.expenses = data;
      this.allexpenses = data;
      // setTimeout(() => {
        this.expenses = cloneDeep(this.allexpenses.slice(0, 10));
      // }, 100);
    })
    

    /**
     * Form Validation
     */
    this.expensesForm = this.formBuilder.group({
      id: [''],
      expenseCategory: ['', [Validators.required]],
      expenseDate: ['', [Validators.required]],
      vendor: ['', [Validators.required]],
      budgetedAmount: ['', [Validators.required]],
      amountSpent: ['', [Validators.required]],
      paymentMethod: ['', [Validators.required]],
      description: ['', [Validators.required]],
      documentation: ['', [Validators.required]],
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
    const sortedArray = [...this.expenses]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.expenses = sortedArray;
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
      this.expensesForm.controls['img'].setValue(event[0].dataURL);
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
    modaltitle.innerHTML = 'Edit Expenses'
    var modalbtn = document.getElementById('add-btn') as HTMLAreaElement
    modalbtn.innerHTML = 'Update'

    var editData = this.expenses[id]
    this.uploadedFiles.push({ 'dataURL': editData.img, 'name': editData.img_alt, 'size': 1024, });
    this.expensesForm.patchValue(this.expenses[id]);
  }

  /**
  * Save product
  */
  saveExpenses() {
    if (this.expensesForm.valid) {
      if (this.expensesForm.get('id')?.value) {
        const updatedData = this.expensesForm.value;
        this.store.dispatch(updateexpensesList({ updatedData }));
      }
      else {
        this.expensesForm.controls['id'].setValue(this.expenses.length + 1)
        const currentDate = new Date();
        const formattedDate = this.datePipe.transform(currentDate, 'dd MMM, yyyy');
        // this.expensesForm.controls['publish'].setValue(formattedDate);
        const newData = {
          orders: '0',
          ...this.expensesForm.value,
        }
        this.store.dispatch(addexpensesList({ newData }));
      }

      this.showModal?.hide()
      setTimeout(() => {
        this.expensesForm.reset();
      }, 2000);
      this.submitted = true
    }
  }
  // deleteddata
  deleteData(id: any) {
    this.deleteRecordModal?.hide();
    if (id) {
      this.store.dispatch(deleteexpensesList({ id: this.deleteId.toString() }));
    }
    this.store.dispatch(deleteexpensesList({ id: this.checkedValGet.toString() }));
    this.deleteRecordModal?.hide();
    this.masterSelected = false
  }

  checkedValGet: any[] = [];
  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.expenses = this.expenses.map((x: { states: any }) => ({ ...x, states: ev.target.checked }));

    var checkedVal: any[] = [];
    var result;
    for (var i = 0; i < this.expenses.length; i++) {
      if (this.expenses[i].states == true) {
        result = this.expenses[i].id;
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
    for (var i = 0; i < this.expenses.length; i++) {
      if (this.expenses[i].states == true) {
        result = this.expenses[i].id;
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
    this.expenses = this.allexpenses.slice(startItem, this.endItem);
  }
  term: any

  // filterdata
  filterdata() {
    if (this.term) {
      this.expenses = this.allexpenses.filter((el: any) => el.title.toLowerCase().includes(this.term.toLowerCase()))
    } else {
      this.expenses = this.allexpenses
    }
    // noResultElement
    this.updateNoResultDisplay();
  }

  // no result 
  updateNoResultDisplay() {
    const noResultElement = document.querySelector('.noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement;
    if (this.term && this.expenses.length === 0) {
      noResultElement.style.display = 'block';
      paginationElement.classList.add('d-none')
    } else {
      noResultElement.style.display = 'none';
      paginationElement.classList.remove('d-none')
    }
  }

}
