AUI.add("aui-paginator",function(ag){var W=ag.Lang,f=W.isArray,aw=W.isBoolean,au=W.isFunction,N=W.isNumber,F=W.isObject,aD=W.isString,B="alwaysVisible",o="boundingBox",C="circular",c="container",I="containers",ab="content",ap="current",V=".",x="first",ai="firstPageLink",aK="firstPageLinkLabel",g="last",K="lastPageLink",aG="lastPageLinkLabel",ac="link",al="maxPageLinks",m="next",at="nextPageLink",af="nextPageLinkLabel",az="option",p="page",w="pageContainerTemplate",J="pageLinkContent",H="pageLinkTemplate",e="pageReportEl",u="pageReportLabelTemplate",ak="paginator",av="per",ax="prev",j="prevPageLink",b="prevPageLinkLabel",Z="report",k="rows",aj="rowsPerPage",aF="rowsPerPageEl",t="rowsPerPageOptions",M="select",aA="selected",r=" ",S="state",ar="template",ae="total",O="totalEl",U="totalLabel",ad="totalPages",aE=function(){return Array.prototype.slice.call(arguments).join(r);},aH=function(A){return(A instanceof ag.NodeList);},aI=function(A){return parseInt(A,10)||0;},E=ag.ClassNameManager.getClassName,y=E(ak),s=E(ak,c),am=E(ak,ab),z=E(ak,ap,p),aJ=E(ak,x,ac),l=E(ak,g,ac),aB=E(ak,ac),d=E(ak,m,ac),a=E(ak,p,c),ao=E(ak,p,ac),v=E(ak,ap,p,Z),an=E(ak,ax,ac),q=E(ak,k,av,p),i=E(ak,ae),T="(Total {total})",Q="({page} of {totalPages})",Y="{FirstPageLink} {PrevPageLink} {PageLinks} {NextPageLink} {LastPageLink} {CurrentPageReport} {Total} {RowsPerPageSelect}",aq="&gt;",P="&lt;",h='<a href="#" class="'+aE(aB,aJ)+'"></a>',aa='<a href="#" class="'+aE(aB,l)+'"></a>',G='<a href="#" class="'+aE(aB,d)+'"></a>',aC="<span></span>",X='<a href="#"></a>',n='<span class="'+aE(v)+'"></span>',ay='<a href="#" class="'+aE(aB,an)+'"></a>',ah='<select class="'+q+'"></select>',R='<span class="'+aE(i)+'"></span>';var D=ag.Component.create({NAME:ak,ATTRS:{alwaysVisible:{value:true,validator:aw},circular:{value:false,validator:aw},containers:{writeOnce:true,setter:function(L){var A=this;if(aH(L)){return L;}else{if(aD(L)){return ag.all(L);}}return new ag.NodeList([L]);}},firstPageLink:{setter:ag.one,valueFn:function(){var A=this.get(aK);return ag.Node.create(h).html(A);}},firstPageLinkLabel:{value:x,validator:aD},lastPageLink:{setter:ag.one,valueFn:function(){var A=this.get(aG);return ag.Node.create(aa).html(A);}},lastPageLinkLabel:{value:g,validator:aD},maxPageLinks:{value:10,getter:function(A){var L=this.get(ad);return Math.min(L,A);},validator:N},nextPageLink:{setter:ag.one,valueFn:function(){var A=this.get(af);return ag.Node.create(G).html(A);}},nextPageLinkLabel:{value:aE(m,aq),validator:aD},page:{setter:aI,value:1},pageContainerTemplate:{getter:function(A){return ag.Node.create(A).addClass(a);},value:aC,validator:aD},pageLinkContent:{value:function(aL,A,L){aL.html(A);},validator:au},pageLinkTemplate:{getter:function(A){var L=ag.Node.create(A);return L.addClass(aE(aB,ao));},value:X,validator:aD},pageReportEl:{setter:ag.one,valueFn:function(){var A=this.get(u);return ag.Node.create(n).html(A);}},pageReportLabelTemplate:{getter:function(){var A=this;return ag.substitute(Q,{page:A.get(p),totalPages:A.get(ad)});},validator:aD},prevPageLink:{setter:ag.one,valueFn:function(){var A=this.get(b);return ag.Node.create(ay).html(A);}},prevPageLinkLabel:{value:aE(P,ax),validator:aD},rowsPerPageOptions:{value:{},validator:f},rowsPerPage:{setter:aI,value:1},rowsPerPageEl:{setter:ag.one,getter:function(aM){var A=this;var L=aM.all(az);L.removeAttribute(aA);var aL=L.filter("[value="+A.get(aj)+"]");if(aL){aL.setAttribute(aA,aA);}return aM;},valueFn:function(){return ag.Node.create(ah);}},state:{setter:"_setState",getter:"_getState",value:{},validator:F},template:{getter:"_getTemplate",writeOnce:true,value:Y,validator:aD},total:{setter:function(A){return this._setTotal(A);},value:0,validator:N},totalEl:{setter:ag.one,getter:function(){var A=this.get(U);return ag.Node.create(R).html(A);}},totalLabel:{getter:function(){var A=this;return ag.substitute(T,{total:A.get(ae)});},validator:aD},totalPages:{readOnly:true,getter:function(A){return Math.ceil(this.get(ae)/this.get(aj));}}},prototype:{lastState:null,templatesCache:null,renderUI:function(){var A=this;var L=A.get(I);L.unselectable();A._renderRowsPerPageOptions();A._renderTemplateUI();L.addClass(s);},bindUI:function(){var A=this;A._delegateDOM();A.publish("changeRequest");A.after("stateChange",ag.bind(A._afterSetState,A));A.before("stateChange",ag.bind(A._beforeSetState,A));A.after("maxPageLinksChange",ag.bind(A._renderTemplateUI,A));A.after("rowsPerPageChange",ag.bind(A._renderTemplateUI,A));A.after("totalChange",ag.bind(A._renderTemplateUI,A));},syncUI:function(){var A=this;A.changeRequest();},destructor:function(){var A=this;A.get(I).remove(true);},_syncPageLinksUI:function(){var A=this;var aM=A.get(I);var aL=A.get(p);var L=A.calculateRange(aL);aM.each(function(aP){var aO=0;var aN=L.start;var aR=aP.all(V+ao);if(aR){aR.removeClass(z);while(aN<=L.end){var aQ=aR.item(aO);A.get(J).apply(A,[aQ,aN,aO]);aQ.setAttribute(p,aN);if(aN==aL){aQ.addClass(z);}aO++;aN++;}}});},_syncPageReportUI:function(L){var A=this;var aL=A.get(I);aL.each(function(aM){var aN=aM.one(V+v);if(aN){aN.html(A.get(u));}});},calculateRange:function(aM){var A=this;var aL=A.get(ad);var aP=A.get(al);var aN=Math.ceil(aP/2);var aO=Math.min(Math.max(aM-aN,1),(aL-aP+1));var L=Math.min(aO+aP-1,aL);return{start:aO,end:L};},changeRequest:function(){var A=this;var aM=A.get(S);if(A.get(C)){var aL=aM.page;var L=aM.totalPages;if(aM.before&&(aM.before.page==aL)){if(aL<=1){aM.page=L;}else{if(aL>=L){aM.page=1;}}A.set(S,aM);}}A.fire("changeRequest",{state:aM});},eachContainer:function(L){var A=this;A.get(I).each(function(aL){if(aL){L.apply(A,arguments);}});},hasNextPage:function(){var A=this;return A.hasPage(A.get(p)+1);},hasPage:function(aL){var A=this;var L=A.get(ad);return((aL>0)&&(aL<=L));},hasPrevPage:function(){var A=this;return A.hasPage(A.get(p)-1);},_renderRowsPerPageOptions:function(){var A=this;var aL=0;var L=A.get(aF);var aM=A.get(t);ag.each(aM,function(aN){L.getDOM().options[aL++]=new Option(aN,aN);});},_renderTemplateUI:function(){var A=this;
var L=A.get(I);A.templatesCache=null;L.html(A.get(ar));A._syncPageLinksUI();A._syncPageReportUI();A._bindDOMEvents();},setState:function(L){var A=this;A.set(S,L);},_getState:function(L){var A=this;return{before:A.lastState,paginator:A,page:A.get(p),total:A.get(ae),totalPages:A.get(ad),rowsPerPage:A.get(aj)};},_getTemplate:function(L){var A=this;var aL=function(aQ){return A.get(aQ).outerHTML();};if(!A.templatesCache){var aO=0;var aN=A.get(ad);var aP=A.get(al);var aM=A.get(w);while(aO++<aP){aM.append(A.get(H));}A.templatesCache=ag.substitute(L,{CurrentPageReport:aL(e),FirstPageLink:aL(ai),LastPageLink:aL(K),NextPageLink:aL(at),PageLinks:aM.outerHTML(),PrevPageLink:aL(j),RowsPerPageSelect:aL(aF),Total:aL(O)});}return A.templatesCache;},_setState:function(L){var A=this;ag.each(L,function(aM,aL){A.set(aL,aM);});return L;},_setTotal:function(aL){var A=this;var L=A.get(B);var aM=A.get(I);if(!L&&(aL===0)){aM.hide();}else{aM.show();}return aL;},_afterSetState:function(L){var A=this;A._syncPageLinksUI();A._syncPageReportUI();},_beforeSetState:function(L){var A=this;A.lastState=L.prevVal;},_onClickFirstLinkEl:function(L){var A=this;A.set(p,1);A.changeRequest();L.halt();},_onClickPrevLinkEl:function(L){var A=this;var aL=A.get(p);A.set(p,(A.hasPrevPage()?aL-1:aL));A.changeRequest();L.halt();},_onClickPageLinkEl:function(aL){var A=this;var L=aL.currentTarget.attr(p);A.set(p,L);A.changeRequest();aL.halt();},_onClickNextLinkEl:function(L){var A=this;var aL=A.get(p);A.set(p,(A.hasNextPage()?aL+1:aL));A.changeRequest();L.halt();},_onClickLastLinkEl:function(aL){var A=this;var L=A.get(ad);A.set(p,L);A.changeRequest();aL.halt();},_bindDOMEvents:function(){var A=this;A.eachContainer(function(aL){var L=aL.one(V+q);if(L){L.val(A.get(aj));L.detach("change");L.on("change",function(aN){var aM=A.get(aj);try{aM=aN.target.val();}catch(aO){}A.set(p,1);A.set(aj,aM);A.changeRequest();});}});},_delegateDOM:function(){var A=this;A.eachContainer(function(aL,L){aL.delegate("click",ag.bind(A._onClickFirstLinkEl,A),V+aJ);aL.delegate("click",ag.bind(A._onClickPrevLinkEl,A),V+an);aL.delegate("click",ag.bind(A._onClickPageLinkEl,A),V+ao);aL.delegate("click",ag.bind(A._onClickNextLinkEl,A),V+d);aL.delegate("click",ag.bind(A._onClickLastLinkEl,A),V+l);});}}});ag.Paginator=D;},"@VERSION@",{skinnable:true,requires:["aui-base","substitute"]});