const https = require('https');
const core = require('@actions/core');
const github = require('@actions/github');

try {

    const validEmailsUrl = core.getInput('valid-emails-url');
    console.log(validEmailsUrl);

    https.get(validEmailsUrl, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {

            const emailList = JSON.parse(data);

            console.log(emailList);

            committer_email = github.context.payload.head_commit.committer.email;

            if (emailList.includes(committer_email) === false) {

                core.setFailed(`Committer email ${committer_email} is not compliant`);
            }

            console.log(`Committer email: ${committer_email}`);

        });
        
    }).on("error", (err) => {

        console.log("Error: " + err.message);
    });

} catch (error) {

  core.setFailed(error.message);
}
