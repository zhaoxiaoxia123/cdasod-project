webpackJsonp([37],{"7c45":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=i("WT6e"),o=i("Xjw4"),n=i("bfOx"),a=i("D1Z2"),c=i("cOnr"),s=i("7DMc"),l=i("NOoU"),d=i("ntJC"),g=i("R12H"),y=this&&this.__decorate||function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var c=t.length-1;c>=0;c--)(o=t[c])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a},u=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},p=function(){function t(t,e,i,r,o,n){this.jsonApiService=t,this.http=i,this.router=r,this.cookieStoreService=o,this.globalService=n,this.state={tabs:{demo1:0,demo2:"tab-r1",demo3:"hr1",demo4:"AA",demo5:"iss1",demo6:"l1",demo7:"tab1",demo8:"hb1",demo9:"A1",demo10:"is1"}},this.category_id1=0,this.category_id2=0,this.child_style="none",this.button1_title="\u4fdd\u5b58\u5e76\u6dfb\u52a0\u4e8c\u7ea7\u7c7b\u578b",this.button2_title="\u4fdd\u5b58\u5e76\u6dfb\u52a0\u4e8c\u7ea7\u7c7b\u578b",this.is_edit=!1,this.categoryList=[],this.button_contrl_id=0,this.index=1,this.edit_category_info=[],this.cid=0,this.super_admin_id=0,this.parentCategoryList=[],this.rollback_url="/management/product3type",this.globalService.getMenuInfo(),this.formModel=e.group({category_desc:[""],category_type:["6"],category_depth:[""],category_id:[""]}),this.getCategory(),this.cid=this.cookieStoreService.getCookie("cid")}return t.prototype.getCategory=function(){var t=this;this.http.get(this.globalService.getDomain()+"/api/v1/getCategory?category_type=6&sid="+this.cookieStoreService.getCookie("sid")).map(function(t){return t.json()}).subscribe(function(e){t.categoryList=e}),setTimeout(function(){202==t.categoryList.status&&(t.cookieStoreService.removeAll(t.rollback_url),t.router.navigate(["/auth/login"])),t.super_admin_id=t.categoryList.result.categoryList.super_admin_id,t.categoryList.result.categoryList.data.forEach(function(e,i,r){e.c_id!=t.cid&&t.cid!=t.super_admin_id||t.parentCategoryList.push(e)})},300)},t.prototype.show=function(t,e){this.index=t,this.button_contrl_id=e},t.prototype.submitCategory=function(t){var e=this;if(1==t)if(console.log(this.category_desc1),1==this.is_edit)this.http.post(this.globalService.getDomain()+"/api/v1/changeCategoryParentId",{category_type:6,category_depth:this.category_desc_s,category_id:this.category_id2,sid:this.cookieStoreService.getCookie("sid")}).subscribe(function(t){var i=JSON.parse(t._body);202==i.status&&(e.cookieStoreService.removeAll(e.rollback_url),e.router.navigate(["/auth/login"])),alert(i.msg),e.categoryList=i,e.category_desc1="",e.category_depth2=i.category_id,e.child_style="block",e.categoryList.result.forEach(function(t,i,r){t.c_id!=e.cid&&e.cid!=e.super_admin_id||e.parentCategoryList.push(t)})},function(t){console.log("PATCH call in error",t)});else{if(""==this.category_desc1.trim()||!this.category_desc1)return alert("\u8bf7\u8f93\u5165\u8981\u6dfb\u52a0\u7684\u4fe1\u606f\uff01"),!1;this.http.post(this.globalService.getDomain()+"/api/v1/addCategory",{category_desc:this.category_desc1,category_type:6,category_depth:0,category_id:this.category_id1,sid:this.cookieStoreService.getCookie("sid")}).subscribe(function(t){var i=JSON.parse(t._body);if(alert(i.msg),202==i.status&&(e.cookieStoreService.removeAll(e.rollback_url),e.router.navigate(["/auth/login"])),203==i.status)return!1;e.categoryList=i,e.category_depth2=i.category_id,e.child_style="block",e.categoryList.result.forEach(function(t,i,r){t.c_id!=e.cid&&e.cid!=e.super_admin_id||e.parentCategoryList.push(t)})},function(t){console.log("PATCH call in error",t)})}else if(2==t){if(console.log(this.category_desc2),""==this.category_desc2.trim()||!this.category_desc2)return alert("\u8bf7\u8f93\u5165\u8981\u6dfb\u52a0\u7684\u4fe1\u606f\uff01"),!1;this.http.post(this.globalService.getDomain()+"/api/v1/addCategory",{category_desc:this.category_desc2,category_type:6,category_depth:this.category_depth2,category_id:this.category_id2,sid:this.cookieStoreService.getCookie("sid")}).subscribe(function(t){var i=JSON.parse(t._body);if(alert(i.msg),202==i.status&&(e.cookieStoreService.removeAll(e.rollback_url),e.router.navigate(["/auth/login"])),203==i.status)return!1;e.categoryList=i,e.category_desc1="",e.category_desc2="",e.category_depth2=i.category_id,e.category_id2=0;var r=e.categoryList.result;e.parentCategoryList=[],r.forEach(function(t,i,r){t.c_id!=e.cid&&e.cid!=e.super_admin_id||e.parentCategoryList.push(t)})},function(t){console.log("PATCH call in error",t)})}this.formModel.setValue({category_desc:"",category_type:"6",category_depth:"",category_id:""}),this.category_id1=0,this.category_id2=0,this.category_desc2="",this.category_depth2=0,this.child_style="none",this.button1_title="\u4fdd\u5b58\u5e76\u6dfb\u52a0\u4e8c\u7ea7\u7c7b\u578b",this.button2_title="\u4fdd\u5b58\u5e76\u6dfb\u52a0\u4e8c\u7ea7\u7c7b\u578b",this.is_edit=!1},t.prototype.editCategory=function(t,e){var i=this;this.http.get(this.globalService.getDomain()+"/api/v1/getCategoryById?category_id="+e+"&number="+t).map(function(t){return t.json()}).subscribe(function(t){i.edit_category_info=t}),setTimeout(function(){1==t?(i.child_style="none",i.button1_title="\u4fee\u6539",i.button2_title="\u4fdd\u5b58\u5e76\u6dfb\u52a0\u4e8c\u7ea7\u7c7b\u578b",i.category_id1=e,i.is_edit=!1,i.category_id2=0,i.category_desc2="",i.category_depth2=e,i.category_desc1=i.edit_category_info.result.parent.category_desc):2==t&&(i.button1_title="\u53d8\u66f4",i.button2_title="\u4fee\u6539",i.is_edit=!0,i.child_style="block",i.category_id2=e,i.category_id1=i.edit_category_info.result.parent.category_id,i.category_desc2=i.edit_category_info.result.child.category_desc,i.category_depth2=i.edit_category_info.result.child.category_depth),console.log("this.category_depth2"),console.log(i.category_depth2)},500)},t.prototype.deleteCategory=function(t,e){var i=this;if(confirm(1==t?"\u60a8\u786e\u5b9a\u8981\u5220\u9664\u8be5\u6761\u4fe1\u606f\u53ca\u5176\u6240\u5c5e\u4fe1\u606f\u5417\uff1f":"\u60a8\u786e\u5b9a\u8981\u5220\u9664\u8be5\u6761\u4fe1\u606f\u5417\uff1f")){var r=this.globalService.getDomain()+"/api/v1/deleteCategory?category_id="+e+"&number="+t+"&category_type=6&sid="+this.cookieStoreService.getCookie("sid");this.http.delete(r).map(function(t){return t.json()}).subscribe(function(t){i.categoryList=t}),setTimeout(function(){i.categoryList.result.forEach(function(t,e,r){t.c_id!=i.cid&&i.cid!=i.super_admin_id||i.parentCategoryList.push(t)}),202==i.categoryList.status&&(i.cookieStoreService.removeAll(i.rollback_url),i.router.navigate(["/auth/login"]))},300)}},t.prototype.ngOnInit=function(){var t=this;this.jsonApiService.fetch("/ui-examples/nestable-lists.json").subscribe(function(e){t.demo2=e.demo2})},t.prototype.onChange2=function(t){this.nestable2DemoOutput=t},t=y([Object(a.a)(),Object(r.Component)({selector:"app-setting-product3type",template:i("pmt2")}),u("design:paramtypes",[c.a,s.a,l.b,n.c,d.a,g.a])],t)}(),_=[{path:"",component:p}],b=n.d.forChild(_),h=i("JOm+"),f=i("pvSQ"),v=i("eLYD"),m=i("jfyD");i.d(e,"SettingProduct3typeModule",function(){return k});var S=this&&this.__decorate||function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var c=t.length-1;c>=0;c--)(o=t[c])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a},k=function(){function t(){}return t=S([Object(r.NgModule)({imports:[o.CommonModule,h.a,f.a,b,v.a,s.f],declarations:[p],providers:[m.CookieService,d.a]})],t)}()},pmt2:function(t,e){t.exports='<div id="content">\r\n \x3c!-- <div class="row">\r\n    <sa-big-breadcrumbs [items]="[\'\u4ea7\u54c1\u7ba1\u7406\', \'\u4ea7\u54c1\u7c7b\u578b\u8bbe\u7f6e\']" icon="pencil-square-o" ></sa-big-breadcrumbs>\r\n  </div>--\x3e\r\n  <sa-widget [editbutton]="false" [fullscreenbutton]="false" [custombutton]="false" [sortable]="false">\r\n    <header>\r\n      <ul class="nav nav-tabs pull-left in">\r\n        <li [class.active]="state.tabs.demo2==\'tab-r1\'" class="active">\r\n          <a (click)="state.tabs.demo2 = \'tab-r1\'">\u7c7b\u578b</a>\r\n        </li>\r\n      </ul>\r\n    </header>\r\n    <div>\r\n      <div class="widget-body">\r\n        <tabset>\r\n          <tab [active]="state.tabs.demo2 == \'tab-r1\'">\r\n            <tabset class="pd-10">\r\n              <tab [active]="state.tabs.demo2 == \'tab-r1\'">\r\n                <div class="row">\r\n                  <article class="col-lg-6">\r\n                    <sa-widget class="jarviswidget well" [colorbutton]="false" [editbutton]="false" [togglebutton]="false"\r\n                               [deletebutton]="false" [fullscreenbutton]="false" [custombutton]="false" [sortable]="false">\r\n                      <div>\r\n                        <div class="widget-body no-padding">\r\n                          <alert type="info" class="no-margin" *ngIf="category_id1 == 0 && category_id2 == 0 ">\r\n                            <i class="fa-fw fa fa-plus"></i>\r\n                            \u6dfb\u52a0\u7c7b\u578b\r\n                          </alert>\r\n                          <alert type="info" class="no-margin" *ngIf="category_id1 != 0 || category_id2 != 0 ">\r\n                            <i class="glyphicon glyphicon-pencil"></i>\r\n                            \u4fee\u6539\u7c7b\u578b\r\n                          </alert>\r\n\r\n                          <div  class="mt-10">\r\n                            <form class="smart-form ">\r\n                              <fieldset>\r\n                                <section >\r\n                                  <div class="row">\r\n                                    <div class="col col-6">\r\n                                      <label class="label ">\u4e00\u7ea7</label>\r\n                                      <label class="select" [ngStyle]="{\'display\':is_edit?\'block\':\'none\'}">\r\n                                        <select name="category_desc_s" [(ngModel)]="category_id1">\r\n                                          <option *ngFor="let cd of parentCategoryList" [selected]="category_depth2 == cd.category_id" value="{{cd.category_id}}">\r\n                                            {{cd.category_desc}}\r\n                                          </option>\r\n                                        </select>\r\n                                      </label>\r\n                                      <label class="input" [ngStyle]="{\'display\':is_edit?\'none\':\'block\'}">\r\n                                        <input [ngStyle]="{\'display\':!is_edit?\'block\':\'none\'}" type="text" required\r\n                                               placeholder="\u8bf7\u8f93\u5165\u7c7b\u578b" minlength="1" maxlength="20" [(ngModel)]="category_desc1" name="category_desc1">\r\n                                        <input type="hidden" [(ngModel)]="category_id1" name="category_id1">\r\n                                      </label>\r\n                                    </div>\r\n                                    <div class="col col-lg-4" >\r\n                                      <button (click)="submitCategory(1)" class="btn btn-warning btn-xs text-center" style="padding:6px;margin:24px 0;" >\r\n                                        <i class="fa fa-plus"></i> <span class="hidden-mobile">{{button1_title}}</span>\r\n                                      </button>\r\n                                    </div>\r\n                                  </div>\r\n                                </section>\r\n                                <section id="child" [ngStyle]="{\'display\':child_style }">\r\n                                  <div class="row"  style="padding-left:60px;">\r\n                                    <div class="col col-6">\r\n                                      <label class="label ">\u4e8c\u7ea7</label>\r\n                                      <label class="input"  >\r\n                                        <input type="text" required\r\n                                               placeholder="\u8bf7\u8f93\u5165\u7c7b\u578b" minlength="1" maxlength="20" [(ngModel)]="category_desc2" name="category_desc2">\r\n                                        <input type="hidden" [(ngModel)]="category_id2" name="category_id2">\r\n                                        <input type="hidden" [(ngModel)]="category_depth2" name="category_depth2">\r\n                                      </label>\r\n                                    </div>\r\n                                    <div class="col col-lg-4" >\r\n                                      <button class="btn btn-warning btn-xs text-center" (click)="submitCategory(2)" style="padding:6px;margin:24px 0;" >\r\n                                        <i class="fa fa-plus"></i> <span class="hidden-mobile">{{button2_title}}</span>\r\n                                      </button>\r\n                                    </div>\r\n                                  </div>\r\n                                </section>\r\n                              </fieldset>\r\n                              <div class="widget-footer"></div>\r\n                            </form>\r\n                          </div>\r\n\r\n                        </div>\r\n                      </div>\r\n                    </sa-widget>\r\n                  </article>\r\n                  <article class="col-lg-6">\r\n                    <sa-widget class="jarviswidget well" [colorbutton]="false" [editbutton]="false" [togglebutton]="false"\r\n                               [deletebutton]="false" [fullscreenbutton]="false" [custombutton]="false" [sortable]="false">\r\n                      <div>\r\n                        <div class="widget-body no-padding">\r\n                          <alert type="info" class="no-margin" >\r\n                            <i class="fa-fw fa fa-table"></i>\r\n                            \u7c7b\u578b\r\n                          </alert>\r\n                          <div class="widget-body">\r\n                            <div class="row text-center" style="padding:10px 40px;">\r\n                              <div class="dd" id="nestable2">\r\n                                <ol class="dd-list">\r\n                                  <li class="dd-item" data-id="{{cl.category_id}}" *ngFor="let cl of categoryList.result">\r\n                                    <button data-action="expand" type="button" *ngIf="cl.child_count > 0" [ngStyle]="{\'display\': ((button_contrl_id==cl.category_id && index == 1) || button_contrl_id!=cl.category_id) ? \'block\':\'none\'}" (click)="show(2,cl.category_id)">\u6536\u8d77</button>\r\n                                    <button data-action="collapse" type="button" *ngIf="cl.child_count > 0" [ngStyle]="{\'display\': (button_contrl_id==cl.category_id && index == 2) ? \'block\':\'none\'}" (click)="show(1,cl.category_id)">\u5c55\u5f00</button>\r\n                                    <div class="dd-handle">\r\n                                      {{cl.category_desc}}\r\n                                      <div *ngIf="cid == super_admin_id || cl.c_id == cid">\r\n                                        <a class="btn pull-right btn-warning btn-xs btn-20" (click)="editCategory(1,cl.category_id)"><span class="glyphicon glyphicon-pencil"></span>\u4fee\u6539</a>\r\n                                        <a class="btn pull-right btn-danger btn-xs btn-20" (click)="deleteCategory(1,cl.category_id)"><span class="glyphicon glyphicon-remove"></span>\u5220\u9664</a>\r\n                                      </div>\r\n                                      <div *ngIf="cid != super_admin_id && cl.c_id != cid"><a class="btn pull-right btn-danger btn-xs btn-20">\u65e0\u6743\u64cd\u4f5c</a></div>\r\n\r\n                                      </div>\r\n                                    <ol class="dd-list" [ngStyle]="{\'display\': (button_contrl_id==cl.category_id && index == 2) ? \'block\':\'none\'}">\r\n                                      <li class="dd-item" data-id="{{clc.category_id}}" *ngFor="let clc of cl.child">\r\n                                      <div class="dd-handle">\r\n                                        {{clc.category_desc}}\r\n                                        <div *ngIf="cid == super_admin_id || clc.c_id == cid">\r\n                                          <a class="btn pull-right btn-warning btn-xs btn-20" (click)="editCategory(2,clc.category_id)"><span class="glyphicon glyphicon-pencil"></span>\u4fee\u6539</a>\r\n                                          <a class="btn pull-right btn-danger btn-xs btn-20" (click)="deleteCategory(2,clc.category_id)"><span class="glyphicon glyphicon-remove"></span>\u5220\u9664</a>\r\n                                        </div>\r\n                                        <div *ngIf="cid != super_admin_id && clc.c_id != cid"><a class="btn pull-right btn-danger btn-xs btn-20">\u65e0\u6743\u64cd\u4f5c</a></div>\r\n\r\n                                      </div>\r\n                                    </li>\r\n                                    </ol>\r\n                                  </li>\r\n                                </ol>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </sa-widget>\r\n                  </article>\r\n                </div>\r\n              </tab>\r\n            </tabset>\r\n          </tab>\r\n        </tabset>\r\n      </div>\r\n    </div>\r\n  </sa-widget>\r\n</div>\r\n'}});