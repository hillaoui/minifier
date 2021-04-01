var inputs = document.getElementsByTagName("textarea");

function minify() {
    inputs[1].value = inputs[0].value
        .replace(/([^0-9a-zA-Z\.#])\s+/g, "$1")
        .replace(/\s([^0-9a-zA-Z\.#]+)/g, "$1")
        .replace(/;}/g, "}")
        .replace(/\/\*.*?\*\//g, "");
}

document.getElementById('file-input')
    .addEventListener('change', getFile)

function getFile(event) {
    const input = event.target
    if ('files' in input && input.files.length > 0) {
        for (let i = 0; i < input.files.length; i++) {
            placeFileContent(
                document.getElementById('content-target'),
                input.files[i])
        }
    }
}

function placeFileContent(target, file) {
    readFileContent(file).then(content => {
        target.value += content
    }).catch(error => console.log(error))
}

function readFileContent(file) {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result)
        reader.onerror = error => reject(error)
        reader.readAsText(file)
    })
}