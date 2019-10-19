const report = require("simple-cucumber-html-reporter");

report.generate({
    jsonDir: "./report",
    reportPath: "./report",
    metadata: {
        browser: {
            name: "chrome",
            version: "60"
        },
        device: "Local test machine",
        platform: {
            name: "ubuntu",
            version: "16.04"
        }
    },
    customData: {
        title: "Automation Run",
        data: [
            { label: "Project", value: "Calculator project" },
            { label: "Release", value: "1.0.0" },
            { label: "Sprint", value: "1" }
        ]
    }
});