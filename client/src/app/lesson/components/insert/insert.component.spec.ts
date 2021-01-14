import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { WordComparerService } from '../../services/word-comparer/word-comparer.service';
import { InsertComponent } from './insert.component';
import { MockDeclaration } from 'ng-mocks';
import { StoperComponent } from '../stoper/stoper.component';
import { ResultsComponent } from '../results/results.component';
import { FiszkaComponent } from '../fiszka/fiszka.component';
import { SettingsComponent } from '../settings/settings.component';
import { createProvider } from 'src/app/test/helpers.spec';
import { InsertService } from './service/insert/insert.service';
import { of } from 'rxjs';
import { LessonStep } from '../../models/lesson-state';

describe('InsertComponent', () => {
    let fixture: ComponentFixture<InsertComponent>;
    let component: InsertComponent;
    let service: jasmine.SpyObj<InsertService>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [
                InsertComponent,
                MockDeclaration(StoperComponent),
                MockDeclaration(ResultsComponent),
                MockDeclaration(FiszkaComponent),
                MockDeclaration(SettingsComponent)
            ],
            providers: [
                createProvider(InsertService)
            ]
        }).compileComponents();
        service = TestBed.inject(InsertService) as jasmine.SpyObj<InsertService>;
    });

    beforeEach(() => {
        service.getLessonStep.and.returnValue(of(LessonStep.BEFORE_START));
        service.getComparisonResult.and.returnValue(of('none'));
        fixture = TestBed.createComponent(InsertComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
