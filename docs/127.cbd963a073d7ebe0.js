"use strict";(self.webpackChunksquadonlyadmin=self.webpackChunksquadonlyadmin||[]).push([[127],{3127:(b,h,r)=>{r.r(h),r.d(h,{PodcastdetailsModule:()=>x});var s=r(6814),m=r(1374),t=r(9468),f=r(2414),_=r(6257),O=r(4237);let M=(()=>{class o{static#t=this.\u0275fac=function(u){return new(u||o)};static#e=this.\u0275cmp=t.Xpm({type:o,selectors:[["app-audioplayer"]],inputs:{PodcastURL:"PodcastURL"},decls:4,vars:1,consts:[[1,"audioplayer"],["controls","","controlsList","nodownload","autoplay","","id","player"],["type","audio/mp3",3,"src"]],template:function(u,g){1&u&&(t.TgZ(0,"div",0)(1,"audio",1),t._UZ(2,"source",2),t._uU(3," Your browser does not support the audio tag. "),t.qZA()()),2&u&&(t.xp6(2),t.Q6J("src",g.PodcastURL,t.LSH))},styles:[".audioplayer[_ngcontent-%COMP%]{position:fixed;bottom:50px;left:50%;transform:translate(-50%);z-index:99}.audioplayer[_ngcontent-%COMP%]   #player[_ngcontent-%COMP%]{opacity:1}"]})}return o})();function C(o,v){1&o&&t._UZ(0,"img",26)}function y(o,v){1&o&&t._UZ(0,"img",27)}function a(o,v){if(1&o&&t._UZ(0,"app-audioplayer",28),2&o){const l=t.oxw();t.Q6J("PodcastURL",l.selectedPodcastURL)}}let d=(()=>{class o{constructor(l,u){this.ActivateRoute=l,this.CF=u,this.breadcrumbs=[{title:"Dashboard",link:"/dashboard"},{title:"Podcast",link:"/podcast"}],this.podCast=null}ngOnInit(){this.ActivateRoute.data.pipe((0,m.P)()).subscribe(l=>{if(!l.service.podcasts.status)return this.CF.GotoURL("/podcast");this.podCast=l.service.podcasts.data.Data,this.breadcrumbs.push({title:this.podCast.Title,link:""})})}playPodCast(l){l.playing=!l?.playing,this.selectedPodcastURL=void 0,this.cleartimer&&clearTimeout(this.cleartimer),l.playing&&(this.cleartimer=setTimeout(()=>this.selectedPodcastURL=l.PodcastURL,100))}static#t=this.\u0275fac=function(u){return new(u||o)(t.Y36(f.gz),t.Y36(_.v))};static#e=this.\u0275cmp=t.Xpm({type:o,selectors:[["app-podcastdetails"]],decls:35,vars:11,consts:[["id","podcastdetails"],[1,"container-fluid"],[1,"row"],[1,"col-sm-12"],[3,"breadcrumbs"],[1,"col-md-11"],[1,"card","border-0"],[1,"row","py-4"],[1,"col-md-4"],[1,"images","text-center","p-3"],[1,"img-fluid","main_image",3,"src"],[1,"col-md-8"],[1,"product","p-3"],[1,"d-flex","justify-content-between","align-items-center"],[1,"d-flex","align-items-center"],["routerLink","/podcast",1,"ml-1","cursor"],[1,"mt-4","mb-3"],[1,"text-uppercase","text-muted","brand"],[1,"text-uppercase"],[1,"price","d-flex","flex-row","align-items-center"],[1,"ml-2","text-muted"],[1,"about",3,"innerHTML"],["title","Play/Pause Postcast",1,"play_btn","text-end",3,"click"],["src","./../../../assets/images/svg/play-button.svg","alt","play",4,"ngIf","ngIfElse"],["pause",""],[3,"PodcastURL",4,"ngIf"],["src","./../../../assets/images/svg/play-button.svg","alt","play"],["src","./../../../assets/images/svg/pause-button.svg","alt","pause"],[3,"PodcastURL"]],template:function(u,g){if(1&u&&(t.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3),t._UZ(4,"breadcrumbs",4),t.qZA(),t.TgZ(5,"div",5)(6,"div",6)(7,"div",7)(8,"div",8)(9,"div",9),t._UZ(10,"img",10),t.qZA()(),t.TgZ(11,"div",11)(12,"div",12)(13,"div",13)(14,"div",14)(15,"span",15),t._uU(16,"Back"),t.qZA()()(),t.TgZ(17,"div",16)(18,"span",17),t._uU(19),t.qZA(),t.TgZ(20,"h5",18),t._uU(21),t.qZA(),t.TgZ(22,"div",19)(23,"div",20)(24,"small"),t._uU(25,"Date: "),t.qZA(),t.TgZ(26,"span"),t._uU(27),t.ALo(28,"date"),t.qZA()()()(),t._UZ(29,"p",21),t.TgZ(30,"div",22),t.NdJ("click",function(){return g.playPodCast(g.podCast)}),t.YNc(31,C,1,0,"img",23),t.YNc(32,y,1,0,"ng-template",null,24,t.W1O),t.qZA()()()()()()()()(),t.YNc(34,a,1,1,"app-audioplayer",25)),2&u){const U=t.MAs(33);t.xp6(4),t.Q6J("breadcrumbs",g.breadcrumbs),t.xp6(6),t.Q6J("src",g.podCast.ThumbnailImageName,t.LSH),t.xp6(9),t.Oqu(g.podCast.Source),t.xp6(2),t.Oqu(g.podCast.Title),t.xp6(6),t.Oqu(t.lcZ(28,9,g.podCast.UpdatedDatetime)),t.xp6(2),t.Q6J("innerHTML",g.podCast.Description,t.oJD),t.xp6(2),t.Q6J("ngIf",!g.podCast.playing)("ngIfElse",U),t.xp6(3),t.Q6J("ngIf",g.selectedPodcastURL)}},dependencies:[s.O5,f.rH,O.n,M,s.uU],styles:["#podcastdetails[_ngcontent-%COMP%]   .images[_ngcontent-%COMP%]{background-color:var(--bs-body-bg);border:var(--bs-border-width) dotted var(--bs-border-color)}#podcastdetails[_ngcontent-%COMP%]   .images[_ngcontent-%COMP%]   .main_image[_ngcontent-%COMP%]{width:400px}#podcastdetails[_ngcontent-%COMP%]   .product[_ngcontent-%COMP%]{background-color:#eee}#podcastdetails[_ngcontent-%COMP%]   .brand[_ngcontent-%COMP%]{font-size:13px}#podcastdetails[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%]{font-size:14px}#podcastdetails[_ngcontent-%COMP%]   .play_btn[_ngcontent-%COMP%]{cursor:pointer}#podcastdetails[_ngcontent-%COMP%]   .play_btn[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:75px;height:75px}"]})}return o})();var e=r(9315),i=r(7398),p=r(632);let P=(()=>{class o{constructor(l){this.API=l}resolve(l){return(0,e.D)([this.API.getApis(`GetPodCastById?PodcastId=${l.params.id}`,!1)]).pipe((0,i.U)(g=>({podcasts:g[0]})))}static#t=this.\u0275fac=function(u){return new(u||o)(t.LFG(p.K))};static#e=this.\u0275prov=t.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"})}return o})();var n=r(8653);let c=(()=>{class o{static#t=this.\u0275fac=function(u){return new(u||o)};static#e=this.\u0275mod=t.oAB({type:o});static#n=this.\u0275inj=t.cJS({imports:[s.ez,f.Bz]})}return o})();const T=[{path:"",component:d,resolve:{service:P}}];let x=(()=>{class o{static#t=this.\u0275fac=function(u){return new(u||o)};static#e=this.\u0275mod=t.oAB({type:o});static#n=this.\u0275inj=t.cJS({imports:[s.ez,f.Bz.forChild(T),n.J,c]})}return o})()},632:(b,h,r)=>{r.d(h,{K:()=>M});var s=r(5861),m=r(9862),t=r(7398),f=r(1631),_=r(9468),O=r(6257);let M=(()=>{class C{constructor(a,d){this.Http=a,this.CF=d,this.prodUrl="https://squad-api-dev.azurewebsites.net/api",this.WebApi=this.prodUrl}Login(a,d){var e=this;return(0,s.Z)(function*(){try{return new Promise(i=>{const P="grant_type=password&username="+a+"&password="+d+"&role=2",n=(new m.WM).set("Content-Type","application/x-www-form-urlencoded;");return e.Http.post("https://squad-auth-dev.azurewebsites.net/connect/token",P,{headers:n,responseType:"json"}).pipe((0,t.U)(c=>(e.CF.SetLS$(e.CF.Token,JSON.stringify(e.CF.Encrypt(c,e.CF.Token))),c)),(0,f.z)(()=>e.Http.get(`${e.prodUrl}/GetUserDetailsByToken`)),(0,t.U)(c=>c&&200===c.Code?{status:!0,data:c.Data}:{status:!1,error:c.Message?c.Message:"Something went wrong"})).subscribe(c=>i(c),c=>i({status:!1,error:"Something went wrong"}))})}catch(i){console.log(i)}})()}getApis(a,d=!0){var e=this;return(0,s.Z)(function*(){try{return new Promise(function(){var i=(0,s.Z)(function*(p){return e.Http.get(`${e.WebApi}/${a}`,{params:(new m.LE).set("cache",d),responseType:"json"}).pipe((0,t.U)(n=>n&&200===n.Code?{status:!0,data:n}:{status:!1,error:n.Message?n.Message:"Something went wrong"})).subscribe({next:n=>p(n),error:n=>{if(401===n.status)return e.CF.GotoURL("/"),e.CF.SetLS$(e.CF.Token,JSON.stringify(null)),e.CF.SetLS$(e.CF.TokenUser,JSON.stringify(null)),void e.CF.SwalError("Session Expired","Error!");console.log(n?.error);const c=n?.error?.Message?n?.error.Message:"Something went wrong";return e.CF.SwalError(c,"Oops!"),p({status:!1,error:c})}})});return function(p){return i.apply(this,arguments)}}())}catch(i){console.log(i)}})()}postApis(a,d){var e=this;return(0,s.Z)(function*(){try{return new Promise(function(){var i=(0,s.Z)(function*(p){return e.Http.post(`${e.WebApi}/${a}`,d).pipe((0,t.U)(n=>n&&200===n.Code?{status:!0,data:n}:{status:!1,error:n.Message?n.Message:"Something went wrong"})).subscribe({next:n=>p(n),error:n=>{if(401===n.status)return e.CF.GotoURL("/"),e.CF.SetLS$(e.CF.Token,JSON.stringify(null)),e.CF.SetLS$(e.CF.TokenUser,JSON.stringify(null)),void e.CF.SwalError("Session Expired","Error!");console.log(n?.error);const c=n?.error?.Message?n?.error.Message:"Something went wrong";return e.CF.SwalError(c,"Oops!"),p({status:!1,error:c})}})});return function(p){return i.apply(this,arguments)}}())}catch(i){console.log(i)}})()}putApis(a,d){var e=this;return(0,s.Z)(function*(){try{return new Promise(function(){var i=(0,s.Z)(function*(p){return e.Http.put(`${e.WebApi}/${a}`,d).pipe((0,t.U)(n=>n&&200===n.Code?{status:!0,data:n}:{status:!1,error:n.Message?n.Message:"Something went wrong"})).subscribe({next:n=>p(n),error:n=>{if(401===n.status)return e.CF.GotoURL("/"),e.CF.SetLS$(e.CF.Token,JSON.stringify(null)),e.CF.SetLS$(e.CF.TokenUser,JSON.stringify(null)),void e.CF.SwalError("Session Expired","Error!");console.log(n?.error);const c=n?.error?.Message?n?.error.Message:"Something went wrong";return e.CF.SwalError(c,"Oops!"),p({status:!1,error:c})}})});return function(p){return i.apply(this,arguments)}}())}catch(i){console.log(i)}})()}getAPI(a){return this.Http.get(`${this.WebApi}/${a}`,{responseType:"json"})}static#t=this.\u0275fac=function(d){return new(d||C)(_.LFG(m.eN),_.LFG(O.v))};static#e=this.\u0275prov=_.Yz7({token:C,factory:C.\u0275fac,providedIn:"root"})}return C})()},4237:(b,h,r)=>{r.d(h,{n:()=>y});var s=r(9468),m=r(6814),t=r(2414);function f(a,d){if(1&a&&(s.TgZ(0,"span",5),s._uU(1),s.ALo(2,"lowercase"),s.qZA()),2&a){const e=s.oxw().$implicit;s.xp6(1),s.hij("",s.lcZ(2,1,e.title)," ")}}const _=function(a){return[a]},O=function(){return[]},M=function(a){return{active:a}};function C(a,d){if(1&a&&(s.TgZ(0,"li",2),s.ynx(1,3),s.YNc(2,f,3,3,"span",4),s.BQk(),s.qZA()),2&a){const e=d.$implicit;s.Q6J("routerLink",e.link.length>0?s.VKq(3,_,e.link):s.DdM(5,O))("ngClass",s.VKq(6,M,0===e.link.length)),s.xp6(1),s.Q6J("ngSwitch",e.title)}}let y=(()=>{class a{constructor(){this.breadcrumbs=[]}static#t=this.\u0275fac=function(i){return new(i||a)};static#e=this.\u0275cmp=s.Xpm({type:a,selectors:[["breadcrumbs"]],inputs:{breadcrumbs:"breadcrumbs"},decls:3,vars:1,consts:[["id","breadcrumbs",1,"col-sm-12"],[3,"routerLink","ngClass",4,"ngFor","ngForOf"],[3,"routerLink","ngClass"],[3,"ngSwitch"],["class","text-capitalize",4,"ngSwitchDefault"],[1,"text-capitalize"]],template:function(i,p){1&i&&(s.TgZ(0,"div",0)(1,"ul"),s.YNc(2,C,3,8,"li",1),s.qZA()()),2&i&&(s.xp6(2),s.Q6J("ngForOf",p.breadcrumbs))},dependencies:[m.mk,m.sg,m.RF,m.ED,t.rH,m.i8],styles:['@charset "UTF-8";#breadcrumbs[_ngcontent-%COMP%]{border-bottom:2px solid #000;padding:10px 0}#breadcrumbs[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{padding:0;margin:0;display:flex}#breadcrumbs[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style:none;position:relative;opacity:.5;transition:.15s linear}#breadcrumbs[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover{opacity:1}#breadcrumbs[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:inline-block;font-size:16px;font-weight:400;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:250px}@media screen and (max-width: 600px){#breadcrumbs[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:12px}}#breadcrumbs[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:after{content:"\\2b9e";display:inline-block;margin:0 10px 0 5px}#breadcrumbs[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-last-child(1)   span[_ngcontent-%COMP%]:after{opacity:0;visibility:hidden}#breadcrumbs[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li.active[_ngcontent-%COMP%]{opacity:1}#breadcrumbs[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li.active[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-weight:600;cursor:default}']})}return a})()},8653:(b,h,r)=>{r.d(h,{J:()=>f});var s=r(6814),m=r(2414),t=r(9468);let f=(()=>{class _{static#t=this.\u0275fac=function(C){return new(C||_)};static#e=this.\u0275mod=t.oAB({type:_});static#n=this.\u0275inj=t.cJS({imports:[s.ez,m.Bz]})}return _})()}}]);