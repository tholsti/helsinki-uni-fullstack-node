(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,t,n){e.exports=n(39)},39:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(14),u=n.n(o),c=n(15),l=n(2),s=n(4),i=function(e){return a.a.createElement("input",{value:e.filter,onChange:function(t){e.setFilter(t.target.value);var n=e.persons.filter(function(e){return e.name.toLowerCase().includes(t.target.value.toLowerCase())});e.setPersonsFiltered(n)}})},d=function(e){var t=e.setNewName,n=e.setNewNumber,r=e.addName,o=e.newName,u=e.newNumber;return a.a.createElement("form",{onSubmit:r},a.a.createElement("div",null,"name: ",a.a.createElement("input",{value:o,onChange:function(e){t(e.target.value)}})),a.a.createElement("div",null,"number: ",a.a.createElement("input",{value:u,onChange:function(e){n(e.target.value)}})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"add")))},m=function(e){var t=e.person,n=e.removePerson;return a.a.createElement("li",null,"".concat(t.name," ").concat(t.number),a.a.createElement("button",{type:"button",onClick:function(){return n(t)}}," Delete "))},f=function(e){var t=e.filter,n=e.personsFiltered,r=e.persons,o=e.removePerson;e.setMessage;return a.a.createElement("ul",null,t.length>0?n.map(function(e){return a.a.createElement(m,{key:e.name,removePerson:o,person:e})}):r.map(function(e){return a.a.createElement(m,{key:e.name,removePerson:o,person:e})}))},p=n(3),b=n.n(p),E="/api/persons",v=function(){return b.a.get(E)},h=function(e){var t=e.message,n={position:"absolute",top:"10px",left:"10px",backgroundColor:"white",border:"3px solid green",borderRadius:"3px",padding:"10px",width:"calc(100vw - 50px)"};if(null===t)return null;var r=t.type,o=t.personName,u=t.error;return"addSuccess"===r?a.a.createElement("div",{style:n},"Entry for ",o," has been added."):"deleteSuccess"===r?a.a.createElement("div",{style:n},"Entry for ",o," has been removed."):"updateSuccess"===r?a.a.createElement("div",{style:n},"Number for ",o," has been updated."):"updateError"===r?a.a.createElement("div",{style:Object(s.a)({},n,{border:"3px solid red"})},"Could not find entry for ",o,"."):"updateValidationError"===r?a.a.createElement("div",{style:Object(s.a)({},n,{border:"3px solid red"})},u,"."):"addError"===r?a.a.createElement("div",{style:Object(s.a)({},n,{border:"3px solid red"})},u):void 0},w=function(){var e=Object(r.useState)([]),t=Object(l.a)(e,2),n=t[0],o=t[1],u=Object(r.useState)(""),m=Object(l.a)(u,2),p=m[0],w=m[1],y=Object(r.useState)(""),N=Object(l.a)(y,2),g=N[0],j=N[1],O=Object(r.useState)(""),S=Object(l.a)(O,2),x=S[0],C=S[1],k=Object(r.useState)([]),P=Object(l.a)(k,2),F=P[0],T=P[1],L=Object(r.useState)(null),A=Object(l.a)(L,2),D=A[0],J=A[1];a.a.useEffect(function(){v().then(function(e){return console.log(e.data)||o(e.data)})},[]);var V=function(){return n.find(function(e){return e.name.toLowerCase()===p.toLowerCase()})};return a.a.createElement("div",null,a.a.createElement("h2",null,"Phonebook"),a.a.createElement("h3",null,"Filter"),a.a.createElement(i,{setPersonsFiltered:T,setFilter:C,persons:n,filter:x}),a.a.createElement("h3",null,"Add new entry"),a.a.createElement(h,{message:D}),a.a.createElement(d,{setNewName:w,setNewNumber:j,addName:function(e){if(e.preventDefault(),V()){if(!window.confirm("".concat(p," is already added to phonebook, replace the old number with new one?")))return;var t=V();(r=Object(s.a)({},t,{number:g}),console.log(r)||b.a.put("".concat(E,"/").concat(r.id),r)).then(function(){return v()}).then(function(e){return o(e.data)}).then(function(){return J({type:"updateSuccess",personName:p})}).then(function(){return setTimeout(function(){J(null)},2e3)}).catch(function(e){e.response.data.error?J({type:"updateValidationError",error:e.response.data.error}):J({type:"updateError",personName:p})}).then(function(){return setTimeout(function(){J(null)},2e3)})}else{var r;(function(e){return b.a.post(E,e)})({name:p,number:g}).then(function(e){o([].concat(Object(c.a)(n),[e.data]))}).then(function(){return J({type:"addSuccess",personName:p})}).then(function(){return setTimeout(function(){J(null)},2e3)}).catch(function(e){J({type:"addError",error:e.response.data.error}),console.log(e.response)}).then(function(){return setTimeout(function(){J(null)},4e3)}),w(""),j("")}},newName:p}),a.a.createElement("h3",null,"Numbers"),a.a.createElement(f,{filter:x,personsFiltered:F,persons:n,removePerson:function(e){var t;window.confirm("Are you sure you want to delete ".concat(e.name,"?"))&&(t=e.id,b.a.delete("".concat(E,"/").concat(t))).then(function(){return v()}).then(function(e){return o(e.data)}).then(function(){return J({type:"deleteSuccess",personName:e.name})}).then(function(){return setTimeout(function(){J(null)},2e3)})}}))};u.a.render(a.a.createElement(w,null),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.ea5a096a.chunk.js.map