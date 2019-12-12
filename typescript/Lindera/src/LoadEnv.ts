import dotenv from 'dotenv';
import commandLineArgs from 'command-line-args';

// Setup command line options
const options = commandLineArgs([
    {
        name: 'env',
        alias: 'e',
        defaultValue: 'production',
        type: String,
    },
]);

// Set the env file
const environmentConfiguration = dotenv.config({
    path: `./env/${options.env}.env`,
});
if (environmentConfiguration.error) {
    throw environmentConfiguration.error;
}
