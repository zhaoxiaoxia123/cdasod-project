import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../../core/global.service";
import {CookieStoreService} from "../../shared/cookies/cookie-store.service";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {isArray, isNumber, isUndefined} from "util";

@Component({
  selector: 'app-account-permissions',
  templateUrl: './account-permissions.component.html',
})
export class AccountPermissionsComponent implements OnInit {
    public state: any = {
        tabs: {
            demo3: 'hr1',
        },
    };

    customerDefault : Array<any> = [];
    roleList : Array<any> = [];

    //左侧选中商品分类的id
    select_ids: Array<any> = [];
    //左边展开和收起功能
    showUl : number  = 1;//一级分类
    showUlChild : number  = 0;//二级
    showUlChild3 : number  = 0;//三级
    editStatusCategoryId : any = 0;

    customer_id : any = 0;
    role : number = 1;
    category_type : number = 7;
    login_user_role_id : any;
    super_admin_role_id : any;

    rollback_url :string = '';
    /**菜单id */
    menu_id:any;
    /** 权限 */
    permissions : Array<any> = [];
    menuInfos : Array<any> = [];
  constructor(
      private http:Http,
      private router : Router,
      private cookieStore:CookieStoreService,
      private globalService:GlobalService) {
      this.login_user_role_id = this.cookieStore.getCookie('urole');
      this.super_admin_role_id = this.globalService.getSuperAdminRoleID();

      this.getCustomerDefault();
  }

  ngOnInit() {
      // interface IArray {
      //     [index: number]: string;
      // }
      // let arr: IArray= {'1第三方','323阿尔额'};
      // let ant: string = arr[0];
      // console.log(ant);

      //顶部菜单读取
      this.globalService.getMenuInfo();
      setTimeout(() => {
          this.menu_id = this.globalService.getMenuId();
          this.rollback_url = this.globalService.getMenuUrl();
          this.permissions = this.globalService.getPermissions();
          this.menuInfos = this.globalService.getMenuInfos();

      }, this.globalService.getMenuPermissionDelayTime());
  }
    /**
     * 是否有该元素
     */
    isPermission(menu_id,value){
        if(this.login_user_role_id == this.super_admin_role_id){
            return true;
        }else {
            let key = menu_id + '_' + value;
            if (value == '') {
                key = menu_id;
            }
            return this.cookieStore.in_array(key, this.permissions);
        }
    }
    /**
     * 是否有该元素
     */
    isHave(menu_id,val){
        let key = menu_id +'_'+val;
        if(val == ''){
            key = menu_id;
        }
        return this.cookieStore.in_array(key, this.select_ids);
    }


    /**
     * 获取客户列表
     */
    getCustomerDefault() {
        let url = this.globalService.getDomain()+'/api/v1/getPermissionCustomerDefault?role='+this.role+'&sid='+this.cookieStore.getCookie('sid');
        this.http.get(url)
            .map((res)=>res.json())
            .subscribe((data)=>{
                this.customerDefault = data;
                if(this.customerDefault['status'] == 202){
                    this.cookieStore.removeAll(this.rollback_url);
                    this.router.navigate(['/auth/login']);
                }
                if(this.customerDefault['status'] == 200 && this.customerDefault['result']['customerList'].length > 0 && this.login_user_role_id == this.super_admin_role_id){
                    this.customer_id = this.customerDefault['result']['customerList'][0]['c_id'];
                    this.getRole(this.customer_id);
                } else{
                    this.customer_id = parseInt(this.cookieStore.getCookie('cid'));
                    this.getRole(this.customer_id);
                }
            });
    }

    getRole($event){
        let cid = $event;
        if(! isNumber(cid)){
            cid = $event.target.value;
        }
        let url = this.globalService.getDomain()+'/api/v1/getCategoryByType?c_id='+cid+'&category_type='+this.category_type;
        this.http.get(url)
            .map((res)=>res.json())
            .subscribe((data)=>{
                this.roleList = data;
                if(this.roleList['status'] == 202){
                    this.cookieStore.removeAll(this.rollback_url);
                    this.router.navigate(['/auth/login']);
                }
            });
    }

    /**
     * 左边选中所有
     */
    selectCategoryAll(){
        if(this.cookieStore.in_array('0',this.select_ids)){
            this.select_ids = [];
        }else {
            this.select_ids.push('0');
            this.customerDefault['result']['menu_ids'].forEach((val, idx) => {
                if(!this.cookieStore.in_array(val,this.select_ids)){
                    this.select_ids.push(val);
                }
            });
        }
    }

