var reporter = require('cucumber-html-reporter');

var options = {
    theme: 'bootstrap',
    jsonFile: './report/example1.json',
    output: './report/example1.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    metadata: {
        "App Version":"0.3.2",
        "Test Environment": "STAGING",
        "Browser": "Chrome  54.0.2840.98",
        "Platform": "Windows 10",
        "Parallel": "Scenarios",
        "Executed": "Remote"
    },
    customData: {
        title: "Automation Run",
        data: [
            { label: "Project", value: "Calculator project" },
            { label: "Release", value: "1.0.0" },
            { label: "Sprint", value: "1" }
        ]
    }
};

reporter.generate(options);