(function(t){function a(a){for(var n,s,o=a[0],c=a[1],l=a[2],d=0,p=[];d<o.length;d++)s=o[d],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&p.push(i[s][0]),i[s]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);u&&u(a);while(p.length)p.shift()();return r.push.apply(r,l||[]),e()}function e(){for(var t,a=0;a<r.length;a++){for(var e=r[a],n=!0,o=1;o<e.length;o++){var c=e[o];0!==i[c]&&(n=!1)}n&&(r.splice(a--,1),t=s(s.s=e[0]))}return t}var n={},i={app:0},r=[];function s(a){if(n[a])return n[a].exports;var e=n[a]={i:a,l:!1,exports:{}};return t[a].call(e.exports,e,e.exports,s),e.l=!0,e.exports}s.m=t,s.c=n,s.d=function(t,a,e){s.o(t,a)||Object.defineProperty(t,a,{enumerable:!0,get:e})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,a){if(1&a&&(t=s(t)),8&a)return t;if(4&a&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(s.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&a&&"string"!=typeof t)for(var n in t)s.d(e,n,function(a){return t[a]}.bind(null,n));return e},s.n=function(t){var a=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(a,"a",a),a},s.o=function(t,a){return Object.prototype.hasOwnProperty.call(t,a)},s.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=a,o=o.slice();for(var l=0;l<o.length;l++)a(o[l]);var u=c;r.push([0,"chunk-vendors"]),e()})({0:function(t,a,e){t.exports=e("56d7")},"56d7":function(t,a,e){"use strict";e.r(a);e("e260"),e("e6cf"),e("cca6"),e("a79d");var n=e("2b0e"),i=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("v-app",[n("v-app-bar",{attrs:{absolute:"",dense:"",app:"",color:"secondary",dark:""}},[n("div",{staticClass:"d-flex align-center"},[n("v-img",{staticClass:"mr-2",attrs:{src:e("a73c"),width:"50"}}),n("span",{staticClass:"font-weight-bold",style:{fontSize:this.fontSize}},[t._v("Já Joguei Com...")])],1),n("v-spacer"),n("v-btn",{attrs:{href:"https://github.com/leleoveiga/ja-joguei-com-frontend",target:"_blank",text:""}},[n("v-icon",{staticClass:"mr-1"},[t._v("mdi-github")]),n("span",{staticClass:"mr-2"},[t._v(" Github ")]),n("v-icon",{attrs:{small:""}},[t._v("mdi-open-in-new")])],1)],1),n("v-main",[n("Home")],1)],1)},r=[],s=(e("b0c0"),function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",{attrs:{fluid:""}},[e("v-text-field",{staticClass:"mx-auto",staticStyle:{"max-width":"300px","margin-top":"100px"},attrs:{"background-color":"",placeholder:"Seu nick",autocomplete:"nick","solo-inverted":"",rows:"1"},scopedSlots:t._u([{key:"label",fn:function(){return[t._v(" digite seu nick "),e("v-icon",{staticStyle:{"vertical-align":"middle"},attrs:{small:""}},[t._v(" mdi-magnify ")])]},proxy:!0}]),model:{value:t.inputNick1,callback:function(a){t.inputNick1=a},expression:"inputNick1"}}),e("v-text-field",{staticClass:"mx-auto",staticStyle:{"max-width":"300px","margin-top":"0px"},attrs:{"background-color":"",placeholder:"Nick do outro invocador",autocomplete:"nick","solo-inverted":"",rows:"1"},scopedSlots:t._u([{key:"label",fn:function(){return[t._v(" digite o nick do outro invocador "),e("v-icon",{staticStyle:{"vertical-align":"middle"},attrs:{small:""}},[t._v(" mdi-magnify ")])]},proxy:!0}]),model:{value:t.inputNick2,callback:function(a){t.inputNick2=a},expression:"inputNick2"}}),e("v-subheader",{staticClass:"mx-auto",staticStyle:{"max-width":"335px"}},[e("span",{staticStyle:{"text-align":"center"}},[t._v(" Você pode escolher onde começa e termina o scan das partidas. Max: 50 partidas ")])]),e("v-range-slider",{staticClass:"mx-auto my-10",staticStyle:{"max-width":"400px"},attrs:{color:"deep-purple darken-3","thumb-color":"secondary","track-color":"#202020",max:"100",min:"0","thumb-label":"always"},model:{value:t.minMax,callback:function(a){t.minMax=a},expression:"minMax"}}),e("span",{staticClass:"mx-auto mt-n14 mb-10",staticStyle:{"font-size":"10px",width:"200px",display:"block","text-align":"center"}},[t._v(" ( < 0,5 segundo pra cada partida analisada )")]),e("v-btn",{staticClass:"mx-auto mb-12",staticStyle:{width:"120px",display:"block"},attrs:{color:"secondary",loading:t.loading},on:{click:function(a){return t.getMatches()}}},[t._v(" procurar ")]),e("div",{staticClass:"mx-auto",staticStyle:{"max-width":"370px"}},[e("v-alert",{attrs:{value:t.alert,dark:"",transition:"scroll-x-transition",type:t.alertType}},[t._v(" "+t._s(t.alertMessage)+" ")])],1),e("v-row",{staticClass:"d-flex justify-center"},t._l(t.matches,(function(a,n){return e("v-col",{key:a.gameId,staticClass:"d-flex justify-center",staticStyle:{"max-width":"350px"}},[e("v-card",{staticClass:"mb-5 pa-4",staticStyle:{"min-width":"300px","max-width":"300px"}},[e("div",{staticClass:"mt-n2 mb-1",staticStyle:{"text-align":"center","font-size":"13px"}},[t._v(" "+t._s(a.description)+" "),e("span",{staticClass:"mx-1"},[t._v(" - ")]),t._v(" "+t._s(a.date)+" ")]),e("v-divider",{staticClass:"mb-2"}),e("div",{staticClass:"d-flex flex-column align-start"},[e("div",{staticClass:"d-flex align-center mb-5"},[e("v-img",{attrs:{"max-height":"50","max-width":"50",src:a.icon1}}),e("div",[e("div",{staticClass:"ml-4"},[t._v(t._s(a.nick1))]),e("div",{staticClass:"ml-4",staticStyle:{"font-size":"14px"}},[t._v(" "+t._s(a.player1KDA)+" ")])])],1),e("div",{staticClass:"d-flex align-center"},[e("v-img",{attrs:{"max-height":"50","max-width":"50",src:a.icon2}}),e("div",[e("div",{staticClass:"ml-4"},[t._v(t._s(a.nick2))]),e("div",{staticClass:"ml-4",staticStyle:{"font-size":"14px"}},[t._v(" "+t._s(a.player2KDA)+" ")])])],1)]),e("v-btn",{staticClass:"d-flex mt-6 pa-5 mx-auto",staticStyle:{width:"150px",display:"block"},attrs:{href:a.link,target:"_blank",color:"secondary"}},[e("span",{staticClass:"mr-5"},[t._v("PARTIDA "+t._s(n+1))]),e("v-icon",{attrs:{"x-small":""}},[t._v("mdi-open-in-new")])],1)],1)],1)})),1),e("v-spacer")],1)}),o=[],c=(e("99af"),e("96cf"),e("1da1")),l=e("bc3a"),u=e.n(l),d={name:"Home",data:function(){return{inputNick1:"",inputNick2:"",loading:!1,alert:!1,alertType:"info",minMax:[15,65],matches:[]}},methods:{isValidRange:function(){return!(Math.abs(this.minMax[0]-this.minMax[1])>50)},getMatches:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function a(){var e;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:t.isValidRange()?(t.loading=!0,e="/api/getMatches/".concat(t.inputNick1,"/").concat(t.inputNick2,"/").concat(t.minMax[0],"/").concat(t.minMax[1]),u.a.get(e).then((function(a){var e=a.data,n=[e.icon1,e.icon2];t.icon1=n[0],t.icon2=n[1],t.matches=e,t.loading=!1})).catch((function(){t.alert=!0,t.alertType="error",setTimeout((function(){t.alert=!1}),5e3),t.loading=!1}))):(t.alert=!0,t.alertType="warning",setTimeout((function(){t.alert=!1}),5e3));case 1:case"end":return a.stop()}}),a)})))()}},computed:{alertMessage:function(){return"warning"===this.alertType?"Coloque um range menor ou igual à 50 !":"error"===this.alertType?"Algo deu errado :( Atualize e tente novamente!":"Um erro desconhecido!"}}},p=d,m=e("2877"),f=e("6544"),v=e.n(f),x=e("0798"),h=e("8336"),g=e("b0af"),y=e("62ad"),b=e("a523"),k=e("ce7e"),_=e("132d"),w=e("adda"),C=e("5963"),S=e("0fd9"),V=e("2fa4"),M=e("e0c7"),j=e("8654"),O=Object(m["a"])(p,s,o,!1,null,null,null),T=O.exports;v()(O,{VAlert:x["a"],VBtn:h["a"],VCard:g["a"],VCol:y["a"],VContainer:b["a"],VDivider:k["a"],VIcon:_["a"],VImg:w["a"],VRangeSlider:C["a"],VRow:S["a"],VSpacer:V["a"],VSubheader:M["a"],VTextField:j["a"]});var N={name:"App",components:{Home:T},data:function(){return{}},computed:{fontSize:function(){return"xs"===this.$vuetify.breakpoint.name?"20px":"26px"}}},A=N,P=e("7496"),z=e("40dc"),R=e("f6c4"),I=Object(m["a"])(A,i,r,!1,null,null,null),D=I.exports;v()(I,{VApp:P["a"],VAppBar:z["a"],VBtn:h["a"],VIcon:_["a"],VImg:w["a"],VMain:R["a"],VSpacer:V["a"]});var J=e("8c4f");n["a"].use(J["a"]);var $=[],B=new J["a"]({mode:"history",base:"/",routes:$}),H=B,E=e("f309"),K=e("fcf4");n["a"].use(E["a"]);var q=new E["a"]({theme:{dark:!0,themes:{dark:{primary:K["a"].grey.darken3,secondary:K["a"].deepPurple.darken4,accent:K["a"].shades.black,error:K["a"].red.accent3}}}});n["a"].config.productionTip=!1,new n["a"]({router:H,vuetify:q,render:function(t){return t(D)}}).$mount("#app")},a73c:function(t,a,e){t.exports=e.p+"img/jjc-logo.e3591f43.png"}});
//# sourceMappingURL=app.d4960c30.js.map