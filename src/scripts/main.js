import { SinkRepair } from "./SinkRepair.js"
import { fetchRequests } from "./dataAccess.js"
import { fetchPlumbers } from "./dataAccess.js"
import { fetchCompletions } from "./dataAccess.js"
const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests()
    .then(() => fetchPlumbers())
    .then(() => fetchCompletions())
    .then(
        () => {
            mainContainer.innerHTML = SinkRepair()
        }
    )
}

render()

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)