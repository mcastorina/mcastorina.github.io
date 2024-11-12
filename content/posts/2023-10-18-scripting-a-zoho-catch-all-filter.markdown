---
date: "2023-10-18T09:00:00Z"
tags: programming
title: Scripting a Zoho catch-all filter
---

I use [Zoho](https://www.zoho.com/mail/) as my email provider, and I recently
learned that [you can setup a catch-all forwarding address](https://www.zoho.com/mail/help/adminconsole/catch-all-setup.html). This is pretty great,
because that means I can receive any email sent to my domain! Go ahead, [try it](mailto:lol@miccah.io).

I want to sort the emails I receive into their own folder, though, depending on
the delivery address (for example, `lol@miccah.io` will go to
`/catch-all/lol`). It turns out, Zoho supports custom mail filters using a
scripting DSL called [deluge](https://www.zoho.com/deluge/), so I wrote one!

At a high level, the filter parses the `To` address of the email, creates the
folder if it does not exist, then moves the email into that folder. In order to
work properly, I needed to create a "connection" with the properly scoped
permissions: `ZohoMail.messages.READ`, `ZohoMail.messages.UPDATE`, and
`ZohoMail.folders.ALL`. This will be clear if you're going through the process
yourself, otherwise don't worry about it.

Here's the script in all it's glory. I had fun hacking on this and was
pleasantly surprised that it was a feature available to me!

```javascript
info "Use the 'To' address to create a subfolder in catch-all and move the message there";
conn = "catchallfilter";
messageID = mail_messageId;
messageDetails = zoho.mail.getMessage(messageID, conn);

// Parse address for the folder name.
// toAddress is of the form "&lt;ADDR@domain.com&gt;"
toAddress = messageDetails.get("TO");
newName = toAddress.subString(4, toAddress.indexOf("@"));
info "routing to " + newName;

// Search top-level folders for "catch-all", then search its children for
// newName. If it's not found, create it.
for each folder in zoho.mail.getFolders(conn) {
	folderName = folder.get("NAME");
	if (folderName != "catch-all") {
		continue;
	}
	catchallSubFolders = folder.get("CHILDREN");
	subFolderExists = false;
	for each subFolder in catchallSubFolders {
		if (subFolder.get("NAME") != newName) {
			continue;
		}
		subFolderExists = true;
		info "subfolder exists";
		break;
	}
	if (!subFolderExists) {
		info "creating subfolder";
		zoho.mail.createFolder(newName, folder.get("ID"), conn);
	}
	break;
}
info "moving to subfolder";
zoho.mail.moveToFolder(messageID, "/catch-all/" + newName, conn);
```
