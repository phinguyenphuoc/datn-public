const stripe = require('stripe')('sk_test_51HmJteHcZqoAfgJmAngCsK8vkon8zGmfqvCcPS5q286GRxIfxr8E0qjLACyttQwMsN3CLDcLWK4BnMCG3IiBhSXv00dMMjH21w');


const createAccount = async () => {
  const account = await stripe.accounts.create({
    type: 'express',
  });
  console.log({ account })
  return account.id
}

const createAccountConnectedLink = async (account) => {
  const account_id = await createAccount()
  const accountLink = await stripe.accountLinks.create({
    account: account_id,
    refresh_url: 'https://musicalelearning.club',
    return_url: 'https://musicalelearning.club',
    type: 'account_onboarding',
  });
  console.log({ accountLink })
  return accountLink
}

createAccountConnectedLink();