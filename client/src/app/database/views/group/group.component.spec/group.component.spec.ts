import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { GroupComponent } from '../group.component';
import { ModalAddWordMockComponent, WordRowMockComponent } from './group.component.mocks';
import { ActivatedRouteMock, RouterMock } from 'src/app/util.mocks';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupProviderBase, GroupProviderMock } from '@app/common/services';

describe('GroupComopnent', () => {
    let component: GroupComponent;
    let fixture: ComponentFixture<GroupComponent>;
    let activetedRouteMock: ActivatedRouteMock;
    let groupProviderMock: GroupProviderBase;
    let routerMock: RouterMock;

    beforeEach(async(() => {
        activetedRouteMock = new ActivatedRouteMock();
        groupProviderMock = new GroupProviderMock();
        routerMock = new RouterMock();
        TestBed.configureTestingModule({
            declarations: [
                GroupComponent,
                ModalAddWordMockComponent,
                WordRowMockComponent
            ],
            providers: [
                {
                    provide: ActivatedRoute, useValue: activetedRouteMock
                },
                {
                    provide: GroupProviderBase, useValue: groupProviderMock
                },
                {
                    provide: Router, useValue: routerMock
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
