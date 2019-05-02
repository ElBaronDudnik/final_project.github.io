var iframe = document.getElementsByTagName('iframe')[0];
var iframeDoc = iframe.contentWindow.document;
console.log(iframeDoc.readyState)
  if (iframeDoc.readyState == 'uninitialized') {
    iframe.style.display = "none";
    	
  }



