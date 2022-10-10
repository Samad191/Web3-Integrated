------ EVENT LISTENER -------
- First click on the Event Listener and initialize the listener
- Then activate the MM
- Then send the transaction 

------ SPEED UP TRANSACTION -------
- we send a tx with low gas so it stucks
- then we get the nonce of the tx. It is done by getting the latest
    tx of the sending account.
- we create a raw tx and manually add the nonce we acquired from the
    pending tx and attach the same nonce in the new tx

-------- TX SENDING ----------
- There are two ways to do it. From MM or from code.

--- MM ---
- The func 'triggerEvent' is done using MM

--- MANUALLY SIGNING ---
