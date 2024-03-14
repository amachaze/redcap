function convertToCSV(data, customHeaders = null) {
    const csvRows = []

    // Extract the keys from the first object as the CSV headers
    const headers = customHeaders || Object.keys(data[0])

    csvRows.push(headers.join(','))

    // Convert each object into a CSV row
    for (const obj of data) {
        const values = headers.map((header) => {
            const escapedValue =
                obj[header] === null || obj[header] === undefined
                    ? ''
                    : String(obj[header]).replace(/"/g, '""')
            return `"${escapedValue}"`
        })
        csvRows.push(values.join(','))
    }

    // Combine all CSV rows into a single string
    return csvRows.join('\n')
}

function downloadCSV(data, fileName, headers = null) {
    const csvContent = convertToCSV(data, headers)
    const fileType = 'text/csv;charset=utf-8;'
    download(csvContent, { fileName, fileType })
}

const download = (
    text,
    { fileName = 'download.txt', fileType = 'text/plain' }
) => {
    // Create a Blob with the text content
    const blob = new Blob([text], { type: fileType })

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob)

    // Create a virtual anchor element
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = fileName

    // Programmatically trigger a click event on the anchor
    anchor.click()

    // Clean up the temporary URL
    URL.revokeObjectURL(url)
}

function csvToJson(csv, separator = ',', enclosure = '"') {
    var lines = csv.split('\n')
    var result = []

    // Function to split a line with respect to the enclosure character
    function splitLine(line) {
        let pattern = new RegExp(
            // Match the enclosure followed by anything until the next enclosure, or match non-separator characters
            `${enclosure}([^${enclosure}]*)${enclosure}|[^${separator}]+`,
            'g'
        )
        return line.match(pattern).map((field) =>
            // Remove the enclosure characters if present
            field.startsWith(enclosure) && field.endsWith(enclosure)
                ? field.slice(1, field.length - 1)
                : field
        )
    }

    var headers = splitLine(lines[0])

    for (var i = 1; i < lines.length; i++) {
        var obj = {}
        var currentline = splitLine(lines[i])

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j]
        }

        result.push(obj)
    }

    return result
}

export { convertToCSV, downloadCSV, csvToJson, download }
