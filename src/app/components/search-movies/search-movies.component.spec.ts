// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { SearchMoviesComponent } from './search-movies.component';

// describe('SearchMoviesComponent', () => {
//   let component: SearchMoviesComponent;
//   let fixture: ComponentFixture<SearchMoviesComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ SearchMoviesComponent ]
//     })
//    .compileComponents();

//     fixture = TestBed.createComponent(SearchMoviesComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should search for movies when the search term changes', () => {
//     const searchTerm = { titleSearch: 'test' };
//     component.searchTerm = searchTerm;
//     component.onChangeSearch();

//     expect(component.searchTerm).toEqual(searchTerm);
//   });

//   it('should close the modal when the close button is clicked', () => {
//     const modalRef = jasmine.createSpyObj('NgbModalRef', ['close']);
//     component.modalRef = modalRef;

//     component.onClose();

//     expect(modalRef.close).toHaveBeenCalled();
//   });

//   it('should toggle the advanced search when the toggle button is clicked', () => {
//     component.toggleAdvancedSearch();

//     expect(component.showAdvancedSearch).toBe(!component.showAdvancedSearch);
//   });
// });