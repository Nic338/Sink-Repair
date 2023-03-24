import { getRequests, saveCompletion, fetchCompletions, getPlumbers } from "./dataAccess.js"

const plumbers = getPlumbers()


export const Completions = () => {
        const requests = getRequests()
        const convertCompletionsToList = (request) => {
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
        requests.map(convertCompletionsToList).join("")
    }
</ul>

`

return html
}