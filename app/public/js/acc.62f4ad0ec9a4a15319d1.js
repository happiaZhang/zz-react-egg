webpackJsonp([3],{"//Rq":function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}n("aHqE"),n("RQkQ");var a=n("oacu"),o=r(a),u=n("RbzN"),i=r(u),l=n("eban"),c=r(l),f=new o.default;f.useModels(i.default),f.useRoot(c.default),f.start("app")},"4Syq":function(e,t){e.exports={notification:"_1df7-",icon:"XFF9-",info:"aniR3",success:"_1PrQG",error:"BNT16"}},"5qSF":function(e,t){e.exports={wrapper:"_30jq7",content:"MzxEO",mainContent:"_1ot2I"}},"84Y7":function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n("y7Ex"),f=r(c),s=n("U7vG"),p=r(s),d=n("/LwW"),h=r(d),y=n("z16v"),m=r(y),v=n("FY1O"),b=r(v),g=n("NQ1I"),_=r(g),E=n("+Ca7"),O=r(E),w=n("UeZ5"),P=r(w),S=n("WRdY"),k=r(S),T={PENDING:"待审批",PASS:"审批通过",REJECT:"审批拒绝"},j=function(e){function t(e){a(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.loadTableData=function(e){var t=n.state,r=t.verify,a=t.searchText,o=t.pageSize,u=t.pageNumber,l=i({verify:r,searchText:a,pageSize:o,pageNumber:u},e);k.default.getUserVerifyRecord(l).then(function(e){n.setState(i({},l,e))}).catch(function(e){P.default.error(e)})},n.genSelectOptions=function(){n.selectOptions=[{value:"",text:"全部"}],Object.keys(T).forEach(function(e){n.selectOptions.push({value:e,text:T[e]})})},n.changeVerifyStatus=function(e){n.loadTableData({verify:e})},n.onSearch=function(e){n.setState({searchText:e}),n.timer&&clearTimeout(n.timer),n.timer=setTimeout(function(){n.loadTableData({searchText:e})},300)},n.changePageSize=function(e){n.loadTableData({pageSize:e,pageNumber:1})},n.changePageNumber=function(e){n.setState({pageNumber:e}),n._timer&&clearTimeout(n._timer),n._timer=setTimeout(function(){n.loadTableData({pageNumber:e})},300)},n.setTheadData=function(){return[{text:"公司名称",value:"company_name"},{text:"姓名",value:"name"},{text:"手机号",value:"mobile"},{text:"行业",value:"industry"},{text:"绑定邮箱",value:"email"},{text:"实名认证",value:"ID_verify"},{text:"状态",value:"verifyName",render:function(e,t){var n=t.verify;return p.default.createElement("div",{className:f.default.verifyStatus+" "+f.default[n]},t[e])}},{text:"操作",value:"OPERATION_COLUMN",width:60}]},n.setTbodyData=function(){var e=n.state.elements;return 0===e.length?e:e.map(function(e){return e.operations=[{type:"DETAIL",text:"查看详情"}],e})},n.onRowOperation=function(e,t){var r=n.props.history;"DETAIL"===e&&r.push("/detail/"+t.PWID)},n.state={verify:"",searchText:"",pageSize:10,pageNumber:1,totalSize:0,elements:[]},n}return u(t,e),l(t,[{key:"componentWillMount",value:function(){this.genSelectOptions()}},{key:"componentDidMount",value:function(){this.loadTableData()}},{key:"componentWillUnmount",value:function(){this.timer&&clearTimeout(this.timer),this._timer&&clearTimeout(this._timer)}},{key:"render",value:function(){var e=this.state,t=e.verify,n=e.searchText,r=e.pageSize,a=e.pageNumber,o=e.totalSize;return p.default.createElement("div",{style:{minWidth:520}},p.default.createElement(h.default,{title:"内测用户审核"}),p.default.createElement("div",{className:f.default.tableOperation},p.default.createElement("div",{className:f.default.left},p.default.createElement(m.default,{style:{width:140},data:this.selectOptions,value:t,onChangeValue:this.changeVerifyStatus})),p.default.createElement(b.default,{placeholder:"请输入姓名",value:n,onChangeValue:this.onSearch})),p.default.createElement(_.default,{type:"simple",style:{marginTop:12},pageSize:r,pageNumber:a,totalSize:o,onPageSizeSwitch:this.changePageSize,onPageNumberSwitch:this.changePageNumber}),p.default.createElement(O.default,{theadData:this.setTheadData(),tbodyData:this.setTbodyData(),pageSize:r,pageNumber:a,totalSize:o,onItemOperationClick:this.onRowOperation}),p.default.createElement(_.default,{pageSize:r,pageNumber:a,totalSize:o,onPageNumberSwitch:this.changePageNumber}))}}]),t}(p.default.Component);t.default=j},K2RT:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n("OPZi"),c=r(l),f=n("U7vG"),s=r(f),p=n("iNAl"),d=r(p),h=function(e){function t(){var e,n,r,u;a(this,t);for(var i=arguments.length,l=Array(i),c=0;c<i;c++)l[c]=arguments[c];return n=r=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),r.onClose=function(){var e=r.props.onClose;e&&e()},r.onConfirm=function(){var e=r.props.callback;e&&e()},u=n,o(r,u)}return u(t,e),i(t,[{key:"render",value:function(){var e=this.props,t=e.header,n=e.content,r=[{key:"cancel",text:"再想想",type:"default",onClick:this.onClose},{key:"confirm",text:"确定",type:"primary",onClick:this.onConfirm}];return s.default.createElement(d.default,{type:"alert",width:500,showState:!0,footer:r,onCloseClick:this.onClose},s.default.createElement("h2",{className:c.default.header},t),s.default.createElement("div",{className:c.default.content},n))}}]),t}(s.default.Component);t.default=h},OPZi:function(e,t){e.exports={header:"Wq4-s",content:"_1Ibz1"}},Py1y:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n("U7vG"),c=r(l),f=n("iUhV"),s=r(f),p=n("aR5j"),d=r(p),h=n("nHvn"),y=r(h),m=n("/LwW"),v=r(m),b=n("mYAJ"),g=r(b),_=n("UeZ5"),E=r(_),O=n("S733"),w=r(O),P=n("K2RT"),S=r(P),k=n("WRdY"),T=r(k),j=n("L+1M"),R=r(j),x=n("32ml"),N=r(x),C=[{key:"company_name",label:"公司名称"},{key:"industry",label:"行业"},{key:"ID_verify",label:"实名认证"},{key:"email_active",label:"绑定邮箱"},{key:"email",label:"邮箱地址"},{key:"name",label:"姓名"},{key:"ID_number",label:"身份证号码"},{key:"mobile",label:"手机号"}],M=function(e){function t(e){a(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return I.call(n),n.route=[{key:"acc",to:"/",text:"返回列表"}],n.state={account:{}},n}return u(t,e),i(t,[{key:"componentDidMount",value:function(){this.loadAccountInfo()}},{key:"render",value:function(){var e=this.state.account,t=this.getAccountType(),n=t.type,r=t.content;return c.default.createElement("div",null,c.default.createElement(s.default,{routes:this.route,style:{marginTop:15}}),c.default.createElement(v.default,{title:"用户详情",style:{paddingTop:5}}),c.default.createElement("div",{style:{maxWidth:850}},c.default.createElement(w.default,{title:e.verifyName||"",type:n,style:{marginTop:30,marginBottom:20}},r?c.default.createElement("span",{style:{marginLeft:5}},r):null),this.renderCardInfo()),this.renderBtnGroup())}}]),t}(c.default.Component),I=function(){var e=this;this.loadAccountInfo=function(){var t=e.getId();T.default.getUserVerifyRecord({PWID:t}).then(function(t){var n=t.elements;n.length>0&&e.setState({account:n[0]})}).catch(function(e){E.default.error(e)})},this.getId=function(){return e.props.match.params.id},this.renderCardInfo=function(){return c.default.createElement(d.default,{title:"账户信息"},e.renderInfoList())},this.renderInfoList=function(){var t=e.state.account,n=[];return C.forEach(function(e){var r=e.key,a=e.label,o={key:r,label:a,labelWidth:"45%"};o.content=t[r]||"",n.push(c.default.createElement(y.default,o))}),n},this.renderBtnGroup=function(){var t=e.state.account;if(t.verify&&"PENDING"===t.verify){var n=[{key:"reject",text:"审核拒绝",type:"default",onClick:e.onReject},{key:"pass",text:"审核通过",onClick:e.onPass}];return c.default.createElement(g.default,{btns:n,style:{marginTop:35}})}return null},this.onReject=function(){R.default.genModal({show:!0,data:{component:S.default,header:"确定要审批拒绝吗？",content:"审批拒绝后系统会自动发送一封邮件至用户的邮箱。邀请用户等万达云正式上线后再来使用。",callback:e.handleVerifyStatus(!0)}})},this.onPass=function(){R.default.genModal({show:!0,data:{component:S.default,header:"确定要审批通过吗？",content:"审批通过后系统会自动发送一封邀请邮件至用户的邮箱。",callback:e.handleVerifyStatus(!1)}})},this.handleVerifyStatus=function(t){var n=e.getId(),r=t?"REJECT":"PASS";return function(){T.default.setUserVerifyRecord({PWID:n,verify:r}).then(function(t){"0"===t.code&&(R.default.genModal({show:!1}),E.default.info("操作成功，邮件已发送",2,function(){e.loadAccountInfo()}))}).catch(function(e){E.default.error(e)})}},this.getAccountType=function(){var t=e.state.account,n=t.verify,r=t.verify_time,a={type:""};if(n){var o=N.default.format(new Date(r),"yyyy年MM月dd日 hh时mm分ss秒");switch(n){case"PENDING":a.type="info",a.content="（注册日期："+o+"）";break;case"PASS":a.type="success",a.content="（审批通过日期："+o+"）";break;case"REJECT":a.type="error",a.content="（审批拒绝日期："+o+"）"}}return a}};t.default=M},S733:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n("4Syq"),c=r(l),f=n("U7vG"),s=r(f),p=function(e){function t(e){a(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.renderIcon=function(){var e=n.props.type,t=s.default.createElement("path",{d:"M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 4c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm2 8H6v-1h1V8H6V7h3v4h1v1z"});return"error"===e&&(t=s.default.createElement("path",{d:"M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM5.1 13.3L3.5 12 11 2.6l1.5 1.2-7.4 9.5z"})),"success"===e&&(t=s.default.createElement("path",{d:"M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM6.7 11.5L3.4 8.1l1.4-1.4 1.9 1.9 4.1-4.1 1.4 1.4-5.5 5.6z"})),s.default.createElement("svg",{className:c.default.icon},t)},n.state={title:e.title},n}return u(t,e),i(t,[{key:"componentWillReceiveProps",value:function(e){var t=e.title;t!==this.props.title&&this.setState({title:t})}},{key:"shouldComponentUpdate",value:function(e,t){return t.title!==this.state.title}},{key:"render",value:function(){var e=this.state.title;if(0===e.length)return null;var t=this.props,n=t.type,r=t.children,a=t.style;return s.default.createElement("div",{className:c.default.notification+" "+c.default[n],style:a},this.renderIcon(),s.default.createElement("span",null,e),r)}}]),t}(s.default.Component);p.defaultProps={type:"info",title:""},t.default=p},WRdY:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("L+1M"),a=function(e){return e&&e.__esModule?e:{default:e}}(r),o=function(e){var t=a.default.genQueryString(e),n={url:"/api/acc-admin/getUserVerifyRecord?"+t};return a.default.genPromise(n,"getUserVerifyRecord")},u=function(e){var t={url:"/api/acc-admin/setUserVerifyRecord",method:"POST",data:e};return a.default.genPromise(t,"setUserVerifyRecord")};t.default={getUserVerifyRecord:o,setUserVerifyRecord:u}},eban:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n("5qSF"),f=r(c),s=n("U7vG"),p=r(s),d=n("F8kA"),h=n("F4A8"),y=r(h),m=n("P177"),v=r(m),b=n("USdx"),g=r(b),_=n("84Y7"),E=r(_),O=n("Py1y"),w=r(O),P=n("vTle"),S=[{path:"/",text:"内测用户审核",component:E.default,menu:!0},{path:"/detail/:id",component:w.default}],k=function(e){function t(){var e,n,r,u;a(this,t);for(var l=arguments.length,c=Array(l),f=0;f<l;f++)c[f]=arguments[f];return n=r=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),r.setMenu=function(){var e=[];return S.forEach(function(t){var n=t.path,r=t.text,a=t.menu;void 0!==a&&a&&e.push({text:r,path:n})}),e},r.renderRoutes=function(){var e=[];return S.forEach(function(t){var n=t.path;e.push(p.default.createElement(d.Route,i({key:n,exact:!0},t)))}),e},r.getActiveLink=function(){var e=r.props.location.pathname;if(1===e.length)return e;var t=null;return S.forEach(function(n){var r=n.path;n.menu&&e.indexOf(r)>-1&&(t=r)}),t},u=n,o(r,u)}return u(t,e),l(t,[{key:"componentDidMount",value:function(){(0,P.initScrElm)(this.scrElm)}},{key:"render",value:function(){var e=this;return p.default.createElement("div",{className:f.default.wrapper},p.default.createElement(v.default,null),p.default.createElement("div",{className:f.default.content},p.default.createElement(y.default,{links:this.setMenu(),activeLink:this.getActiveLink()}),p.default.createElement("div",{ref:function(t){return e.scrElm=t},className:f.default.mainContent},this.renderRoutes())),p.default.createElement(g.default,null))}}]),t}(p.default.Component),T=p.default.createElement(d.BrowserRouter,{basename:"/icp/acc"},p.default.createElement(d.Route,{path:"/",component:k}));t.default=T},y7Ex:function(e,t){e.exports={tableOperation:"_2j6wL",left:"-W79j",verifyStatus:"vR5im",PENDING:"_3W44P",PASS:"_1uB_Q",REJECT:"_3gtAQ"}}},["//Rq"]);