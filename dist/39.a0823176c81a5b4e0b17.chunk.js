webpackJsonp([39],{R2Fz:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r("WT6e"),a=r("Xjw4"),o=r("bfOx"),s=r("NOoU"),i=r("R12H"),l=r("ntJC"),c=this&&this.__decorate||function(t,e,r,n){var a,o=arguments.length,s=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,n);else for(var i=t.length-1;i>=0;i--)(a=t[i])&&(s=(o<3?a(s):o>3?a(e,r,s):a(e,r))||s);return o>3&&s&&Object.defineProperty(e,r,s),s},d=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},g=function(){function t(t,e,r,n){this.http=t,this.router=e,this.cookieStore=r,this.globalService=n,this.state={tabs:{demo1:0,demo2:"tab-r1",demo3:"hr1",demo4:"AA",demo5:"iss1",demo6:"l1",demo7:"tab1",demo8:"hb1",demo9:"A1",demo10:"is1"}},this.categoryList=[],this.categoryInfo=[],this.category_id=0,this.category_desc="",this.category_number="",this.selects=[],this.check=!1,this.editStatusCategoryId=0,this.isAll=0,this.width="0%",this.width_1="100%",this.super_admin_role_id=0,this.category_type=7,this.rollback_url="",this.permissions=[],this.getCategoryList("1"),window.scrollTo(0,0),this.super_admin_role_id=this.globalService.getSuperAdminRoleID()}return t.prototype.ngOnInit=function(){var t=this;this.globalService.getMenuInfo(),setTimeout(function(){t.menu_id=t.globalService.getMenuId(),t.rollback_url=t.globalService.getMenuUrl(),t.permissions=t.globalService.getPermissions()},this.globalService.getMenuPermissionDelayTime())},t.prototype.isPermission=function(t,e){var r=t+"_"+e;return""==e&&(r=t),this.cookieStore.in_array(r,this.permissions)},t.prototype.getCategoryList=function(t){var e=this,r=this.globalService.getDomain()+"/api/v1/getCategory?category_type="+this.category_type+"&page="+t+"&sid="+this.cookieStore.getCookie("sid");this.http.get(r).map(function(t){return t.json()}).subscribe(function(t){e.categoryList=t,202==e.categoryList.status&&(e.cookieStore.removeAll(e.rollback_url),e.router.navigate(["/auth/login"])),e.selects=[];for(var r=0,n=e.categoryList.result.categoryList.data;r<n.length;r++){var a=n[r];e.selects[a.category_id]=!1}e.check=!1})},t.prototype.changeCheckAll=function(t){var e=this,r=t.target.checked;this.selects.forEach(function(t,n,a){e.selects[n]=r}),this.check=r},t.prototype.handle=function(t){var e=t.target,r=e.value,n=e.checked;this.selects[r]=n;for(var a=0,o=0,s=this.selects;o<s.length;o++){0==s[o]&&(a+=1)}this.check=!(a>=1)},t.prototype.addCategory=function(){var t=this;return""==this.category_number.trim()?(alert("\u8bf7\u8f93\u5165\u89d2\u8272\u7f16\u53f7\uff01"),!1):""==this.category_desc.trim()?(alert("\u8bf7\u8f93\u5165\u89d2\u8272\u540d\u79f0\uff01"),!1):void this.http.post(this.globalService.getDomain()+"/api/v1/addCategory",{category_id:this.category_id,category_type:this.category_type,category_number:this.category_number,category_desc:this.category_desc,sid:this.cookieStore.getCookie("sid")}).subscribe(function(e){var r=JSON.parse(e._body);200==r.status?(t.category_id=0,t.category_desc="",t.category_number="",t.categoryList=r):202==r.status?(t.cookieStore.removeAll(t.rollback_url),t.router.navigate(["/auth/login"])):200!=r.status&&alert(r.msg)})},t.prototype.editCategory=function(){var t=this;if(0==this.editStatusCategoryId)return!1;this.http.get(this.globalService.getDomain()+"/api/v1/getCategoryById?category_id="+this.editStatusCategoryId+"&number=1").map(function(t){return t.json()}).subscribe(function(e){t.categoryInfo=e,t.category_id=t.categoryInfo.result.parent.category_id,t.category_desc=t.categoryInfo.result.parent.category_desc,t.category_number=t.categoryInfo.result.parent.category_number,console.log(t.categoryInfo)})},t.prototype.deleteCategory=function(t){var e=this;if(this.globalService.demoAlert("",""))return!1;var r="",n="";if("id"==t)n=this.editStatusCategoryId;else if("all"==t){var a=0;if(this.selects.forEach(function(t,e,r){1==t&&(n+=e+",",a+=1)}),a<1)return r="\u8bf7\u786e\u8ba4\u5df2\u9009\u4e2d\u9700\u8981\u5220\u9664\u7684\u4fe1\u606f\uff01",alert(r),!1}if(r="\u5220\u9664\u540e\u5c06\u4e0d\u53ef\u6062\u590d\uff0c\u60a8\u786e\u5b9a\u8981\u5220\u9664\u5417\uff1f",confirm(r)){var o=this.globalService.getDomain()+"/api/v1/deleteCategory?category_id="+n+"&type="+t+"&number=1&category_type="+this.category_type+"&sid="+this.cookieStore.getCookie("sid");this.http.delete(o).map(function(t){return t.json()}).subscribe(function(t){e.categoryList=t,202==e.categoryList.status&&(e.cookieStore.removeAll(e.rollback_url),e.router.navigate(["/auth/login"]))})}},t.prototype.isStatusShow=function(t,e){var r=this;this.super_admin_role_id!=t&&(this.editStatusCategoryId=t,this.isAll=0,this.width="0%",this.width_1="100%",this.selects.forEach(function(t,e,n){1==t&&(r.selects[e]=!1)}))},t.prototype.showAllCheck=function(){0==this.isAll&&(this.isAll=1,this.editStatusCategoryId=0,this.width="10%",this.width_1="90%")},t.prototype.resetCategory=function(){this.category_id=0,this.category_desc="",this.category_number=""},t=c([Object(n.Component)({selector:"app-setting-personnel",template:r("qdec")}),d("design:paramtypes",[s.b,o.c,l.a,i.a])],t)}(),u=[{path:"",component:g}],h=o.d.forChild(u),f=r("JOm+"),p=r("pvSQ");r.d(e,"SettingPersonnelModule",function(){return y});var b=this&&this.__decorate||function(t,e,r,n){var a,o=arguments.length,s=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,n);else for(var i=t.length-1;i>=0;i--)(a=t[i])&&(s=(o<3?a(s):o>3?a(e,r,s):a(e,r))||s);return o>3&&s&&Object.defineProperty(e,r,s),s},y=function(){function t(){}return t=b([Object(n.NgModule)({imports:[a.CommonModule,f.a,p.a,h],declarations:[g]})],t)}()},qdec:function(t,e){t.exports='<div id="content">\r\n  <sa-widget [editbutton]="false" [fullscreenbutton]="false" [custombutton]="false" [sortable]="false">\r\n    <header>\r\n      <ul class="nav nav-tabs pull-left in">\r\n        <li [class.active]="state.tabs.demo4==\'AA\'" class="active">\r\n          <a (click)="state.tabs.demo4 = \'AA\'">\u89d2\u8272</a>\r\n        </li>\r\n      </ul>\r\n    </header>\r\n    <div>\r\n      <div class="widget-body">\r\n        <tabset>\r\n          <tab [active]="state.tabs.demo4 == \'AA\'">\r\n            <tabset class="pd-10">\r\n              <tab [active]="state.tabs.demo4 == \'AA\'">\r\n                <div class="row">\r\n                  <article class="form-group col col-lg-6 col-md-6 col-sm-6 col-xs-12">\r\n                    <sa-widget class="jarviswidget well" [colorbutton]="false" [editbutton]="false" [togglebutton]="false"\r\n                               [deletebutton]="false" [fullscreenbutton]="false" [custombutton]="false" [sortable]="false">\r\n                      <div>\r\n                        <div class="widget-body no-padding">\r\n                          <alert type="info" class="no-margin" *ngIf="category_id == 0">\r\n                            <i class="fa-fw fa fa-plus"></i>\r\n                            \u6dfb\u52a0\u89d2\u8272\r\n                          </alert>\r\n                          <alert type="info" class="no-margin"  *ngIf="category_id != 0">\r\n                            <i class="glyphicon glyphicon-pencil"></i>\r\n                            \u4fee\u6539\u89d2\u8272\r\n                          </alert>\r\n                          <div  class="mt-10">\r\n                            <form   class="smart-form ">\r\n                              <fieldset>\r\n                                <section>\r\n                                  <label class="label txt-color-blue">\u89d2\u8272\u7f16\u53f7<span class="asterisk-color">*</span></label>\r\n                                  <label class="input">\r\n                                    <input type="text" placeholder="\u89d2\u8272\u7f16\u53f7" minlength="1" maxlength="20" name="category_number" [(ngModel)]="category_number">\r\n                                  </label>\r\n                                </section>\r\n                                <section>\r\n                                  <label class="label txt-color-blue">\u89d2\u8272<span class="asterisk-color">*</span></label>\r\n                                  <label class="input">\r\n                                    <input type="text" placeholder="\u8bf7\u8f93\u89d2\u8272" minlength="1" maxlength="20"  name="category_desc" [(ngModel)]="category_desc">\r\n                                  </label>\r\n                                </section>\r\n                              </fieldset>\r\n                              <footer *ngIf="isPermission(menu_id,\'add\') || isPermission(menu_id,\'edit\')">\r\n                                <button class="btn btn-success" type="button" (click)="addCategory()">\u4fdd\u5b58\u5e76\u65b0\u589e</button>\r\n                                <button type="button" class="btn btn-primary" (click)="addCategory()">\r\n                                  \u4fdd\u5b58\r\n                                </button>\r\n                              </footer>\r\n                            </form>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </sa-widget>\r\n                  </article>\r\n                  <article class="form-group col col-lg-6 col-md-6 col-sm-6 col-xs-12">\r\n                    <sa-widget class="jarviswidget well" [colorbutton]="false" [editbutton]="false" [togglebutton]="false"\r\n                               [deletebutton]="false" [fullscreenbutton]="false" [custombutton]="false" [sortable]="false">\r\n                      <div>\r\n                        <div class="widget-body no-padding">\r\n                          <alert type="info" class="no-margin" >\r\n                            <i class="fa-fw fa fa-table"></i>\r\n                            \u89d2\u8272\r\n                          </alert>\r\n                          <div  class="row mt-10">\r\n                            <article  class="col-sm-12">\r\n                              <div class="navbar navbar-default">\r\n                                <form  class="navbar-form navbar-left ng-pristine ng-valid ng-touched" novalidate="" role="search" >\r\n                                  <div class="form-group pdlr-4" *ngIf="isPermission(menu_id,\'edit\')">\r\n                                    <a [ngClass]="{\'btn default-btn btn-sm\':true,\'not-click\':editStatusCategoryId == 0}" (click)="editCategory()">\r\n                                      <span class="glyphicon glyphicon-pencil mr-5 color-yellow"></span>\u4fee\u6539</a>\r\n                                  </div>\r\n                                  <div class="form-group pdlr-4" *ngIf="isPermission(menu_id,\'delete\')">\r\n                                    <a [ngClass]="{\'btn default-btn btn-sm\':true,\'not-click\':editStatusCategoryId == 0}" (click)="deleteCategory(\'id\')">\r\n                                      <span class="fa-fw fa  fa-trash-o mr-5 color-red"></span>\u5220\u9664</a>\r\n                                  </div>\r\n                                  <div class="form-group btn-group pdlr-4" *ngIf="isPermission(menu_id,\'delete\')">\r\n                                    <a class="btn default-btn btn-sm dropdown-toggle" (click)="showAllCheck()" data-toggle="dropdown">\r\n                                      <span class="fa-fw fa fa-th-large mr-5 color-red"></span>\u6279\u5904\u7406<i class="fa fa-fw fa-chevron-down"></i></a>\r\n                                    <ul class="dropdown-menu" role="menu">\r\n                                      <li><a (click)="deleteCategory(\'all\')"><span class="fa-fw fa  fa-trash-o color-red mr-5"></span>\u6279\u91cf\u5220\u9664</a></li>\r\n                                    </ul>\r\n                                  </div>\r\n                                  </form>\r\n                              </div>\r\n                            </article>\r\n                          </div>\r\n\r\n                          <div style="padding:0;" class="height-overflow">\r\n                            <div *ngIf="isAll != 0" [ngStyle]="{\'padding\': \'0\',\'z-index\': \'2\',\'width\':width,\'float\':\'left\'}" class="table-responsive">\r\n                              <table class="table table-striped   smart-form table-height-20">\r\n                                <thead>\r\n                                <tr style="">\r\n                                  <td><label class="checkbox mt-8">\r\n                                    <input type="checkbox" name="checkbox-inline" [checked]="check" (change)="changeCheckAll($event)">\r\n                                    <i></i>\r\n                                  </label>\r\n                                  </td>\r\n                                </tr>\r\n                                </thead>\r\n                                <tbody>\r\n                                <tr style="" *ngFor="let c of categoryList?.result?.categoryList?.data">\r\n                                  <td><label class="checkbox mt-8">\r\n                                    <input type="checkbox" *ngIf="super_admin_role_id != c.category_id" name="checkbox-inline" value="{{ c.category_id }}" [checked]="selects[c.category_id]" (change)="handle($event)" >\r\n                                    <i></i>\r\n                                  </label>\r\n                                  </td>\r\n                                </tr>\r\n                                </tbody>\r\n                              </table>\r\n                            </div>\r\n                            <div [ngStyle]="{\'padding\': \'0\',\'z-index\': \'1\',\'width\':width_1,\'float\':\'left\'}" class="table-responsive">\r\n                              <table class="table table-striped   smart-form table-height-20">\r\n                                <thead>\r\n                                <tr >\r\n                                  <th>\u7c7b\u522b\u7f16\u53f7</th>\r\n                                  <th>\u7c7b\u522b\u540d\u79f0</th>\r\n                                </tr>\r\n                                </thead>\r\n                                <tbody>\r\n                                <tr *ngFor="let c of categoryList?.result?.categoryList?.data" (click)="isStatusShow(c.category_id)" [ngClass]="{\'table-color\':editStatusCategoryId == c.category_id}">\r\n                                  <td>{{c.category_number}}</td>\r\n                                  <td>{{c.category_desc}}</td>\x3c!--yellow-label--\x3e\r\n                                </tr>\r\n                                </tbody>\r\n                              </table>\r\n                            </div>\r\n                          </div>\r\n\r\n                          \x3c!-- \u5e95\u90e8-\uff08\u5206\u9875\u90e8\u5206\uff09--\x3e\r\n                          <div class="dt-toolbar">\r\n                            <div class="col-xs-12 col-sm-6">\r\n                              <div class="col-xs-12 col-sm-6">\r\n                                <span>\u5171{{categoryList?.result?.categoryList?.total}}\u6761</span>\r\n                              </div>\r\n                            </div>\r\n                            <div class="hidden-xs right">\r\n                              \x3c!--<ul class="pagination pagination-sm">\r\n                                <li *ngFor="let p of categoryList?.page" class="{{p.class}}">\r\n                                  <a (click)="pagination(p.value)" *ngIf="p.method==\'method\'">{{p.text}}</a>\r\n                                  <a *ngIf="p.method==\'\'">{{p.text}}</a>\r\n                                </li>\r\n                              </ul>--\x3e\r\n                            </div>\r\n                          </div>\r\n\r\n                        </div>\r\n                      </div>\r\n                    </sa-widget>\r\n                    \x3c!-- end widget --\x3e\r\n                  </article>\r\n                </div>\r\n              </tab>\r\n            </tabset>\r\n          </tab>\r\n        </tabset>\r\n      </div>\r\n    </div>\r\n  </sa-widget>\r\n</div>\r\n\r\n'}});