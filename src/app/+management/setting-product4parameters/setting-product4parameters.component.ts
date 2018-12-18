import { Component, OnInit } from '@angular/core';
import {FadeInTop} from '../../shared/animations/fade-in-top.decorator';
import {CookieStoreService} from '../../shared/cookies/cookie-store.service';
import {GlobalService} from '../../core/global.service';

@FadeInTop()
@Component({
  selector: 'app-setting-product4parameters',
  templateUrl: './setting-product4parameters.component.html',
})
export class SettingProduct4parametersComponent implements OnInit {
    public states: Array<any>;
    public state: any = {
        tabs: {
            demo2: 'tab-r1',
        },
    };

    category_tab_name:string;
    category_tab_value:string;
    category_id:string;

    categoryList : any = [];
    specification : any = [];
    select_id : string = '';
    select_category_id :string;
    // title : string = '';
    edit_key:string = '';

    select_cid : any = 0;//被选中的分类所属公司id
    cid : any = 0;//当前登录用户的所属公司id
    super_admin_id : any = 0;//超级管理员所属公司id
    parentCategoryList:any = []; //用于绑定修改父类信息类表
    rollback_url : string = '/management/product4parameters';
  constructor(
      private router:Router,
      private cookieStore:CookieStoreService,
      private globalService:GlobalService
  ) {
      //顶部菜单读取
      this.globalService.getMenuInfo();
      this.getCategory();
      this.getSpecification();
      this.cid = this.cookieStore.getCookie('cid');
  }

    /**
     * 获取型号列表（类型的一级目录及二级目录）
     */
    getCategory(){
        this.globalService.httpRequest('get','getCategory?category_type=6&type=1&sid='+this.cookieStore.getCookie('sid'))
            .subscribe((data)=>{
                this.categoryList = data;
            if(this.categoryList['status'] == 202){
                this.cookieStore.removeAll(this.rollback_url);
                this.router.navigate(['/auth/login']);
            }
            this.super_admin_id = this.categoryList['result']['categoryList']['super_admin_id'];
            this.select_cid = this.categoryList['select_cid'];
            //刷新父类修改下拉选择
            let arr : Array<any> = this.categoryList['result']['categoryList']['data'];
            arr.forEach((val, idx, array) => {
                if(val.c_id == this.cid || this.cid == this.super_admin_id) {
                    this.parentCategoryList.push(val);
                }
            });
        });
    }

    /**
     * 提交产品类型下的参数/规格信息
     */
    onSubmit(){
        this.globalService.httpRequest('post','addCategoryParam',{
            'category_tab_name':this.category_tab_name,
            'category_tab_value':this.category_tab_value,
            'category_id':this.category_id,
            'edit_key':this.edit_key
        }).subscribe((data)=>{
                alert(data['msg']);
                this.category_tab_name='';
                this.category_tab_value='';
                this.specification = data;
                this.select_category_id = this.select_id;
                // this.title = JSON.parse(data['_body'])['title'];
            },
            response => {
                console.log('PATCH call in error', response);
            }
        );
    }

    /**
     * 获取规格/参数列表信息
     */
    getSpecification(){
        let url = 'getSpecification';
        if(this.select_category_id){
            url += '?category_id='+this.select_category_id;
        }
        // this.select_cid = e.target.data;
        this.globalService.httpRequest('get',url)
            .subscribe((data)=>{
                this.specification = data;

            this.select_id = this.select_category_id;
            console.log('select_i：---');
            console.log(this.select_id);
            // this.title = this.specification['title'];
            this.category_id = this.specification['category_id'];
            this.select_cid = this.specification['select_cid'];
            this.edit_key = '';
        });
    }

    /**
     * 编辑规格/参数显示
     * @param cid
     */
    editSpecification(cid:string,cname:string,cvalue:string) {
        this.category_tab_name = cname;
        this.category_tab_value = cvalue;
        this.category_id = this.select_category_id;
        this.edit_key = cid;
    }

    /**
     * 删除规格/参数信息
     * @param key
     */
    deleteSpecification(key:any){
        if(confirm('您确定要删除该条信息吗？')) {
            this.globalService.httpRequest('delete','deleteSpecification?category_id=' + this.select_category_id+'&key='+key)
                .subscribe((data)=>{
                    this.specification = data;
                });
        }
    }

    ngOnInit() {
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import {Router} from '@angular/router';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform
{
    transform(value:any, args:string[]): any {
        let keys:any[] = [];
        for (let key in value) {
            keys.push({key: key, value: value[key]});
        }
        return keys;
    }
}
