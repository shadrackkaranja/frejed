import { Component, ViewChild } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { cloneDeep } from 'lodash';

import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Store } from '@ngrx/store';
import { selectData, selectDataLoading } from 'src/app/store/Projects/projects.selector';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { addprojectsList, deleteprojectsList, fetchprojectsList, updateprojectsList } from 'src/app/store/Projects/projects.action';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  providers: [DecimalPipe]
})
export class ProjectsComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  projectsForm!: UntypedFormGroup;
  submitted = false;
  projects: any;
  masterSelected!: boolean;
  endItem: any

  // Table data
  allprojects: any;

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
      { label: 'Projects', active: true }
    ];

    // Fetch Data
    this.store.dispatch(fetchprojectsList());
    this.store.select(selectDataLoading).subscribe((data) => {
      if (data == false) {
        document.getElementById('elmLoader')?.classList.add('d-none');
      }
    });
    this.store.select(selectData).subscribe((data) => {
      this.projects = data;
      this.allprojects = data;
      // setTimeout(() => {
        this.projects = cloneDeep(this.allprojects.slice(0, 10));
      // }, 100);
    })
    

    /**
     * Form Validation
     */
    this.projectsForm = this.formBuilder.group({
      id: [''],
      projectName: ['', [Validators.required]],
      projectBudget: ['', [Validators.required]],
      actualCost: ['', [Validators.required]],
      projectTimeline: ['', [Validators.required]]
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
    const sortedArray = [...this.projects]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.projects = sortedArray;
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
      this.projectsForm.controls['img'].setValue(event[0].dataURL);
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
    modaltitle.innerHTML = 'Edit Project'
    var modalbtn = document.getElementById('add-btn') as HTMLAreaElement
    modalbtn.innerHTML = 'Update'

    var editData = this.projects[id]
    this.uploadedFiles.push({ 'dataURL': editData.img, 'name': editData.img_alt, 'size': 1024, });
    this.projectsForm.patchValue(this.projects[id]);
  }

  /**
  * Save product
  */
  saveProjects() {
    if (this.projectsForm.valid) {
      if (this.projectsForm.get('id')?.value) {
        const updatedData = this.projectsForm.value;
        this.store.dispatch(updateprojectsList({ updatedData }));
      }
      else {
        this.projectsForm.controls['id'].setValue(this.projects.length + 1)
        const currentDate = new Date();
        const formattedDate = this.datePipe.transform(currentDate, 'dd MMM, yyyy');
        // this.projectsForm.controls['publish'].setValue(formattedDate);
        const newData = {
          orders: '0',
          ...this.projectsForm.value,
        }
        this.store.dispatch(addprojectsList({ newData }));
      }

      this.showModal?.hide()
      setTimeout(() => {
        this.projectsForm.reset();
      }, 2000);
      this.submitted = true
    }
  }
  // deleteddata
  deleteData(id: any) {
    this.deleteRecordModal?.hide();
    if (id) {
      this.store.dispatch(deleteprojectsList({ id: this.deleteId.toString() }));
    }
    this.store.dispatch(deleteprojectsList({ id: this.checkedValGet.toString() }));
    this.deleteRecordModal?.hide();
    this.masterSelected = false
  }

  checkedValGet: any[] = [];
  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.projects = this.projects.map((x: { states: any }) => ({ ...x, states: ev.target.checked }));

    var checkedVal: any[] = [];
    var result;
    for (var i = 0; i < this.projects.length; i++) {
      if (this.projects[i].states == true) {
        result = this.projects[i].id;
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
    for (var i = 0; i < this.projects.length; i++) {
      if (this.projects[i].states == true) {
        result = this.projects[i].id;
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
    this.projects = this.allprojects.slice(startItem, this.endItem);
  }
  term: any

  // filterdata
  filterdata() {
    if (this.term) {
      this.projects = this.allprojects.filter((el: any) => el.title.toLowerCase().includes(this.term.toLowerCase()))
    } else {
      this.projects = this.allprojects
    }
    // noResultElement
    this.updateNoResultDisplay();
  }

  // no result 
  updateNoResultDisplay() {
    const noResultElement = document.querySelector('.noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement;
    if (this.term && this.projects.length === 0) {
      noResultElement.style.display = 'block';
      paginationElement.classList.add('d-none')
    } else {
      noResultElement.style.display = 'none';
      paginationElement.classList.remove('d-none')
    }
  }

}
