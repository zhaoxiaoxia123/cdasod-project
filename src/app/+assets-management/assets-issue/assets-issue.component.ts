import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ngx-bootstrap";
import {Http} from "@angular/http";
import {CookieStoreService} from "../../shared/cookies/cookie-store.service";
import {GlobalService} from "../../core/global.service";
import {NotificationService} from "../../shared/utils/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-assets-issue',
  templateUrl: './assets-issue.component.html',
})
export class AssetsIssueComponent implements OnInit {
  page : any;
  prev : boolean = false;
  next : boolean = false;

  assetsDefault : Array<any> = [];
  assetsList : Array<any> = [];
  userList : Array<any> = [];
  assetsInfo : Array<any> = [];
  //用作全选和反选
  selects : Array<any> = [];
  check : boolean = false;

  //默认值
  assets_id:number = 0;
  assets_date: string = '';
  assets_department_id:number = 0;
  assets_user_id:number = 0;
  assets_use_note: string = '';
  assets_address: string = '';

  //顶部启动 和无效是否启用显示
  editStatusAssetsId : any = 0;
  isStatus : any = 0;
  //处理批量
  isAll : number = 0;
  width : string = '0%';
  width_1 : string = '80%';
  isDetail : string = '';

  keyword : string = '';
  cid : any = 0;//当前登录用户的所属公司id
  super_admin_id : any = 0;//超级管理员所属公司id
  assets_status_default : number = 1; //需查询的资产清单状态 1：闲置 2：使用 3：报废
  rollback_url : string = '/assets-management/assets-issue';
  constructor(
      private http:Http,
      private router : Router,
      private cookieStore:CookieStoreService,
      private globalService:GlobalService,
      private notificationService: NotificationService) {
    let nav = '{"title":"资产发放","url":"/assets-management/assets-issue","class_":"active"}';
    this.globalService.navEventEmitter.emit(nav);
    this.getAssetsList('1');
    window.scrollTo(0,0);
    this.super_admin_id = this.globalService.getAdminID();
    this.cid = this.cookieStore.getCookie('cid');
    this.getAssetsListDefault();
  }

  ngOnInit() {
  }

  /**
   * 获取默认参数
   */
  getAssetsListDefault(){
    this.http.get(this.globalService.getDomain()+'/api/v1/getAssetsDefault?type=department&assets_status='+this.assets_status_default+'&sid='+this.cookieStore.getCookie('sid'))
        .map((res)=>res.json())
        .subscribe((data)=>{
          this.assetsDefault = data;
          console.log(this.assetsDefault);
          if(this.assetsDefault['status'] == 202){
            alert(this.assetsDefault['msg']);
            this.cookieStore.removeAll(this.rollback_url);
            this.router.navigate(['/auth/login']);
          }
        });
  }

  /**
   * 获取使用人
   */
  geteUserList(obj,type:number) {
    let department_id = 0;
    if(type == 1) {
       department_id = obj.target.value;
    }else{
       department_id = obj;
    }
    if(department_id != 0) {
      this.http.get(this.globalService.getDomain() + '/api/v1/getAssetsDefault?type=user&department_id=' + department_id + '&sid=' + this.cookieStore.getCookie('sid'))
          .map((res) => res.json())
          .subscribe((data) => {
            this.userList = data;
            console.log(this.userList);
            if (this.userList['status'] == 202) {
              alert(this.userList['msg']);
              this.cookieStore.removeAll(this.rollback_url);
              this.router.navigate(['/auth/login']);
            }
          });
    }
  }
  /**
   * 获取产品列表
   * @param number
   */
  getAssetsList(number:string) {
    let url = this.globalService.getDomain()+'/api/v1/getAssetsLists?page='+number+'&sid='+this.cookieStore.getCookie('sid');
    if(this.keyword.trim() != '') {
      url += '&keyword='+this.keyword.trim();
    }
    this.http.get(url)
        .map((res)=>res.json())
        .subscribe((data)=>{
          this.assetsList = data;
          console.log(this.assetsList);
          if(this.assetsList['status'] == 202){
            this.cookieStore.removeAll(this.rollback_url);
            this.router.navigate(['/auth/login']);
          }
          if(this.assetsList.length > 0){
            if (this.assetsList['result']['assetsList']['current_page'] == this.assetsList['result']['assetsList']['last_page']) {
              this.next = true;
            } else {
              this.next = false;
            }
            if (this.assetsList['result']['assetsList']['current_page'] == 1) {
              this.prev = true;
            } else {
              this.prev = false;
            }
            this.selects = [];
            for (let entry of this.assetsList['result']['assetsList']['data']) {
              this.selects[entry['assets_id']] = false;
            }
            this.check = false;
          }
        });
  }

