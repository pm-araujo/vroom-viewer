(this["webpackJsonpvroom-viewer"]=this["webpackJsonpvroom-viewer"]||[]).push([[0],{45:function(e,t,n){e.exports=n(79)},54:function(e,t,n){},56:function(e,t,n){},59:function(e,t,n){},60:function(e,t,n){},76:function(e,t,n){},77:function(e,t,n){},78:function(e,t,n){},79:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(9),c=n.n(l),i=n(24),o=(n(54),n(6)),u=n(15),s=n(16),v=n(18),h=n(17),d=n(19),p=n(42),f=n(44),m=n(14),y=n(31),E=n.n(y),g=(n(56),n(57),{id:"data",type:"line",source:"routes",paint:{"line-width":3,"line-color":["get","color"]}}),b={id:"dataInactive",type:"line",beforeId:"data",source:"routesInactive",paint:{"line-width":3,"line-color":"#000000"}},S={id:"dataBorder",beforeId:"data",type:"line",source:"routes",paint:{"line-width":5,"line-color":"#000000"}},k=function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(n=Object(v.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={activeVehicles:[],routes:null,routesInactive:null,uniqueHosts:null,hoveredFeature:null,mapStyle:{version:8,sources:{"raster-tiles":{type:"raster",tiles:["http://tile.osm.org/{z}/{x}/{y}.png"],tileSize:256}},layers:[{id:"test",type:"raster",source:"raster-tiles",minzoom:0,maxzoom:22}]},viewport:{latitude:40,longitude:-7,zoom:4,bearing:0,pitch:0}},n._handleViewportChange=function(e){e.width,e.height;var t=Object(f.a)(e,["width","height"]);return n.setState({viewport:Object(o.a)({},n.state.viewport,{},t)})},n._onHover=function(e){var t=e.features,a=e.srcEvent,r=a.offsetX,l=a.offsetY,c=t&&t.find((function(e){return"data"===e.layer.id||"dataInactive"===e.layer.id}));n.setState({hoveredFeature:c,x:r,y:l})},n._onClick=function(e){var t=e.features,a=n.props.setActiveFeature,r=t&&t.find((function(e){return"data"===e.layer.id||"dataInactive"===e.layer.id}));r?a({type:"vehicle",id:r.properties.vehicle}):a()},n._getCursor=function(e){var t=e.isDragging,n=e.isHovering;return t?"grabbing":n?"pointer":"default"},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"_renderTooltip",value:function(){var e=this.state,t=e.hoveredFeature,n=e.x,a=e.y;return t&&r.a.createElement("div",{className:"tooltip",style:{left:n,top:a}},r.a.createElement("div",null,"Vehicle: ",t.properties.vehicle+1),r.a.createElement("div",null,"Day: ",t.properties.day+1),r.a.createElement("div",null,"Week: ",t.properties.week+1))}},{key:"render",value:function(){var e=this.state,t=e.mapStyle,n=e.routes,a=e.routesInactive,l=e.viewport,c=this.props.showAllRoutes;return r.a.createElement("div",{id:"map"},r.a.createElement(m.c,Object.assign({mapStyle:t,height:"100%",width:"100%",interactiveLayerIds:[g.id].concat(Object(p.a)(c?[b.id]:[])),onViewportChange:this._handleViewportChange,onHover:this._onHover,onClick:this._onClick,getCursor:this._getCursor},l),r.a.createElement(m.b,{id:"routes",type:"geojson",data:n},r.a.createElement(m.a,g),r.a.createElement(m.a,S)),c?r.a.createElement(m.b,{id:"routesInactive",type:"geojson",data:a},r.a.createElement(m.a,b)):null,this._renderTooltip()))}}],[{key:"getDerivedStateFromProps",value:function(e,t){var n,a,r=t.activeVehicles,l=e.activeVehicles,c=e.activeFilter,i=e.vehicleColors,o=e.vehicles,u=e.vehiclesPerDay,s=e.vehiclesPerWeek;if(l&&l.length>0&&o&&o.length>0&&(a=r,(n=l).length!==a.length||!n.every((function(e){return a.includes(e)})))){var v=[],h=[];o.forEach((function(e,t){l.includes(t)?v.push(e):h.push(e)}));var d={type:"FeatureCollection",features:v.map((function(e){return{type:"Feature",geometry:E.a.toGeoJSON(e.geometry),properties:{vehicle:e.vehicle,color:i[e.vehicle][c],day:u.findIndex((function(t){return t.includes(e.vehicle)})),week:s.findIndex((function(t){return t.includes(e.vehicle)}))}}}))},p={type:"FeatureCollection",features:h.map((function(e){return{type:"Feature",geometry:E.a.toGeoJSON(e.geometry),properties:{vehicle:e.vehicle,day:u.findIndex((function(t){return t.includes(e.vehicle)})),week:s.findIndex((function(t){return t.includes(e.vehicle)}))}}}))};return{activeVehicles:l,routes:d,routesInactive:p}}return null}}]),t}(a.Component),O=n(21),F=n.n(O),C=n(41),w=n(26),A=n.n(w),V=(n(59),{control:function(e){return Object(o.a)({},e,{backgroundColor:"white"})},option:function(e,t){var n=t.data,a=t.isDisabled,r=t.isFocused,l=t.isSelected,c=A()(n.color);return Object(o.a)({},e,{backgroundColor:a?null:l?n.color:r?c.alpha(.1).css():null,color:a?"#ccc":l?A.a.contrast(c,"white")>2?"white":"black":n.color,cursor:a?"not-allowed":"default",":active":Object(o.a)({},e[":active"],{backgroundColor:!a&&(l?n.color:c.alpha(.3).css())})})},multiValue:function(e,t){var n=t.data,a=A()(n.color);return Object(o.a)({},e,{backgroundColor:a.alpha(.1).css()})},multiValueLabel:function(e,t){var n=t.data;return Object(o.a)({},e,{color:n.color})},multiValueRemove:function(e,t){var n=t.data;return Object(o.a)({},e,{color:n.color,":hover":{backgroundColor:n.color,color:"white"}})}}),D=function(e){var t=e.data,n=e.colors,a=e.isActive,l=e.title,c=e.onChange,i=t.map((function(e,t){return{value:t,label:t+1,color:Array.isArray(e)?n.find((function(t,n){return e.includes(n)})):n[t]}}));return r.a.createElement("div",{className:"ButtonSelect"},r.a.createElement("span",{onClick:function(){return c(t.map((function(e,t){return t})))},className:"ButtonSelect-Title ".concat(a&&"active")},l),r.a.createElement(C.a,{styles:V,isMulti:!0,name:l,options:i,onChange:function(e){return c(e&&e.length>0?e.map((function(e){return e.value})):t.map((function(e,t){return t})))}}))},j=(n(60),function(e){return r.a.createElement(a.Fragment,null,r.a.createElement("input",{id:"file",className:"FileInput",name:"file",type:"file",onChange:function(t){return e.clickHandler(t.target.files[0])}}),r.a.createElement("label",{htmlFor:"file"},e.text))}),N=n(39),I=5,W=Array.from({length:4},(function(e,t){return"Week ".concat(t+1)})),T=["Mon","Tue","Wed","Thu","Fri"];function B(e){var t=e/60/60,n=t/24,a=n/I;n>1&&(t%=24),a>1&&(n%=I);var r=W[Math.floor(a)],l=T[Math.floor(n)],c="".concat(F.a.duration(t,"hours").hours(),"h").concat(F.a.duration(t,"hours").minutes(),"m");return"".concat(r,", ").concat(l," - ").concat(c)}var P=n(43),_=360,R=0,L=100,H=80,M=70,x=40,U=25;function Y(e){var t,n,a,r=function(e,t){var n=e.hue,a=e.sat,r=e.lit,l=t.cHue,c=t.cSat,i=t.cLit;return Math.abs(n-l)+Math.abs(a-c)+Math.abs(r-i)>U},l=e.map((function(e){var t=e.split(","),n=Object(P.a)(t,3),a=n[0],r=n[1],l=n[2];return{hue:Number.parseInt(a.split("hsl(")[1]),sat:Number.parseInt(r),lit:Number.parseInt(l)}}));do{t=Math.floor(Math.random()*(_-R)+R),n=Math.floor(Math.random()*(L-H)+H),a=Math.floor(Math.random()*(M-x)+x)}while(!l.every((function(e){return r(e,{cHue:t,cSat:n,cLit:a})})));return"hsl(".concat(t,", ").concat(n,"%, ").concat(a,"%)")}n(76);var z=function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(n=Object(v.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={isOpen:!1,type:null,id:null},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props,t=e.activeFeature,n=e.vehicles,l=e.hosts,c=e.setActiveFeature;return r.a.createElement(N.slide,{customBurgerIcon:!1,isOpen:this.state.isOpen,pageWrapId:"main-content",outerContainerId:"App",onStateChange:function(e){return!e.isOpen&&c()},noOverlay:!0,right:!0},r.a.createElement("h1",null,r.a.createElement("span",{className:"SideBar-Title"},t.type),t.id+1),r.a.createElement("div",{className:"SideBar-Stats"},"vehicle"===t.type?r.a.createElement(a.Fragment,null,r.a.createElement("span",null,"Hosts: ",n[t.id].steps.length-2," |"),r.a.createElement("span",null,"Capacity: ",n[t.id].pickup[0]," / 21")):null),r.a.createElement("ul",null,"vehicle"===t.type?n[t.id].steps.map((function(e,t){var n="job"===e.type&&l[e.job],c=n.host,i=n.pickup,o=n.perMonth,u=n.perWeek,s=n.nContainers,v=n.nPickups;return r.a.createElement("li",{className:"FeatureVehicle",key:t},"job"!==e.type?r.a.createElement(a.Fragment,null,r.a.createElement("div",{className:"FeatureVehicle-Title"},e.type),r.a.createElement("small",null,r.a.createElement("b",null,"Arrival: "),B(e.arrival))):r.a.createElement(a.Fragment,null,r.a.createElement("div",{className:"FeatureVehicle-Title"},c,r.a.createElement("small",null,o,7===o?".".concat(u):null)),r.a.createElement("small",null,r.a.createElement("b",null,"# Containers: "),s),r.a.createElement("br",null),r.a.createElement("small",null,r.a.createElement("b",null,"Pickup Nr: "),i+1," / ",v),r.a.createElement("br",null),r.a.createElement("small",null,r.a.createElement("b",null,"Arrival: "),B(e.arrival))))})):"host"===t.type?r.a.createElement(a.Fragment,null):null))}}],[{key:"getDerivedStateFromProps",value:function(e,t){var n=e.activeFeature,a=n.id,r=n.type,l=t.prevId;return r!==t.prevType&&a!==l?{isOpen:!0,id:a,type:r}:null}}]),t}(a.Component),J=(n(77),r.a.createElement("p",null,"Loading...")),G=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=e.filter((function(e){return t.includes(e.vehicle)})),r=a.sort((function(e,t){var n=e.steps,a=t.steps;return n[0].arrival-a[0].arrival}))[0],l=a.sort((function(e,t){var n=e.steps,a=t.steps;return a[a.length-1].arrival-n[n.length-1].arrival}))[0];if(!r||!l)return 0;var c=n?l.steps[l.steps.length-1]:r.steps[0],i=c.arrival;return i},K=function(e){var t=e.loadSolution,n=e.solutionStatus,l=e.vehiclesPerDay,c=e.vehiclesPerWeek,i=e.vehicles,o=(e.vehiclesByDays,e.vehiclesByWeeks,e.daysByVehicles,e.weeksByVehicles,e.setDays),u=e.setVehicles,s=e.setWeeks,v=e.setShowRoutes,h=e.activeFilter,d=e.activeVehicles,p=(e.activeDays,e.activeWeeks,e.showAllRoutes),f=e.vehicleColors;return r.a.createElement("header",{className:"NavBar"},"EMPTY"===n&&function(e){return r.a.createElement(a.Fragment,null,r.a.createElement(j,{text:"Load Solution",clickHandler:e}))}(t)||"LOADING"===n&&J||r.a.createElement(a.Fragment,null,r.a.createElement("div",{className:"NavBar-Controls"},r.a.createElement(D,{title:"Weeks",isActive:"WEEK"===h,data:c,colors:f.map((function(e){return e.WEEK})),onChange:s}),r.a.createElement(D,{title:"Days",isActive:"DAY"===h,data:l,colors:f.map((function(e){return e.DAY})),onChange:o}),r.a.createElement(D,{title:"Vehicles",isActive:"VEHICLE"===h,data:i,colors:f.map((function(e){return e.VEHICLE})),onChange:u}),r.a.createElement("div",null,r.a.createElement("label",null,r.a.createElement("input",{name:"showAllRoutes",type:"checkbox",checked:p,onChange:function(e){var t=e.target;return v(t.checked)}}),"Show inactive routes"))),r.a.createElement("div",{className:"NavBar-Stats"},r.a.createElement("span",{className:"NavBar-StatsField"},r.a.createElement("label",null,"Vehicles:"),r.a.createElement("span",null,d.length)),r.a.createElement("span",{className:"NavBar-StatsField"},r.a.createElement("label",null,"Distance:"),r.a.createElement("span",null,"".concat(function(e,t){return e.filter((function(e){return t.includes(e.vehicle)})).reduce((function(e,t){return e+t.distance}),0)}(i,d)/1e3," Km"))),r.a.createElement("span",{className:"NavBar-StatsField"},r.a.createElement("label",null,"Capacity:"),r.a.createElement("span",null,function(e,t){return e.filter((function(e){return t.includes(e.vehicle)})).reduce((function(e,t){return e+t.pickup[0]}),0)}(i,d))),r.a.createElement("span",{className:"NavBar-StatsField"},r.a.createElement("label",null,"Hosts:"),r.a.createElement("span",null,function(e,t){return e.filter((function(e){return t.includes(e.vehicle)})).reduce((function(e,t){return e+t.steps.length-2}),0)}(i,d))),r.a.createElement("span",{className:"NavBar-StatsField"},r.a.createElement("label",null,"Start:"),r.a.createElement("span",null,B(G(i,d)))),r.a.createElement("span",{className:"NavBar-StatsField"},r.a.createElement("label",null,"End:"),r.a.createElement("span",null,B(G(i,d,!0)))),r.a.createElement("span",{className:"NavBar-StatsField"},r.a.createElement("label",null,"Duration:"),r.a.createElement("span",null,function(e,t){var n=e.filter((function(e){return t.includes(e.vehicle)})).reduce((function(e,t){return e+t.duration}),0),a=F.a.duration(n,"s"),r=a.days(),l=a.hours(),c=a.minutes();return"".concat(r?r+"d":""," ").concat(l?l+"h":""," ").concat(c?c+"m":"")}(i,d))))))},q=(n(78),n(20)),X=function(e,t){return e.vehiclesPerWeek.filter((function(e,n){return t.includes(n)})).flat()},Q=function(e,t){return e.vehiclesPerDay.filter((function(e,n){return t.includes(n)})).flat()},Z=function(e,t){var n=new Set(t.map((function(t){return e.vehiclesPerDay.find((function(e){return e.includes(t)}))})));return Array.from(n)},$=function(e,t){var n=new Set(t.map((function(t){return e.vehiclesPerWeek.find((function(e){return e.includes(t)}))})));return Array.from(n)},ee="WEEK",te="DAY",ne="VEHICLE",ae=function(e,t,n,a){return{type:"SET_FILTER",payload:{activeDays:e,activeWeeks:t,activeFilter:n,activeVehicles:a}}},re=function(e){return function(t,n){var a=X(n().solution,e),r=function(e){return e.flatMap((function(e){return Array.from({length:I},(function(t,n){return n+5*e}))}))}(e);return t(ae(r,e,ee,a))}},le=function(e){return function(t,n){var a=Q(n().solution,e),r=function(e){return Array.from(new Set(e.map((function(e){return Math.floor(e/I)}))))}(e);return t(ae(e,r,te,a))}},ce="EMPTY",ie="LOADING",oe="DONE",ue=function(e){return{type:"SET_STATUS",payload:e}},se=function(e){return function(t){return t(ue({status:ie})),(n=e,new Promise((function(e,t){var a=new FileReader;a.onerror=function(){a.abort(),t("Problem parsing input file")},a.onload=function(){e(JSON.parse(a.result))},a.readAsText(n)}))).then((function(e){var n=e.vroom,a=e.meta,r=n.output.routes,l=a.hosts,c=a.vehiclesPerDay,i=a.vehiclesPerWeek;return t(function(e,t,n){return function(a){var r=t.reduce((function(e,t){return e.push(Y(e)),e}),[]),l=e.reduce((function(e,t){return e.push(Y(e)),e}),[]);return a({type:"SET_VEHICLE_COLORS",payload:{vehicleColors:Array.from({length:n},(function(e,t){return t})).reduce((function(n,a){var c,i=t.findIndex((function(e){return e.includes(a)})),o=e.findIndex((function(e){return e.includes(a)}));return n.push((c={},Object(q.a)(c,te,l[o]),Object(q.a)(c,ee,r[i]),Object(q.a)(c,ne,Y(n.map((function(e){return e.VEHICLE})))),c)),n}),[])}})}}(c,i,r.length)),t(re(i.map((function(e,t){return t})))),t({type:"LOAD_SOLUTION",payload:{hosts:l,vehicles:r,vehiclesPerDay:c,vehiclesPerWeek:i}})})).catch((function(e){return console.error(e),t(ue(ce))}));var n}},ve=function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(n=Object(v.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props,t=e.settings,n=e.solution,a=e.loadSolution,l=e.setDays,c=e.setVehicles,i=e.setWeeks,o=e.setShowRoutes,u=e.setActiveFeature,s=n.status,v=n.vehiclesPerDay,h=n.vehiclesPerWeek,d=n.vehicles,p=n.hosts,f=n.getVehiclesByDays,m=n.getVehiclesByWeeks,y=n.getDaysByVehicles,E=n.getWeeksByVehicles,g=t.activeFeature,b=t.activeVehicles,S=t.activeFilter,O=t.activeDays,F=t.activeWeeks,C=t.showAllRoutes,w=t.vehicleColors;return r.a.createElement("div",{id:"App",className:"App"},null!==g?r.a.createElement(z,{hosts:p,activeFeature:g,vehicles:d,setActiveFeature:u}):null,r.a.createElement("div",{id:"main-content"},r.a.createElement(K,{solutionStatus:s,loadSolution:a,setDays:l,setVehicles:c,setWeeks:i,setShowRoutes:o,getVehiclesByDays:f,getVehiclesByWeeks:m,getDaysByVehicles:y,getWeeksByVehicles:E,vehiclesPerDay:v,vehiclesPerWeek:h,vehicles:d,activeFilter:S,activeDays:O,activeWeeks:F,activeVehicles:b,showAllRoutes:C,vehicleColors:w}),r.a.createElement(k,{activeFilter:S,activeVehicles:b,showAllRoutes:C,vehicles:d,hosts:p,vehicleColors:w,vehiclesPerDay:v,vehiclesPerWeek:h,setActiveFeature:u})))}}]),t}(a.Component),he=Object(i.b)((function(e,t){var n=e.settings,a=e.solution;return{settings:n,solution:Object(o.a)({getVehiclesByDays:function(t){return Q(e,t)},getVehiclesByWeeks:function(t){return X(e,t)},getDaysByVehicles:function(t){return Z(e,t)},getWeeksByVehicles:function(t){return $(e,t)}},a)}}),(function(e,t){return{setVehicles:function(t){return e(function(e){return function(t,n){var a=ne,r=Z(n().solution,e),l=$(n().solution,e);return t(ae(r,l,a,e))}}(t))},setWeeks:function(t){return e(re(t))},setDays:function(t){return e(le(t))},setActiveFeature:function(t){return e(function(e){return function(t){return t(e?{type:"SET_ACTIVE_FEATURE",payload:{type:e.type,id:e.id}}:{type:"SET_ACTIVE_FEATURE",payload:null})}}(t))},setShowRoutes:function(t){return e(function(e){return function(t){return t({type:"SET_SHOW_ROUTES",payload:{showAllRoutes:e}})}}(t))},loadSolution:function(t){return e(se(t))}}}))(ve),de=n(11),pe=n(32),fe=(n(40),{activeFeature:null,activeFilter:ee,activeWeeks:null,activeDays:null,activeVehicles:[],showAllRoutes:!1,vehicleColors:[]}),me={status:ce,hosts:[],vehicles:[],vehiclesPerDay:[],vehiclesPerWeek:[]},ye=Object(de.combineReducers)({settings:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:fe,t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.payload;switch(n){case"SET_SHOW_ROUTES":var r=a.showAllRoutes;return Object(o.a)({},e,{showAllRoutes:r});case"SET_ACTIVE_FEATURE":return Object(o.a)({},e,{activeFeature:a});case"SET_VEHICLE_COLORS":var l=a.vehicleColors;return Object(o.a)({},e,{vehicleColors:l});case"SET_FILTER":var c=a.activeFilter,i=a.activeWeeks,u=a.activeDays,s=a.activeVehicles;return Object(o.a)({},e,{activeFilter:c,activeWeeks:i,activeDays:u,activeVehicles:s});default:return e}},solution:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:me,t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.payload;switch(n){case"SET_STATUS":return Object(o.a)({},e,{status:a.status});case"LOAD_SOLUTION":var r=a.hosts,l=a.vehicles,c=a.vehiclesPerDay,i=a.vehiclesPerWeek;return{status:oe,hosts:r,vehicles:l,vehiclesPerDay:c,vehiclesPerWeek:i};default:return e}}}),Ee=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(de.createStore)(ye,e,Object(de.applyMiddleware)(pe.a))}();c.a.render(r.a.createElement(i.a,{store:Ee},r.a.createElement(he,null)),document.getElementById("root"))}},[[45,1,2]]]);
//# sourceMappingURL=main.6230a9d3.chunk.js.map