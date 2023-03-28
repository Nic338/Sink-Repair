const applicationState = {
    requests:[],
    plumbers:[],
    completions:[]
}
const mainContainer = document.querySelector("#container")

const API = "https://sink-repair-api-nic-b2x4b.ondigitalocean.app/"

export const fetchRequests = () => {
    return fetch("https://sink-repair-api-nic-b2x4b.ondigitalocean.app/requests")
    .then(response => response.json())
    .then(
        (serviceRequests) => {
            // Store the external state in application state
            applicationState.requests = serviceRequests
        }
        )
    }
    
    
    export const getRequests = () => {
        return applicationState.requests.map(request => ({...request}))
    }


    export const sendRequest = (userServiceRequest) => {
        const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch("https://sink-repair-api-nic-b2x4b.ondigitalocean.app/requests", fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}


export const fetchPlumbers = () => {
    return fetch("https://sink-repair-api-nic-b2x4b.ondigitalocean.app/plumbers")
    .then(response => response.json())
    .then(
        (data) => {
            applicationState.plumbers = data
        }
        )
    }

    export const getPlumbers = () => {
        return applicationState.plumbers.map(plumber => ({...plumber}))
    }
    
    export const deleteRequest = (id) => {
        return fetch(`https://sink-repair-api-nic-b2x4b.ondigitalocean.app/requests/${id}`, { method: "DELETE" })
            .then(
                () => {
                    mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
                }
            )
    }
    
    export const saveCompletion = (serviceCompletion) => {
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(serviceCompletion)
        }
    return fetch("https://sink-repair-api-nic-b2x4b.ondigitalocean.app/completions", fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}



export const fetchCompletions = () => {
    return fetch("https://sink-repair-api-nic-b2x4b.ondigitalocean.app/completions")
    .then(response => response.json())
    .then(
        (data) => {
            applicationState.completions = data
        }
    )
}

export const getCompletions = () => {
    let jumbledRequests = applicationState.completions.map(request => ({...request}))
    let sortedRequests = jumbledRequests.sort((a , b) =>
    a.workComplete - b.workComplete
    )
    return sortedRequests

}