  /**
   * 页码分页
   * @param page
   */
  pagination(page : any) {
    this.page = page;
    this.getAssetsList(this.page);
  }

  //全选，反全选
  changeCheckAll(e){
    let t = e.target;
    let c = t.checked;
    this.selects.forEach((val, idx, array) => {
      this.selects[idx] = c;
    });
    this.check = c;
  }

  //点击列表checkbox事件
  handle(e){
    let t = e.target;
    let v = t.value;
    let c = t.checked;
    this.selects[v] = c;
    let isAll = 0;
    for (let s of this.selects) {
      if(s == false) {
        isAll += 1;
      }
    }
    if(isAll >= 1){
      this.check = false;
    }else{
      this.check = true;
    }
  }

  /**
   * 展示添加页面
   */
  showAddAssets(){
    this.editStatusAssetsId = 0;
    this.isStatus = 0;
    this.addModal.show();
  }

  /**
   * 添加信息
   */
  onSubmit(){
    if(this.assets_id == 0){
      alert('请选择发放清单！');
      return false;
    }
    if(this.assets_date.trim() == ''){
      alert('请输入发送日期！');
      return false;
    }
    this.http.post(this.globalService.getDomain()+'/api/v1/addAssets',{
      'assets_id' : this.assets_id,
      'assets_date' : this.assets_date,
      'assets_department_id' : this.assets_department_id,
      'assets_user_id' : this.assets_user_id,
      'assets_use_note' : this.assets_use_note,
      'assets_address' : this.assets_address,
      'u_id' : this.cookieStore.getCookie('uid'),
      'sid':this.cookieStore.getCookie('sid')
    }).subscribe(
        (data)=>{
          let info = JSON.parse(data['_body']);
          console.log(info['status']);
          if(info['status'] == 201){
            alert(info['msg']);
            return false;
          }else if(info['status'] == 200) {
            this.assetsList = info;
            if(this.assetsList){
              if (this.assetsList['result']['assetsList']['current_page'] == this.assetsList['result']['assetsList']['last_page']) {
                this.next = true;
              } else {
                this.next = false;
              }
              if (this.assetsList['result']['assetsList']['current_page'] == 1) {
                this.prev = true;
              } else {
                this.prev = false;
              }
              this.selects = [];
              for (let entry of this.assetsList['result']['assetsList']['data']) {
                this.selects[entry['assets_id']] = false;
              }
              this.check = false;
            }
            this.clear_();
            this.addModal.hide();
          }else if(info['status'] == 202){
            this.cookieStore.removeAll(this.rollback_url);
            this.router.navigate(['/auth/login']);
          }
        }
    );
  }


  /**
   * 重置
   */
  clear_(){
    this.assets_id = 0;
    this.assets_date = '';
    this.assets_department_id = 0;
    this.assets_user_id = 0;
    this.assets_use_note = '';
    this.assets_address = '';
    this.addModal.hide();
  }

  /**
   * 复制
   */
  setValue(info:Array<any>){
    this.assets_id = info['result']['assets_id'];
    this.assets_date = info['result']['assets_date'];
    this.assets_department_id = info['result']['assets_department_id'];
    this.assets_user_id = info['result']['assets_user_id'];
    this.assets_use_note = info['result']['assets_use_note'];
    this.assets_address = info['result']['assets_address'];

    if(this.assets_department_id){
      this.geteUserList(this.assets_department_id,2);
    }
  }

