const SERVER_HOST = "http://192.168.69.207";
/* Change with the url of the control-panel flask server */
const controlPanelServerUrl =
    SERVER_HOST + ":8081"; /* example http://192.168.69.207:8081 */

// Define your variables
const modelsDirectoryListing = SERVER_HOST + ":8080";
const tfjsFileServer = SERVER_HOST + ":5500";
const tensorboard = SERVER_HOST + ":6006";

window.onload = () => {
    // Get the anchor tags
    const links = document.querySelectorAll("nav a");

    // Set the href for each link
    links[0].href = modelsDirectoryListing;
    links[1].href = tfjsFileServer;
    links[2].href = tensorboard;
};

if (controlPanelServerUrl) {
    listProcesses();
    getLogs();
    getEvaluationLogs();
    getModels();
} else {
    alert(
        "Please set the controlPanelServerUrl in /control-panel/static/index.js"
    );
    throw Error("Please set the controlPanelServerUrl");
}

document
    .getElementById("get_logs")
    .addEventListener("click", () => setInterval(getLogs, 5000));
document
    .getElementById("get_evaluation_logs")
    .addEventListener("click", () => setInterval(getEvaluationLogs, 5000));
document
    .getElementById("list_processes")
    .addEventListener("click", () => setInterval(listProcesses, 5000));
document.getElementById("get_models").addEventListener("click", getModels);
document.getElementById("start_training").addEventListener("click", () => {
    // Send a POST request to the server to start the training
    const res = confirm("Start Training ?");
    if (!res) return;
    fetch(controlPanelServerUrl + "/start_training", {
        method: "POST",
    })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
            console.log(data.message);
        })
        .catch((error) => {
            alert("Error:", error);
            console.error("Error:", error);
        })
        .finally(() => {
            listProcesses();
            getLogs();
        });
});

