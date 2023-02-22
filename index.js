import "./navigo.js"

import { setActiveLink, adjustForMissingHash, renderTemplate, loadHtml } from "./utils.js"

//import { init } from "./pages/"



window.addEventListener("load", async () => {

    const templateForside = await loadHtml("./pages/forside/forside.html")
    const templateError = await loadHtml("./pages/error.html")
    
    

    adjustForMissingHash()

    const router = new Navigo("/", { hash: true});
    window.router = router
    router
        .hooks({
            before(done, match) {
                setActiveLink("menu", match.url)
                done()
            }
        })
        .on({
            
            "/": () => {
                renderTemplate(templateForside, "content")
                //init
            },
            "/xyz": () => {
                document.getElementById("surveybar").style.display = "block"
                document.getElementById("div-datepicker").style.display = "none"
                renderTemplate(xyztemplate, "content")
                //xyzinit
            }
        })
        .notFound(() => {
            renderTemplate(templateError, "content")
        })
        .resolve()  
});

window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
      + ' Column: ' + column + ' StackTrace: ' + errorObj);
  }