  /**
   *  type ： （ edit ：修改  ；  detail  ： 详情）
   */
  detailAssets(type:string){
    if(this.isStatus == 0){
      return false;
    }
    if(type == 'add'){
      this.editStatusAssetsId = 0;
      this.addModal.show();
    }else {
      this.isDetail = type;
      this.http.get(this.globalService.getDomain() + '/api/v1/getAssetsInfo?type=' + type + '&assets_id=' + this.editStatusAssetsId + '&sid=' + this.cookieStore.getCookie('sid'))
          .map((res) => res.json())
          .subscribe((data) => {
            this.assetsInfo = data;
            if (this.assetsInfo['status'] == 200) {
              this.setValue(this.assetsInfo);
              if (type == 'detail') {
                this.detailModal.show();
              } else {
                this.addModal.show();
              }
            } else if (this.assetsInfo['status'] == 202) {
              alert(this.assetsInfo['msg']);
              this.cookieStore.removeAll(this.rollback_url);
              this.router.navigate(['/auth/login']);
            }
          });
    }
  }

  /**
   * 删除信息
   * type id:单挑  all :多条
   */
  deleteAssets(type:any){
    if(this.globalService.demoAlert('','')){
      return false;
    }
    let msg = '';
    let assets_id : string = '';
    if(type == 'id'){
      assets_id = this.editStatusAssetsId;
    } else if(type == 'all') {
      let is_select = 0;
      this.selects.forEach((val, idx, array) => {
        if (val == true) {
          assets_id += idx + ',';
          is_select += 1;
        }
      });
      if (is_select < 1) {
        msg = '请确认已选中需要删除的信息！';
        alert(msg);
        return false;
      }
    }
    msg = '您确定要删除该信息吗？';
    if(confirm(msg)) {
      let url = this.globalService.getDomain()+'/api/v1/deleteAssetsListById?assets_id=' + assets_id + '&type='+type+'&sid=' + this.cookieStore.getCookie('sid');
      this.http.delete(url)
          .map((res) => res.json())
          .subscribe((data) => {
            this.assetsList = data;
            if(this.assetsList['status'] == 202){
              this.cookieStore.removeAll(this.rollback_url);
              this.router.navigate(['/auth/login']);
            }
            if(this.assetsList){
              if (this.assetsList['result']['assetsList']['current_page'] == this.assetsList['result']['assetsList']['last_page']) {
                this.next = true;
              } else {
                this.next = false;
              }
              if (this.assetsList['result']['assetsList']['current_page'] == 1) {
                this.prev = true;
              } else {
                this.prev = false;
              }
              this.selects = [];
              for (let entry of this.assetsList['result']['assetsList']['data']) {
                this.selects[entry['assets_id']] = false;
              }
              this.check = false;
            }
          });
    }
  }

  /**
   * 顶部  启用. 无效
   */
  isStatusShow(u_id:any,status:any){
    this.editStatusAssetsId = u_id;
    this.isStatus = status;

    this.isAll = 0;
    this.width = '0%';
    this.width_1 ='80%';
    this.selects.forEach((val, idx, array) => {
      if(val == true){
        this.selects[idx] = false;
      }
    });
  }
  /**
   * 批量
   */
  showAllCheck() {
    if(this.isAll == 0) {
      this.isAll = 1;
      this.editStatusAssetsId = 0;
      this.isStatus = 0;
      this.width = '10%';
      this.width_1 = '70%';
    }
  }


  @ViewChild('addModal') public addModal:ModalDirective;
  @ViewChild('detailModal') public detailModal:ModalDirective;

  //添加按钮
  smartModEg1() {
    this.notificationService.smartMessageBox({
      title: "添加",
      content: "请在新页面添加选项，添加完成后在当前页面点击<i class='fa fa-link'></i>刷新按钮继续选择（注：刷新按钮只是局部刷新）",
      buttons: '[取消][确定]'
    }, (ButtonPressed) => {
      if (ButtonPressed === "Yes") {
      }
    });
  }

}