// Fetch the file contents from the server
fetch(controlPanelServerUrl + "/hyperparameters")
    .then((response) => {
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((config) => {
        // Create a form with an input field for each parameter in the configuration
        let form = '<form id="configForm">';
        for (const parameter in config) {
            if (parameter === "MODEL") {
                // Create a select dropdown for the model
                form += `
            <label for="${parameter}">${parameter}:</label>
            <select id="${parameter}" name="${parameter}">
                <option value="RESNET50" ${
                    config.MODEL === "RESNET50" ? "selected" : ""
                }>RESNET50</option>
                <option value="VGG16" ${
                    config.MODEL === "VGG16" ? "selected" : ""
                }>VGG16</option>
                <option value="VGG19" ${
                    config.MODEL === "VGG19" ? "selected" : ""
                }>VGG19</option>
                <option value="INCEPTION_V3" ${
                    config.MODEL === "INCEPTION_V3" ? "selected" : ""
                }>INCEPTION_V3</option>
                <option value="XCEPTION" ${
                    config.MODEL === "XCEPTION" ? "selected" : ""
                }>XCEPTION</option>
                <option value="EFFICIENTNET_B0" ${
                    config.MODEL === "EFFICIENTNET_B0" ? "selected" : ""
                }>EFFICIENTNET_B0</option>
                <option value="MOBILENET" ${
                    config.MODEL === "MOBILENET" ? "selected" : ""
                }>MOBILENET</option>
                <option value="MOBILENETV2" ${
                    config.MODEL === "MOBILENETV2" ? "selected" : ""
                }>MOBILENETV2</option>
                <option value="MOBILENETV3SMALL" ${
                    config.MODEL === "MOBILENETV3SMALL" ? "selected" : ""
                }>MOBILENETV3SMALL</option>
                <option value="MOBILENETV3LARGE" ${
                    config.MODEL === "MOBILENETV3LARGE" ? "selected" : ""
                }>MOBILENETV3LARGE</option>
                <option value="DENSENET121" ${
                    config.MODEL === "DENSENET121" ? "selected" : ""
                }>DENSENET121</option>
            </select>
            <br>
            `;
            } else {
                form += `
            <label for="${parameter}">${parameter}:</label>
            <input type="text" id="${parameter}" name="${parameter}" value="${config[parameter]}">
            <br>
            `;
            }
        }
        form += '<input type="submit" value="Update"></form>';

        // Add the form to the page
        document.getElementById("params").innerHTML = form;

        // Add an event listener to the form
        document
            .getElementById("configForm")
            .addEventListener("submit", function (event) {
                event.preventDefault();

                // Get the new values from the input fields
                const newConfig = {};
                for (const parameter in config) {
                    newConfig[parameter] =
                        document.getElementById(parameter).value;
                }

                // Send a POST request to the server to update the configuration
                fetch(controlPanelServerUrl + "/update_config", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newConfig),
                })
                    .then((response) => {
                        if (!response.ok) {
                            alert("Error: ", response);
                            throw new Error(
                                `HTTP error! status: ${response.status}`
                            );
                        }

                        alert("Success");
                        return response.json();
                    })
                    .then((data) => {
                        console.log("Updated configuration:", data);
                        // Update the input fields with the updated values
                        for (const parameter in data) {
                            document.getElementById(parameter).value =
                                data[parameter];
                        }
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            });
    })
    .catch((e) => {
        console.log(
            "There was a problem with the fetch operation: " + e.message
        );
    });

function getEvaluationLogs() {
    // Send a GET request to the server to get the logs
    fetch(controlPanelServerUrl + "/get_evaluation_logs", {
        method: "GET",
    })
        .then((response) => response.text())
        .then((data) => {
            // Create a preformatted text element to display the logs
            const pre = document.createElement("pre");
            pre.textContent = data;

            // Add the text element to the page
            document.getElementById("evaluation_logs").innerHTML =
                "<pre>" + data + "</pre>";
        })
        .catch((error) => {
            alert("Error:", error);
            console.error("Error:", error);
        });
}

function getLogs() {
    // Send a GET request to the server to get the logs
    fetch(controlPanelServerUrl + "/get_logs", {
        method: "GET",
    })
        .then((response) => response.text())
        .then((data) => {
            // Create a preformatted text element to display the logs
            const pre = document.createElement("pre");
            pre.textContent = data;

            // Add the text element to the page
            document.getElementById("logs").innerHTML =
                "<pre>" + data + "</pre>";
        })
        .catch((error) => {
            alert("Error:", error);
            console.error("Error:", error);
        });
}

function createTree(container, obj) {
    if (typeof obj === "object") {
        container.innerHTML = JSON.stringify(obj, null, 2)
            .replace(/: null/g, ": {}")
            .replace(/"/g, "")
            .replace(/,/g, "")
            .replace(/{/g, "<ul><li>")
            .replace(/}/g, "</li></ul>")
            .replace(/:/g, "</li><li>");
        container.firstChild.innerHTML = container.firstChild.innerHTML.replace(
            /<li>/g,
            '<li onclick="handleClick(this)">'
        );
    } else {
        console.error("Unexpected data format:", obj);
    }
}

function handleClick(li) {
    const filePath = li.textContent.trim();
    fetch("/run_command", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ file_path: filePath }),
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
}

function getModels() {
    fetch("/get_models")
        .then((response) => response.json())
        .then((models) => {
            const modelsContainer = document.getElementById("models");
            modelsContainer.innerHTML = ""; // Clear the existing contents
            createSubItems(models, modelsContainer);
        });
}

function createSubItems(node, parentElement, path = "") {
    for (const item in node) {
        const newPath = path ? `${path}/${item}` : item;
        if (node[item] === null) {
            // If the item is a file
            if (item.endsWith(".keras") || item.endsWith(".h5") ) {
                // Create a new div element
                const div = document.createElement("div");
                div.className = "flex-container";

                // Create a new model element (p tag)
                const modelElement = document.createElement("p");
                modelElement.textContent = item;
                modelElement.className = "model";

                // Create a new button element
                const button = document.createElement("button");
                button.textContent = "Test";
                button.className = "test-button";
                button.onclick = function () {
                    fetch("/start_testing", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ model: newPath }),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            alert("Success:", data);
                            console.log("Success:", data);
                        })
                        .catch((error) => {
                            alert("Error:", error);
                            console.error("Error:", error);
                        })
                        .finally(() => {
                            listProcesses();
                            getEvaluationLogs();
                        });
                };
                // Create a new button element
                const convertBtn = document.createElement("button");
                convertBtn.textContent = "Convert TFJS";
                convertBtn.className = "convert-button";
                convertBtn.onclick = function () {
                    fetch("/convert", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ model: newPath.replace("models/", "") }),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            alert("Success:", data);
                            console.log("Success:", data);
                        })
                        .catch((error) => {
                            alert("Error:", error);
                            console.error("Error:", error);
                        });
                };

                // Append the model and the button to the div
                div.appendChild(modelElement);
                div.appendChild(button);
                div.appendChild(convertBtn);

                // Append the div to the parent element
                parentElement.appendChild(div);
            } else if (
                item.endsWith(".txt") ||
                item.endsWith(".json") ||
                item.endsWith(".png") ||
                item.endsWith(".jpg") ||
                item.endsWith(".jpeg")
            ) {
                // Create a new link element
                const linkElement = document.createElement("a");
                linkElement.href = `http://192.168.69.207:8080/${newPath.replace(
                    "models/",
                    ""
                )}`; // remove the initial "models/" part
                linkElement.textContent = item;
                linkElement.target = "_blank"; // open in a new tab
                linkElement.className = "file-link";

                // Append the link to the parent element
                parentElement.appendChild(linkElement);
            }
        } else {
            // If the item is a folder
            const detailsElement = document.createElement("details");
            const summaryElement = document.createElement("summary");
            const tBtn = document.createElement("button");
            tBtn.textContent = "Start Tensorboard";
            tBtn.addEventListener("click", () => {
                fetch("/start_tensorboard", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ logdir: newPath.replace("models/", "") }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        alert("Success", data);
                        console.log("Success:", data);
                    })
                    .catch((error) => {
                        alert("Error", error);
                        console.error("Error:", error);
                    })
                    .finally(() => {
                        listProcesses();
                    });
            });
            summaryElement.textContent = item;
            detailsElement.appendChild(summaryElement);
            if (item == "logs") {
                detailsElement.appendChild(tBtn);
            }
            createSubItems(node[item], detailsElement, newPath);
            parentElement.appendChild(detailsElement);
        }
    }
}

