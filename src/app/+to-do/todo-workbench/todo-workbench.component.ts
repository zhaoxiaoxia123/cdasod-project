import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {GlobalService} from "../../core/global.service";
import {CookieStoreService} from "../../shared/cookies/cookie-store.service";

@Component({
  selector: 'app-todo-workbench',
  templateUrl: './todo-workbench.component.html',
    styles: [`
        div.scroll-list {
            overflow: auto;
            max-height: 70vh;
        }
        .drag-over {
            border: #ff525b dashed 2px !important;
        }
        .drag-hint {
            border: #ffc100 dashed 2px !important;
            /*transition: all .2s ease-in-out;*/
            /*transform: scale(1.05);*/
        }
        .drag-target-border {
            border: #00bfff dashed 2px !important;
        }
    `
    ]
})
export class TodoWorkbenchComponent implements OnInit {
    public state: any = {
        tabs: {
            demo3: 'hr1',
        },
    };
    projectDefault : Array<any> = [];
    todoList : Array<any> = [];
    todoLists : Array<any> = [];//任务名列表
    selects : Array<any> = [];
    uId : any = 0;
    rollback_url : string = '/to-do/todo-workbench';
    //发布任务标题
    publish_todo_title : Array<any> = [];
    //发布任务所属的项目id
    workbench_project_id : Array<any> = [];
    //发布任务所属的模板id
    workbench_template_id : Array<any> = [];

    project_id : any = 0;
    dropTemplateId : any = '';//拽入模版编号
    todo_type : string = 'workbench';

    constructor(
        private http:Http,
        private router : Router,
        private cookieStore:CookieStoreService,
        private globalService:GlobalService) {
        let nav = '{"title":"我的工作台","url":"/to-do/todo-workbench","class_":"active"}';
        this.globalService.navEventEmitter.emit(nav);

        this.uId = this.cookieStore.getCookie('uid');
        this.isHaveTemplate();
        window.scrollTo(0,0);
    }

    ngOnInit() {

    }

    isHaveTemplate(){
        let url = this.globalService.getDomain()+'/api/v1/isHaveTemplate?uid='+this.uId+'&sid='+this.cookieStore.getCookie('sid');
        this.http.get(url)
            .map((res)=>res.json())
            .subscribe((data)=>{
                console.log(data);
                if(data['status'] == 202){
                    this.cookieStore.removeAll(this.rollback_url);
                    this.router.navigate(['/auth/login']);
                }else if(data['status'] == 200){
                    this.project_id = data['result']['project_id'];
                    this.getTodoDefault(this.project_id);
                }
            });
    }


    /**
     * 获取默认的模版信息和任务列表信息
     * @param project_id
     */
    getTodoDefault(project_id:number){
        let url = this.globalService.getDomain()+'/api/v1/getTodoList?todo_type='+this.todo_type+'_add&project_id='+project_id+'&uid='+this.uId+'&sid='+this.cookieStore.getCookie('sid');
        this.http.get(url)
            .map((res)=>res.json())
            .subscribe((data)=>{
                this.todoList = data;
                if(this.todoList['status'] == 202){
                    this.cookieStore.removeAll(this.rollback_url);
                    this.router.navigate(['/auth/login']);
                }

                this.selects = [];
                for (let entry of this.todoList['result']['template_list']) {
                    this.selects[entry['key']] = false;
                    this.publish_todo_title[entry['key']] = '';
                    this.workbench_project_id[entry['key']] = '';
                    this.workbench_template_id[entry['key']] = '';
                }
            });
    }

    /**
     * 获取任务列表名列表
     * @param obj
     */
    getTodoInfo(obj){
        let project_id = obj.target.value;
        if(project_id != 0){
            let url = this.globalService.getDomain()+'/api/v1/getTodoList?todo_type='+this.todo_type+'&project_id='+project_id+'&uid='+this.uId+'&sid='+this.cookieStore.getCookie('sid');
            this.http.get(url)
                .map((res)=>res.json())
                .subscribe((data)=>{
                    this.todoLists = data;
                    if(this.todoLists['status'] == 202){
                        this.cookieStore.removeAll(this.rollback_url);
                        this.router.navigate(['/auth/login']);
                    }
                });
        }
    }
    /**
     * 提交发布任务
     */
    submitTodo(project_id:number,template_id:number){
        if(this.publish_todo_title[template_id].trim() == ''){
            alert('请填写任务标题！');
            return false;
        }
        this.http.post(this.globalService.getDomain()+'/api/v1/addTodo',{
            'project_id':project_id,
            'template_id':template_id,
            'todo_title':this.publish_todo_title[template_id],
            'uid':this.uId,
            'todo_type':this.todo_type+'_add',
            'workbench_project_id':this.workbench_project_id[template_id],
            'workbench_template_id':this.workbench_template_id[template_id],
            'sid':this.cookieStore.getCookie('sid')
        }).subscribe(
            (data)=>{
                let info = JSON.parse(data['_body']);
                if(info['status'] == 200) {
                    this.todoList = info;
                    this.selects = [];
                    for (let entry of this.todoList['result']['template_list']) {
                        this.selects[entry['key']] = false;
                        this.publish_todo_title[entry['key']] = '';
                        this.workbench_project_id[entry['key']] = '';
                        this.workbench_template_id[entry['key']] = '';
                    }
                }else if(info['status'] == 202){
                    alert(info['msg']);
                    this.cookieStore.removeAll(this.rollback_url);
                    this.router.navigate(['/auth/login']);
                }else if(info['status'] == 201){
                    alert(info['msg']);
                }
            }
        );
    }


