'use strict';

(function(window) {

  function rewriter(url){
    // put a ? before the first query param expression, doing so will allow
    // angular to nicely consume the values and make them available through
    // the $location.search() api
    var match = url.match(/([^#&?]+=[^#&?]+)/g,'?$1');
    if(match){
      var a = url.replace(match.join('&'),'');
      a = a.replace(/[&?]$/,'');
      return a + '?' + match.join('&');
    }else{
      return url;
    }

  }
  window.SpHashUrlRewriter = rewriter;
})(window);