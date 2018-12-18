import {Component, OnInit, ViewChild} from '@angular/core';
import {FadeInTop} from '../../shared/animations/fade-in-top.decorator';
import {ModalDirective} from 'ngx-bootstrap';
import {CookieStoreService} from '../../shared/cookies/cookie-store.service';
import {Router} from '@angular/router';
import {GlobalService} from '../../core/global.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@FadeInTop()
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
})
export class ListProductComponent implements OnInit {
  productList : any = [];
  page : any;
  prev : boolean = false;
  next : boolean = false;

  formModel : FormGroup;
  //用作全选和反选
  selects : Array<any> = [];
  check : boolean = false;
  product_info : any = [];
  rollback_url : string = '/tables/product';
  constructor(
              fb:FormBuilder,
              private router : Router,
              private cookiestore:CookieStoreService,
              private globalService:GlobalService
  ) {
    //顶部菜单读取
    this.globalService.getMenuInfo();
    this.formModel = fb.group({
      keyword:[''],
    });
    this.getProductList('1');
    window.scrollTo(0,0);
  }

  ngOnInit() {
  }


  /**
   * 提交搜索
   */
  onSubmit(){
    if( this.formModel.value['keyword'].trim() == ''){
      alert('请输入需要搜索的关键字');
      return false;
    } else {
      this.getProductList('1');
    }
  }

  /**
   * 获取产品列表
   * @param number
   */
  getProductList(number:string) {
    let url = 'getProductList?sid='+this.cookiestore.getCookie('sid')+'&page='+number;
    if(this.formModel.value['keyword'].trim() != ''){
      url += '&keyword='+this.formModel.value['keyword'].trim();
    }
    this.globalService.httpRequest('get',url)
        .subscribe((data)=>{
          this.productList = data;

      if(this.productList['status'] == 202){
        this.cookiestore.removeAll(this.rollback_url);
        this.router.navigate(['/auth/login']);
      }
      console.log(this.productList);
      if (this.productList) {
        if (this.productList['result']['current_page'] == this.productList['result']['last_page']) {
          this.next = true;
        } else {
          this.next = false;
        }
        if (this.productList['result']['current_page'] == 1) {
          this.prev = true;
        } else {
          this.prev = false;
        }

        this.selects = [];
        for (let entry of this.productList['result']['data']) {
          this.selects[entry['p_id']] = false;
        }
        this.check = false;
      }
    });
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
   * 分页
   * @param url
   */
  pagination(url : string) {
    // console.log('url:'+url);
    if(url) {
      this.page = url.substring((url.lastIndexOf('=') + 1), url.length);
      // console.log(this.page);
      this.getProductList(this.page);
    }
  }

  /**
   * 删除产品信息  单条删除
   * @param uid
   */
  deleteProduct(uid:any,current_page:any){
    if(this.globalService.demoAlert('','')){
      return false;
    }
    if(confirm('您确定要删除该条信息吗？')) {
      this.globalService.httpRequest('delete','deleteProductById?pid=' + uid + '&page=' + current_page+'&type=id&sid='+this.cookiestore.getCookie('sid'))
          .subscribe((data) => {
            this.productList = data;

        alert(this.productList['msg']);
        if(this.productList['status'] == 202){
          this.cookiestore.removeAll(this.rollback_url);
          this.router.navigate(['/auth/login']);
        }
        if (this.productList) {
          if (this.productList['result']['current_page'] == this.productList['result']['last_page']) {
            this.next = true;
          } else {
            this.next = false;
          }
          if (this.productList['result']['current_page'] == 1) {
            this.prev = true;
          } else {
            this.prev = false;
          }
        }
      });
    }
  }

  /**
   * 全选删除
   * @param current_page
   */
  deleteProductAll(current_page:any){
    if(this.globalService.demoAlert('','')){
      return false;
    }
    if(confirm('删除后将不可恢复，您确定要删除吗？')) {
      let ids : string = '';
      this.selects.forEach((val, idx, array) => {
        if(val == true){
          ids += idx+',';
        }
      });
      this.globalService.httpRequest('delete','deleteProductById?ids=' + ids + '&page=' + current_page+'&type=all&sid='+this.cookiestore.getCookie('sid'))
          .subscribe((data) => {
            this.productList = data;

        alert(this.productList['msg']);
        if(this.productList['status'] == 202){
          this.cookiestore.removeAll(this.rollback_url);
          this.router.navigate(['/auth/login']);
        }
        if (this.productList) {
          if (this.productList['result']['current_page'] == this.productList['result']['last_page']) {
            this.next = true;
          } else {
            this.next = false;
          }
          if (this.productList['result']['current_page'] == 1) {
            this.prev = true;
          } else {
            this.prev = false;
          }
        }
      });
    }
  }


  /**
   * 查看产品详情
   * @param id
   */
  getProductInfo(id){
    this.globalService.httpRequest('get','getProductInfo?p_id='+id+'&type=detail')
        .subscribe((data)=>{
          this.product_info = data;
        });
  }

  @ViewChild('lgModal') public lgModal:ModalDirective;

    public showChildModal():void {
        this.lgModal.show();
    }

    public hideChildModal():void {
        this.lgModal.hide();
    }
  /**
   * 演示账号输出
   * @param url
   * @param param
   */
  isDemo(url:string,param:any){
    this.globalService.demoAlert(url,param);
  }
}
