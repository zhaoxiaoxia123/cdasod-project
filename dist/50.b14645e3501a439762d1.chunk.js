webpackJsonp([50],{JQPf:function(n,r){n.exports='<div id="content">\r\n\r\n  <sa-widget [editbutton]="false" [fullscreenbutton]="false" [custombutton]="false" [sortable]="false">\r\n    <header>\r\n      <ul class="nav nav-tabs pull-left in">\r\n        <li [class.active]="state.tabs.demo3==\'hr1\'" class="active">\r\n          <a (click)="state.tabs.demo3 = \'hr1\'">\u5355\u4f4d\u6362\u7b97</a>\r\n        </li>\r\n      </ul>\r\n    </header>\r\n    <div>\r\n      <div class="widget-body">\r\n        <tabset>\r\n          <tab [active]="state.tabs.demo3 == \'hr1\'">\r\n            <tabset class="pd-10">\r\n              <tab [active]="state.tabs.demo3 == \'hr1\'">\r\n                <div class="row">\r\n                  <article class="form-group col col-lg-6 col-md-6 col-sm-6 col-xs-12">\r\n                    <sa-widget class="jarviswidget well" [colorbutton]="false" [editbutton]="false" [togglebutton]="false"\r\n                               [deletebutton]="false" [fullscreenbutton]="false" [custombutton]="false" [sortable]="false">\r\n                      <div>\r\n                        <div class="widget-body no-padding">\r\n                          <alert type="info" class="no-margin"  >\r\n                            <i class="fa-fw fa fa-plus"></i>\r\n                            \u6dfb\u52a0\u5355\u4f4d\u6362\u7b97\r\n                          </alert>\r\n                          \x3c!--<alert type="info" class="no-margin">\r\n                            <i class="glyphicon glyphicon-pencil"></i>\r\n                            \u4fee\u6539\u5355\u4f4d\u6362\u7b97\r\n                          </alert>--\x3e\r\n                          <div  class="mt-10">\r\n                            <form   class="smart-form ">\r\n                              <fieldset>\r\n                                <div class="form-group col col-lg-6 col-md-6 col-sm-6 col-xs-12">\r\n                                  <section>\r\n                                    <label class="label txt-color-blue">\u4e3b\u8ba1\u91cf\u5355\u4f4d<span class="asterisk-color">*</span></label>\r\n                                    <label class="input">\r\n                                      <input type="text"  placeholder=""  >\r\n                                    </label>\r\n                                  </section>\r\n                                </div>\r\n                                <div class="form-group col col-lg-6 col-md-6 col-sm-6 col-xs-12">\r\n                                  <section>\r\n                                    <label class="label txt-color-blue">\u8f85\u8ba1\u91cf\u5355\u4f4d<span class="asterisk-color">*</span></label>\r\n                                    <label class="input">\r\n                                      <input type="text" placeholder="" >\r\n                                    </label>\r\n                                  </section>\r\n                                </div>\r\n                                <div class="form-group col col-lg-6 col-md-6 col-sm-6 col-xs-12">\r\n                                  <section>\r\n                                    <label class="label txt-color-blue">\u6362\u7b97\u7ec4\u540d\u79f0<span class="asterisk-color">*</span></label>\r\n                                    <label class="input">\r\n                                      <input type="text" placeholder="" >\r\n                                    </label>\r\n                                  </section>\r\n                                </div>\r\n                                <div class="form-group col col-lg-6 col-md-6 col-sm-6 col-xs-12">\r\n                                  <section>\r\n                                    <label class="label txt-color-blue">\u6362\u7b97\u7387<span class="asterisk-color">*</span></label>\r\n                                    <label class="input">\r\n                                      <input type="text" placeholder="" >\r\n                                    </label>\r\n                                  </section>\r\n                                </div>\r\n\r\n                              </fieldset>\r\n                              <footer>\r\n                                <button  type="submit" class="btn btn-primary">\r\n                                  \u4fdd\u5b58\r\n                                </button>\r\n                              </footer>\r\n                            </form>\r\n                          </div>\r\n\r\n                        </div>\r\n                      </div>\r\n                    </sa-widget>\r\n                  </article>\r\n                  <article class="form-group col col-lg-6 col-md-6 col-sm-6 col-xs-12">\r\n                    <sa-widget class="jarviswidget well" [colorbutton]="false" [editbutton]="false" [togglebutton]="false"\r\n                               [deletebutton]="false" [fullscreenbutton]="false" [custombutton]="false" [sortable]="false">\r\n                      <div>\r\n                        <div class="widget-body no-padding">\r\n                          <alert type="info" class="no-margin" >\r\n                            <i class="fa-fw fa fa-table"></i>\r\n                            \u5355\u4f4d\u6362\u7b97\r\n                          </alert>\r\n\r\n                          <div  class="row mt-10 ">\r\n                            <article  class="col-sm-12">\r\n                              <div class="navbar navbar-default">\r\n                                  <form  class="navbar-form navbar-left ng-pristine ng-valid ng-touched" novalidate="" role="search" >\r\n\r\n                                    <div class="form-group pdlr-4">\r\n                                      <a class="btn default-btn btn-sm" >\r\n                                        <span class="glyphicon glyphicon-pencil mr-5 color-yellow"></span>\u4fee\u6539</a>\r\n                                    </div>\r\n                                    <div class="form-group pdlr-4">\r\n                                      <a class="btn default-btn btn-sm" >\r\n                                        <span class="fa-fw fa  fa-trash-o mr-5 color-red"></span>\u5220\u9664</a>\r\n                                    </div>\r\n                                    <div class="form-group btn-group pdlr-4">\r\n                                      <a class="btn default-btn btn-sm dropdown-toggle"  data-toggle="dropdown">\r\n                                        <span class="fa-fw fa fa-th-large mr-5 color-red"></span>\u6279\u5904\u7406<i class="fa fa-fw fa-chevron-down"></i></a>\r\n\r\n                                      <ul class="dropdown-menu" role="menu">\r\n                                        <li><a ><span class="fa-fw fa  fa-trash-o color-red mr-5"></span>\u6279\u91cf\u5220\u9664</a></li>\r\n                                      </ul>\r\n                                    </div>\r\n\r\n                                  </form>\r\n\r\n                              </div>\r\n                            </article>\r\n                          </div>\r\n\r\n                          <div style="padding:0;" class="height-overflow">\r\n                            <div style="padding: 0;z-index: 2;" class="table-responsive">\r\n                              <table class="table table-striped smart-form">\r\n                                <thead>\r\n                                <tr >\r\n                                  <td><label class="checkbox">\r\n                                    <input type="checkbox" name="checkbox-inline" >\r\n                                    <i></i>\r\n                                  </label>\r\n                                  </td>\r\n                                  <th>\u6362\u7b97\u7ec4\u540d\u79f0</th>\r\n                                  <th>\u4e3b\u8ba1\u91cf\u5355\u4f4d</th>\r\n                                  <th>\u8f85\u8ba1\u91cf\u5355\u4f4d</th>\r\n                                  <th>\u6362\u7b97\u7387</th>\r\n                                </tr>\r\n                                </thead>\r\n                                <tbody>\r\n                                <tr class="">\r\n                                  <td>\r\n                                    <label class="checkbox">\r\n                                      <input type="checkbox" >\r\n                                      <i></i>\r\n                                    </label>\r\n                                  </td>\r\n                                  <td>001</td>\r\n                                  <td>1242</td>\r\n                                  <td>421</td>\r\n                                  <td>21425</td>\r\n                                </tr>\r\n                                <tr class="">\r\n                                  <td>\r\n                                    <label class="checkbox">\r\n                                      <input type="checkbox" >\r\n                                      <i></i>\r\n                                    </label>\r\n                                  </td>\r\n                                  <td>001</td>\r\n                                  <td>1242</td>\r\n                                  <td>421</td>\r\n                                  <td>21425</td>\r\n\r\n                                </tr>\r\n                                <tr class="table-color">\r\n                                  <td>\r\n                                    <label class="checkbox">\r\n                                      <input type="checkbox" >\r\n                                      <i></i>\r\n                                    </label>\r\n                                  </td>\r\n                                  <td>001</td>\r\n                                  <td>1242</td>\r\n                                  <td>421</td>\r\n                                  <td>21425</td>\r\n                                </tr>\r\n\r\n\r\n                                </tbody>\r\n                              </table>\r\n\r\n                            </div>\r\n                          </div>\r\n\r\n\r\n                          \x3c!-- \u5e95\u90e8-\uff08\u5206\u9875\u90e8\u5206\uff09--\x3e\r\n                          <div class="dt-toolbar">\r\n                            <div class="col-xs-12 col-sm-6">\r\n                              <span>\u51713\u6761</span>\r\n                            </div>\r\n                            <div class="hidden-xs right">\r\n                              <ul class="pagination pagination-sm">\r\n                                <li *ngFor="let p of categoryList?.page" class="{{p.class}}">\r\n                                  <a (click)="pagination(p.value)" *ngIf="p.method==\'method\'">{{p.text}}</a>\r\n                                  <a *ngIf="p.method==\'\'">{{p.text}}</a>\r\n                                </li>\r\n                              </ul>\r\n                            </div>\r\n                          </div>\r\n\r\n                        </div>\r\n                      </div>\r\n                    </sa-widget>\r\n                    \x3c!-- end widget --\x3e\r\n                  </article>\r\n                </div>\r\n              </tab>\r\n            </tabset>\r\n          </tab>\r\n\r\n        </tabset>\r\n      </div>\r\n    </div>\r\n  </sa-widget>\r\n\r\n\r\n\r\n\r\n\r\n</div>\r\n\r\n\r\n'},Wlca:function(n,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var e=t("WT6e"),l=t("Xjw4"),a=t("bfOx"),s=this&&this.__decorate||function(n,r,t,e){var l,a=arguments.length,s=a<3?r:null===e?e=Object.getOwnPropertyDescriptor(r,t):e;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(n,r,t,e);else for(var o=n.length-1;o>=0;o--)(l=n[o])&&(s=(a<3?l(s):a>3?l(r,t,s):l(r,t))||s);return a>3&&s&&Object.defineProperty(r,t,s),s},o=this&&this.__metadata||function(n,r){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,r)},c=function(){function n(){this.state={tabs:{demo1:0,demo2:"tab-r1",demo3:"hr1",demo4:"AA",demo5:"iss1",demo6:"l1",demo7:"tab1",demo8:"hb1",demo9:"A1",demo10:"is1"}}}return n.prototype.ngOnInit=function(){},n=s([Object(e.Component)({selector:"app-setting-conversion",template:t("JQPf")}),o("design:paramtypes",[])],n)}(),i=[{path:"",component:c}],d=a.d.forChild(i),b=t("JOm+"),f=t("pvSQ");t.d(r,"SettingConversionModule",function(){return u});var p=this&&this.__decorate||function(n,r,t,e){var l,a=arguments.length,s=a<3?r:null===e?e=Object.getOwnPropertyDescriptor(r,t):e;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(n,r,t,e);else for(var o=n.length-1;o>=0;o--)(l=n[o])&&(s=(a<3?l(s):a>3?l(r,t,s):l(r,t))||s);return a>3&&s&&Object.defineProperty(r,t,s),s},u=function(){function n(){}return n=p([Object(e.NgModule)({imports:[l.CommonModule,b.a,f.a,d],declarations:[c]})],n)}()}});