    /**
     * 展示和隐藏添加任务的框
     * @param template_id
     */
    showAddTodo(template_id:number){
        this.selects[template_id] = !this.selects[template_id];
        console.log('this.projectDefault');
        console.log(this.projectDefault);
        if(this.projectDefault.length == 0) {
            this.getProjectDefault(1);
        }
        // if(this.selects[template_id] == false){
        //     this.projectDefault = [];
        // }
    }


    /**
     * 拖拽
     * template_id:string,  ,project_id:number
     */
    onDragList_(todoId :number){
        if(this.dropTemplateId.trim() == ''){
            alert('请拖拽进框内再放开鼠标！');
            return false;
        }
        this.http.post(this.globalService.getDomain()+'/api/v1/todoDnd',{
            'project_id':this.project_id,
            'dragTodoId':todoId,
            'dropWorkBenchTemplateId':this.dropTemplateId,
            'uid':this.uId,
            'todo_type':this.todo_type+'_add',
            'sid':this.cookieStore.getCookie('sid')
        }).subscribe((data)=>{
            let info = JSON.parse(data['_body']);
            if(info['status'] == 200) {
                this.todoList = info;
                this.selects = [];
                for (let entry of this.todoList['result']['template_list']) {
                    this.selects[entry['key']] = false;
                    this.publish_todo_title[entry['key']] = '';
                    this.workbench_project_id[entry['key']] = '';
                    this.workbench_template_id[entry['key']] = '';
                }
            }else if(info['status'] == 202){
                alert(info['msg']);
                this.cookieStore.removeAll(this.rollback_url);
                this.router.navigate(['/auth/login']);
            }else if(info['status'] == 201){
                alert(info['msg']);
            }
        });
    }

    //放下的模版id
    onListDrop_(key:string) {
        this.dropTemplateId = key;
    }


    /**
     * 获取项目列表
     * @param number
     */
    getProjectDefault(number:any) {
        let url = this.globalService.getDomain()+'/api/v1/getWorkbenchDefault?page='+number+'&uid='+this.uId+'&sid='+this.cookieStore.getCookie('sid');
        this.http.get(url)
            .map((res)=>res.json())
            .subscribe((data)=>{
                this.projectDefault = data;
                console.log('this.projectDefault:-----');
                console.log(this.projectDefault);
                if(this.projectDefault['status'] == 202){
                    this.cookieStore.removeAll(this.rollback_url);
                    this.router.navigate(['/auth/login']);
                }
            });
    }
    /**
     * 编辑任务状态  任务列表下编辑
     * @param num
     */
    editStatus($event:Event,num:number,todo_id:string,project_id:number){
        $event.stopPropagation();
        let msg = '您确定此任务已完成？';
        if(num == 1){
            msg = '您确定恢复此任务状态为未完成？';
        }
        if(confirm(msg)){
            this.http.post(this.globalService.getDomain()+'/api/v1/addTodo',{
                'todo_id':todo_id,
                'project_id':project_id,
                'todo_status':num,
                'is_list':1,
                'is_send_message':'true',
                'todo_type':this.todo_type+'_add',
                'uid':this.cookieStore.getCookie('uid'),
                'sid':this.cookieStore.getCookie('sid')
            }).subscribe((data)=>{
                let info = JSON.parse(data['_body']);
                if(info['status'] == 200) {
                    this.todoList = info;
                    this.selects = [];
                    for (let entry of this.todoList['result']['template_list']) {
                        this.selects[entry['key']] = false;
                        this.publish_todo_title[entry['key']] = '';
                        this.workbench_project_id[entry['key']] = '';
                        this.workbench_template_id[entry['key']] = '';
                    }
                }else if(info['status'] == 202){
                    alert(info['msg']);
                    this.cookieStore.removeAll(this.rollback_url);
                    this.router.navigate(['/auth/login']);
                }else if(info['status'] == 201){
                    alert(info['msg']);
                }
            });
        }
    }
}
