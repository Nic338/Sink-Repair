import { getRequests, deleteRequest, fetchPlumbers, saveCompletion, fetchCompletions, getPlumbers } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")
const completions = fetchCompletions()

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")
            
            /*
            This object should have 3 properties
            1. requestId
            2. plumberId
            3. date_created
            */
            
           const completion = {
            requestId: parseInt(requestId),
            plumberId: parseInt(plumberId),
            date_created: new Date().toISOString()
            }
           saveCompletion(completion)
           /*
           Invoke the function that performs the POST request
           to the `completions` resource for your API. Send the
           completion object as a parameter.
           */
          
        }
    }
    )
    export const Requests = () => {
        const plumbers = getPlumbers()
        // console.log(plumbers)
        const requests = getRequests()
        // console.log(requests)
        const convertRequestsToList = (request) => {
            return `
            <li>
            ${request.description}
            <select class="plumbers" id="plumbers">
            <option value="">Choose</option>
            ${
                plumbers.map(
                    plumber => {
                        return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
    }
</select>
        <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
    </li>`
    

}
    let html = `
        <ul>
            ${
                requests.map(convertRequestsToList).join("")
            }
        </ul>
        
    `
    
    return html
}