// Function to list the running processes
function listProcesses() {
    fetch(controlPanelServerUrl + "/processes", {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
            // Create a list with an item for each process
            let list = '<ul class="process-list">';
            for (const process of data) {
                list += `
                    <li>
                        <h3>${process.name}</h3>
                        <p><strong>PID:</strong> ${process.pid}</p>
                        <p><strong>Start Time:</strong> ${new Date(
                            process.start_time * 1000
                        ).toLocaleString()}</p>
                        <p><strong>Running Time:</strong> ${Math.floor(
                            process.running_time / 3600
                        )}h ${
                    Math.floor(process.running_time / 60) % 60
                }m ${Math.floor(process.running_time % 60)}s</p>
                        <p><strong>Command:</strong> ${process.cmdline}</p>
                        <button onclick="stopProcess('${
                            process.pid
                        }')">Stop</button>
                    </li>
                `;
            }
            list += "</ul>";

            // Add the list to the page
            document.getElementById("processes").innerHTML = list;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

// Function to stop a specific process
function stopProcess(process_id) {
    const res = confirm("Stop process ?");
    if (!res) return;
    fetch(controlPanelServerUrl + "/stop_process/" + process_id, {
        method: "POST",
    })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
            console.log(data.message);
        })
        .catch((error) => {
            alert("Error:", error);
            console.error("Error:", error);
        })
        .finally(listProcesses);
}
