const {verifyPaddleWebhook} = require('verify-paddle-webhook');

export default async function handler(req, res) {
if(!req.body) return res.status(401).json({error: 'No req body found'});



if (verifyPaddleWebhook(process.env.PADDLE_PUBLIC_KEY, req.body)) {
    console.log('Webhook is valid!');
    // process the webhook

if(req.body.alert_name === 'subscription_created') {
console.log(req.body)
res.status(200).json({success: true});
}


}

}