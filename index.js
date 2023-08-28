const inputBtn = document.getElementById("input-btn")
let myLeads = []
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const saveBtn = document.getElementById("tab-btn")

const leadsFromStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromStorage){
    myLeads = leadsFromStorage
    render(myLeads)
}


saveBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
    
})

function render(leads){
    let listItems = ""
    for (let i= 0; i < leads.length; i++){
    // const li = document.createElement("li")
    // li.textContent = myLeads[i]
    // ulEl.append(li)
    //ulEl.innerHTML += "<li>" + myLeads[i] + "</li>"
     //listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
        //template string
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        ` 
    }
    ulEl.innerHTML = listItems
}


deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})



// localStorage.setItem("myLeads", "www.examplelead.com")
// localStorage.getItem("myLeads")
// localStorage.clear()




//let myLeads = `["myawesomeleads.com"]`

// turn thr myLeads string into an array
//      myLeads = JSON.parse(myLeads)
// push a new value to the array
//      myLeads.push("www.lead2.com")
//turn the array into a string again
//      myLeads = JSON.stringify(myLeads)
// console.log the string using typeof to verify that it's a string
//      console.log(typeof myLeads)