## Billar Radius Client Network

UI frontend to consume radius server information, we can create radius users either way.

### In progress log

[sat feb 1st 2025]

I'm able to create a new user, but I need to display the credentials to user when everything goes well or display error message

- add sucess message and shows up a card with credentials information
- display success or error banner
- add ui tables for rad queries so we can read information better 

[sat feb 8th 2025]

I fixed ui:

- [x] Navigation bar for both desktop and mobile, delete accounts no shows up in mobile
- [x] Added table ui to display radius records
- [x] added options to auth post page so I can analyze records better.
- [x] Create confirmation banner when user is succesfully created so the user can see the one time account, otherwise shows up an error.
- [x] Can I see device information either in accounting data or auth post reply ?
- [x] Should I keep long-lived records or delete them daily?
- [x] Try to sort record descending, I mean the fresh records first.

> The UI is done, the remaining things are not required whatsoever, although try do it would be good.
> I can create a longlived table for post-auth data, so I can analize it later if required, altough is not really needed I think.
> check backend notes, because perhaps in that side something is still required. perhaps something about groups, or remove only accounts start with user_, other accounts still keep them.

[sat feb 22nd 2025]

- [ ] show `isActive` prop when url matches with navbar button
- [ ] Add remove button to each row in radius check page do this arriving to town, because I need to check if billar admin devices could be set to use the same account & test user_ accounts only can be used by one device.

I don't think I need account record right now, I need to remove account one by one though and remove logs by myself each saturday if needed. I removed reset data button, cause is too dangerous, the only button to delete is on radius check view.