    /**
     * 左侧导航栏 选中显示列表
     * index 点击的父类 or子类 索引
     * num  1：父类 2：子类
     */
    selectMenu(menu_id:any,index:number,num:number){
        if(num == 1){//点击父类
            if(this.cookieStore.in_array(menu_id,this.select_ids)){
                if(this.customerDefault['result']['menuList'][index]){
                    if(this.customerDefault['result']['menuList'][index]['child_count'] >= 1){
                        this.customerDefault['result']['menuList'][index]['child'].forEach((val, idx, array) => {
                            this.select_ids.forEach((val11, idx11, array) => {
                                if(val11 == val['menu_id']){
                                    this.select_ids.splice(idx11,1);
                                }
                            });
                            if(val['child_count'] >= 1){
                                val['child'].forEach((val13, idx13, array13) => {
                                    this.select_ids.forEach((val12, idx12, array12) => {
                                        if(val12 == val13['menu_id']){
                                            this.select_ids.splice(idx12,1);
                                        }
                                    });

                                    if(val13['controls'] != [] && !isUndefined(val13['controls'])){
                                        val13['controls'].forEach((valc, idxc) => {
                                            this.select_ids.forEach((valc1, idxc1) => {
                                                if(valc1 == val13['menu_id']+'_'+valc){
                                                    this.select_ids.splice(idxc1,1);
                                                }
                                            });
                                        });
                                    }
                                });
                            }
                            else{
                                if(val['controls'] != [] && !isUndefined(val['controls'])){
                                    val['controls'].forEach((valc, idxc) => {
                                        this.select_ids.forEach((valc1, idxc1) => {
                                            if(valc1 == val['menu_id']+'_'+valc){
                                                this.select_ids.splice(idxc1,1);
                                            }
                                        });
                                    });
                                }
                            }
                        });
                    } else{
                        if(this.customerDefault['result']['menuList'][index]['controls'] != [] && !isUndefined(this.customerDefault['result']['menuList'][index]['controls'])){
                            this.customerDefault['result']['menuList'][index]['controls'].forEach((valc, idxc) => {
                                this.select_ids.forEach((valc1, idxc1) => {
                                    if(valc1 == this.customerDefault['result']['menuList'][index]['menu_id']+'_'+valc){
                                        this.select_ids.splice(idxc1,1);
                                    }
                                });
                            });
                        }
                    }
                }
                this.select_ids.forEach((val, idx, array) => {
                    if(val == menu_id){
                        this.select_ids.splice(idx,1);
                    }
                });
            }else{
                this.select_ids.push(menu_id.toString());
                if(this.customerDefault['result']['menuList'][index]){
                    if(this.customerDefault['result']['menuList'][index]['child_count'] >= 1){
                        this.customerDefault['result']['menuList'][index]['child'].forEach((val, idx, array) => {
                            if(!this.cookieStore.in_array(val['menu_id'],this.select_ids)) {
                                this.select_ids.push(val['menu_id'].toString());
                            }
                            if(val['child_count'] >= 1){
                                val['child'].forEach((val13, idx13, array13) => {
                                    if(!this.cookieStore.in_array(val13['menu_id'],this.select_ids)) {
                                        this.select_ids.push(val13['menu_id'].toString());
                                    }
                                });
                            }
                        });
                    }
                }
            }
        }else if(num != 1){//点击子类   return
            this.customerDefault['result']['return'].forEach((val, idx) => {
                if (val['menu_id'] == menu_id) {
                    if (val['child_count'] >= 1) {
                        val['child'].forEach((valc, idxc) => {
                            if(this.cookieStore.in_array(valc['menu_id'],this.select_ids)) {
                                this.select_ids.forEach((valc1, idxc1) => {
                                    if (valc1 == valc['menu_id']) {
                                        this.select_ids.splice(idxc1, 1);
                                    }
                                });
                            }else{
                                this.select_ids.push(valc['menu_id'].toString());
                            }
                        });
                    } else{
                        if(this.cookieStore.in_array(val['menu_id'],this.select_ids)) {
                            this.select_ids.forEach((valc1, idxc1) => {
                                if (valc1 == val['menu_id']) {
                                    this.select_ids.splice(idxc1, 1);
                                }
                            });
                        }else{
                            this.select_ids.push(val['menu_id'].toString());
                        }
                    }
                }
            });
        }
    }

    selectControl($event){
        let index_ = $event.target.value;
        if(this.cookieStore.in_array(index_,this.select_ids)){
            this.select_ids.forEach((val, idx, array) => {
                if(val == index_){
                    this.select_ids.splice(idx,1);
                }
            });
        }else{
            this.select_ids.push(index_.toString());
        }
    }

    /**
     * 左边展示效果
     * @param bool
     */
    showLeftUl(bool:any){
        this.showUl = bool;
    }
    showLeftUlChild(menu_id:any){
        this.showUlChild = menu_id;
    }
    showLeftUlChild3(menu_id:any){
        this.showUlChild3 = menu_id;
    }

    isStatusShow(category_id:any){
        if(category_id != this.super_admin_role_id || this.login_user_role_id == this.super_admin_role_id ) {
            this.editStatusCategoryId = category_id;
            let url = this.globalService.getDomain() + '/api/v1/getCategoryById?category_id=' + this.editStatusCategoryId + '&category_type=' + this.category_type + '&number=3';
            this.http.get(url)
                .map((res) => res.json())
                .subscribe((data) => {
                    this.select_ids = [];
                    if (isArray(data['result']['tabs'])) {
                        data['result']['tabs'].forEach((val, idx, array) => {
                            if(!this.cookieStore.in_array(val,this.select_ids)) {
                                this.select_ids.push(val.toString());
                            }
                        });
                    }
                });
        }
    }


    /**
     * 保存授权操作
     */
    submitControl(){
        if(this.editStatusCategoryId == 0){
            alert('请选中要授权得角色！');
        }else{
            this.http.post(this.globalService.getDomain()+'/api/v1/addCategoryMenu',{
                'category_id' : this.editStatusCategoryId,
                'category_tab' :JSON.stringify(this.select_ids),
                'sid':this.cookieStore.getCookie('sid')
            }).subscribe((data)=>{
                let info = JSON.parse(data['_body']);
                alert(info['msg']);
                if(info['status'] == 202){
                    this.cookieStore.removeAll(this.rollback_url);
                    this.router.navigate(['/auth/login']);
                }else if(info['status'] == 200){
                    // this.select_ids = [];
                    // this.editStatusCategoryId = 0;
                }
            });
        }
    }



}
