"use strict";(self.webpackChunksquadonlyadmin=self.webpackChunksquadonlyadmin||[]).push([[725],{725:(j,b,a)=>{a.r(b),a.d(b,{PodcastModule:()=>Y});var c=a(6814),h=a(627),_=a(5619),f=a(2832),C=a(9360),P=a(8251),O=a(3997),v=a(4664),t=a(9468),y=a(632),w=a(6257),x=a(4237);const T=function(n){return{dnone:n}};function A(n,r){if(1&n&&(t.TgZ(0,"div",10),t._UZ(1,"table",11),t.qZA()),2&n){const i=t.oxw();t.Q6J("ngClass",t.VKq(2,T,!i.showTable)),t.xp6(1),t.Q6J("dtOptions",i.dtOptions)}}function D(n,r){1&n&&t._UZ(0,"div",17)}function I(n,r){1&n&&t._UZ(0,"div",17)}const u=function(){return[]};function Z(n,r){1&n&&(t.TgZ(0,"div",18),t.YNc(1,I,1,0,"div",14),t.qZA()),2&n&&(t.xp6(1),t.Q6J("ngForOf",t.DdM(1,u).constructor(6)))}function F(n,r){1&n&&(t.ynx(0),t.TgZ(1,"section",12)(2,"div",13),t.YNc(3,D,1,0,"div",14),t.qZA(),t.TgZ(4,"div",15),t.YNc(5,Z,2,2,"div",16),t.qZA()(),t.BQk()),2&n&&(t.xp6(3),t.Q6J("ngForOf",t.DdM(2,u).constructor(6)),t.xp6(2),t.Q6J("ngForOf",t.DdM(3,u).constructor(5)))}let S=(()=>{class n{constructor(i,e,o,l){this.API=i,this.CF=e,this.renderer=o,this.pipeDateInstance=l,this.datatableElement=h.G,this.breadcrumbs=[{title:"Dashboard",link:"/dashboard"},{title:"Podcast",link:""}],this.columnDefs=[{title:"Title",data:"Title"},{title:"Source",data:"Source"},{title:"Published",data:"PublishedDatetime",ngPipeInstance:this.pipeDateInstance,ngPipeArgs:["mediumDate","MMM d, y"]},{title:"Created",data:"CreatedDatetime",ngPipeInstance:this.pipeDateInstance,ngPipeArgs:["mediumDate","MMM d, y"]},{title:"Updated",data:"UpdatedDatetime",ngPipeInstance:this.pipeDateInstance,ngPipeArgs:["mediumDate","MMM d, y"]},{title:"Action",render:(s,d,p)=>`<button type="button" class="btn btn-sm btn-success text-white" data-podcast="${p.PodcastId}">Details</button>`}],this.dtOptions={columns:this.columnDefs,pagingType:"simple_numbers",lengthMenu:[10,20,30,40,50],pageLength:10,autoWidth:!1,ordering:!1,searching:!0,serverSide:!0,processing:!0},this.showTable=!1,this.triggerTable=!1,this.searchText$=new _.X(""),this.listenerFn=()=>{}}ngOnInit(){this.dataTableAngular()}dataTableAngular(){let i=0;const e=this;this.dtOptions.ajax=(o,l)=>{const s=o.search.value;this.searchText$.next(s),e.apiSubcription&&e.apiSubcription.unsubscribe(),e.apiSubcription=e.searchText$.pipe(function M(n,r=f.z){return(0,C.e)((i,e)=>{let o=null,l=null,s=null;const d=()=>{if(o){o.unsubscribe(),o=null;const g=l;l=null,e.next(g)}};function p(){const g=s+n,m=r.now();if(m<g)return o=this.schedule(void 0,g-m),void e.add(o);d()}i.subscribe((0,P.x)(e,g=>{l=g,s=r.now(),o||(o=r.schedule(p,n),e.add(o))},()=>{d(),e.complete()},void 0,()=>{l=o=null}))})}(i),(0,O.x)(),(0,v.w)(()=>e.API.getAPI(`GetPodCasts?SearchValue=${s}&StartRowIndex=${o.start/o.length+1}&PageSize=${o.length}`))).subscribe(d=>{i=500,l({recordsTotal:d.TotalCount,recordsFiltered:d.TotalCount,data:d.Data}),this.showTable=!0},d=>{alert("Something went wrong")})}}ngAfterViewInit(){this.listenerFn=this.renderer.listen("document","click",i=>{i.target.hasAttribute("data-podcast")&&this.CF.GotoURLParam("/podcast",i.target.getAttribute("data-podcast"))})}ngOnDestroy(){this.apiSubcription&&this.apiSubcription.unsubscribe(),this.listenerFn()}static#t=this.\u0275fac=function(e){return new(e||n)(t.Y36(y.K),t.Y36(w.v),t.Y36(t.Qsj),t.Y36(c.uU))};static#n=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-podcast"]],viewQuery:function(e,o){if(1&e&&t.Gf(h.G,5),2&e){let l;t.iGM(l=t.CRH())&&(o.datatableElement=l.first)}},features:[t._Bn([c.uU])],decls:10,vars:3,consts:[["id","podcast"],[1,"container-fluid"],[1,"row"],[1,"col-sm-12"],[3,"breadcrumbs"],[1,"col-sm-12","py-3"],[1,"card"],[1,"card-body"],["class","responsiveTable w-100",3,"ngClass",4,"ngIf"],[4,"ngIf"],[1,"responsiveTable","w-100",3,"ngClass"],["datatable","",1,"table","table-bordered",3,"dtOptions"],[1,"table-loader"],[1,"table-loader__header","table-loader__row"],["class","line",4,"ngFor","ngForOf"],[1,"table-loader__body"],["class","table-loader__row",4,"ngFor","ngForOf"],[1,"line"],[1,"table-loader__row"]],template:function(e,o){1&e&&(t.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3),t._UZ(4,"breadcrumbs",4),t.qZA(),t.TgZ(5,"div",5)(6,"div",6)(7,"div",7),t.YNc(8,A,2,4,"div",8),t.YNc(9,F,6,4,"ng-container",9),t.qZA()()()()()()),2&e&&(t.xp6(4),t.Q6J("breadcrumbs",o.breadcrumbs),t.xp6(4),t.Q6J("ngIf",!o.triggerTable),t.xp6(1),t.Q6J("ngIf",!o.showTable))},dependencies:[c.mk,c.sg,c.O5,x.n,h.G],styles:["html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{height:100vh}body[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center}.table-loader[_ngcontent-%COMP%]{width:100%;display:grid;grid-template-rows:50px 1fr;border-radius:3px;box-shadow:0 2px 4px #37435233;position:relative}.table-loader--no-animate[_ngcontent-%COMP%]   .table-loader__row[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]{animation:none!important}.table-loader__header[_ngcontent-%COMP%]{background-color:#e5a600}.table-loader__header.table-loader__row[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%], .table-loader__header.table-loader__row[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]:first-child{background-color:#fff;position:relative;overflow:hidden;will-change:auto;pointer-events:none;opacity:.1;animation:_ngcontent-%COMP%_shimmer 1.8s cubic-bezier(.45,.07,.49,.93) infinite}.table-loader__header.table-loader__row[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]:nth-child(2), .table-loader__header.table-loader__row[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]:first-child:nth-child(2){animation-delay:.2s}.table-loader__header.table-loader__row[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]:nth-child(3), .table-loader__header.table-loader__row[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]:first-child:nth-child(3){animation-delay:.3s}.table-loader__header.table-loader__row[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]:nth-child(4), .table-loader__header.table-loader__row[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]:first-child:nth-child(4){animation-delay:.4s}.table-loader__row[_ngcontent-%COMP%]{height:48px;display:grid;grid-template-columns:repeat(6,1fr);grid-gap:32px;align-items:center;padding:0 24px}.table-loader__row[_ngcontent-%COMP%]:nth-child(2n){background-color:#f8f9fb}.table-loader__row[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]{width:120px;height:12px;border-radius:6px;background-color:#374352;position:relative;overflow:hidden;will-change:auto;pointer-events:none;opacity:.1;animation:_ngcontent-%COMP%_shimmer 1.8s cubic-bezier(.45,.07,.49,.93) infinite}.table-loader__row[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]:nth-child(2){animation-delay:.2s}.table-loader__row[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]:nth-child(3){animation-delay:.3s}.table-loader__row[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]:nth-child(4){animation-delay:.4s}.table-loader__row[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]:first-child{background-color:#00bbe1;position:relative;overflow:hidden;will-change:auto;pointer-events:none;opacity:.1;animation:_ngcontent-%COMP%_shimmer 1.8s cubic-bezier(.45,.07,.49,.93) infinite}.table-loader__row[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]:first-child:nth-child(2){animation-delay:.2s}.table-loader__row[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]:first-child:nth-child(3){animation-delay:.3s}.table-loader__row[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]:first-child:nth-child(4){animation-delay:.4s}.table-loader__no-results[_ngcontent-%COMP%]{position:absolute;width:100%;inset:0;display:flex;align-items:center;justify-content:center}.table-loader__no-results-panel[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;max-width:328px;height:280px;background-color:#fff;box-shadow:0 2px 6px #3743520d;border:1px solid rgba(55,67,82,.1)}@keyframes _ngcontent-%COMP%_shimmer{0%{opacity:.1}50%{opacity:.15}to{opacity:.1}}"]})}return n})();var Q=a(2414),J=a(8653);const U=[{path:"",component:S}];let Y=(()=>{class n{static#t=this.\u0275fac=function(e){return new(e||n)};static#n=this.\u0275mod=t.oAB({type:n});static#e=this.\u0275inj=t.cJS({imports:[c.ez,Q.Bz.forChild(U),J.J,h.T]})}return n})()}}]);