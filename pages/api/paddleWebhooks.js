

const {verifyPaddleWebhook} = require('verify-paddle-webhook');

export default async function handler(req, res) {
if(!req.body) return res.status(401).json({error: 'No req body found'});


console.log('HIT PADDLE WEBHOOK');

if (verifyPaddleWebhook(process.env.PADDLE_PUBLIC_KEY, req.body)) {
    console.log('Webhook is valid!');

    // process the webhook
    //I need to get the alert name, then save the following data to firestore in the users collection under the user's uid: cancelUrl, updateUrl,paddleUserId, nextBillDate, subscriptionStartDate, subscriptionID

if(req.body.alert_name === 'subscription_created') {
console.log(req.body)
res.status(200).json({success: true});
}


}else{
    res.status(401).json({error: 'Webhook is not valid  '});
}

}

