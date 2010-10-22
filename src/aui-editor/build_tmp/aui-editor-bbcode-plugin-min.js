AUI.add("aui-editor-bbcode-plugin",function(S){var D=S.Lang,N=D.isArray,O=D.isString,J=S.ClassNameManager.getClassName,H="bbcodeplugin",R="bbcode",M="quote",T=J(M),Q=J(M,"content"),V=J(M,"title"),B="<{0}[^>]*>([\\s\\S]*?)</{0}>",E="<(([a-z0-9]+)\\b[^>]*?style=(\"|')[^:]*{0}\\s*:\\s*([^;\"']+);?[^>]*)>([\\s\\S]*?)<(/\\2)>",G="(<[a-z0-9]+[^>]*>|</[a-z0-9]+>)",K='<div class="quote"><div class="quote-content">',C='<div class="quote-title">$1</div><div class="quote"><div class="quote-content">',F="</div></div>",I="\\[(({0})=([^\\]]*))\\]([\\s\\S]*?)\\[\\/{0}\\]",P="\\[({0}[^\\[]*)\\]([\\s\\S]*?)\\[\\/{0}\\]",L=[{convert:[["br"]],regExp:"<{0}[^>]*>",output:"\n"},{convert:[{tags:["font-family"],source:["font"]},{tags:["font-size"],source:["size"]},{tags:["[^a-z-]*color"],source:["color"]}],regExp:E,output:"<$1>[{0}=$4]$5[/{0}]<$6>"},{convert:[{tags:["font-style"],source:["i"]},{tags:["font-weight"],source:["b"]}],regExp:E,output:"<$1>[{0}]$5[/{0}]<$6>"},{convert:[["text-align"]],regExp:E,output:"<$1>[$4]$5[/$4]<$6>"},{convert:[["margin-left"]],regExp:E,output:function(){var X="";var Y=parseInt(arguments[3]);if(!isNaN(Y)){var Z=Math.floor(Y/40);for(var A=0;A<Z;A++){X+="[indent]";}}X=X+arguments[5]+X.replace(/\[/g,"[/");return"<"+arguments[1]+">"+X+"<"+arguments[6]+">";}},{convert:[{tags:["font","size"],source:["size"]},{tags:["font","face"],source:["font"]}],regExp:"(<{0}\\b[^>]*{1}=(\"|')([^\"']+)(\"|')[^>]*>)([\\s\\S]*?)(</{0}>)",output:"$1[{0}=$3]$5[/{0}]$6"},{convert:[["blockquote"]],regExp:B,output:"[indent]$1[/indent]"},{convert:[["b"],["strong"]],regExp:B,output:"[b]$1[/b]"},{convert:[["i"],["em"]],regExp:B,output:"[i]$1[/i]"},{convert:[["u"]],regExp:B,output:"[u]$1[/u]"},{convert:[["s"],["strike"]],regExp:B,output:"[s]$1[/s]"},{convert:[["img"]],regExp:"(<a[^>]*>)?<{0}\\b[^>]*src=(\"|')([^\"']+)(\"|')[^>]*>(</a>)?",output:"[img]$3[/img]"},{convert:[["a"]],regExp:"<{0}\\b[^>]*href=(\"|')mailto:([^\"']+)(\"|')[^>]*>([\\s\\S]*?)</{0}>",output:"[email=$2]$4[/email]"},{convert:[["a"]],regExp:"<{0}\\b[^>]*href=(\"|')([^\"']+)(\"|')[^>]*>([\\s\\S]*?)</{0}>",output:"[url=$2]$4[/url]"},{convert:[["center"]],regExp:B,output:"[center]$1[/center]"},{convert:[["ul"]],regExp:B,output:"[list]$1[/list]"},{convert:[["ol"]],regExp:B,output:"[list=1]$1[/list]"},{convert:[["li"]],regExp:B,output:"[*]$1"},{convert:[["code"]],regExp:B,output:"[code]$1[/code]"},{convert:[["quote"]],regExp:"<div\\b[^>]*class=(\"|')_"+T+"s*[^\"']*(\"|')[^>]*>([\\s\\S]*?)</div>",output:"$3"},{convert:[["div"]],regExp:B,output:"$1\n"},{convert:[["h1"],["h2"],["h3"],["h4"],["h5"],["h6"]],regExp:B,output:"[b]$1[/b]\n"},{convert:[["p"]],regExp:B,output:"$1\n\n"}],W=[{convert:[{tags:["b"],source:["b"]},{tags:["i"],source:["i"]},{tags:["u"],source:["u"]},{tags:["s"],source:["s"]},{tags:["indent"],source:["blockquote"]},{tags:["code"],source:["code"]}],regExp:P,output:"<{0}>$2</{0}>"},{convert:[["list"]],regExp:P,output:function(){var Y="";if(arguments[1]=="list=1"){Y+="<ol>";}else{Y+="<ul>";}var A=D.trim(arguments[2]).split("[*]");for(var X=1;X<A.length;X++){Y+="<li>"+A[X]+"</li>";}if(arguments[1]=="list=1"){Y+="</ol>";}else{Y+="</ul>";}return Y;}},{convert:[{tags:["font"],source:["face"]},{tags:["size"],source:["size"]}],regExp:I,output:'<font {0}="$3">$4</font>'},{convert:[{tags:["color"],source:["color"]}],regExp:I,output:'<span style="{0}: $3;">$4</span>'},{convert:[["img"]],regExp:P,output:'<img src="$2" alt="" />'},{convert:[{tags:["email"],source:["mailto:"]},{tags:["url"],source:[""]}],regExp:I,output:'<a href="{0}$3">$4</a>'},{convert:[["left"],["center"],["right"]],regExp:P+"\n?",output:'<div style="text-align: $1;">$2</div>'},{convert:[["\n"]],regExp:"{0}",output:"<br />"}];var U=S.Component.create({NAME:H,NS:R,EXTENDS:S.Plugin.Base,ATTRS:{host:{value:false}},prototype:{initializer:function(){var A=this;var X=A.get("host");A.afterHostMethod("getContent",A.getBBCode,A);X.on("contentChange",A._contentChange,A);},getBBCode:function(){var A=this;var Z=A.get("host");var Y="";Y=Z.constructor.prototype.getContent.apply(Z,arguments);var a=S.Node.create("<div>"+Y+"</div>");var X=null;while(X=a.all("div."+T)){if(!X.size()){break;}X.each(function(g){var b=this;var f=null;var c=g;do{if(c){f=c;}c=c.one("div."+Q);}while(c!=null);var e=f.get("parentNode");var i=e.previous();var d="["+M;if(i&&i.hasClass(V)){var h=i.html();h=h.replace(new RegExp(G,"ig"),"");d+="="+(h.charAt(h.length-1)==":"?h.substring(0,h.length-1):i.html());i.remove(true);}d+="]"+f.html()+"[/"+M+"]";e.html(d);e.removeClass(M);e.addClass("_"+M);},A);}Y=a.html();Y=A._parseTagExpressions(L,Y);Y=Y.replace(new RegExp(G,"ig"),"");return new S.Do.AlterReturn(null,Y);},getContentAsHtml:function(){var A=this;var Y=A.get("host");var X="";X=Y.constructor.prototype.getContent.apply(Y,arguments);return X;},_contentChange:function(Z){var A=this;var Y=A.get("host");var X=Z.newVal;X=X.replace(/\[quote=([^\]]*)\]/ig,K);X=X.replace(/\[quote\]/ig,C);X=X.replace(/\[\/quote\]/ig,F);X=A._parseTagExpressions(W,X);Z.newVal=X;Z.halt();},_parseTagExpressions:function(b,d){var A=this;for(var c=0;c<b.length;c++){for(var a=0;a<b[c].convert.length;a++){var Z=null;var X=b[c].output;if(N(b[c].convert[a])){Z=b[c].convert[a];}else{Z=b[c].convert[a].tags;if(O(b[c].output)){X=D.sub(b[c].output,b[c].convert[a].source);}}var Y=D.sub(b[c].regExp,Z);d=d.replace(new RegExp(Y,"ig"),X);}}return d;}}});S.namespace("Plugin").BBCodePlugin=U;},"@VERSION@",{requires:["aui-base","editor-base"]});