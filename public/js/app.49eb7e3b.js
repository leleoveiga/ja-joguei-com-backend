(function(t){function e(e){for(var n,s,o=e[0],c=e[1],l=e[2],d=0,p=[];d<o.length;d++)s=o[d],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&p.push(r[s][0]),r[s]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);u&&u(e);while(p.length)p.shift()();return i.push.apply(i,l||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],n=!0,o=1;o<a.length;o++){var c=a[o];0!==r[c]&&(n=!1)}n&&(i.splice(e--,1),t=s(s.s=a[0]))}return t}var n={},r={app:0},i=[];function s(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=n,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(a,n,function(e){return t[e]}.bind(null,n));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"45c4":function(t,e,a){"use strict";a("6d35")},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-app-bar",{attrs:{absolute:"",dense:"",app:"",color:"secondary",dark:""}},[n("div",{staticClass:"d-flex align-center"},[n("v-img",{staticClass:"mr-2",attrs:{src:a("a73c"),width:"50"}}),n("span",{staticClass:"font-weight-bold",style:{fontSize:this.fontSize}},[t._v("Já Joguei Com...")])],1),n("v-spacer"),n("v-btn",{attrs:{rel:"noreferrer",href:"https://github.com/leleoveiga/ja-joguei-com-frontend",target:"_blank",text:""}},[n("v-icon",{staticClass:"mr-1"},[t._v("mdi-github")]),n("span",{staticClass:"mr-2"},[t._v(" Github ")]),n("v-icon",{attrs:{small:""}},[t._v("mdi-open-in-new")])],1)],1),n("v-main",[n("div",{staticClass:"image-background"},[n("router-view")],1)])],1)},i=[],s=(a("b0c0"),{name:"App",components:{},data:function(){return{}},computed:{fontSize:function(){return"xs"===this.$vuetify.breakpoint.name?"20px":"26px"}}}),o=s,c=(a("45c4"),a("2877")),l=a("6544"),u=a.n(l),d=a("7496"),p=a("40dc"),m=a("8336"),v=a("132d"),f=a("adda"),h=a("f6c4"),g=a("2fa4"),x=Object(c["a"])(o,r,i,!1,null,"74219a3a",null),b=x.exports;u()(x,{VApp:d["a"],VAppBar:p["a"],VBtn:m["a"],VIcon:v["a"],VImg:f["a"],VMain:h["a"],VSpacer:g["a"]});var y=a("8c4f"),_=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{fluid:""}},[a("div",{staticClass:"d-flex flex-column mt-16 align-center"},[a("span",{staticClass:"headline font-weight-bold"},[t._v("Saiba se você já jogou com alguém!")]),a("v-subheader",[a("span",{staticStyle:{"text-align":"center"}},[t._v(" nas últimas 50 partidas ")])])],1),a("v-text-field",{staticClass:"mx-auto",staticStyle:{"max-width":"300px","margin-top":"80px"},attrs:{"background-color":"",placeholder:"Seu nick",autocomplete:"nick","solo-inverted":"",rows:"1"},scopedSlots:t._u([{key:"label",fn:function(){return[t._v(" digite seu nick "),a("v-icon",{staticStyle:{"vertical-align":"middle"},attrs:{small:""}},[t._v(" mdi-magnify ")])]},proxy:!0}]),model:{value:t.inputNick1,callback:function(e){t.inputNick1=e},expression:"inputNick1"}}),a("v-text-field",{staticClass:"mx-auto",staticStyle:{"max-width":"300px","margin-top":"0px"},attrs:{"background-color":"",placeholder:"Nick do outro invocador",autocomplete:"nick","solo-inverted":"",rows:"1"},scopedSlots:t._u([{key:"label",fn:function(){return[t._v(" digite o nick do outro invocador "),a("v-icon",{staticStyle:{"vertical-align":"middle"},attrs:{small:""}},[t._v(" mdi-magnify ")])]},proxy:!0}]),model:{value:t.inputNick2,callback:function(e){t.inputNick2=e},expression:"inputNick2"}}),a("v-btn",{staticClass:"mx-auto mb-12",staticStyle:{width:"120px",display:"block"},attrs:{color:"secondary",loading:t.loading},on:{click:function(e){return t.getMatches()}}},[t._v(" procurar ")]),a("div",{staticClass:"mx-auto",staticStyle:{"max-width":"370px"}},[a("v-alert",{attrs:{value:t.alert,dark:"",transition:"scroll-x-transition",type:t.alertType}},[t._v(" "+t._s(t.errorMsg)+" ")])],1),a("MatchCard",{attrs:{matches:t.matches}}),a("v-spacer")],1)},k=[],w=(a("99af"),a("96cf"),a("1da1")),C=a("bc3a"),S=a.n(C),j=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-row",{staticClass:"d-flex justify-center"},t._l(t.matches,(function(e,n){return a("v-col",{key:e.gameId,staticClass:"d-flex justify-center",staticStyle:{"max-width":"350px"}},[a("v-card",{staticClass:"mb-5 pa-4",staticStyle:{"min-width":"300px","max-width":"300px"}},[a("div",{staticClass:"mt-n2 mb-1",staticStyle:{"text-align":"center","font-size":"13px"}},[t._v(" "+t._s(e.description)+" "),a("span",{staticClass:"mx-1"},[t._v(" - ")]),t._v(" "+t._s(e.date)+" ")]),a("v-divider",{staticClass:"mb-2"}),a("div",{staticClass:"d-flex flex-column align-start"},[a("div",{staticClass:"d-flex align-center mb-5"},[a("v-img",{attrs:{"max-height":"50","max-width":"50",src:e.icon1}}),a("div",[a("div",{staticClass:"ml-4"},[t._v(t._s(e.nick1))]),a("div",{staticClass:"ml-4",staticStyle:{"font-size":"14px"}},[t._v(" "+t._s(e.player1KDA)+" ")])])],1),a("div",{staticClass:"d-flex align-center"},[a("v-img",{attrs:{"max-height":"50","max-width":"50",src:e.icon2}}),a("div",[a("div",{staticClass:"ml-4"},[t._v(t._s(e.nick2))]),a("div",{staticClass:"ml-4",staticStyle:{"font-size":"14px"}},[t._v(" "+t._s(e.player2KDA)+" ")])])],1)]),a("v-btn",{staticClass:"d-flex mt-6 pa-5 mx-auto",staticStyle:{width:"150px",display:"block"},attrs:{rel:"noreferrer",href:e.link,target:"_blank",color:"secondary"}},[a("span",{staticClass:"mr-5"},[t._v("PARTIDA "+t._s(n+1))]),a("v-icon",{attrs:{"x-small":""}},[t._v("mdi-open-in-new")])],1)],1)],1)})),1)},M=[],V={name:"MatchCard",props:{matches:{type:Array}},data:function(){return{}}},O=V,N=a("b0af"),T=a("62ad"),A=a("ce7e"),P=a("0fd9"),I=Object(c["a"])(O,j,M,!1,null,null,null),z=I.exports;u()(I,{VBtn:m["a"],VCard:N["a"],VCol:T["a"],VDivider:A["a"],VIcon:v["a"],VImg:f["a"],VRow:P["a"]});var B,R,$={name:"Home",components:{MatchCard:z},data:function(){return{inputNick1:"",inputNick2:"",loading:!1,errorMsg:"",alert:!1,alertType:"info",minMax:[0,50],matches:[]}},methods:{isValidRange:function(){return!(Math.abs(this.minMax[0]-this.minMax[1])>50)},getMatches:function(){var t=this;return Object(w["a"])(regeneratorRuntime.mark((function e(){var a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.loading=!0,a=t.minMax[1]-t.minMax[0],n="/api/getMatches/".concat(t.inputNick1,"/").concat(t.inputNick2,"/").concat(t.minMax[0],"/").concat(a),S.a.get(n).then((function(e){var a=e.data,n=[a.icon1,a.icon2];t.icon1=n[0],t.icon2=n[1],t.matches=a,0===t.matches.length&&(t.errorMsg="Nenhum resultado encontrado",t.alert=!0,t.alertType="info"),setTimeout((function(){t.alert=!1}),5e3),t.loading=!1})).catch((function(e){var a,n,r,i,s,o,c=null!==(a=null===(n=e.response.data)||void 0===n||null===(r=n.status)||void 0===r?void 0:r.status_code)&&void 0!==a?a:e.response.status,l=null!==(i=null===(s=e.response.data)||void 0===s||null===(o=s.status)||void 0===o?void 0:o.message)&&void 0!==i?i:e.response.statusText;t.errorMsg="".concat(c," ").concat(l),t.alert=!0,t.alertType="error",setTimeout((function(){t.alert=!1}),5e3),t.loading=!1}));case 4:case"end":return e.stop()}}),e)})))()}}},D=$,J=a("0798"),E=a("a523"),H=a("e0c7"),K=a("8654"),F=Object(c["a"])(D,_,k,!1,null,null,null),G=F.exports;u()(F,{VAlert:J["a"],VBtn:m["a"],VContainer:E["a"],VIcon:v["a"],VSpacer:g["a"],VSubheader:H["a"],VTextField:K["a"]});var q={},L=Object(c["a"])(q,B,R,!1,null,null,null),Q=L.exports;n["a"].use(y["a"]);var U=new y["a"]({mode:"history",base:"/",routes:[{path:"/",component:G,name:"Home"},{path:"/builds",component:Q,name:"Builds"},{path:"/:catchAll(.*)",component:G,name:"Home"}]}),W=U,X=a("f309"),Y=a("fcf4");n["a"].use(X["a"]);var Z=new X["a"]({theme:{dark:!0,themes:{dark:{primary:Y["a"].grey.darken3,secondary:Y["a"].deepPurple.darken4,accent:Y["a"].shades.black,error:Y["a"].red.accent3}}}});n["a"].config.productionTip=!1,new n["a"]({router:W,vuetify:Z,render:function(t){return t(b)}}).$mount("#app")},"6d35":function(t,e,a){},a73c:function(t,e,a){t.exports=a.p+"img/jjc-logo.e3591f43.png"}});
//# sourceMappingURL=app.49eb7e3b.js.map