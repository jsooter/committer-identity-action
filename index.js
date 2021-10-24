const request = require('request');
const core = require('@actions/core');
const github = require('@actions/github');

try {

    const validEmailsUrl = core.getInput('valid-emails-url');

    request(validEmailsUrl, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        
        console.log(res.toJSON());

        committer_email = github.context.payload.head_commit.committer.email;

        if (committer_email != 'josh-sooter@pluralsight.com') {

            core.setFailed(`Committer email ${committer_email} is is not compliant`);
        }

        console.log(`Committer email: ${committer_email}`);
    });

} catch (error) {
    
  core.setFailed(error.message);
}
