(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,n,t){e.exports=t(38)},18:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(11),u=t.n(o),c=(t(18),t(3)),l=t(2),i=t.n(l),s="http://localhost:3001/api",m=function(){return i.a.get("".concat(s,"/persons"))},f=function(e){return i.a.post("".concat(s,"/newPerson"),e)},h=function(e,n){return i.a.put("".concat(s,"/persons/").concat(e),n).then(function(e){return e})},d=function(e){return i.a.delete("".concat(s,"/deletePerson/").concat(e)).then(function(e){return e})},p=function(e){var n=e.newName,t=e.handleChange,a=e.handleNumberChange,o=e.newNumber,u=e.handleSubmit;return r.a.createElement("form",null,r.a.createElement("div",null,"nimi: ",r.a.createElement("input",{value:n,onChange:t}),"numero: ",r.a.createElement("input",{value:o,onChange:a})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit",onClick:u},"lis\xe4\xe4")))},b=function(e){var n=e.oldValue,t=e.changeValue;return r.a.createElement("p",null,"Rajaa n\xe4ytett\xe4vi\xe4: ",r.a.createElement("input",{value:n,onChange:t}))},v=function(e){var n=e.persons,t=e.search,a=e.doAlert,o=e.update;return n.map(function(e,u){return""===t||e.name.toLowerCase().includes(t.toLowerCase())||e.number.includes(t)?r.a.createElement("p",{key:u},e.name," ",e.number," ",r.a.createElement("button",{onClick:function(){return function(e){var t={};console.log(n),n.forEach(function(n){n.id===e&&(t=n)}),window.confirm("Poistetaanko ".concat(t.name))&&d(e).then(function(e){o(),a("Poistettiin k\xe4ytt\xe4j\xe4 ".concat(t.name))})}(e.id)}},"Poista")," "):""})},g=function(e){var n=e.error;return null===n||null===n.message||null===n.type?null:r.a.createElement("div",{className:n.type},n.message)},E=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),l=Object(c.a)(u,2),i=l[0],s=l[1],d=Object(a.useState)(""),E=Object(c.a)(d,2),w=E[0],y=E[1],j=Object(a.useState)(""),C=Object(c.a)(j,2),O=C[0],k=C[1],N=Object(a.useState)({}),S=Object(c.a)(N,2),P=S[0],L=S[1];Object(a.useEffect)(function(){T()},[]);var T=function(){m().then(function(e){console.log(e),o(e.data)})},V=function(e){L({message:e,type:"success"}),setTimeout(function(){L(null)},5e3)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Puhelinluettelo"),r.a.createElement(g,{error:P}),r.a.createElement(b,{oldValue:O,changeValue:function(e){k(e.target.value)}}),r.a.createElement("h3",null,"Lis\xe4\xe4 uusi"),r.a.createElement(p,{newName:i,handleChange:function(e){s(e.target.value)},newNumber:w,handleNumberChange:function(e){y(e.target.value)},handleSubmit:function(e){e.preventDefault();var n={name:i,number:w},a=!0,r=!1,o=void 0;try{for(var u,c=t[Symbol.iterator]();!(a=(u=c.next()).done);a=!0){var l=u.value;if(i===l.name)return void h(l.id,{name:i,number:w}).then(function(e){T(),V("P\xe4ivitettiin henkil\xf6n ".concat(i," numero muotoon ").concat(w))}).catch(function(e){L({message:e.error,type:"error"}),setTimeout(function(){L(null)},5e3)})}}catch(s){r=!0,o=s}finally{try{a||null==c.return||c.return()}finally{if(r)throw o}}console.log(n),f(n).then(function(e){T(),L({message:"Lis\xe4ttiin ".concat(i," numerolla ").concat(w),type:"success"}),setTimeout(function(){L(null)},5e3)}).catch(function(e){console.log(e.response.data.error),L({message:e.response.data.error,type:"error"}),setTimeout(function(){L(null)},5e3)})}}),r.a.createElement("h2",null,"Numerot"),r.a.createElement(v,{persons:t,search:O,doAlert:V,update:T}))};u.a.render(r.a.createElement(E,null),document.getElementById("root"))}},[[12,1,2]]]);
//# sourceMappingURL=main.bfe60556.chunk.js.map