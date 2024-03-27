import { Component, ViewChild } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { cloneDeep } from 'lodash';

import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Store } from '@ngrx/store';
import { selectData, selectDataLoading } from 'src/app/store/Asset/asset.selector';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { addassetsList, deleteassetsList, fetchassetsList, updateassetsList } from 'src/app/store/Asset/asset.action';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.scss',
  providers: [DecimalPipe]
})
export class AssetsComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  assetForm!: UntypedFormGroup;
  submitted = false;
  assets: any;
  masterSelected!: boolean;
  endItem: any

  // Table data
  allassets: any;

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
      { label: 'Assets', active: true }
    ];

    // Fetch Data
    this.store.dispatch(fetchassetsList());
    this.store.select(selectDataLoading).subscribe((data) => {
      if (data == false) {
        document.getElementById('elmLoader')?.classList.add('d-none');
      }
    });
    this.store.select(selectData).subscribe((data) => {
      this.assets = data;
      this.allassets = data;
      // setTimeout(() => {
        this.assets = cloneDeep(this.allassets.slice(0, 10));
      // }, 100);
    })
    

    /**
     * Form Validation
     */
    this.assetForm = this.formBuilder.group({
      id: [''],
      assetName: ['', [Validators.required]],
      assetType: ['', [Validators.required]],
      purchaseDate: ['', [Validators.required]],
      purchaseCost: ['', [Validators.required]],
      depreciationMethod: ['', [Validators.required]],
      depreciationExpense: ['', [Validators.required]],
      currentValue: ['', [Validators.required]],
      location: ['', [Validators.required]],
      maintenanceRecords: ['', [Validators.required]]
    });
  }

  public items: string[] = ['Adidas', 'Boat', 'Puma', 'Realme'];
  
  // Sort Data
  direction: any = 'asc';
  onSort(column: any) {
    if (this.direction == 'asc') {
      this.direction = 'desc';
    } else {
      this.direction = 'asc';
    }
    const sortedArray = [...this.assets]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.assets = sortedArray;
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
      this.assetForm.controls['img'].setValue(event[0].dataURL);
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
    modaltitle.innerHTML = 'Edit Asset'
    var modalbtn = document.getElementById('add-btn') as HTMLAreaElement
    modalbtn.innerHTML = 'Update'

    var editData = this.assets[id]
    this.uploadedFiles.push({ 'dataURL': editData.img, 'name': editData.img_alt, 'size': 1024, });
    this.assetForm.patchValue(this.assets[id]);
  }

  /**
  * Save product
  */
  saveAsset() {
    if (this.assetForm.valid) {
      if (this.assetForm.get('id')?.value) {
        const updatedData = this.assetForm.value;
        this.store.dispatch(updateassetsList({ updatedData }));
      }
      else {
        this.assetForm.controls['id'].setValue(this.assets.length + 1)
        const currentDate = new Date();
        const formattedDate = this.datePipe.transform(currentDate, 'dd MMM, yyyy');
        // this.assetForm.controls['publish'].setValue(formattedDate);
        const newData = {
          orders: '0',
          ...this.assetForm.value,
        }
        this.store.dispatch(addassetsList({ newData }));
      }

      this.showModal?.hide()
      setTimeout(() => {
        this.assetForm.reset();
      }, 2000);
      this.submitted = true
    }
  }
  // deleteddata
  deleteData(id: any) {
    this.deleteRecordModal?.hide();
    if (id) {
      this.store.dispatch(deleteassetsList({ id: this.deleteId.toString() }));
    }
    this.store.dispatch(deleteassetsList({ id: this.checkedValGet.toString() }));
    this.deleteRecordModal?.hide();
    this.masterSelected = false
  }

  checkedValGet: any[] = [];
  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.assets = this.assets.map((x: { states: any }) => ({ ...x, states: ev.target.checked }));

    var checkedVal: any[] = [];
    var result;
    for (var i = 0; i < this.assets.length; i++) {
      if (this.assets[i].states == true) {
        result = this.assets[i].id;
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
    for (var i = 0; i < this.assets.length; i++) {
      if (this.assets[i].states == true) {
        result = this.assets[i].id;
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
    this.assets = this.allassets.slice(startItem, this.endItem);
  }
  term: any

  // filterdata
  filterdata() {
    if (this.term) {
      this.assets = this.allassets.filter((el: any) => el.title.toLowerCase().includes(this.term.toLowerCase()))
    } else {
      this.assets = this.allassets
    }
    // noResultElement
    this.updateNoResultDisplay();
  }

  // no result 
  updateNoResultDisplay() {
    const noResultElement = document.querySelector('.noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement;
    if (this.term && this.assets.length === 0) {
      noResultElement.style.display = 'block';
      paginationElement.classList.add('d-none')
    } else {
      noResultElement.style.display = 'none';
      paginationElement.classList.remove('d-none')
    }
  }

}
